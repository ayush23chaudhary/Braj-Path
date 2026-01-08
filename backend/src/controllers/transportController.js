const TransportPrice = require('../models/TransportPrice');

/**
 * Transport Price Controller
 * Handles local transport pricing and fraud prevention
 */

/**
 * @desc    Get transport price for a route
 * @route   GET /api/transport/price
 * @access  Public
 */
exports.getTransportPrice = async (req, res) => {
  try {
    const { from, to, mode } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: 'Please provide from and to locations'
      });
    }

    const query = {
      'from.name': { $regex: from, $options: 'i' },
      'to.name': { $regex: to, $options: 'i' }
    };

    if (mode) {
      query.mode = mode;
    }

    const prices = await TransportPrice.find(query)
      .sort({ trustScore: -1 });

    if (prices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No pricing information available for this route'
      });
    }

    res.status(200).json({
      success: true,
      count: prices.length,
      data: prices,
      recommendation: prices[0].routeStatus === 'trusted' ? 
        'This route is generally safe with fair pricing' :
        'Please be cautious and negotiate prices before starting'
    });

  } catch (error) {
    console.error('Get transport price error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transport prices'
    });
  }
};

/**
 * @desc    Get all transport options
 * @route   GET /api/transport/options
 * @access  Public
 */
exports.getTransportOptions = async (req, res) => {
  try {
    const { mode, city, minTrustScore = 50 } = req.query;

    const query = {
      trustScore: { $gte: Number(minTrustScore) }
    };

    if (mode) {
      query.mode = mode;
    }

    const options = await TransportPrice.find(query)
      .sort({ trustScore: -1, recommendedPrice: 1 })
      .limit(50);

    // Group by mode
    const groupedByMode = options.reduce((acc, option) => {
      if (!acc[option.mode]) {
        acc[option.mode] = [];
      }
      acc[option.mode].push(option);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      total: options.length,
      data: groupedByMode
    });

  } catch (error) {
    console.error('Get transport options error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transport options'
    });
  }
};

/**
 * @desc    Verify transport price
 * @route   POST /api/transport/verify-price
 * @access  Private
 */
exports.verifyPrice = async (req, res) => {
  try {
    const { transportPriceId, actualPrice, wasOvercharged } = req.body;

    if (!transportPriceId || !actualPrice) {
      return res.status(400).json({
        success: false,
        message: 'Please provide transportPriceId and actualPrice'
      });
    }

    const transportPrice = await TransportPrice.findById(transportPriceId);

    if (!transportPrice) {
      return res.status(404).json({
        success: false,
        message: 'Transport price record not found'
      });
    }

    // Add to price history
    transportPrice.priceHistory.push({
      price: actualPrice,
      reportedBy: req.user._id,
      reportedAt: new Date()
    });

    // Update verification count
    if (!wasOvercharged) {
      transportPrice.verifiedCount += 1;
    } else {
      transportPrice.overchargeReports += 1;
    }

    await transportPrice.save(); // Trust score will be auto-calculated by pre-save hook

    res.status(200).json({
      success: true,
      message: 'Thank you for verifying the price! This helps protect fellow travelers. 🙏',
      data: {
        newTrustScore: transportPrice.trustScore,
        routeStatus: transportPrice.routeStatus
      }
    });

  } catch (error) {
    console.error('Verify price error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify price'
    });
  }
};

/**
 * @desc    Check if price is fair
 * @route   POST /api/transport/check-price
 * @access  Public
 */
exports.checkPrice = async (req, res) => {
  try {
    const { from, to, mode, quotedPrice } = req.body;

    if (!from || !to || !mode || !quotedPrice) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const transportPrice = await TransportPrice.findOne({
      'from.name': { $regex: from, $options: 'i' },
      'to.name': { $regex: to, $options: 'i' },
      mode
    });

    if (!transportPrice) {
      return res.status(404).json({
        success: false,
        message: 'No price information available for this route'
      });
    }

    const { minPrice, maxPrice, recommendedPrice, routeStatus } = transportPrice;
    const quoted = Number(quotedPrice);

    let verdict = '';
    let isFair = false;
    let overchargePercentage = 0;

    if (quoted <= maxPrice) {
      verdict = '✅ Fair price! You can proceed.';
      isFair = true;
    } else if (quoted <= maxPrice * 1.2) {
      overchargePercentage = Math.round(((quoted - maxPrice) / maxPrice) * 100);
      verdict = `⚠️ Slightly high (${overchargePercentage}% over fair price). Try negotiating.`;
      isFair = false;
    } else {
      overchargePercentage = Math.round(((quoted - maxPrice) / maxPrice) * 100);
      verdict = `❌ Overpriced! (${overchargePercentage}% higher than fair price). Strongly negotiate or find another option.`;
      isFair = false;
    }

    res.status(200).json({
      success: true,
      data: {
        quotedPrice: quoted,
        minPrice,
        maxPrice,
        recommendedPrice,
        verdict,
        isFair,
        overchargePercentage,
        routeStatus,
        trustScore: transportPrice.trustScore,
        tips: transportPrice.tips
      }
    });

  } catch (error) {
    console.error('Check price error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check price'
    });
  }
};

/**
 * @desc    Get fraud-prone routes
 * @route   GET /api/transport/fraud-alert
 * @access  Public
 */
exports.getFraudProneRoutes = async (req, res) => {
  try {
    const routes = await TransportPrice.find({
      routeStatus: 'fraud-prone'
    })
      .sort({ overchargeReports: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes,
      warning: '⚠️ Be extra cautious on these routes. Always negotiate and verify prices.'
    });

  } catch (error) {
    console.error('Get fraud-prone routes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fraud alerts'
    });
  }
};

/**
 * @desc    Get transport statistics
 * @route   GET /api/transport/stats
 * @access  Public
 */
exports.getTransportStats = async (req, res) => {
  try {
    const totalRoutes = await TransportPrice.countDocuments();
    const trustedRoutes = await TransportPrice.countDocuments({ routeStatus: 'trusted' });
    const fraudProneRoutes = await TransportPrice.countDocuments({ routeStatus: 'fraud-prone' });
    
    const avgTrustScore = await TransportPrice.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$trustScore' } } }
    ]);

    const modeStats = await TransportPrice.aggregate([
      { $group: { _id: '$mode', count: { $sum: 1 }, avgPrice: { $avg: '$recommendedPrice' } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalRoutes,
        trustedRoutes,
        fraudProneRoutes,
        averageTrustScore: Math.round(avgTrustScore[0]?.avgScore || 0),
        modeStatistics: modeStats
      }
    });

  } catch (error) {
    console.error('Get transport stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};

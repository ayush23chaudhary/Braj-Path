const FraudReport = require('../models/FraudReport');
const Hotel = require('../models/Hotel');
const TransportPrice = require('../models/TransportPrice');
const User = require('../models/User');

/**
 * Fraud Report Controller
 * Community-driven fraud prevention system
 */

/**
 * @desc    Submit fraud report
 * @route   POST /api/fraud/report
 * @access  Private
 */
exports.submitFraudReport = async (req, res) => {
  try {
    const {
      serviceType,
      serviceId,
      fraudType,
      chargedPrice,
      expectedPrice,
      description,
      location,
      evidence,
      isAnonymous
    } = req.body;

    // Validation
    if (!serviceType || !serviceId || !fraudType || !chargedPrice || !expectedPrice || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Determine service model
    let serviceModel;
    if (serviceType === 'hotel') {
      serviceModel = 'Hotel';
      // Verify hotel exists
      const hotel = await Hotel.findById(serviceId);
      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: 'Hotel not found'
        });
      }
      // Increment fraud report count
      hotel.fraudReports += 1;
      await hotel.save();
    } else if (serviceType === 'transport') {
      serviceModel = 'TransportPrice';
      const transport = await TransportPrice.findById(serviceId);
      if (!transport) {
        return res.status(404).json({
          success: false,
          message: 'Transport price record not found'
        });
      }
      transport.overchargeReports += 1;
      await transport.save();
    }

    // Create fraud report
    const fraudReport = await FraudReport.create({
      userId: req.user._id,
      serviceType,
      serviceId,
      serviceModel,
      fraudType,
      chargedPrice,
      expectedPrice,
      description,
      location,
      evidence,
      isAnonymous: isAnonymous || false
    });

    // Update user's report count
    const user = await User.findById(req.user._id);
    user.totalReports += 1;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for reporting! Your contribution helps protect fellow travelers. 🙏',
      data: fraudReport
    });

  } catch (error) {
    console.error('Submit fraud report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit fraud report'
    });
  }
};

/**
 * @desc    Get fraud reports
 * @route   GET /api/fraud/reports
 * @access  Private (Admin/Moderator)
 */
exports.getFraudReports = async (req, res) => {
  try {
    const { status, serviceType, severity, limit = 20, page = 1 } = req.query;

    const query = {};
    
    if (status) {
      query.status = status;
    }

    if (serviceType) {
      query.serviceType = serviceType;
    }

    if (severity) {
      query.severity = severity;
    }

    const skip = (page - 1) * limit;
    const reports = await FraudReport.find(query)
      .populate('userId', 'name email reportCredibility')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await FraudReport.countDocuments(query);

    res.status(200).json({
      success: true,
      count: reports.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: reports
    });

  } catch (error) {
    console.error('Get fraud reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fraud reports'
    });
  }
};

/**
 * @desc    Get fraud report by ID
 * @route   GET /api/fraud/reports/:id
 * @access  Private
 */
exports.getFraudReportById = async (req, res) => {
  try {
    const report = await FraudReport.findById(req.params.id)
      .populate('userId', 'name email reportCredibility')
      .populate('serviceId');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Fraud report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Get fraud report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fraud report'
    });
  }
};

/**
 * @desc    Vote on fraud report
 * @route   POST /api/fraud/reports/:id/vote
 * @access  Private
 */
exports.voteOnReport = async (req, res) => {
  try {
    const { vote } = req.body; // 'helpful' or 'notHelpful'

    if (!vote || !['helpful', 'notHelpful'].includes(vote)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vote. Use "helpful" or "notHelpful"'
      });
    }

    const report = await FraudReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Fraud report not found'
      });
    }

    // Check if user already voted
    const existingVote = report.communityVotes.voters.find(
      v => v.userId.toString() === req.user._id.toString()
    );

    if (existingVote) {
      // Update existing vote
      if (existingVote.vote === vote) {
        return res.status(400).json({
          success: false,
          message: 'You have already voted this way'
        });
      }

      // Change vote
      if (existingVote.vote === 'helpful') {
        report.communityVotes.helpful -= 1;
        report.communityVotes.notHelpful += 1;
      } else {
        report.communityVotes.notHelpful -= 1;
        report.communityVotes.helpful += 1;
      }
      existingVote.vote = vote;
    } else {
      // New vote
      if (vote === 'helpful') {
        report.communityVotes.helpful += 1;
      } else {
        report.communityVotes.notHelpful += 1;
      }
      report.communityVotes.voters.push({
        userId: req.user._id,
        vote
      });
    }

    await report.save();

    res.status(200).json({
      success: true,
      message: 'Vote recorded. Thank you for your contribution! 🙏',
      data: {
        helpful: report.communityVotes.helpful,
        notHelpful: report.communityVotes.notHelpful
      }
    });

  } catch (error) {
    console.error('Vote on report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record vote'
    });
  }
};

/**
 * @desc    Verify fraud report (Admin/Moderator only)
 * @route   PATCH /api/fraud/reports/:id/verify
 * @access  Private (Admin/Moderator)
 */
exports.verifyReport = async (req, res) => {
  try {
    const { status, verificationNotes, actionTaken } = req.body;

    if (!['verified', 'rejected', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const report = await FraudReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Fraud report not found'
      });
    }

    // Update report
    report.status = status;
    report.verificationDetails = {
      verifiedBy: req.user._id,
      verifiedAt: new Date(),
      verificationNotes
    };

    if (actionTaken) {
      report.actionTaken = actionTaken;
    }

    await report.save();

    // Update reporter's credibility
    const reporter = await User.findById(report.userId);
    if (reporter) {
      if (status === 'verified') {
        reporter.verifiedReports += 1;
      }
      reporter.updateCredibility();
      await reporter.save();
    }

    res.status(200).json({
      success: true,
      message: 'Report verified successfully',
      data: report
    });

  } catch (error) {
    console.error('Verify report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify report'
    });
  }
};

/**
 * @desc    Get fraud statistics
 * @route   GET /api/fraud/stats
 * @access  Public
 */
exports.getFraudStats = async (req, res) => {
  try {
    const totalReports = await FraudReport.countDocuments();
    const verifiedReports = await FraudReport.countDocuments({ status: 'verified' });
    const pendingReports = await FraudReport.countDocuments({ status: 'pending' });
    const resolvedReports = await FraudReport.countDocuments({ status: 'resolved' });

    const reportsByType = await FraudReport.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } }
    ]);

    const reportsBySeverity = await FraudReport.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } }
    ]);

    const avgOvercharge = await FraudReport.aggregate([
      { $match: { status: 'verified' } },
      { $group: { _id: null, avgOvercharge: { $avg: '$overchargePercentage' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalReports,
        verifiedReports,
        pendingReports,
        resolvedReports,
        reportsByType,
        reportsBySeverity,
        averageOverchargePercentage: Math.round(avgOvercharge[0]?.avgOvercharge || 0)
      }
    });

  } catch (error) {
    console.error('Get fraud stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fraud statistics'
    });
  }
};

/**
 * @desc    Get user's fraud reports
 * @route   GET /api/fraud/my-reports
 * @access  Private
 */
exports.getMyReports = async (req, res) => {
  try {
    const reports = await FraudReport.find({ userId: req.user._id })
      .populate('serviceId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });

  } catch (error) {
    console.error('Get my reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your reports'
    });
  }
};

/**
 * @desc    Submit simple transport fraud report (for price checking)
 * @route   POST /api/fraud/transport-report
 * @access  Private
 */
exports.submitSimpleTransportReport = async (req, res) => {
  try {
    const {
      route,
      transportType,
      actualPrice,
      fairPrice,
      description,
      location
    } = req.body;

    // Validation
    if (!route || !actualPrice || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide route, actual price, and description'
      });
    }

    // Create a simplified fraud report for transport
    // We'll use a generic approach since we don't have specific transport IDs
    const fraudReport = await FraudReport.create({
      userId: req.user._id,
      serviceType: 'transport',
      fraudType: 'overcharge',
      chargedPrice: parseFloat(actualPrice),
      expectedPrice: fairPrice ? parseFloat(fairPrice) : null,
      description: `${route} - ${transportType}: ${description}`,
      location: {
        name: location || route
      },
      isAnonymous: false,
      // Store additional info in evidence field
      evidence: [{
        type: 'other',  // Changed from 'text' to 'other'
        description: JSON.stringify({
          route,
          transportType,
          actualPrice,
          fairPrice
        })
      }]
    });

    // Update user's report count
    const user = await User.findById(req.user._id);
    user.totalReports += 1;
    user.credibilityScore = Math.min(100, user.credibilityScore + 2); // Increase credibility
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for reporting! Your contribution helps protect fellow travelers. 🙏',
      data: fraudReport
    });

  } catch (error) {
    console.error('Submit transport report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit report'
    });
  }
};

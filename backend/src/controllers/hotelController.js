const Hotel = require('../models/Hotel');

/**
 * Hotel Controller
 * Handles hotel and accommodation queries
 */

/**
 * @desc    Get all hotels with filters
 * @route   GET /api/hotels
 * @access  Public
 */
exports.getHotels = async (req, res) => {
  try {
    const {
      city,
      category,
      minPrice,
      maxPrice,
      verified,
      sortBy,
      limit = 20,
      page = 1
    } = req.query;

    // Build query
    const query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (category) {
      query.category = category;
    }

    if (verified === 'true') {
      query.verified = true;
    }

    if (minPrice || maxPrice) {
      query['priceRange.min'] = {};
      if (minPrice) query['priceRange.min'].$gte = Number(minPrice);
      if (maxPrice) query['priceRange.max'] = { $lte: Number(maxPrice) };
    }

    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'price-low':
        sort = { 'priceRange.min': 1 };
        break;
      case 'price-high':
        sort = { 'priceRange.min': -1 };
        break;
      case 'rating':
        sort = { rating: -1, reviewCount: -1 };
        break;
      default:
        sort = { localPriceBadge: -1, rating: -1 };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const hotels = await Hotel.find(query)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip);

    const total = await Hotel.countDocuments(query);

    res.status(200).json({
      success: true,
      count: hotels.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: hotels
    });

  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels'
    });
  }
};

/**
 * @desc    Get hotel by ID
 * @route   GET /api/hotels/:id
 * @access  Public
 */
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.status(200).json({
      success: true,
      data: hotel
    });

  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel'
    });
  }
};

/**
 * @desc    Get nearby hotels
 * @route   GET /api/hotels/nearby
 * @access  Public
 */
exports.getNearbyHotels = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5, category } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide longitude and latitude'
      });
    }

    const query = {
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)]
          },
          $maxDistance: Number(maxDistance) * 1000 // Convert km to meters
        }
      },
      verified: true
    };

    if (category) {
      query.category = category;
    }

    const hotels = await Hotel.find(query).limit(10);

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });

  } catch (error) {
    console.error('Get nearby hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nearby hotels'
    });
  }
};

/**
 * @desc    Search hotels
 * @route   GET /api/hotels/search
 * @access  Public
 */
exports.searchHotels = async (req, res) => {
  try {
    const { query, city } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query'
      });
    }

    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    if (city) {
      searchQuery['location.city'] = city;
    }

    const hotels = await Hotel.find(searchQuery)
      .sort({ rating: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });

  } catch (error) {
    console.error('Search hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search hotels'
    });
  }
};

/**
 * @desc    Get budget recommendations
 * @route   GET /api/hotels/budget-recommendation
 * @access  Public
 */
exports.getBudgetRecommendations = async (req, res) => {
  try {
    const { budget, numberOfDays, city = 'Vrindavan' } = req.query;

    if (!budget || !numberOfDays) {
      return res.status(400).json({
        success: false,
        message: 'Please provide budget and numberOfDays'
      });
    }

    const budgetPerNight = Number(budget) / Number(numberOfDays) * 0.4; // 40% for accommodation

    let categories = [];
    if (budgetPerNight < 800) {
      categories = ['budget', 'dharamshala'];
    } else if (budgetPerNight < 2500) {
      categories = ['budget', 'mid'];
    } else {
      categories = ['mid', 'premium'];
    }

    const hotels = await Hotel.find({
      'location.city': city,
      category: { $in: categories },
      verified: true,
      'priceRange.min': { $lte: budgetPerNight * 1.2 }
    })
      .sort({ localPriceBadge: -1, rating: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      recommendedBudgetPerNight: Math.round(budgetPerNight),
      categories,
      count: hotels.length,
      data: hotels
    });

  } catch (error) {
    console.error('Budget recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations'
    });
  }
};

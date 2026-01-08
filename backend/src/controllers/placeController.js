const Place = require('../models/Place');

/**
 * Place Controller
 * Handles temples, ghats, and heritage sites
 */

/**
 * @desc    Get all places with filters
 * @route   GET /api/places
 * @access  Public
 */
exports.getPlaces = async (req, res) => {
  try {
    const {
      city,
      type,
      category,
      bestTime,
      crowdLevel,
      minPriority,
      limit = 50,
      page = 1,
      sortBy
    } = req.query;

    // Build query
    const query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (bestTime) {
      query.bestTime = bestTime;
    }

    if (crowdLevel) {
      query.crowdLevel = crowdLevel;
    }

    if (minPriority) {
      query.priorityScore = { $gte: Number(minPriority) };
    }

    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'priority':
        sort = { priorityScore: -1, rating: -1 };
        break;
      case 'rating':
        sort = { rating: -1, reviewCount: -1 };
        break;
      case 'name':
        sort = { name: 1 };
        break;
      default:
        sort = { priorityScore: -1, rating: -1 };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const places = await Place.find(query)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip);

    const total = await Place.countDocuments(query);

    res.status(200).json({
      success: true,
      count: places.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: places
    });

  } catch (error) {
    console.error('Get places error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch places'
    });
  }
};

/**
 * @desc    Get place by ID
 * @route   GET /api/places/:id
 * @access  Public
 */
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate('nearbyPlaces.placeId', 'name type location rating');

    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    res.status(200).json({
      success: true,
      data: place
    });

  } catch (error) {
    console.error('Get place error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch place'
    });
  }
};

/**
 * @desc    Get must-visit places
 * @route   GET /api/places/must-visit
 * @access  Public
 */
exports.getMustVisitPlaces = async (req, res) => {
  try {
    const { city = 'Vrindavan' } = req.query;

    const places = await Place.find({
      'location.city': city,
      priorityScore: { $gte: 8 }
    })
      .sort({ priorityScore: -1, rating: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
      message: 'These divine places are blessed with the presence of Radha-Krishna 🙏'
    });

  } catch (error) {
    console.error('Get must-visit error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch must-visit places'
    });
  }
};

/**
 * @desc    Get nearby places
 * @route   GET /api/places/nearby
 * @access  Public
 */
exports.getNearbyPlaces = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5, type } = req.query;

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
      }
    };

    if (type) {
      query.type = type;
    }

    const places = await Place.find(query).limit(20);

    res.status(200).json({
      success: true,
      count: places.length,
      data: places
    });

  } catch (error) {
    console.error('Get nearby places error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nearby places'
    });
  }
};

/**
 * @desc    Search places
 * @route   GET /api/places/search
 * @access  Public
 */
exports.searchPlaces = async (req, res) => {
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
        { religiousSignificance: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    if (city) {
      searchQuery['location.city'] = city;
    }

    const places = await Place.find(searchQuery)
      .sort({ priorityScore: -1, rating: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: places.length,
      data: places
    });

  } catch (error) {
    console.error('Search places error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search places'
    });
  }
};

/**
 * @desc    Get places by category
 * @route   GET /api/places/category/:category
 * @access  Public
 */
exports.getPlacesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { city } = req.query;

    const validCategories = ['spiritual', 'leisure', 'cultural', 'historical'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const query = { category };
    if (city) {
      query['location.city'] = city;
    }

    const places = await Place.find(query)
      .sort({ priorityScore: -1, rating: -1 })
      .limit(30);

    res.status(200).json({
      success: true,
      category,
      count: places.length,
      data: places
    });

  } catch (error) {
    console.error('Get places by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch places'
    });
  }
};

/**
 * @desc    Get places for elderly
 * @route   GET /api/places/elderly-friendly
 * @access  Public
 */
exports.getElderlyFriendlyPlaces = async (req, res) => {
  try {
    const { city = 'Vrindavan' } = req.query;

    const places = await Place.find({
      'location.city': city,
      'accessibility.elderlyFriendly': true
    })
      .sort({ priorityScore: -1, rating: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
      message: 'These places are easily accessible for elderly devotees'
    });

  } catch (error) {
    console.error('Get elderly-friendly places error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch places'
    });
  }
};

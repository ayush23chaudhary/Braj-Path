const TripPlan = require('../models/TripPlan');
const tripPlannerAlgorithm = require('../algorithms/tripPlanner');

/**
 * Trip Planning Controller
 * Handles trip plan creation, retrieval, and management
 */

/**
 * @desc    Plan a new trip
 * @route   POST /api/trip/plan
 * @access  Private
 */
exports.planTrip = async (req, res) => {
  try {
    const {
      numberOfDays,
      budget,
      priority,
      groupType,
      startDate,
      city,
      pacePreference
    } = req.body;

    // Validate required fields
    if (!numberOfDays || !budget || !priority || !groupType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: numberOfDays, budget, priority, groupType'
      });
    }

    // Run the trip planning algorithm
    const planResult = await tripPlannerAlgorithm.planTrip({
      numberOfDays,
      budget,
      priority,
      groupType,
      startDate,
      city: city || 'Vrindavan',
      pacePreference: pacePreference || 'moderate'
    });

    // Save the trip plan to database
    const tripPlan = await TripPlan.create({
      userId: req.user._id,
      numberOfDays,
      budget: {
        total: budget,
        breakdown: {
          accommodation: planResult.itinerary.reduce((sum, day) => 
            sum + (day.dailyBudget.accommodation || 0), 0),
          transport: planResult.itinerary.reduce((sum, day) => 
            sum + (day.dailyBudget.transport || 0), 0),
          food: planResult.itinerary.reduce((sum, day) => 
            sum + (day.dailyBudget.food || 0), 0),
          entry: planResult.itinerary.reduce((sum, day) => 
            sum + (day.dailyBudget.entry || 0), 0)
        }
      },
      preferences: {
        priority,
        groupType,
        pacePreference: pacePreference || 'moderate'
      },
      itinerary: planResult.itinerary,
      totalEstimatedCost: planResult.totalCost,
      budgetUtilization: planResult.budgetUtilization,
      placesIncluded: planResult.itinerary
        .flatMap(day => day.places.map(p => p.placeId)),
      metadata: planResult.metadata,
      startDate: startDate || new Date(),
      endDate: startDate ? 
        new Date(new Date(startDate).getTime() + numberOfDays * 24 * 60 * 60 * 1000) : 
        new Date(Date.now() + numberOfDays * 24 * 60 * 60 * 1000),
      status: 'active'
    });

    res.status(201).json({
      success: true,
      message: 'Trip planned successfully! Jai Shri Krishna! 🙏',
      data: {
        tripPlanId: tripPlan._id,
        itinerary: planResult.itinerary,
        totalCost: planResult.totalCost,
        budgetUtilization: planResult.budgetUtilization,
        metadata: planResult.metadata
      }
    });

  } catch (error) {
    console.error('Trip planning error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to plan trip'
    });
  }
};

/**
 * @desc    Get user's trip plans
 * @route   GET /api/trip/my-trips
 * @access  Private
 */
exports.getMyTrips = async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { userId: req.user._id };
    if (status) {
      query.status = status;
    }

    const trips = await TripPlan.find(query)
      .populate('placesIncluded', 'name type location rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });

  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trips'
    });
  }
};

/**
 * @desc    Get trip plan by ID
 * @route   GET /api/trip/:id
 * @access  Private
 */
exports.getTripById = async (req, res) => {
  try {
    const trip = await TripPlan.findById(req.params.id)
      .populate('placesIncluded', 'name type location rating images')
      .populate('itinerary.accommodation.hotelId', 'name location rating priceRange');

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip plan not found'
      });
    }

    // Check if user owns this trip or if it's shared
    if (trip.userId.toString() !== req.user._id.toString() && !trip.shared) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this trip'
      });
    }

    res.status(200).json({
      success: true,
      data: trip
    });

  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trip'
    });
  }
};

/**
 * @desc    Update trip status
 * @route   PATCH /api/trip/:id/status
 * @access  Private
 */
exports.updateTripStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['draft', 'active', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const trip = await TripPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Trip status updated',
      data: trip
    });

  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip'
    });
  }
};

/**
 * @desc    Submit trip feedback
 * @route   POST /api/trip/:id/feedback
 * @access  Private
 */
exports.submitFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const trip = await TripPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        feedback: {
          rating,
          comments,
          submittedAt: new Date()
        }
      },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your feedback! 🙏',
      data: trip
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback'
    });
  }
};

/**
 * @desc    Delete trip plan
 * @route   DELETE /api/trip/:id
 * @access  Private
 */
exports.deleteTripPlan = async (req, res) => {
  try {
    const trip = await TripPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully'
    });

  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip'
    });
  }
};

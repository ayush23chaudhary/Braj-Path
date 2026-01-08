const mongoose = require('mongoose');

/**
 * TripPlan Schema - Stores generated trip itineraries
 * Core output of the trip planning algorithm
 */
const tripPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'My Braj Yatra'
  },
  numberOfDays: {
    type: Number,
    required: true,
    min: 1,
    max: 30
  },
  budget: {
    total: {
      type: Number,
      required: true,
      min: 0
    },
    breakdown: {
      accommodation: Number,
      transport: Number,
      food: Number,
      entry: Number,
      miscellaneous: Number
    }
  },
  preferences: {
    priority: {
      type: String,
      enum: ['temples', 'leisure', 'spiritual', 'mixed'],
      required: true
    },
    groupType: {
      type: String,
      enum: ['solo', 'family', 'elderly', 'group', 'couple'],
      required: true
    },
    pacePreference: {
      type: String,
      enum: ['relaxed', 'moderate', 'packed'],
      default: 'moderate'
    }
  },
  itinerary: [{
    day: {
      type: Number,
      required: true
    },
    date: Date,
    places: [{
      placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
      },
      placeName: String,
      visitTime: {
        start: String, // "09:00"
        end: String    // "11:00"
      },
      duration: Number, // in minutes
      entryFee: Number,
      notes: String,
      orderInDay: Number
    }],
    accommodation: {
      hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
      },
      hotelName: String,
      estimatedCost: Number
    },
    transportDetails: [{
      from: String,
      to: String,
      mode: String,
      estimatedCost: Number,
      distance: Number
    }],
    dailyBudget: {
      accommodation: Number,
      transport: Number,
      food: Number,
      entry: Number,
      total: Number
    },
    tips: [String]
  }],
  totalEstimatedCost: {
    type: Number,
    required: true
  },
  budgetUtilization: {
    type: Number, // Percentage of budget used
    default: 0
  },
  placesIncluded: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  startDate: Date,
  endDate: Date,
  algorithmVersion: {
    type: String,
    default: 'v1.0'
  },
  metadata: {
    totalPlaces: Number,
    totalDistance: Number, // in kilometers
    averageRating: Number,
    mustVisitCount: Number
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    submittedAt: Date
  },
  shared: {
    type: Boolean,
    default: false
  },
  shareToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for queries
tripPlanSchema.index({ userId: 1, status: 1 });
tripPlanSchema.index({ createdAt: -1 });
tripPlanSchema.index({ shareToken: 1 });

// Calculate budget utilization before saving
tripPlanSchema.pre('save', function(next) {
  if (this.totalEstimatedCost && this.budget.total) {
    this.budgetUtilization = Math.round((this.totalEstimatedCost / this.budget.total) * 100);
  }
  this.updatedAt = Date.now();
  next();
});

// Virtual for trip duration
tripPlanSchema.virtual('duration').get(function() {
  if (this.startDate && this.endDate) {
    const diffTime = Math.abs(this.endDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return this.numberOfDays;
});

module.exports = mongoose.model('TripPlan', tripPlanSchema);

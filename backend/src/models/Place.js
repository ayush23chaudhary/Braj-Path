const mongoose = require('mongoose');

/**
 * Place Schema - Represents temples, ghats, and heritage sites
 * Core entity for trip planning algorithm
 */
const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Place name is required'],
    trim: true,
    maxlength: [150, 'Place name cannot exceed 150 characters'],
    index: true
  },
  description: {
    type: String,
    required: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: ['temple', 'ghat', 'heritage', 'garden', 'museum', 'viewpoint'],
    required: true,
    index: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      enum: ['Mathura', 'Vrindavan'],
      required: true,
      index: true
    }
  },
  avgVisitTime: {
    type: Number, // in minutes
    required: true,
    min: [15, 'Visit time must be at least 15 minutes'],
    max: [480, 'Visit time cannot exceed 8 hours']
  },
  bestTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'night', 'anytime'],
    default: 'anytime'
  },
  crowdLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  entryFee: {
    amount: {
      type: Number,
      default: 0,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    hasSpecialPass: {
      type: Boolean,
      default: false
    }
  },
  priorityScore: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
    index: true
    // 10 = Must visit (e.g., Banke Bihari, Krishna Janmabhoomi)
    // 5-7 = Popular places
    // 1-4 = Optional/less known
  },
  religiousSignificance: {
    type: String,
    maxlength: [500, 'Religious significance cannot exceed 500 characters']
  },
  openingHours: {
    opens: String, // e.g., "05:00"
    closes: String, // e.g., "21:00"
    closedDays: [String] // e.g., ["Monday"]
  },
  images: [{
    url: String,
    caption: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [String], // e.g., "radha-krishna", "aarti", "parikrama", "prasadam"
  category: {
    type: String,
    enum: ['spiritual', 'leisure', 'cultural', 'historical'],
    required: true,
    index: true
  },
  accessibility: {
    wheelchairFriendly: {
      type: Boolean,
      default: false
    },
    elderlyFriendly: {
      type: Boolean,
      default: true
    },
    parking: {
      type: Boolean,
      default: false
    }
  },
  facilities: [String], // e.g., "prasadam", "locker", "washroom", "drinking-water"
  nearbyPlaces: [{
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    },
    distance: Number // in kilometers
  }],
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

// Geospatial index for proximity queries
placeSchema.index({ 'location.coordinates': '2dsphere' });

// Compound indexes for trip planning queries
placeSchema.index({ category: 1, priorityScore: -1 });
placeSchema.index({ 'location.city': 1, type: 1, priorityScore: -1 });
placeSchema.index({ type: 1, bestTime: 1 });

// Virtual for must-visit status
placeSchema.virtual('isMustVisit').get(function() {
  return this.priorityScore >= 8;
});

// Update timestamp before saving
placeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Place', placeSchema);

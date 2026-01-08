const mongoose = require('mongoose');

/**
 * Hotel Schema - Represents accommodations in Mathura/Vrindavan
 * Includes dharamshalas, budget hotels, and premium stays
 */
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    maxlength: [100, 'Hotel name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
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
      required: true
    }
  },
  priceRange: {
    min: {
      type: Number,
      required: true,
      min: [0, 'Minimum price cannot be negative']
    },
    max: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          return value >= this.priceRange.min;
        },
        message: 'Maximum price must be greater than or equal to minimum price'
      }
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  category: {
    type: String,
    enum: ['budget', 'mid', 'premium', 'dharamshala'],
    required: true,
    index: true
  },
  verified: {
    type: Boolean,
    default: false,
    index: true
  },
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
  distanceFromCenter: {
    type: Number, // in kilometers
    required: true
  },
  amenities: [{
    type: String,
    enum: ['wifi', 'parking', 'ac', 'temple-view', 'meals', 'hot-water', 'prasadam', 'pooja-room']
  }],
  images: [{
    url: String,
    caption: String
  }],
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  availability: {
    type: Boolean,
    default: true
  },
  localPriceBadge: {
    type: Boolean,
    default: false // True if price is fair according to local standards
  },
  fraudReports: {
    type: Number,
    default: 0
  },
  tags: [String], // e.g., "near-temple", "family-friendly", "spiritual-stay"
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

// Geospatial index for location-based queries
hotelSchema.index({ 'location.coordinates': '2dsphere' });

// Compound indexes for common queries
hotelSchema.index({ category: 1, verified: 1, rating: -1 });
hotelSchema.index({ 'location.city': 1, category: 1 });

// Virtual for average price
hotelSchema.virtual('averagePrice').get(function() {
  return (this.priceRange.min + this.priceRange.max) / 2;
});

// Update the updatedAt timestamp before saving
hotelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Hotel', hotelSchema);

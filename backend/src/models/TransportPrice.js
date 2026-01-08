const mongoose = require('mongoose');

/**
 * TransportPrice Schema - Local price protection system
 * Tracks fair prices for routes between places
 */
const transportPriceSchema = new mongoose.Schema({
  from: {
    name: {
      type: String,
      required: true
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
      }
    }
  },
  to: {
    name: {
      type: String,
      required: true
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
      }
    }
  },
  mode: {
    type: String,
    enum: ['auto', 'e-rickshaw', 'cab', 'tempo', 'cycle-rickshaw'],
    required: true,
    index: true
  },
  distance: {
    type: Number, // in kilometers
    required: true
  },
  duration: {
    type: Number, // in minutes (estimated)
    required: true
  },
  minPrice: {
    type: Number,
    required: true,
    min: [0, 'Minimum price cannot be negative']
  },
  maxPrice: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= this.minPrice;
      },
      message: 'Maximum price must be greater than or equal to minimum price'
    }
  },
  recommendedPrice: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  verifiedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  overchargeReports: {
    type: Number,
    default: 0,
    min: 0
  },
  trustScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
    // Calculated based on verified trips vs fraud reports
  },
  routeStatus: {
    type: String,
    enum: ['trusted', 'caution', 'fraud-prone'],
    default: 'trusted'
  },
  peakHourMultiplier: {
    type: Number,
    default: 1.2, // 20% increase during peak hours
    min: 1
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  priceHistory: [{
    price: Number,
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tips: [String], // e.g., "Negotiate before starting", "Ask for meter"
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

// Compound indexes for route queries
transportPriceSchema.index({ 'from.name': 1, 'to.name': 1, mode: 1 }, { unique: true });
transportPriceSchema.index({ mode: 1, trustScore: -1 });
transportPriceSchema.index({ routeStatus: 1 });

// Geospatial indexes
transportPriceSchema.index({ 'from.location.coordinates': '2dsphere' });
transportPriceSchema.index({ 'to.location.coordinates': '2dsphere' });

// Virtual for average price
transportPriceSchema.virtual('averagePrice').get(function() {
  return (this.minPrice + this.maxPrice) / 2;
});

// Virtual for fraud risk level
transportPriceSchema.virtual('fraudRiskLevel').get(function() {
  if (this.overchargeReports === 0) return 'low';
  const ratio = this.overchargeReports / (this.verifiedCount + 1);
  if (ratio > 0.3) return 'high';
  if (ratio > 0.1) return 'medium';
  return 'low';
});

// Update trust score before saving
transportPriceSchema.pre('save', function(next) {
  if (this.verifiedCount > 0 || this.overchargeReports > 0) {
    const totalReports = this.verifiedCount + this.overchargeReports;
    this.trustScore = Math.round((this.verifiedCount / totalReports) * 100);
    
    // Update route status based on trust score
    if (this.trustScore >= 80) {
      this.routeStatus = 'trusted';
    } else if (this.trustScore >= 50) {
      this.routeStatus = 'caution';
    } else {
      this.routeStatus = 'fraud-prone';
    }
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('TransportPrice', transportPriceSchema);

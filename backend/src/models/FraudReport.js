const mongoose = require('mongoose');

/**
 * FraudReport Schema - Community-driven fraud prevention
 * Tracks overcharging and fake services
 */
const fraudReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  serviceType: {
    type: String,
    enum: ['hotel', 'transport', 'guide', 'other'],
    required: true,
    index: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'serviceModel',
    required: false  // Changed from true to false
  },
  serviceModel: {
    type: String,
    enum: ['Hotel', 'TransportPrice'],
    required: false  // Changed from true to false
  },
  fraudType: {
    type: String,
    enum: ['overpricing', 'overcharge', 'fake-service', 'poor-quality', 'scam', 'safety-issue'],
    required: true
  },
  chargedPrice: {
    type: Number,
    required: true,
    min: 0
  },
  expectedPrice: {
    type: Number,
    required: false,  // Changed from true to false - fair price is optional
    min: 0
  },
  overchargePercentage: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [20, 'Description must be at least 20 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    name: String,
    coordinates: [Number] // [longitude, latitude]
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  evidence: [{
    type: {
      type: String,
      enum: ['image', 'receipt', 'audio', 'other']
    },
    url: String,
    description: String
  }],
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'resolved'],
    default: 'pending',
    index: true
  },
  verificationDetails: {
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date,
    verificationNotes: String
  },
  communityVotes: {
    helpful: {
      type: Number,
      default: 0
    },
    notHelpful: {
      type: Number,
      default: 0
    },
    voters: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      vote: {
        type: String,
        enum: ['helpful', 'notHelpful']
      }
    }]
  },
  actionTaken: {
    type: String,
    maxlength: [500, 'Action description cannot exceed 500 characters']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
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

// Compound indexes for queries
fraudReportSchema.index({ status: 1, createdAt: -1 });
fraudReportSchema.index({ serviceType: 1, serviceId: 1 });
fraudReportSchema.index({ userId: 1, status: 1 });

// Calculate overcharge percentage before saving
fraudReportSchema.pre('save', function(next) {
  if (this.chargedPrice && this.expectedPrice) {
    this.overchargePercentage = Math.round(
      ((this.chargedPrice - this.expectedPrice) / this.expectedPrice) * 100
    );
    
    // Auto-calculate severity based on overcharge
    if (this.overchargePercentage > 100) {
      this.severity = 'critical';
    } else if (this.overchargePercentage > 50) {
      this.severity = 'high';
    } else if (this.overchargePercentage > 20) {
      this.severity = 'medium';
    } else {
      this.severity = 'low';
    }
  }
  this.updatedAt = Date.now();
  next();
});

// Virtual for credibility score
fraudReportSchema.virtual('credibilityScore').get(function() {
  const totalVotes = this.communityVotes.helpful + this.communityVotes.notHelpful;
  if (totalVotes === 0) return 0;
  return Math.round((this.communityVotes.helpful / totalVotes) * 100);
});

module.exports = mongoose.model('FraudReport', fraudReportSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema - Authentication and user management
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  profilePicture: {
    type: String
  },
  preferences: {
    groupType: {
      type: String,
      enum: ['solo', 'family', 'elderly', 'group', 'couple']
    },
    priority: {
      type: String,
      enum: ['temples', 'leisure', 'spiritual', 'mixed']
    },
    budget: {
      min: Number,
      max: Number
    }
  },
  savedTrips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TripPlan'
  }],
  reportCredibility: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
    // Increases with verified reports, decreases with rejected ones
  },
  totalReports: {
    type: Number,
    default: 0
  },
  verifiedReports: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
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

// Index for authentication
userSchema.index({ email: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update credibility score
userSchema.methods.updateCredibility = function() {
  if (this.totalReports > 0) {
    this.reportCredibility = Math.round((this.verifiedReports / this.totalReports) * 100);
  }
};

module.exports = mongoose.model('User', userSchema);

/**
 * Request Validator Middleware
 * Validates incoming requests
 */

/**
 * Validate trip planning request
 */
exports.validateTripPlan = (req, res, next) => {
  const { numberOfDays, budget, priority, groupType } = req.body;

  const errors = [];

  if (!numberOfDays) {
    errors.push('numberOfDays is required');
  } else if (numberOfDays < 1 || numberOfDays > 30) {
    errors.push('numberOfDays must be between 1 and 30');
  }

  if (!budget) {
    errors.push('budget is required');
  } else if (budget < 1000) {
    errors.push('budget must be at least ₹1000');
  }

  const validPriorities = ['temples', 'leisure', 'spiritual', 'mixed'];
  if (!priority) {
    errors.push('priority is required');
  } else if (!validPriorities.includes(priority)) {
    errors.push(`priority must be one of: ${validPriorities.join(', ')}`);
  }

  const validGroupTypes = ['solo', 'family', 'elderly', 'group', 'couple'];
  if (!groupType) {
    errors.push('groupType is required');
  } else if (!validGroupTypes.includes(groupType)) {
    errors.push(`groupType must be one of: ${validGroupTypes.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

/**
 * Validate fraud report request
 */
exports.validateFraudReport = (req, res, next) => {
  const { serviceType, serviceId, fraudType, chargedPrice, expectedPrice, description } = req.body;

  const errors = [];

  const validServiceTypes = ['hotel', 'transport', 'guide', 'other'];
  if (!serviceType) {
    errors.push('serviceType is required');
  } else if (!validServiceTypes.includes(serviceType)) {
    errors.push(`serviceType must be one of: ${validServiceTypes.join(', ')}`);
  }

  if (!serviceId) {
    errors.push('serviceId is required');
  }

  const validFraudTypes = ['overpricing', 'fake-service', 'poor-quality', 'scam', 'safety-issue'];
  if (!fraudType) {
    errors.push('fraudType is required');
  } else if (!validFraudTypes.includes(fraudType)) {
    errors.push(`fraudType must be one of: ${validFraudTypes.join(', ')}`);
  }

  if (!chargedPrice) {
    errors.push('chargedPrice is required');
  } else if (chargedPrice < 0) {
    errors.push('chargedPrice cannot be negative');
  }

  if (!expectedPrice) {
    errors.push('expectedPrice is required');
  } else if (expectedPrice < 0) {
    errors.push('expectedPrice cannot be negative');
  }

  if (!description) {
    errors.push('description is required');
  } else if (description.length < 20) {
    errors.push('description must be at least 20 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

/**
 * Validate registration request
 */
exports.validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('name is required');
  } else if (name.length > 50) {
    errors.push('name cannot exceed 50 characters');
  }

  if (!email || email.trim().length === 0) {
    errors.push('email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length === 0) {
    errors.push('password is required');
  } else if (password.length < 6) {
    errors.push('password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

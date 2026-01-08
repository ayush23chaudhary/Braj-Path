/**
 * Price Estimator Utility
 * Estimates costs for trips, transport, and accommodation
 */

/**
 * Estimate transport cost based on distance and mode
 * @param {Number} distance - Distance in kilometers
 * @param {String} mode - Transport mode
 * @returns {Object} - Price range {min, max, recommended}
 */
exports.estimateTransportCost = (distance, mode = 'auto') => {
  const basePrices = {
    'cycle-rickshaw': { base: 10, perKm: 8 },
    'e-rickshaw': { base: 10, perKm: 10 },
    'auto': { base: 20, perKm: 12 },
    'tempo': { base: 30, perKm: 15 },
    'cab': { base: 50, perKm: 18 }
  };

  const pricing = basePrices[mode] || basePrices['auto'];
  const baseCost = pricing.base + (distance * pricing.perKm);

  return {
    min: Math.ceil(baseCost * 0.9),
    max: Math.ceil(baseCost * 1.3),
    recommended: Math.ceil(baseCost),
    currency: 'INR'
  };
};

/**
 * Estimate daily food cost based on budget category
 * @param {String} category - Budget category
 * @param {String} groupType - Type of group
 * @returns {Number} - Daily food cost
 */
exports.estimateFoodCost = (category = 'budget', groupType = 'solo') => {
  const baseCosts = {
    'dharamshala': 250,
    'budget': 300,
    'mid': 600,
    'premium': 1000
  };

  const multipliers = {
    'solo': 1,
    'couple': 2,
    'family': 3.5,
    'group': 4,
    'elderly': 1.2
  };

  const baseCost = baseCosts[category] || baseCosts['budget'];
  const multiplier = multipliers[groupType] || 1;

  return Math.ceil(baseCost * multiplier);
};

/**
 * Estimate accommodation cost per night
 * @param {Number} budget - Total trip budget
 * @param {Number} days - Number of days
 * @returns {Object} - Recommended category and budget
 */
exports.estimateAccommodationBudget = (budget, days) => {
  const budgetPerNight = (budget / days) * 0.4; // 40% for accommodation

  let category;
  let range;

  if (budgetPerNight < 800) {
    category = ['dharamshala', 'budget'];
    range = { min: 300, max: 800 };
  } else if (budgetPerNight < 2500) {
    category = ['budget', 'mid'];
    range = { min: 800, max: 2500 };
  } else {
    category = ['mid', 'premium'];
    range = { min: 2500, max: 10000 };
  }

  return {
    recommendedBudgetPerNight: Math.round(budgetPerNight),
    categories: category,
    priceRange: range
  };
};

/**
 * Calculate total trip cost breakdown
 * @param {Object} params - Trip parameters
 * @returns {Object} - Detailed cost breakdown
 */
exports.calculateTripCostBreakdown = (params) => {
  const {
    numberOfDays,
    accommodationCostPerNight,
    totalDistance,
    entryFees,
    groupType,
    category
  } = params;

  const accommodation = accommodationCostPerNight * numberOfDays;
  const transport = Math.ceil(totalDistance * 15); // ₹15 per km average
  const food = this.estimateFoodCost(category, groupType) * numberOfDays;
  const entry = entryFees || 0;
  const subtotal = accommodation + transport + food + entry;
  const miscellaneous = Math.ceil(subtotal * 0.1); // 10% buffer

  return {
    accommodation,
    transport,
    food,
    entry,
    miscellaneous,
    total: subtotal + miscellaneous,
    breakdown: {
      accommodationPercentage: Math.round((accommodation / (subtotal + miscellaneous)) * 100),
      transportPercentage: Math.round((transport / (subtotal + miscellaneous)) * 100),
      foodPercentage: Math.round((food / (subtotal + miscellaneous)) * 100),
      entryPercentage: Math.round((entry / (subtotal + miscellaneous)) * 100),
      miscellaneousPercentage: Math.round((miscellaneous / (subtotal + miscellaneous)) * 100)
    }
  };
};

/**
 * Check if price is fair compared to expected range
 * @param {Number} chargedPrice - Price charged
 * @param {Number} minPrice - Minimum fair price
 * @param {Number} maxPrice - Maximum fair price
 * @returns {Object} - Verdict and details
 */
exports.checkPriceFairness = (chargedPrice, minPrice, maxPrice) => {
  let verdict;
  let status;
  let overchargePercentage = 0;

  if (chargedPrice <= maxPrice) {
    verdict = 'Fair price';
    status = 'fair';
  } else if (chargedPrice <= maxPrice * 1.2) {
    overchargePercentage = Math.round(((chargedPrice - maxPrice) / maxPrice) * 100);
    verdict = `Slightly high (${overchargePercentage}% over)`;
    status = 'caution';
  } else {
    overchargePercentage = Math.round(((chargedPrice - maxPrice) / maxPrice) * 100);
    verdict = `Overpriced (${overchargePercentage}% over)`;
    status = 'overpriced';
  }

  return {
    verdict,
    status,
    overchargePercentage,
    isFair: status === 'fair'
  };
};

/**
 * Optimize budget allocation
 * @param {Number} totalBudget - Total available budget
 * @param {Number} numberOfDays - Number of days
 * @returns {Object} - Recommended allocation
 */
exports.optimizeBudgetAllocation = (totalBudget, numberOfDays) => {
  const dailyBudget = totalBudget / numberOfDays;

  return {
    dailyBudget,
    recommended: {
      accommodation: Math.round(dailyBudget * 0.40),
      food: Math.round(dailyBudget * 0.30),
      transport: Math.round(dailyBudget * 0.20),
      activities: Math.round(dailyBudget * 0.10)
    },
    percentages: {
      accommodation: 40,
      food: 30,
      transport: 20,
      activities: 10
    }
  };
};

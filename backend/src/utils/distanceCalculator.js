/**
 * Distance Calculator Utility
 * Calculates distances between coordinates and routes
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Array} coords1 - [longitude, latitude]
 * @param {Array} coords2 - [longitude, latitude]
 * @returns {Number} - Distance in kilometers
 */
exports.calculateDistance = (coords1, coords2) => {
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Calculate total distance for a route (multiple points)
 * @param {Array} coordinates - Array of [longitude, latitude] pairs
 * @returns {Number} - Total distance in kilometers
 */
exports.calculateRouteDistance = (coordinates) => {
  if (coordinates.length < 2) return 0;

  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += this.calculateDistance(coordinates[i], coordinates[i + 1]);
  }

  return Math.round(totalDistance * 100) / 100;
};

/**
 * Get distance in human-readable format
 * @param {Number} distance - Distance in kilometers
 * @returns {String} - Formatted distance string
 */
exports.formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} meters`;
  }
  return `${distance.toFixed(1)} km`;
};

/**
 * Estimate travel time based on distance and mode
 * @param {Number} distance - Distance in kilometers
 * @param {String} mode - Transport mode
 * @returns {Number} - Estimated time in minutes
 */
exports.estimateTravelTime = (distance, mode = 'auto') => {
  const speeds = {
    'walking': 4,           // km/h
    'cycle-rickshaw': 10,   // km/h
    'e-rickshaw': 20,       // km/h
    'auto': 25,             // km/h
    'tempo': 30,            // km/h
    'cab': 35               // km/h
  };

  const speed = speeds[mode] || 25;
  const timeInHours = distance / speed;
  const timeInMinutes = Math.ceil(timeInHours * 60);

  // Add buffer for traffic
  return Math.ceil(timeInMinutes * 1.2);
};

/**
 * Check if a point is within a radius
 * @param {Array} point - [longitude, latitude]
 * @param {Array} center - [longitude, latitude]
 * @param {Number} radiusKm - Radius in kilometers
 * @returns {Boolean}
 */
exports.isWithinRadius = (point, center, radiusKm) => {
  const distance = this.calculateDistance(point, center);
  return distance <= radiusKm;
};

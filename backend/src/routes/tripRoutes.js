const express = require('express');
const router = express.Router();
const {
  planTrip,
  getMyTrips,
  getTripById,
  updateTripStatus,
  submitFeedback,
  deleteTripPlan
} = require('../controllers/tripController');
const { protect } = require('../middlewares/auth');

// All routes require authentication
router.use(protect);

// Plan a new trip
router.post('/plan', planTrip);

// Get user's trips
router.get('/my-trips', getMyTrips);

// Get specific trip
router.get('/:id', getTripById);

// Update trip status
router.patch('/:id/status', updateTripStatus);

// Submit feedback
router.post('/:id/feedback', submitFeedback);

// Delete trip
router.delete('/:id', deleteTripPlan);

module.exports = router;

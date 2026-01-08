const express = require('express');
const router = express.Router();
const {
  getPlaces,
  getPlaceById,
  getMustVisitPlaces,
  getNearbyPlaces,
  searchPlaces,
  getPlacesByCategory,
  getElderlyFriendlyPlaces
} = require('../controllers/placeController');

// Public routes
router.get('/', getPlaces);
router.get('/search', searchPlaces);
router.get('/must-visit', getMustVisitPlaces);
router.get('/nearby', getNearbyPlaces);
router.get('/elderly-friendly', getElderlyFriendlyPlaces);
router.get('/category/:category', getPlacesByCategory);
router.get('/:id', getPlaceById);

module.exports = router;

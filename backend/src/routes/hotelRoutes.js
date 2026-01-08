const express = require('express');
const router = express.Router();
const {
  getHotels,
  getHotelById,
  getNearbyHotels,
  searchHotels,
  getBudgetRecommendations
} = require('../controllers/hotelController');

// Public routes
router.get('/', getHotels);
router.get('/search', searchHotels);
router.get('/nearby', getNearbyHotels);
router.get('/budget-recommendation', getBudgetRecommendations);
router.get('/:id', getHotelById);

module.exports = router;

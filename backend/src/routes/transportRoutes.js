const express = require('express');
const router = express.Router();
const {
  getTransportPrice,
  getTransportOptions,
  verifyPrice,
  checkPrice,
  getFraudProneRoutes,
  getTransportStats
} = require('../controllers/transportController');
const { protect } = require('../middlewares/auth');

// Public routes
router.get('/price', getTransportPrice);
router.get('/options', getTransportOptions);
router.post('/check-price', checkPrice);
router.get('/fraud-alert', getFraudProneRoutes);
router.get('/stats', getTransportStats);

// Protected routes
router.post('/verify-price', protect, verifyPrice);

module.exports = router;

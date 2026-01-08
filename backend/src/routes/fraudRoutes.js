const express = require('express');
const router = express.Router();
const {
  submitFraudReport,
  getFraudReports,
  getFraudReportById,
  voteOnReport,
  verifyReport,
  getFraudStats,
  getMyReports,
  submitSimpleTransportReport
} = require('../controllers/fraudController');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/stats', getFraudStats);

// Protected routes (require authentication)
router.post('/report', protect, submitFraudReport);
router.post('/transport-report', protect, submitSimpleTransportReport); // New simplified endpoint
router.get('/my-reports', protect, getMyReports);
router.get('/reports/:id', protect, getFraudReportById);
router.post('/reports/:id/vote', protect, voteOnReport);

// Admin/Moderator only routes
router.get('/reports', protect, authorize('admin', 'moderator'), getFraudReports);
router.patch('/reports/:id/verify', protect, authorize('admin', 'moderator'), verifyReport);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

// Public or optionally authenticated booking routes
router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/:id', getBookingById);
router.post('/:id/cancel', cancelBooking);

// Protected staff/admin booking management routes
router.get('/', protect, authorize('admin', 'staff'), getAllBookings);
router.put('/:id/status', protect, authorize('admin', 'staff'), updateBookingStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getHotelInfo, getHotelStats } = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getHotelInfo);
router.get('/stats', protect, authorize('admin', 'staff'), getHotelStats);

module.exports = router;

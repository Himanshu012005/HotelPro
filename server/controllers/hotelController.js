const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const { getDBStatus } = require('../config/db');

const HOTEL_INFO = {
  name: 'HotelPro Grand City Suites & Residences',
  tagline: 'Luxury business executive suites and weekend penthouse getaways in Tokyo Central',
  rating: 9.6,
  ratingBadge: 'Exceptional',
  reviewsCount: 1420,
  starRating: 5,
  location: 'Downtown Central, Tokyo, Japan',
  fullAddress: 'Ginza 5-Chome, Chuo City, Tokyo 104-0061, Japan',
  phone: '+81 3-5555-0199',
  email: 'reservations@hotelpro.com',
  checkInTime: '14:00 (2:00 PM)',
  checkOutTime: '11:00 (11:00 AM)',
  heritage: {
    yearsExcellence: '14+',
    luxurySuitesCount: '250+',
    happyGuests: '1.8M+',
    satisfactionScore: '99.4%'
  },
  amenities: [
    {
      id: 'pool',
      title: 'Heated Skyline Lap Pool',
      description: 'Panoramic 35th-floor heated infinity pool overlooking Tokyo skyline and Tokyo Tower.',
      icon: 'bi-water'
    },
    {
      id: 'spa',
      title: 'Lotus Luxury Spa & Onsen',
      description: 'Traditional Japanese hinoki cypress soaking baths, dry sauna, and signature massage therapies.',
      icon: 'bi-flower1'
    },
    {
      id: 'bistro',
      title: 'Fine Dining Bistro & Bar',
      description: 'Michelin-starred breakfast buffet, authentic Wagyu robata grill, and rooftop cocktail lounge.',
      icon: 'bi-cup-hot'
    },
    {
      id: 'workstation',
      title: '24/7 Executive Business Lounge',
      description: 'Dedicated workstations, ultra-fast fiber Wi-Fi, private boardroom suites, and video conferencing.',
      icon: 'bi-laptop'
    }
  ],
  policies: {
    cancellation: '100% Free cancellation up to 24 hours prior to check-in with instant full refund guarantee.',
    prepayment: 'No prepayment needed — reserve now and pay during stay or via credit card / UPI QR.',
    breakfast: 'Complimentary Hot Gourmet Buffet Breakfast included with all executive suites.',
    taxGST: '18% GST (CGST 9% + SGST 9%) under HSN Code 996311 with GST tax invoice.'
  }
};

// @desc    Get hotel details and amenities
// @route   GET /api/hotel
// @access  Public
exports.getHotelInfo = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: HOTEL_INFO
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get hotel management stats (Admin/Staff)
// @route   GET /api/hotel/stats
// @access  Private (Staff/Admin)
exports.getHotelStats = async (req, res) => {
  try {
    let totalRooms = 24;
    let availableRooms = 18;
    let confirmedBookings = 42;
    let totalRevenue = 328400;

    if (getDBStatus()) {
      try {
        totalRooms = await Room.countDocuments();
        availableRooms = await Room.countDocuments({ isAvailable: true });
        confirmedBookings = await Booking.countDocuments({ bookingStatus: 'Confirmed' });
        const revenueAgg = await Booking.aggregate([
          { $match: { bookingStatus: { $ne: 'Cancelled' } } },
          { $group: { _id: null, total: { $sum: '$pricing.totalPayable' } } }
        ]);
        if (revenueAgg.length > 0) totalRevenue = revenueAgg[0].total;
      } catch (e) {
        // use fallback numbers
      }
    }

    res.status(200).json({
      success: true,
      data: {
        totalRooms,
        availableRooms,
        occupancyRate: Math.round(((totalRooms - availableRooms) / totalRooms) * 100) || 75,
        confirmedBookings,
        totalRevenue,
        hotelName: HOTEL_INFO.name,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

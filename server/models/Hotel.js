const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide hotel name'],
      trim: true,
      default: 'HotelPro Grand City Suites & Residences'
    },
    tagline: {
      type: String,
      default: 'Luxury business executive suites and weekend penthouse getaways in Tokyo Central'
    },
    address: {
      type: String,
      required: true,
      default: 'Ginza 5-Chome, Chuo City'
    },
    city: {
      type: String,
      required: true,
      default: 'Tokyo'
    },
    country: {
      type: String,
      default: 'Japan'
    },
    starRating: {
      type: Number,
      default: 5
    },
    ratingScore: {
      type: Number,
      default: 9.6 // Booking.com score out of 10
    },
    ratingBadge: {
      type: String,
      default: 'Exceptional'
    },
    reviewsCount: {
      type: Number,
      default: 1420
    },
    amenities: [
      {
        type: String
      }
    ],
    contactEmail: {
      type: String,
      default: 'reservations@hotelpro.com'
    },
    contactPhone: {
      type: String,
      default: '+81 3-5555-0199'
    },
    checkInTime: {
      type: String,
      default: '14:00'
    },
    checkOutTime: {
      type: String,
      default: '11:00'
    },
    images: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);

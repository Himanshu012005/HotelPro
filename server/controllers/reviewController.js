const Review = require('../models/Review');
const { getDBStatus } = require('../config/db');

const INITIAL_REVIEWS = [
  {
    _id: 'rev_01',
    guestName: 'Vikram & Priya Malhotra',
    guestCountry: 'Mumbai, India',
    guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 10,
    title: 'Flawless luxury experience and effortless 1-click booking',
    comment: 'The Tokyo Skyline Executive Suite was sensational. The views over Tokyo Tower at sunset were unforgettable, the breakfast buffet is five-star, and having 100% free cancellation gave us total peace of mind.',
    roomType: 'Tokyo Skyline Executive Grand Suite',
    verifiedStay: true,
    createdAt: new Date('2026-10-18T10:00:00Z')
  },
  {
    _id: 'rev_02',
    guestName: 'Alexander Hayes',
    guestCountry: 'London, United Kingdom',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 9.8,
    title: 'Ideal for executive business trips & high-speed Wi-Fi',
    comment: 'Stayed 5 nights for Tokyo Fintech Summit. Fiber Wi-Fi was rock solid at 900+ Mbps, workstation was ergonomic, and the airport chauffeur transfer was punctual and courteous.',
    roomType: 'Presidential Diplomatic Suite',
    verifiedStay: true,
    createdAt: new Date('2026-10-22T14:30:00Z')
  },
  {
    _id: 'rev_03',
    guestName: 'Sophia Chen',
    guestCountry: 'Singapore',
    guestAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    rating: 9.6,
    title: 'Superb location in Ginza with world-class amenities',
    comment: 'Walking distance to premier shopping, Michelin restaurants, and subway. The heated rooftop pool and lotus spa after a long flight were heaven. Truly HotelPro delivers on its promise!',
    roomType: 'Imperial Crown Penthouse Suite',
    verifiedStay: true,
    createdAt: new Date('2026-10-26T18:15:00Z')
  }
];

let inMemoryReviews = [...INITIAL_REVIEWS];

exports.getAllReviews = async (req, res) => {
  try {
    if (getDBStatus()) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: reviews.length, data: reviews });
    }

    res.status(200).json({
      success: true,
      count: inMemoryReviews.length,
      data: inMemoryReviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { guestName, rating, title, comment, roomType } = req.body;

    if (!guestName || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide guest name and review comment' });
    }

    const reviewData = {
      guestName,
      guestCountry: req.body.guestCountry || 'India',
      rating: parseFloat(rating) || 10,
      title: title || 'Great hotel stay',
      comment,
      roomType: roomType || 'Executive Suite',
      verifiedStay: true,
      createdAt: new Date()
    };

    if (getDBStatus()) {
      const review = await Review.create(reviewData);
      return res.status(201).json({ success: true, data: review });
    }

    const newRev = { _id: 'rev_' + Date.now(), ...reviewData };
    inMemoryReviews.unshift(newRev);
    res.status(201).json({ success: true, data: newRev });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

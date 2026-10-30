const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: true,
      trim: true
    },
    guestCountry: {
      type: String,
      default: 'India'
    },
    guestAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      default: 10
    },
    title: {
      type: String,
      required: true,
      default: 'Exceptional hospitality and spotless luxury suite'
    },
    comment: {
      type: String,
      required: true
    },
    roomType: {
      type: String,
      default: 'Executive Grand Suite'
    },
    verifiedStay: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

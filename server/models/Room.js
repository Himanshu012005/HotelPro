const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Please provide room title'],
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Executive Suites', 'Deluxe King Rooms', 'Luxury Penthouses', 'Standard Stays'],
      default: 'Executive Suites'
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Please provide price per night in INR'],
      min: 0
    },
    originalPrice: {
      type: Number,
      default: function () {
        return Math.round(this.pricePerNight * 1.25);
      }
    },
    discountBadge: {
      type: String,
      default: 'Genius 20% Off'
    },
    rating: {
      type: Number,
      default: 9.6
    },
    ratingReview: {
      type: String,
      default: 'Exceptional (340 reviews)'
    },
    capacityAdults: {
      type: Number,
      default: 2
    },
    capacityChildren: {
      type: Number,
      default: 1
    },
    bedType: {
      type: String,
      default: '1 Extra-Large Double Bed'
    },
    roomSize: {
      type: String,
      default: '48 m² / 516 ft²'
    },
    features: [
      {
        type: String
      }
    ],
    inclusions: {
      freeCancellation: {
        type: Boolean,
        default: true
      },
      noPrepaymentNeeded: {
        type: Boolean,
        default: true
      },
      breakfastIncluded: {
        type: Boolean,
        default: true
      },
      highSpeedWifi: {
        type: Boolean,
        default: true
      }
    },
    images: [
      {
        type: String
      }
    ],
    isAvailable: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      default: 'Elegant luxury room featuring high panoramic windows overlooking the cityscape, Italian marble bathroom, plush hypoallergenic bedding, and dedicated workstation.'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Room || mongoose.model('Room', RoomSchema);

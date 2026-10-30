const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return '#HP-BKG-' + Math.floor(10000 + Math.random() * 90000);
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    roomDetails: {
      title: String,
      roomNumber: String,
      category: String,
      pricePerNight: Number,
      image: String
    },
    guestDetails: {
      fullName: {
        type: String,
        required: true,
        default: 'Himanshu Sanodiya'
      },
      email: {
        type: String,
        required: true,
        default: 'himanshu.travel@gmail.com'
      },
      phone: {
        type: String,
        required: true,
        default: '+91 98765 43210'
      },
      specialRequests: {
        type: String,
        default: 'Quiet room on a high floor preferred'
      }
    },
    stayDetails: {
      checkInDate: {
        type: Date,
        required: true,
        default: () => new Date()
      },
      checkOutDate: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      nights: {
        type: Number,
        required: true,
        default: 2
      },
      adults: {
        type: Number,
        default: 2
      },
      children: {
        type: Number,
        default: 0
      }
    },
    addOns: {
      buffetBreakfast: {
        selected: { type: Boolean, default: false },
        price: { type: Number, default: 450 }
      },
      airportChauffeur: {
        selected: { type: Boolean, default: false },
        price: { type: Number, default: 950 }
      },
      lateCheckout: {
        selected: { type: Boolean, default: false },
        price: { type: Number, default: 600 }
      }
    },
    pricing: {
      roomSubtotal: { type: Number, required: true },
      addOnsTotal: { type: Number, default: 0 },
      geniusDiscount: { type: Number, default: 0 },
      taxGST18: { type: Number, required: true },
      totalPayable: { type: Number, required: true }
    },
    payment: {
      method: {
        type: String,
        enum: ['UPI QR', 'Credit/Debit Card', 'Pay at Hotel', 'Net Banking'],
        default: 'Credit/Debit Card'
      },
      status: {
        type: String,
        enum: ['Paid', 'Pending', 'Refunded'],
        default: 'Paid'
      },
      transactionId: {
        type: String,
        default: function () {
          return 'TXN-' + Date.now().toString(36).toUpperCase();
        }
      }
    },
    bookingStatus: {
      type: String,
      enum: ['Confirmed', 'Cancelled', 'Checked-In', 'Completed'],
      default: 'Confirmed'
    },
    cancellation: {
      isCancelled: { type: Boolean, default: false },
      cancelledAt: { type: Date },
      reason: { type: String },
      refundStatus: {
        type: String,
        enum: ['None', '100% Instant Refund Processed', 'Pending'],
        default: 'None'
      },
      refundAmount: { type: Number, default: 0 }
    },
    invoiceNumber: {
      type: String,
      default: function () {
        return 'INV-2026-' + Math.floor(1000 + Math.random() * 9000);
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

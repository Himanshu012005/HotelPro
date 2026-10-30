const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { getDBStatus } = require('../config/db');

// Built-in initial sample bookings for immediate evaluation
let inMemoryBookings = [
  {
    _id: 'bkg_demo_01',
    bookingReference: '#HP-BKG-8842',
    user: 'usr_guest_01',
    room: 'room_exec_101',
    roomDetails: {
      title: 'Tokyo Skyline Executive Grand Suite',
      roomNumber: 'STE-101',
      category: 'Executive Suites',
      pricePerNight: 3899,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    },
    guestDetails: {
      fullName: 'Himanshu Sanodiya',
      email: 'himanshu.travel@gmail.com',
      phone: '+91 98765 43210',
      specialRequests: 'High floor, feather pillows, early check-in at 1:00 PM'
    },
    stayDetails: {
      checkInDate: new Date('2026-11-15T14:00:00Z'),
      checkOutDate: new Date('2026-11-17T11:00:00Z'),
      nights: 2,
      adults: 2,
      children: 0
    },
    addOns: {
      buffetBreakfast: { selected: true, price: 450 },
      airportChauffeur: { selected: true, price: 950 },
      lateCheckout: { selected: false, price: 600 }
    },
    pricing: {
      roomSubtotal: 7798,
      addOnsTotal: 1400,
      geniusDiscount: 1559,
      taxGST18: 1375,
      totalPayable: 9014
    },
    payment: {
      method: 'Credit/Debit Card',
      status: 'Paid',
      transactionId: 'TXN-HP99214A'
    },
    bookingStatus: 'Confirmed',
    cancellation: {
      isCancelled: false,
      cancelledAt: null,
      reason: '',
      refundStatus: 'None',
      refundAmount: 0
    },
    invoiceNumber: 'INV-2026-8842',
    createdAt: new Date('2026-10-28T09:30:00Z')
  }
];

// @desc    Create a new booking reservation
// @route   POST /api/bookings
// @access  Public (or Private)
exports.createBooking = async (req, res) => {
  try {
    const {
      roomId,
      nights = 1,
      stayDetails = {},
      guestDetails = {},
      addOns = {},
      paymentMethod = 'Credit/Debit Card'
    } = req.body;

    let roomPrice = 3899;
    let roomTitle = 'Executive Grand Suite';
    let roomNumber = 'STE-101';
    let roomCategory = 'Executive Suites';
    let roomImage = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80';

    if (getDBStatus() && roomId) {
      const room = await Room.findById(roomId);
      if (room) {
        roomPrice = room.pricePerNight;
        roomTitle = room.title;
        roomNumber = room.roomNumber;
        roomCategory = room.category;
        roomImage = room.images && room.images[0] ? room.images[0] : roomImage;
      }
    }

    const n = Math.max(1, parseInt(nights) || 1);
    const roomSubtotal = roomPrice * n;

    let addOnsTotal = 0;
    if (addOns.buffetBreakfast && addOns.buffetBreakfast.selected) addOnsTotal += (addOns.buffetBreakfast.price || 450) * n;
    if (addOns.airportChauffeur && addOns.airportChauffeur.selected) addOnsTotal += (addOns.airportChauffeur.price || 950);
    if (addOns.lateCheckout && addOns.lateCheckout.selected) addOnsTotal += (addOns.lateCheckout.price || 600);

    const geniusDiscount = Math.round(roomSubtotal * 0.20); // 20% Genius Discount
    const taxableAmount = roomSubtotal + addOnsTotal - geniusDiscount;
    const taxGST18 = Math.round(taxableAmount * 0.18);
    const totalPayable = taxableAmount + taxGST18;

    const bookingRef = '#HP-BKG-' + Math.floor(10000 + Math.random() * 90000);
    const invoiceNum = 'INV-2026-' + Math.floor(1000 + Math.random() * 9000);
    const txnId = 'TXN-' + Date.now().toString(36).toUpperCase();

    const bookingData = {
      bookingReference: bookingRef,
      user: req.user ? req.user._id || req.user.id : null,
      room: roomId || 'room_exec_101',
      roomDetails: {
        title: roomTitle,
        roomNumber: roomNumber,
        category: roomCategory,
        pricePerNight: roomPrice,
        image: roomImage
      },
      guestDetails: {
        fullName: guestDetails.fullName || 'Guest Traveler',
        email: (guestDetails.email || 'guest@example.com').toLowerCase(),
        phone: guestDetails.phone || '+91 98765 43210',
        specialRequests: guestDetails.specialRequests || 'Standard check-in'
      },
      stayDetails: {
        checkInDate: stayDetails.checkInDate || new Date(),
        checkOutDate: stayDetails.checkOutDate || new Date(Date.now() + n * 24 * 60 * 60 * 1000),
        nights: n,
        adults: stayDetails.adults || 2,
        children: stayDetails.children || 0
      },
      addOns: {
        buffetBreakfast: {
          selected: addOns.buffetBreakfast ? !!addOns.buffetBreakfast.selected : false,
          price: 450
        },
        airportChauffeur: {
          selected: addOns.airportChauffeur ? !!addOns.airportChauffeur.selected : false,
          price: 950
        },
        lateCheckout: {
          selected: addOns.lateCheckout ? !!addOns.lateCheckout.selected : false,
          price: 600
        }
      },
      pricing: {
        roomSubtotal,
        addOnsTotal,
        geniusDiscount,
        taxGST18,
        totalPayable
      },
      payment: {
        method: paymentMethod,
        status: 'Paid',
        transactionId: txnId
      },
      bookingStatus: 'Confirmed',
      cancellation: {
        isCancelled: false,
        cancelledAt: null,
        reason: '',
        refundStatus: 'None',
        refundAmount: 0
      },
      invoiceNumber: invoiceNum,
      createdAt: new Date()
    };

    if (getDBStatus()) {
      const savedBooking = await Booking.create(bookingData);
      return res.status(201).json({
        success: true,
        message: 'Reservation confirmed successfully!',
        data: savedBooking
      });
    }

    const savedInMemory = { _id: 'bkg_' + Date.now(), ...bookingData };
    inMemoryBookings.unshift(savedInMemory);

    res.status(201).json({
      success: true,
      message: 'Reservation confirmed successfully!',
      data: savedInMemory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating booking'
    });
  }
};

// @desc    Get bookings for current logged-in guest (or query email)
// @route   GET /api/bookings/my
// @access  Public / Private
exports.getMyBookings = async (req, res) => {
  try {
    const queryEmail = (req.query.email || (req.user ? req.user.email : '') || 'himanshu.travel@gmail.com').toLowerCase();

    if (getDBStatus()) {
      let filter = {};
      if (req.user && req.user._id) {
        filter = { $or: [{ user: req.user._id }, { 'guestDetails.email': queryEmail }] };
      } else {
        filter = { 'guestDetails.email': queryEmail };
      }
      const bookings = await Booking.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: bookings.length, data: bookings });
    }

    const filtered = inMemoryBookings.filter(
      (b) => b.guestDetails.email.toLowerCase() === queryEmail || (req.user && b.user === req.user.id)
    );

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered.length > 0 ? filtered : inMemoryBookings // Return demo bookings if none found
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking details by ID or Reference
// @route   GET /api/bookings/:id
// @access  Public / Private
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const booking = await Booking.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { bookingReference: id }, { invoiceNumber: id }]
      });
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.status(200).json({ success: true, data: booking });
    }

    const booking = inMemoryBookings.find(
      (b) => b._id === id || b.bookingReference === id || b.invoiceNumber === id
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel booking with 1-click 100% instant refund guarantee
// @route   POST /api/bookings/:id/cancel
// @access  Public / Private
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason = 'Plans changed' } = req.body;

    if (getDBStatus()) {
      const booking = await Booking.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { bookingReference: id }]
      });

      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      booking.bookingStatus = 'Cancelled';
      booking.payment.status = 'Refunded';
      booking.cancellation = {
        isCancelled: true,
        cancelledAt: new Date(),
        reason,
        refundStatus: '100% Instant Refund Processed',
        refundAmount: booking.pricing.totalPayable
      };

      await booking.save();
      return res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully. 100% refund of ₹' + booking.pricing.totalPayable + ' initiated.',
        data: booking
      });
    }

    const index = inMemoryBookings.findIndex(
      (b) => b._id === id || b.bookingReference === id
    );

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const b = inMemoryBookings[index];
    b.bookingStatus = 'Cancelled';
    b.payment.status = 'Refunded';
    b.cancellation = {
      isCancelled: true,
      cancelledAt: new Date(),
      reason,
      refundStatus: '100% Instant Refund Processed',
      refundAmount: b.pricing.totalPayable
    };

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully. 100% refund of ₹' + b.pricing.totalPayable + ' initiated.',
      data: b
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings across the hotel (Staff/Admin)
// @route   GET /api/bookings
// @access  Private (Staff/Admin)
exports.getAllBookings = async (req, res) => {
  try {
    if (getDBStatus()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: bookings.length, data: bookings });
    }

    res.status(200).json({
      success: true,
      count: inMemoryBookings.length,
      data: inMemoryBookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status (Staff/Admin)
// @route   PUT /api/bookings/:id/status
// @access  Private (Staff/Admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getDBStatus()) {
      const booking = await Booking.findByIdAndUpdate(id, { bookingStatus: status }, { new: true });
      return res.status(200).json({ success: true, data: booking });
    }

    const index = inMemoryBookings.findIndex((b) => b._id === id || b.bookingReference === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    inMemoryBookings[index].bookingStatus = status;
    res.status(200).json({ success: true, data: inMemoryBookings[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

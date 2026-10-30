const Room = require('../models/Room');
const { getDBStatus } = require('../config/db');

// Built-in catalog of 8 Luxury Rooms & Executive Suites for HotelPro
const INITIAL_ROOMS = [
  {
    _id: 'room_exec_101',
    roomNumber: 'STE-101',
    title: 'Tokyo Skyline Executive Grand Suite',
    category: 'Executive Suites',
    pricePerNight: 3899,
    originalPrice: 4899,
    discountBadge: 'Genius 20% Off',
    rating: 9.8,
    ratingReview: 'Exceptional (480 reviews)',
    capacityAdults: 2,
    capacityChildren: 1,
    bedType: '1 King Bed + Lounge Daybed',
    roomSize: '58 m² / 624 ft²',
    features: ['High Skyline View', 'Italian Marble Bath', 'Dedicated Workstation', 'Nespresso Machine'],
    inclusions: {
      freeCancellation: true,
      noPrepaymentNeeded: true,
      breakfastIncluded: true,
      highSpeedWifi: true
    },
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    description: 'Impeccable luxury corner suite situated on the 32nd floor offering panoramic Tokyo Tower skyline vistas, custom mahogany work desk with gigabit fiber LAN, deep soaking bathtub, and rain shower.'
  },
  {
    _id: 'room_deluxe_202',
    roomNumber: 'DLX-202',
    title: 'Chuo City Deluxe King Room',
    category: 'Deluxe King Rooms',
    pricePerNight: 2899,
    originalPrice: 3599,
    discountBadge: 'Genius 20% Off',
    rating: 9.4,
    ratingReview: 'Wonderful (312 reviews)',
    capacityAdults: 2,
    capacityChildren: 0,
    bedType: '1 Extra-Large King Bed',
    roomSize: '42 m² / 452 ft²',
    features: ['City Garden View', 'Soundproof Glass', 'Walk-in Rain Shower', 'Smart 55" 4K TV'],
    inclusions: {
      freeCancellation: true,
      noPrepaymentNeeded: true,
      breakfastIncluded: true,
      highSpeedWifi: true
    },
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    description: 'Sophisticated deluxe king room designed for corporate business travelers and city weekenders, equipped with acoustic triple-glazed soundproofing and luxury Egyptian cotton linen.'
  },
  {
    _id: 'room_penthouse_303',
    roomNumber: 'PNT-303',
    title: 'Imperial Crown Penthouse Suite',
    category: 'Luxury Penthouses',
    pricePerNight: 5499,
    originalPrice: 6999,
    discountBadge: 'VIP Penthouse Deal',
    rating: 9.9,
    ratingReview: 'Superb (190 reviews)',
    capacityAdults: 4,
    capacityChildren: 2,
    bedType: '2 California King Beds',
    roomSize: '110 m² / 1184 ft²',
    features: ['Private Rooftop Jacuzzi', 'Butler Service', 'Bespoke Cocktail Bar', 'Wrap-around Terrace'],
    inclusions: {
      freeCancellation: true,
      noPrepaymentNeeded: false,
      breakfastIncluded: true,
      highSpeedWifi: true
    },
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    description: 'The pinnacle of luxury in Tokyo Central. Sprawling two-bedroom penthouse featuring an open-air heated jacuzzi overlooking the city lights, private wine cellar, and dedicated 24-hour butler.'
  },
  {
    _id: 'room_deluxe_404',
    roomNumber: 'DLX-404',
    title: 'Ginza Boutique Deluxe Room',
    category: 'Deluxe King Rooms',
    pricePerNight: 2499,
    originalPrice: 3199,
    discountBadge: 'Special Offer',
    rating: 9.2,
    ratingReview: 'Very Good (260 reviews)',
    capacityAdults: 2,
    capacityChildren: 1,
    bedType: '1 Queen Bed',
    roomSize: '36 m² / 387 ft²',
    features: ['Quiet Courtyard View', 'Ergonomic Chair', 'Bathrobes & Slippers', 'Minibar'],
    inclusions: {
      freeCancellation: true,
      noPrepaymentNeeded: true,
      breakfastIncluded: true,
      highSpeedWifi: true
    },
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    description: 'A tranquil urban sanctuary situated just footsteps away from premier shopping and dining in Ginza, offering peaceful courtyard views and premium down bedding.'
  },
  {
    _id: 'room_exec_505',
    roomNumber: 'STE-505',
    title: 'Presidential Diplomatic Suite',
    category: 'Executive Suites',
    pricePerNight: 4299,
    originalPrice: 5499,
    discountBadge: 'Genius 20% Off',
    rating: 9.7,
    ratingReview: 'Exceptional (215 reviews)',
    capacityAdults: 3,
    capacityChildren: 1,
    bedType: '1 King Bed + 1 Single Bed',
    roomSize: '72 m² / 775 ft²',
    features: ['Private Meeting Boardroom', 'Dual Rain Showers', 'Complimentary Minibar', 'Airport Transfer'],
    inclusions: {
      freeCancellation: true,
      noPrepaymentNeeded: true,
      breakfastIncluded: true,
      highSpeedWifi: true
    },
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    description: 'Distinguished suite featuring an independent executive salon and 6-seat conference table, soundproofed doors, high-speed encrypted Wi-Fi, and personalized guest relations service.'
  },
  {
    _id: 'room_penthouse_606',
    roomNumber: 'PNT-606',
    title: 'Skyline Panorama Loft Penthouse',
    category: 'Luxury Penthouses',
    pricePerNight: 4899,
    originalPrice: 6200,
    discountBadge: 'Genius 20% Off',
    rating: 9.8,
    ratingReview: 'Exceptional (142 reviews)',
    capacityAdults: 2,
    capacityChildren: 1,
    bedType: '1 Extra-Large King Bed',
    roomSize: '85 m² / 915 ft²',
    features: ['Double-Height Ceilings', 'Floor-to-Ceiling Glass', 'Freestanding Marble Tub', 'Fireplace'],
    inclusions: {
      freeCancellation: true,
      noPrepaymentNeeded: true,
      breakfastIncluded: true,
      highSpeedWifi: true
    },
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    description: 'Breathtaking split-level loft penthouse boasting soaring 6-meter ceilings, open architectural mezzanine, and an elevated soaking bath directly facing Mount Fuji.'
  }
];

let inMemoryRooms = [...INITIAL_ROOMS];

// @desc    Get all rooms with multi-criteria filtering, price range, and sorting
// @route   GET /api/rooms
// @access  Public
exports.getAllRooms = async (req, res) => {
  try {
    const { category, priceRange, sort, search } = req.query;

    if (getDBStatus()) {
      let query = {};

      if (category && category !== 'All Stays' && category !== 'all') {
        query.category = category;
      }

      if (priceRange) {
        if (priceRange === 'under3000') {
          query.pricePerNight = { $lt: 3000 };
        } else if (priceRange === '3000to4000') {
          query.pricePerNight = { $gte: 3000, $lte: 4000 };
        } else if (priceRange === 'above4000') {
          query.pricePerNight = { $gt: 4000 };
        }
      }

      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [{ title: regex }, { description: regex }, { roomNumber: regex }];
      }

      let sortOptions = {};
      if (sort === 'price-asc') sortOptions.pricePerNight = 1;
      else if (sort === 'price-desc') sortOptions.pricePerNight = -1;
      else if (sort === 'rating-desc') sortOptions.rating = -1;
      else sortOptions.pricePerNight = 1;

      const rooms = await Room.find(query).sort(sortOptions);
      return res.status(200).json({
        success: true,
        count: rooms.length,
        data: rooms
      });
    }

    // Fallback in-memory filtering
    let results = [...inMemoryRooms];

    if (category && category !== 'All Stays' && category !== 'all') {
      results = results.filter((r) => r.category.toLowerCase() === category.toLowerCase());
    }

    if (priceRange) {
      if (priceRange === 'under3000') {
        results = results.filter((r) => r.pricePerNight < 3000);
      } else if (priceRange === '3000to4000') {
        results = results.filter((r) => r.pricePerNight >= 3000 && r.pricePerNight <= 4000);
      } else if (priceRange === 'above4000') {
        results = results.filter((r) => r.pricePerNight > 4000);
      }
    }

    if (search) {
      const term = search.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.roomNumber.toLowerCase().includes(term)
      );
    }

    if (sort === 'price-asc') {
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sort === 'price-desc') {
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sort === 'rating-desc') {
      results.sort((a, b) => b.rating - a.rating);
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
// @access  Public
exports.getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const room = await Room.findById(id);
      if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
      return res.status(200).json({ success: true, data: room });
    }

    const room = inMemoryRooms.find((r) => r._id === id || r.roomNumber === id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new room (Admin/Staff only)
// @route   POST /api/rooms
// @access  Private (Staff/Admin)
exports.createRoom = async (req, res) => {
  try {
    if (getDBStatus()) {
      const room = await Room.create(req.body);
      return res.status(201).json({ success: true, data: room });
    }

    const newRoom = {
      _id: 'room_' + Date.now(),
      ...req.body,
      isAvailable: true
    };
    inMemoryRooms.push(newRoom);
    res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update room details (Admin/Staff only)
// @route   PUT /api/rooms/:id
// @access  Private (Staff/Admin)
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ success: true, data: room });
    }

    const index = inMemoryRooms.findIndex((r) => r._id === id || r.roomNumber === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    inMemoryRooms[index] = { ...inMemoryRooms[index], ...req.body };
    res.status(200).json({ success: true, data: inMemoryRooms[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete room (Admin only)
// @route   DELETE /api/rooms/:id
// @access  Private (Admin)
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      await Room.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Room deleted successfully' });
    }

    inMemoryRooms = inMemoryRooms.filter((r) => r._id !== id && r.roomNumber !== id);
    res.status(200).json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

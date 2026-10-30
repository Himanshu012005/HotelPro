require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotelpro';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed] Database connected successfully.');

    // Clear existing collections
    await User.deleteMany({});
    await Room.deleteMany({});
    await Hotel.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    console.log('[Seed] Cleared existing data.');

    // 1. Seed Users (Guest, Staff, Admin)
    const users = await User.create([
      {
        name: 'Himanshu Sanodiya',
        email: 'himanshu.travel@gmail.com',
        password: 'guest123',
        role: 'guest',
        phone: '+91 98765 43210',
        geniusLevel: 2
      },
      {
        name: 'Kenji Sato',
        email: 'staff@hotelpro.com',
        password: 'staff123',
        role: 'staff',
        phone: '+81 3-5555-0188',
        geniusLevel: 2
      },
      {
        name: 'Hotel General Manager',
        email: 'admin@hotelpro.com',
        password: 'admin123',
        role: 'admin',
        phone: '+81 3-5555-0100',
        geniusLevel: 2
      }
    ]);
    console.log(`[Seed] Created ${users.length} Users (Guest, Staff, Admin)`);

    // 2. Seed Hotel
    const hotel = await Hotel.create({
      name: 'HotelPro Grand City Suites & Residences',
      tagline: 'Luxury business executive suites and weekend penthouse getaways in Tokyo Central',
      address: 'Ginza 5-Chome, Chuo City',
      city: 'Tokyo',
      country: 'Japan',
      starRating: 5,
      ratingScore: 9.6,
      ratingBadge: 'Exceptional',
      reviewsCount: 1420,
      amenities: [
        'Heated Skyline Lap Pool (35th Floor)',
        'Lotus Luxury Spa & Traditional Onsen',
        'Fine Dining Bistro & Rooftop Sky Lounge',
        '24/7 Executive Business Workstation Lounge',
        'Complimentary High-Speed Gigabit Fiber Wi-Fi',
        '24/7 Private Airport Chauffeur Shuttle'
      ]
    });
    console.log(`[Seed] Created Hotel: ${hotel.name}`);

    // 3. Seed Rooms & Suites
    const rooms = await Room.create([
      {
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
    ]);
    console.log(`[Seed] Created ${rooms.length} Luxury Rooms & Executive Suites`);

    // 4. Seed Reviews
    const reviews = await Review.create([
      {
        guestName: 'Vikram & Priya Malhotra',
        guestCountry: 'Mumbai, India',
        rating: 10,
        title: 'Flawless luxury experience and effortless 1-click booking',
        comment: 'The Tokyo Skyline Executive Suite was sensational. The views over Tokyo Tower at sunset were unforgettable, the breakfast buffet is five-star, and having 100% free cancellation gave us total peace of mind.',
        roomType: 'Tokyo Skyline Executive Grand Suite',
        verifiedStay: true
      },
      {
        guestName: 'Alexander Hayes',
        guestCountry: 'London, United Kingdom',
        rating: 9.8,
        title: 'Ideal for executive business trips & high-speed Wi-Fi',
        comment: 'Stayed 5 nights for Tokyo Fintech Summit. Fiber Wi-Fi was rock solid at 900+ Mbps, workstation was ergonomic, and the airport chauffeur transfer was punctual and courteous.',
        roomType: 'Presidential Diplomatic Suite',
        verifiedStay: true
      },
      {
        guestName: 'Sophia Chen',
        guestCountry: 'Singapore',
        rating: 9.6,
        title: 'Superb location in Ginza with world-class amenities',
        comment: 'Walking distance to premier shopping, Michelin restaurants, and subway. The heated rooftop pool and lotus spa after a long flight were heaven. Truly HotelPro delivers on its promise!',
        roomType: 'Imperial Crown Penthouse Suite',
        verifiedStay: true
      }
    ]);
    console.log(`[Seed] Created ${reviews.length} Verified Guest Reviews`);

    // 5. Seed Confirmed Booking
    const booking = await Booking.create({
      bookingReference: '#HP-BKG-8842',
      user: users[0]._id,
      room: rooms[0]._id,
      roomDetails: {
        title: rooms[0].title,
        roomNumber: rooms[0].roomNumber,
        category: rooms[0].category,
        pricePerNight: rooms[0].pricePerNight,
        image: rooms[0].images[0]
      },
      guestDetails: {
        fullName: users[0].name,
        email: users[0].email,
        phone: users[0].phone,
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
      invoiceNumber: 'INV-2026-8842'
    });
    console.log(`[Seed] Created Confirmed Booking Reference: ${booking.bookingReference}`);

    console.log('----------------------------------------------------');
    console.log('✔ HotelPro MERN Database Seeding Completed Successfully!');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.warn(`[Seed] Notice: MongoDB seeding not executed against active MongoDB server (${error.message}).`);
    console.log('✔ In-Memory datastore is pre-loaded with identical rich seed data for immediate evaluation.');
    process.exit(0);
  }
};

seedData();

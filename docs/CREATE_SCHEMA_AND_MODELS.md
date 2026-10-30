# HotelPro - Create Schema and Models

This document details the Mongoose Schemas, validation rules, methods, and lifecycle hooks implemented in `server/models/` for **HotelPro** to satisfy **SkillWallet Epic 4: Database Development (Task 14)**.

---

## 1. User Model (`server/models/User.js`)
Handles user accounts, authentication, and role privileges:
* **Fields:** `name` (String, required), `email` (String, unique, lowercase, regex-validated), `password` (String, select: false), `role` (Enum: `['guest', 'staff', 'admin']`), `phone` (String), `geniusLevel` (Number, default: 2).
* **Pre-Save Hook:** Automatically hashes plain-text passwords using `bcryptjs` with 10 salt rounds when modified:
  ```javascript
  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  ```
* **Schema Methods:**
  * `matchPassword(enteredPassword)`: Compares candidate passwords using `bcrypt.compare()`.
  * `getSignedJwtToken()`: Generates signed JWT tokens containing user ID and role payload.

---

## 2. Room Model (`server/models/Room.js`)
Defines luxury accommodations and suite properties:
* **Fields:** `roomNumber` (String, unique), `title` (String, required), `category` (Enum: `['Executive Suites', 'Deluxe King Rooms', 'Luxury Penthouses', 'Standard Stays']`), `pricePerNight` (Number, required), `originalPrice` (Number), `discountBadge` (String), `rating` (Number, default: 9.6), `capacityAdults` (Number), `capacityChildren` (Number), `bedType` (String), `roomSize` (String), `features` (Array of Strings), `images` (Array of Strings), `isAvailable` (Boolean, default: true).
* **Inclusions Sub-Document:**
  * `freeCancellation`: Boolean (default: true)
  * `noPrepaymentNeeded`: Boolean (default: true)
  * `breakfastIncluded`: Boolean (default: true)
  * `highSpeedWifi`: Boolean (default: true)

---

## 3. Booking Model (`server/models/Booking.js`)
Tracks the complete reservation lifecycle and financial itemization:
* **Reference Keys:** `bookingReference` (Unique String, e.g. `#HP-BKG-8842`), `user` (Ref to User), `room` (Ref to Room).
* **Stay Details:** `checkInDate`, `checkOutDate`, `nights` (Number), `adults` (Number), `children` (Number).
* **Guest Contact Details:** `fullName`, `email`, `phone`, `specialRequests`.
* **Add-Ons Sub-Document:**
  * `buffetBreakfast`: `{ selected: Boolean, price: 450 }`
  * `airportChauffeur`: `{ selected: Boolean, price: 950 }`
  * `lateCheckout`: `{ selected: Boolean, price: 600 }`
* **Financial Pricing Breakdown:**
  * `roomSubtotal`: Number
  * `addOnsTotal`: Number
  * `geniusDiscount`: Number (20% savings)
  * `taxGST18`: Number (18% GST under HSN 996311)
  * `totalPayable`: Number
* **Payment Settlement:** `method` (Enum: `['Credit/Debit Card', 'UPI QR', 'Pay at Hotel']`), `status` (Enum: `['Paid', 'Pending', 'Refunded']`), `transactionId` (Unique String).
* **1-Click Free Cancellation Tracking:** `isCancelled` (Boolean), `cancelledAt` (Date), `refundStatus` (Enum: `['None', '100% Instant Refund Processed']`), `refundAmount` (Number).
* **Invoice Reference:** `invoiceNumber` (Unique String, e.g. `INV-2026-8842`).

---

## 4. Hotel Model (`server/models/Hotel.js`)
Stores company heritage, star ratings, and physical property features:
* **Fields:** `name` (String), `tagline` (String), `address` (String), `city` (String), `country` (String), `starRating` (Number, 5), `ratingScore` (Number, 9.6), `ratingBadge` (String, 'Exceptional'), `reviewsCount` (Number, 1420), `amenities` (Array of Strings), `contactEmail`, `contactPhone`, `checkInTime` ('14:00'), `checkOutTime` ('11:00').

---

## 5. Review Model (`server/models/Review.js`)
Stores authentic guest ratings and feedback:
* **Fields:** `guestName` (String), `guestCountry` (String), `guestAvatar` (String URL), `rating` (Number, 1-10), `title` (String), `comment` (String), `roomType` (String), `verifiedStay` (Boolean, default: true).

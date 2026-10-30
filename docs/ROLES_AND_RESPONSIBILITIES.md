# HotelPro - Roles & Responsibilities (RBAC Matrix)

HotelPro enforces strict **Role-Based Access Control (RBAC)** across three distinct operational roles in the hospitality management lifecycle.

---

## 1. Operational Role Definitions

### 👤 1. Guest Traveler (Customer / Corporate Traveler)
* **Objective:** Discover luxury hotel accommodations, filter suites by budget and category, make guaranteed reservations, manage trips, and generate tax invoices.
* **Permissions & Capabilities:**
  * Search suites by destination, check-in/out dates, and guest headcount.
  * Filter suites by category (`Executive Suites`, `Deluxe King Rooms`, `Luxury Penthouses`) and price ranges.
  * Reserve rooms with dynamic stay duration calculations and optional add-ons.
  * Access personalized **My Bookings** dashboard.
  * Execute **1-Click Free Cancellation** with 100% instant full refund guarantee.
  * Download and print official **GST Tax Invoices** (HSN 996311) and digital booking vouchers.
  * Submit verified stay reviews and ratings.
* **Restrictions:**
  * Cannot access hotel operations dashboards, alter base room pricing, or view bookings of other guests.

### 🛎️ 2. Hotel Staff (Front Desk & Concierge Operations)
* **Objective:** Streamline guest check-ins, verify arrivals, manage suite turnovers, and maintain real-time room availability.
* **Permissions & Capabilities:**
  * Access the **Staff & Admin Operations Panel**.
  * Inspect suite inventory status (`Available`, `Occupied`, `Maintenance`).
  * Toggle room availability status when guests arrive or depart.
  * View hotel-wide confirmed bookings list.
* **Restrictions:**
  * Cannot delete rooms or modify company financial tax configurations.

### 🛡️ 3. Hotel Administrator (General Manager & Financial Controller)
* **Objective:** Full administrative governance over hotel inventory, room tariffs, guest records, and revenue analytics.
* **Permissions & Capabilities:**
  * Complete CRUD authority over Room catalog (Create, Read, Update, Delete suites).
  * Monitor real-time occupancy percentages, active booking volumes, and monthly revenue totals.
  * Manage guest accounts, roles, and Genius discount tier eligibility.
  * Audit cancellation records and refund settlement verifications.

---

## 2. RBAC Permissions Matrix

| Feature / Resource Endpoint | Guest Traveler | Hotel Staff | Hotel Administrator |
|---|:---:|:---:|:---:|
| **Browse Room Catalog (`GET /api/rooms`)** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Search & Price Filter (`GET /api/rooms?`)** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Create Reservation (`POST /api/bookings`)** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **View Personal Bookings (`GET /api/bookings/my`)** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **1-Click Free Cancel (`POST /api/bookings/:id/cancel`)** | ✅ (Own Only) | ✅ Allowed | ✅ Allowed |
| **Download GST Tax Invoice** | ✅ (Own Only) | ✅ Allowed | ✅ Allowed |
| **View Operations Telemetry (`GET /api/hotel/stats`)** | ❌ Denied | ✅ Allowed | ✅ Allowed |
| **Toggle Suite Availability (`PUT /api/rooms/:id`)** | ❌ Denied | ✅ Allowed | ✅ Allowed |
| **Create / Delete Rooms (`POST/DELETE /api/rooms`)** | ❌ Denied | ❌ Denied | ✅ Allowed |
| **View All Guest Bookings (`GET /api/bookings`)** | ❌ Denied | ✅ Allowed | ✅ Allowed |

---

## 3. Implementation in Express.js & JWT Middleware

```javascript
// Middleware: server/middleware/auth.js
const { protect, authorize } = require('./middleware/auth');

// Public route: Any visitor or guest can view rooms
router.get('/rooms', getAllRooms);

// Protected route: Any logged in user can book
router.post('/bookings', protect, createBooking);

// Protected Staff & Admin route: Manage room availability
router.put('/rooms/:id', protect, authorize('staff', 'admin'), updateRoom);

// Protected Admin-only route: Delete room from inventory
router.delete('/rooms/:id', protect, authorize('admin'), deleteRoom);
```

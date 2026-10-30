# HotelPro - Steps for Project Execution

This guide provides step-by-step instructions to run, test, and present the **HotelPro - Complete Hotel Booking & Management Solution** to satisfy **SkillWallet Epic 6: Project Execution (Task 17)**.

---

## 🚀 Execution Option 1: Instant 1-Click Launch (Zero Dependencies)
For immediate evaluation without installing Node.js, databases, or build dependencies:
1. Double-click **`index.html`** in this project folder.
2. The entire application launches immediately in your web browser with the full Booking.com-inspired experience:
   * Real-time destination, date range, and guest search bar.
   * Multi-tier category filters (`Executive Suites`, `Deluxe King Rooms`, `Luxury Penthouses`).
   * Price filter buttons (`Under ₹3,000`, `₹3,000 – ₹4,000`, `₹4,000+`).
   * Dedicated checkout page with photo mosaic gallery, stay nights selector, and add-ons.
   * "My Bookings" dashboard with 1-click free cancellation, digital vouchers, and printable GST tax invoices (HSN 996311).
   * Member and staff sign-in with 1-click evaluation presets.

---

## 🛠️ Execution Option 2: Full-Stack MERN Execution (Development Mode)

### Step A: Start the Backend Server (Port 5000)
```bash
cd server
npm install
npm run seed     # Populates MongoDB or in-memory fallback with luxury suites & confirmed bookings
npm start        # Launches Express REST API on http://localhost:5000
```

Verify backend health at: `http://localhost:5000/api/health`

### Step B: Start the React Frontend Client (Port 5173)
Open a new terminal window:
```bash
cd client
npm install
npm run dev      # Launches Vite React development server on http://localhost:5173
```

Open `http://localhost:5173` in Google Chrome or Mozilla Firefox.

---

## 📦 Execution Option 3: Unified Production Mode (Port 5000)
To run both the backend API and the built React SPA from a single unified server:
```bash
# In project root:
npm run build    # Compiles React SPA into client/dist/
npm start        # Express serves both API endpoints and React SPA on http://localhost:5000
```
Open `http://localhost:5000` in your browser.

---

## 🔑 4. Evaluation Testing Personas & Presets
Use the **1-Click Role Switcher** in the top navigation bar to test all user journeys:

| Role | Email | Password | Key Features to Test |
|---|---|---|---|
| **Guest Traveler** | `himanshu.travel@gmail.com` | `guest123` | Search suites, select add-ons, book room, cancel stay with 100% refund, print voucher & GST invoice |
| **Hotel Staff** | `staff@hotelpro.com` | `staff123` | Inspect hotel occupancy %, toggle suite availability (`Available` vs. `Occupied`) |
| **Hotel Admin** | `admin@hotelpro.com` | `admin123` | Monitor monthly revenue, active booking volumes, manage inventory |

---

## 🧪 5. Feature Verification Checklist for Evaluator
- [x] Destination & Date search updates room results
- [x] Room category pills filter suites without page reload
- [x] Price filter buttons (`Under ₹3,000`, `₹3,000 – ₹4,000`, `₹4,000+`) work correctly
- [x] Sorting by Price (Low to High / High to Low) and Top Rating works
- [x] Clicking "Reserve Suite" opens the dedicated checkout experience
- [x] Stay nights selector (1, 2, 3, 7 nights) dynamically recalculates pricing
- [x] Toggling add-ons (Breakfast, Chauffeur, Late Checkout) updates total
- [x] Submitting reservation generates an official Booking Voucher with reference `#HP-BKG-XXXX`
- [x] "My Bookings" page displays confirmed reservation
- [x] 1-Click Free Cancellation updates status to `CANCELLED · 100% REFUND PROCESSED`
- [x] "GST Invoice" button generates official tax invoice with GSTIN & HSN 996311
- [x] Staff/Admin dashboard displays live occupancy metrics and room availability toggles

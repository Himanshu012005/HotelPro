# HotelPro - Frontend Development & Technical Explanation

This document provides a technical walkthrough of the frontend user experience, state management, interactive features, and component implementations in **HotelPro** to satisfy **SkillWallet Epic 5: Frontend Development (Task 16)**.

---

## 1. State Management & Authentication (`AuthContext.jsx`)
HotelPro leverages the React Context API to manage application-wide user sessions:
* **Persistent Token Storage:** The JWT token and authenticated user payload are synchronized between React state and browser `localStorage`.
* **1-Click Evaluation Presets:** To allow mentors and evaluators to test all three roles without typing credentials, `switchRolePreset(role)` instantly activates:
  * **Guest Traveler:** Pre-fills `himanshu.travel@gmail.com` with Genius Level 2 (20% discount).
  * **Hotel Staff:** Activates `staff@hotelpro.com` for front desk operations.
  * **Hotel Admin:** Activates `admin@hotelpro.com` for full inventory management.

---

## 2. Interactive Search & Multi-Tier Filter Engine (`HomePage.jsx`)
* **Real-Time State Synchronization:** The `category`, `priceRange`, and `sort` filter states trigger asynchronous updates to `roomService.getRooms()`.
* **Category Filtering:** Toggling category pills (`All Stays`, `Executive Suites`, `Deluxe King Rooms`, `Luxury Penthouses`) updates the catalog without page reloads.
* **Price Range Tiers:** Four price button presets (`All Prices`, `Under ₹3,000`, `₹3,000 – ₹4,000`, `₹4,000+`) provide high-converting price scoping.
* **Dynamic Sorting:** Dropdown instantly re-orders suites by Price Low-to-High, Price High-to-Low, or Top Guest Rating.

---

## 3. Dedicated Reservation & Checkout Experience (`CheckoutPage.jsx`)
* **5-Photo Interactive Gallery Mosaic:** Clicking any thumbnail updates `activePhoto` in local component state, switching between the panoramic city view, master suite, workstation, and marble ensuite bathroom.
* **Stay Duration Selector:** Guests can toggle between 1, 2, 3, or 7 nights. The component dynamically recalculates the base room subtotal, 20% Genius discount, and 18% GST tax.
* **Interactive Luxury Add-Ons:** Checkbox toggles for Buffet Breakfast (+₹450/night), Airport Chauffeur (+₹950 flat), and Late Check-out (+₹600 flat) update the live price summary card immediately.
* **Payment Gateway Simulator:** Guests choose between Credit/Debit Card, UPI QR, and Pay at Hotel, generating a confirmed reservation and opening the Digital Booking Voucher Modal.

---

## 4. "My Bookings" Self-Service & 1-Click Free Cancellation (`MyBookingsPage.jsx`)
* **Confirmed Reservation Cards:** Renders active reservations with booking references, stay dates, guest contact details, and payment verification status.
* **1-Click Free Cancellation:**
  * When clicked, prompts confirmation and dispatches `bookingService.cancelBooking()`.
  * Instantly updates UI badge from `CONFIRMED STAY` to `CANCELLED · 100% REFUND PROCESSED`.
  * Displays the exact refund amount deposited back to the original payment instrument.
* **Digital Booking Voucher Modal (`BookingVoucherModal.jsx`):** Renders the official reservation voucher with booking reference, guest contact details, and a 1-click browser print trigger.
* **Official GST Tax Invoice Modal (`TaxInvoiceModal.jsx`):** Formats an itemized tax invoice displaying registered GSTIN (`13AAAAH0000A1Z5`), SAC/HSN Code `996311`, CGST 9%, and SGST 9% itemized breakdown for corporate expense reimbursement.

---

## 5. Staff & Admin Inventory Desk (`AdminDashboardPage.jsx`)
* **Live Telemetry Cards:** Displays real-time hotel metrics: Total Suites, Occupancy Rate (%), Active Verified Bookings, and Monthly Revenue.
* **Inventory Control Table:** Lists all suites with a 1-click toggle button (`Mark Occupied` / `Mark Available`) allowing staff to manage room turnover on the fly.

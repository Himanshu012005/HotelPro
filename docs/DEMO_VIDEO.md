# HotelPro - Demo Video Presentation Guide & Script

This document provides a comprehensive script, video recording instructions, and timed demonstration walkthrough for creating the **Demo Video** required for **SkillWallet Epic 6: Project Execution (Task 19)**.

---

## 📹 Video Overview & Technical Specifications
* **Target Duration:** 3 to 5 Minutes
* **Recommended Recording Tool:** OBS Studio, Loom, or Windows Xbox Game Bar (`Win + G`)
* **Resolution:** 1080p Full HD (1920 × 1080) at 60 FPS
* **Audio:** Clear voiceover explaining features and technical decisions

---

## ⏱️ Video Timeline & Demonstration Script

### 🎬 Part 1: Project Introduction & Brand Identity (0:00 - 0:45)
* **What to Show on Screen:** Open `index.html` or `http://localhost:5173`. Show the luxury Booking.com Deep Navy header, the `HotelPro` verified badge, and the gold Genius Level 2 banner.
* **Spoken Narration Script:**
  > *"Hello everyone! Welcome to the demonstration of **HotelPro - Complete Hotel Booking & Management Solution**, developed for the SkillWallet AI evaluation. HotelPro is a full-stack hospitality web application built on the MERN stack—utilizing React.js with modern Bootstrap 5 styling on the frontend, and Node.js with Express.js, MongoDB, Mongoose, and JWT authentication on the backend. It is designed to offer corporate executives and leisure travelers an intuitive, high-converting booking experience with guaranteed 100% free cancellation, transparent GST tax invoicing, and dedicated staff management tools."*

---

### 🔍 Part 2: Interactive Search & Multi-Tier Filter Engine (0:45 - 1:45)
* **What to Show on Screen:**
  1. Click on the destination box in the floating search bar (`Downtown Central, Tokyo`), adjust dates, and select guest count.
  2. Click the category pills: `Executive Suites`, `Deluxe King Rooms`, `Luxury Penthouses`. Show instant catalog filtering without page reload.
  3. Click the price filter buttons: `Under ₹3,000`, `₹3,000 – ₹4,000`, `₹4,000+`.
  4. Change the sort dropdown to *Price: Low to High* and *Top Guest Rating*.
* **Spoken Narration Script:**
  > *"Starting on the homepage, we have our interactive search bar where guests can specify destinations, check-in and check-out dates, and room requirements. Below, our multi-tiered filter engine allows travelers to immediately filter by room tier—such as Executive Suites or Luxury Penthouses—as well as target budget brackets like 'Under ₹3,000' or '₹4,000+'. Notice how each property card displays verified 9.6 Exceptional badges, Genius 20% member discounts, and our green 100% Free Cancellation indicator."*

---

### 🛎️ Part 3: Dedicated Reservation & Checkout Experience (1:45 - 2:45)
* **What to Show on Screen:**
  1. Click *"Reserve Suite"* on the *Tokyo Skyline Executive Grand Suite*.
  2. In the checkout page, click between the thumbnail images in the 5-photo mosaic gallery.
  3. Click `2 Nights` in the stay nights selector. Show the price summary card recalculate dynamically.
  4. Check the add-ons: *Hot Gourmet Buffet Breakfast* and *Private Airport Chauffeur*.
  5. Select payment method (*Credit/Debit Card*) and click *"Complete Reservation & Instant Confirmation"*.
  6. The **Digital Booking Voucher Modal** pops up with reference `#HP-BKG-XXXXX`.
* **Spoken Narration Script:**
  > *"When a guest selects a suite, they are taken to our dedicated reservation page. Here, we feature an interactive 5-photo gallery mosaic showcasing the bedroom, executive workstation, and marble ensuite bath. Guests can adjust their stay duration—for example, switching from 1 to 2 nights—which dynamically updates our pricing breakdown including a 20% Genius discount and 18% GST. We can tailor our stay with premium add-ons like gourmet buffet breakfast or private airport limousine transfer. When we complete the reservation, our backend generates an official digital booking voucher with a unique reference number."*

---

### ⚡ Part 4: "My Bookings" & 1-Click 100% Refund Cancellation (2:45 - 3:45)
* **What to Show on Screen:**
  1. Navigate to `My Bookings` page.
  2. Show the confirmed stay card with room photos and pricing.
  3. Click *"GST Invoice"*. Show the official GST Tax Invoice modal with GSTIN (`13AAAAH0000A1Z5`) and SAC/HSN Code `996311`.
  4. Close invoice modal and click *"Cancel Stay"*. Confirm prompt.
  5. The badge immediately flips to red `CANCELLED · 100% REFUND PROCESSED` and shows the exact refund amount.
* **Spoken Narration Script:**
  > *"Next, let's look at the My Bookings self-service dashboard. Here, guests can manage their confirmed trips, re-open their digital booking vouchers, or generate an official GST Tax Invoice containing our company GSTIN, HSN Code 996311, and CGST/SGST itemized breakdown for corporate reimbursement. Furthermore, HotelPro features a true 1-click free cancellation guarantee. When the guest clicks 'Cancel Stay', our system instantly updates the reservation state and confirms a 100% full refund with zero cancellation fees."*

---

### 📊 Part 5: Staff & Admin Inventory Desk & Conclusion (3:45 - 4:30)
* **What to Show on Screen:**
  1. Click the `Admin` button in the top role switcher.
  2. Show the 4 telemetry cards: Total Suites (24), Occupancy Rate (75%), Active Bookings (42), and Monthly Revenue (₹3,28,400).
  3. In the inventory table, toggle a suite between `Available` and `Booked`.
* **Spoken Narration Script:**
  > *"Finally, switching to our Staff and Administrator perspective via the 1-click role switcher, hotel managers have access to real-time operations telemetry: tracking live room occupancy percentage, active guest counts, and monthly revenue. Front desk staff can toggle suite availability on the fly as guests arrive or check out. In summary, HotelPro provides a robust, scalable, and intuitive hospitality platform covering every epic and task required by SkillWallet AI. Thank you for watching!"*

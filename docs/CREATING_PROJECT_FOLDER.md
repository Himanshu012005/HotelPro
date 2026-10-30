# HotelPro - Creating Project Folder Structure

This document details the complete filesystem layout, workspace organization, and directory structure implemented for **HotelPro - Complete Hotel Booking & Management Solution** to satisfy **SkillWallet Epic 2: Project Setup and Configuration (Task 7)**.

---

## 1. Complete Project Directory Hierarchy

```
HotelPro_Friend2_Submission/
├── client/                                # React.js + Bootstrap Frontend Application
│   ├── dist/                              # Production optimized build output
│   ├── node_modules/                      # Installed client dependencies
│   ├── public/                            # Static public web assets
│   ├── src/                               # Application source code
│   │   ├── components/                    # Reusable React UI Components
│   │   │   ├── Navbar.jsx                 # Booking.com Navy Header & Role Switcher
│   │   │   ├── Footer.jsx                 # Footer with Heritage & Amenities
│   │   │   ├── SearchBar.jsx              # Destination, Dates & Guests Selector
│   │   │   ├── RoomCard.jsx               # Luxury Suite Property Card
│   │   │   ├── BookingVoucherModal.jsx    # Digital Booking Voucher Modal
│   │   │   └── TaxInvoiceModal.jsx        # Official GST Tax Invoice Modal (HSN 996311)
│   │   ├── context/                       # React Context State Management
│   │   │   └── AuthContext.jsx            # User state, JWT storage & Role Presets
│   │   ├── pages/                         # Application Route Views
│   │   │   ├── HomePage.jsx               # Hero, Search, Filter Engine, Catalog & FAQ
│   │   │   ├── RoomsPage.jsx              # Full Suite Catalog & Sorting
│   │   │   ├── CheckoutPage.jsx           # Photo Gallery Mosaic, Nights & Add-ons
│   │   │   ├── MyBookingsPage.jsx         # Confirmed Stays & 1-Click Free Cancellation
│   │   │   ├── LoginPage.jsx              # Sign-In, Register & 1-Click Presets
│   │   │   └── AdminDashboardPage.jsx     # Staff & Admin Inventory Operations Desk
│   │   ├── services/                      # API Service Handlers
│   │   │   └── api.js                     # REST endpoints with offline resilience
│   │   ├── App.jsx                        # Master Application Layout & Routing
│   │   ├── index.css                      # Design tokens, typography & luxury styles
│   │   └── main.jsx                       # React DOM Entrypoint
│   ├── index.html                         # Vite HTML template
│   ├── package.json                       # Client scripts & dependencies
│   └── vite.config.js                     # Vite build configuration & API proxy
│
├── server/                                # Node.js + Express.js Backend REST API
│   ├── config/                            # Database & Environment Configuration
│   │   └── db.js                          # Mongoose connection with fallback handling
│   ├── controllers/                       # Business Logic Handlers
│   │   ├── authController.js              # Register, login, me & token generation
│   │   ├── roomController.js              # Multi-filter search, sorting & room CRUD
│   │   ├── bookingController.js           # Reservation, 1-click cancel, GST invoice
│   │   ├── hotelController.js             # Hotel details, policies & admin stats
│   │   └── reviewController.js            # Guest testimonials & review scoring
│   ├── middleware/                        # Express Middlewares
│   │   └── auth.js                        # JWT protect & role authorize middleware
│   ├── models/                            # Mongoose Schemas & Data Models
│   │   ├── User.js                        # User entity with bcrypt hashing
│   │   ├── Room.js                        # Suite entity with category & pricing
│   │   ├── Hotel.js                       # Hotel property details & amenities
│   │   ├── Booking.js                     # Reservation with GST tax calculation
│   │   └── Review.js                      # Verified guest reviews & ratings
│   ├── routes/                            # Express REST Route Definitions
│   │   ├── authRoutes.js                  # /api/auth endpoints
│   │   ├── roomRoutes.js                  # /api/rooms endpoints
│   │   ├── bookingRoutes.js               # /api/bookings endpoints
│   │   ├── hotelRoutes.js                 # /api/hotel endpoints
│   │   └── reviewRoutes.js                # /api/reviews endpoints
│   ├── seed/                              # Database Seeder
│   │   └── seed.js                        # Seeds sample rooms, users, bookings & reviews
│   ├── .env                               # Server environment variables
│   ├── .env.example                       # Documented environment template
│   ├── package.json                       # Backend dependencies & npm scripts
│   └── server.js                          # Express application entrypoint
│
├── docs/                                  # SkillWallet Architecture & Submission Docs
│   ├── TECHNICAL_ARCHITECTURE.md          # Task 1 (Epic 1)
│   ├── ER_DIAGRAM.md                      # Task 2 (Epic 1)
│   ├── FEATURES.md                        # Task 3 (Epic 1)
│   ├── ROLES_AND_RESPONSIBILITIES.md      # Task 4 (Epic 1)
│   ├── USER_FLOW.md                       # Task 5 (Epic 1)
│   ├── MVC_PATTERN.md                     # Task 6 (Epic 1)
│   ├── CREATING_PROJECT_FOLDER.md         # Task 7 (Epic 2)
│   ├── CLIENT_SETUP.md                    # Task 8 (Epic 2)
│   ├── SERVER_SETUP.md                    # Task 9 (Epic 2)
│   ├── BACKEND_STRUCTURE.md               # Task 10 (Epic 3)
│   ├── BACKEND_DEVELOPMENT_AND_EXPLANATION.md # Task 11 (Epic 3)
│   ├── CONFIGURE_MONGODB.md               # Task 12 (Epic 4)
│   ├── CREATE_DATABASE_CONNECTION.md      # Task 13 (Epic 4)
│   ├── CREATE_SCHEMA_AND_MODELS.md        # Task 14 (Epic 4)
│   ├── FRONTEND_STRUCTURE.md              # Task 15 (Epic 5)
│   ├── FRONTEND_DEVELOPMENT_AND_EXPLANATION.md # Task 16 (Epic 5)
│   ├── STEPS_FOR_PROJECT_EXECUTION.md     # Task 17 (Epic 6)
│   ├── OUTPUT_SCREENSHOTS.md              # Task 18 (Epic 6)
│   └── DEMO_VIDEO.md                      # Task 19 (Epic 6)
│
├── index.html                             # Zero-Setup Instant Browser Application Launcher
├── POD_BOOKING_CHECKOUT.html              # Standalone Dedicated Reservation & Checkout Portal
├── MY_BOOKINGS_PAGE.html                  # Standalone My Bookings & Refund Desk
├── LOGIN_PAGE.html                        # Standalone Member & Staff Sign-In Portal
├── README.md                              # Complete Project Overview & Presentation Guide
└── package.json                           # Root workspace configuration & execution scripts
```

---

## 2. Directory Separation Rationale
1. **Decoupled Client & Server:** Segregating `client/` and `server/` enables independent dependency management, isolated testing, and distinct deployment pipelines.
2. **Dual-Mode Execution:** The workspace provides both a production-grade React + Vite SPA and instant zero-dependency standalone HTML entry points (`index.html`) so any mentor can evaluate instantly with or without build tools.
3. **Structured Documentation (`docs/`):** All 19 tasks from the SkillWallet portal have 1-to-1 matching markdown artifacts for seamless evaluation grading.

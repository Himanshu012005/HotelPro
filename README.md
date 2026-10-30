# HotelPro - Complete Hotel Booking & Management Solution

A modern, high-converting hotel booking and operations management web application inspired by **Booking.com**, engineered for luxury city hotels, corporate executive suites, and penthouses in Tokyo Central. Built for evaluation and submission on the **SkillWallet AI** platform.

---

## 🌟 Brand & Visual Identity
* **System Title:** **HotelPro** (Grand City Hotels & Executive Suites Edition)
* **Aesthetic:** Classic Booking.com Deep Navy (`#003580`), Clean White (`#ffffff`), Crisp Soft Gray (`#f5f7fa`), Warm Accent Gold (`#febb02`), and Emerald Green badges (`#008009`).
* **Typography:** Contemporary Geometric Sans-Serif (`Plus Jakarta Sans`).
* **Design Philosophy:** Premium, clean, high-converting, professional, and accessible.

---

## 🛠️ Required Technologies & Skills Verified

| Technology | Role in HotelPro |
|---|---|
| **JavaScript (ES6+)** | Core client and server application logic, async operations, and DOM manipulation |
| **React.js (v18+)** | Component-driven frontend SPA, reactive state hooks, and client-side routing |
| **Node.js (v16+)** | Asynchronous JavaScript server runtime environment |
| **Express.js (v4+)** | Lightweight RESTful API framework with robust routing and middleware |
| **MongoDB & Mongoose (v8+)** | NoSQL database with strict schemas, data validation, pre-save hooks, and indexes |
| **JSON Web Token (JWT)** | Stateless bearer token authentication and Role-Based Access Control (RBAC) |
| **Bootstrap (v5+) & CSS3** | Responsive layout grids, mobile-first utilities, and custom design tokens |
| **HTML5 & Semantic Elements** | Accessible semantic structure with unique test IDs |

---

## 📁 SkillWallet Submission Checklist (6 Epics · 19 Tasks)

Every task from the SkillWallet portal is fully implemented with code and documentation:

### 🏛️ Epic 1: Project Architecture (6 Tasks)
* [x] **Task 1: [`docs/TECHNICAL_ARCHITECTURE.md`](file:///d:/HotelPro_Friend2_Submission/docs/TECHNICAL_ARCHITECTURE.md)** — Multi-tier MERN system architecture and Mermaid data flow.
* [x] **Task 2: [`docs/ER_DIAGRAM.md`](file:///d:/HotelPro_Friend2_Submission/docs/ER_DIAGRAM.md)** — Relational entity relationships, keys, cardinality, and normalization.
* [x] **Task 3: [`docs/FEATURES.md`](file:///d:/HotelPro_Friend2_Submission/docs/FEATURES.md)** — Comprehensive functional specifications across all user flows.
* [x] **Task 4: [`docs/ROLES_AND_RESPONSIBILITIES.md`](file:///d:/HotelPro_Friend2_Submission/docs/ROLES_AND_RESPONSIBILITIES.md)** — Role definitions (Guest, Staff, Admin) and RBAC permissions matrix.
* [x] **Task 5: [`docs/USER_FLOW.md`](file:///d:/HotelPro_Friend2_Submission/docs/USER_FLOW.md)** — Mermaid sequence diagrams, checkout lifecycle, and cancellation state machine.
* [x] **Task 6: [`docs/MVC_PATTERN.md`](file:///d:/HotelPro_Friend2_Submission/docs/MVC_PATTERN.md)** — Architectural breakdown of Models, Views, and Controllers.

### ⚙️ Epic 2: Project Setup and Configuration (3 Tasks)
* [x] **Task 7: [`docs/CREATING_PROJECT_FOLDER.md`](file:///d:/HotelPro_Friend2_Submission/docs/CREATING_PROJECT_FOLDER.md)** — Complete workspace hierarchy and directory breakdown.
* [x] **Task 8: [`docs/CLIENT_SETUP.md`](file:///d:/HotelPro_Friend2_Submission/docs/CLIENT_SETUP.md)** — React.js, Bootstrap, and Vite setup and proxy configuration.
* [x] **Task 9: [`docs/SERVER_SETUP.md`](file:///d:/HotelPro_Friend2_Submission/docs/SERVER_SETUP.md)** — Node.js, Express, environment variables (`.env`), and database seeding.

### 💻 Epic 3: Backend Development (2 Tasks)
* [x] **Task 10: [`docs/BACKEND_STRUCTURE.md`](file:///d:/HotelPro_Friend2_Submission/docs/BACKEND_STRUCTURE.md)** — Controller, model, route, and middleware pipeline organization.
* [x] **Task 11: [`docs/BACKEND_DEVELOPMENT_AND_EXPLANATION.md`](file:///d:/HotelPro_Friend2_Submission/docs/BACKEND_DEVELOPMENT_AND_EXPLANATION.md)** — Business logic, pricing math, GST tax calculations, and cancellation refunds.

### 🗄️ Epic 4: Database Development (3 Tasks)
* [x] **Task 12: [`docs/CONFIGURE_MONGODB.md`](file:///d:/HotelPro_Friend2_Submission/docs/CONFIGURE_MONGODB.md)** — Local Community Server vs. MongoDB Atlas Cloud configuration & indexing.
* [x] **Task 13: [`docs/CREATE_DATABASE_CONNECTION.md`](file:///d:/HotelPro_Friend2_Submission/docs/CREATE_DATABASE_CONNECTION.md)** — Mongoose connection module with resilient in-memory fallback.
* [x] **Task 14: [`docs/CREATE_SCHEMA_AND_MODELS.md`](file:///d:/HotelPro_Friend2_Submission/docs/CREATE_SCHEMA_AND_MODELS.md)** — Schemas for User, Room, Booking, Hotel, and Review with validations.

### 🎨 Epic 5: Frontend Development (2 Tasks)
* [x] **Task 15: [`docs/FRONTEND_STRUCTURE.md`](file:///d:/HotelPro_Friend2_Submission/docs/FRONTEND_STRUCTURE.md)** — Component tree, React Router routes, design tokens, and CSS layout.
* [x] **Task 16: [`docs/FRONTEND_DEVELOPMENT_AND_EXPLANATION.md`](file:///d:/HotelPro_Friend2_Submission/docs/FRONTEND_DEVELOPMENT_AND_EXPLANATION.md)** — Technical walkthrough of Search, Filters, Checkout, and Dashboards.

### 🚀 Epic 6: Project Execution (3 Tasks)
* [x] **Task 17: [`docs/STEPS_FOR_PROJECT_EXECUTION.md`](file:///d:/HotelPro_Friend2_Submission/docs/STEPS_FOR_PROJECT_EXECUTION.md)** — Step-by-step commands for running and evaluating the application.
* [x] **Task 18: [`docs/OUTPUT_SCREENSHOTS.md`](file:///d:/HotelPro_Friend2_Submission/docs/OUTPUT_SCREENSHOTS.md)** — 12 Key evaluation screens, triggers, and checkpoint criteria.
* [x] **Task 19: [`docs/DEMO_VIDEO.md`](file:///d:/HotelPro_Friend2_Submission/docs/DEMO_VIDEO.md)** — Timed narration script, screen directions, and feature walkthrough.

---

## 🚀 How to Run & Present

### Option 1: Instant Zero-Setup Launch (Recommended for Quick Review)
Double-click **`index.html`** in this project folder.
The entire application launches immediately in any web browser with full interactivity, live filtering, dynamic checkout, 1-click free cancellations, and printable tax invoices.

### Option 2: Full-Stack MERN Execution
1. **Start Backend Server:**
   ```bash
   cd server
   npm install
   npm run seed     # Populates database with sample suites, users, and bookings
   npm start        # Launches REST API on http://localhost:5000
   ```
2. **Start Frontend React Client:**
   ```bash
   cd client
   npm install
   npm run dev      # Launches Vite React development server on http://localhost:5173
   ```
3. Open `http://localhost:5173` in Google Chrome or Firefox.

---

## 🔑 Demo Evaluation Credentials & Presets

Use the **1-Click Role Switcher** in the top navigation bar to test all user journeys instantly:

| Role Persona | Demo Email | Demo Password | Capabilities & Access |
|---|---|---|---|
| **Guest Traveler** | `himanshu.travel@gmail.com` | `guest123` | Search, filter, book suites, 1-click cancel with 100% refund, print vouchers & GST invoices |
| **Hotel Staff** | `staff@hotelpro.com` | `staff123` | View hotel occupancy rate, inspect suite inventory, toggle room availability status |
| **Hotel Admin** | `admin@hotelpro.com` | `admin123` | Full administrative control, view monthly revenue metrics, manage suite catalog |

---

## 🏢 Hotel Identity & Contact Information
* **Hotel Name:** HotelPro Grand City Suites & Residences
* **Location:** Ginza 5-Chome, Chuo City, Tokyo 104-0061, Japan
* **GSTIN:** 13AAAAH0000A1Z5 · **HSN Code:** 996311 (Hotel Accommodation Services)
* **Rating:** 9.6 / 10 Exceptional (1,420 Verified Reviews)

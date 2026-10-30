# HotelPro - MVC Pattern Implementation

HotelPro implements the classic **Model-View-Controller (MVC)** architectural design pattern to achieve high cohesion, loose coupling, and maintainable separation of concerns across the full-stack MERN codebase.

---

## 1. Architectural Layers Breakdown

```mermaid
graph LR
    subgraph ViewLayer ["VIEW (Presentation)"]
        ReactViews["React Components & Pages (HomePage, CheckoutPage, MyBookingsPage)"]
        StandaloneViews["Standalone HTML Portals (index.html, POD_BOOKING_CHECKOUT.html)"]
    end

    subgraph ControllerLayer ["CONTROLLER (Business Logic)"]
        Routes["Express Route Definitions (/api/...)"]
        Controllers["Controllers (authController, roomController, bookingController, hotelController)"]
        Middleware["Auth & RBAC Middleware (protect, authorize)"]
    end

    subgraph ModelLayer ["MODEL (Data & Persistence)"]
        MongooseModels["Mongoose Schemas (User, Room, Booking, Hotel, Review)"]
        Database["MongoDB Datastore"]
    end

    ViewLayer -->|User Action / HTTP Request| Routes
    Routes --> Middleware
    Middleware --> Controllers
    Controllers -->|CRUD Operations| MongooseModels
    MongooseModels -->|Queries / Mutations| Database
    Database -->>|Data Records| MongooseModels
    MongooseModels -->>|Processed Data| Controllers
    Controllers -->>|JSON API Response| ViewLayer
```

---

## 2. Layer Specifications

### 📁 1. Models (`server/models/`)
The **Model** layer encapsulates business entities, data structures, validation rules, and persistence logic:
* **`User.js`**: Handles user authentication, bcrypt password hashing pre-save hooks, role definitions (`guest`, `staff`, `admin`), and JWT token generation methods.
* **`Room.js`**: Defines luxury suite properties, category enums (`Executive Suites`, `Deluxe King Rooms`, `Luxury Penthouses`), pricing rules, capacity, and inclusions.
* **`Booking.js`**: Manages stay duration, guest contact details, selected add-ons, 18% GST tax computation, payment verification, and 1-click refund cancellation tracking.
* **`Hotel.js`**: Stores hotel identity, five-star facilities, Tokyo address, check-in policies, and heritage statistics.
* **`Review.js`**: Encapsulates verified guest ratings, testimonials, and review scores.

### 📁 2. Views (`client/` & `index.html`)
The **View** layer renders data to users, captures user interactions, and visualizes system state:
* **`HomePage.jsx` / `index.html`**: Luxury hero banner, floating search bar, multi-tier category and price filter buttons, and dynamic room cards.
* **`CheckoutPage.jsx` / `POD_BOOKING_CHECKOUT.html`**: 5-Photo interactive gallery mosaic, stay nights selector, add-on toggles, price breakdown, and payment simulator.
* **`MyBookingsPage.jsx` / `MY_BOOKINGS_PAGE.html`**: Confirmed reservation cards, 1-click free cancellation button, digital booking voucher modal, and official GST tax invoice modal.
* **`LoginPage.jsx` / `LOGIN_PAGE.html`**: Authentication portal with 1-click demo evaluation presets for Guest, Staff, and Admin.
* **`AdminDashboardPage.jsx`**: Real-time occupancy rate, active bookings counter, monthly revenue telemetry, and suite inventory availability table.

### 📁 3. Controllers (`server/controllers/`)
The **Controller** layer serves as the intermediary orchestrator between Views and Models:
* **`authController.js`**: Handles registration validation, email deduplication, password comparison, and signed JWT issuance.
* **`roomController.js`**: Parses query parameters (`category`, `priceRange`, `sort`, `search`), executes filtered MongoDB queries, and handles admin CRUD updates.
* **`bookingController.js`**: Validates room availability, calculates financial itemization (subtotal, Genius discount, GST 18%), issues booking references (`#HP-BKG-XXXX`), and manages 100% refund cancellations.
* **`hotelController.js`**: Serves hotel metadata and aggregates hotel-wide operational metrics (total rooms, occupancy percentage, total revenue).
* **`reviewController.js`**: Validates and persists verified traveler testimonials.

---

## 3. Key Benefits of MVC in HotelPro
1. **Maintainability:** Business validation rules in controllers can be refactored without altering UI view components.
2. **Reusability:** The same backend API controllers serve both the modern React client and the standalone zero-dependency HTML interfaces.
3. **Testability:** Controllers and Models can be independently unit tested with mocked database fixtures.

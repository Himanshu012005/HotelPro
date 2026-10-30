# HotelPro - User Flow Diagrams

This document illustrates the end-to-end user journeys and state transition flows across Guest, Staff, and Administrator personas in HotelPro.

---

## 1. Guest Room Discovery & Checkout Flow

```mermaid
sequenceDiagram
    autonumber
    actor Guest as Guest Traveler
    participant UI as HotelPro Frontend (React / HTML)
    participant API as Express API Gateway
    participant DB as MongoDB Datastore

    Guest->>UI: Enter Destination, Dates & Guests Count
    UI->>API: GET /api/rooms?category=...&priceRange=...&sort=...
    API->>DB: Query rooms matching criteria
    DB-->>API: Return matching luxury suites
    API-->>UI: Display Room Cards (Price, Genius 20% Badge, Rating)
    
    Guest->>UI: Click "Reserve Suite" on selected room
    UI-->>Guest: Render Dedicated Checkout Page (Photo Mosaic, Inclusions)
    Guest->>UI: Select Stay Nights (1, 2, 3, 7 nights) & Toggle Add-Ons
    UI-->>Guest: Dynamically recalculate Room Subtotal, GST 18%, and Total
    
    Guest->>UI: Submit Guest Information & Select Payment Method
    UI->>API: POST /api/bookings (Payload: roomId, nights, addOns, guestDetails)
    API->>DB: Create Booking record & generate Reference #HP-BKG-XXXXX
    DB-->>API: Confirmed Booking Document
    API-->>UI: 201 Created Response
    UI-->>Guest: Display Official Digital Booking Voucher Modal
```

---

## 2. Booking Lifecycle & 1-Click Free Cancellation State Machine

```mermaid
stateDiagram-v2
    [*] --> Confirmed: Guest Completes Reservation Checkout
    Confirmed --> CheckedIn: Guest Arrives at Hotel & Front Desk Checks-in
    CheckedIn --> Completed: Guest Checks Out at End of Stay
    
    Confirmed --> Cancelled: Guest Clicks "1-Click Free Cancel" on Dashboard
    state Cancelled {
        [*] --> ProcessRefund: 100% Instant Refund Triggered
        ProcessRefund --> SettlementConfirmed: Refund Amount Deposited to Original Payment Instrument
        SettlementConfirmed --> [*]
    }
    
    Cancelled --> [*]
    Completed --> [*]
```

---

## 3. Staff & Administrator Operations Flow

```mermaid
sequenceDiagram
    autonumber
    actor Staff as Front Desk Staff / Admin
    participant UI as Staff Control Panel
    participant API as Express API
    participant DB as MongoDB

    Staff->>UI: Sign in with Staff / Admin credentials
    UI->>API: GET /api/hotel/stats & GET /api/rooms
    API->>DB: Aggregate occupancy rate, active bookings & suite statuses
    DB-->>API: Operational Metrics
    API-->>UI: Render Telemetry Cards & Inventory Management Table
    
    Staff->>UI: Click "Mark Occupied" / "Mark Available" on Suite STE-101
    UI->>API: PUT /api/rooms/:id { isAvailable: false }
    API->>DB: Update room availability state
    DB-->>API: Updated Room Document
    API-->>UI: Real-time UI inventory table state refresh
```

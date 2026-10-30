# HotelPro - Entity Relationship (ER) Diagram

This document illustrates the data architecture, entity relationships, and Mongoose ODM schema mappings for **HotelPro - Complete Hotel Booking & Management Solution**.

---

## 1. Complete Relational Entity Relationship Diagram

```mermaid
erDiagram
    HOTEL ||--|{ ROOM : "contains"
    HOTEL ||--o{ REVIEW : "receives"
    
    USER ||--o{ BOOKING : "places"
    USER ||--o{ REVIEW : "writes"
    
    ROOM ||--o{ BOOKING : "reserved_for"
    ROOM ||--o{ REVIEW : "rated_in"
    
    BOOKING ||--|| PAYMENT_SETTLEMENT : "settled_via"
    BOOKING ||--|| TAX_INVOICE : "generates"
    BOOKING ||--|| CANCELLATION_REFUND : "tracks"

    HOTEL {
        ObjectId _id PK
        string name "HotelPro Grand City Suites & Residences"
        string tagline
        string address "Ginza 5-Chome, Chuo City"
        string city "Tokyo"
        string country "Japan"
        number starRating "5"
        number ratingScore "9.6"
        string ratingBadge "Exceptional"
        number reviewsCount "1420"
        array amenities
        string contactEmail
        string contactPhone
        string checkInTime "14:00"
        string checkOutTime "11:00"
    }

    USER {
        ObjectId _id PK
        string name "Himanshu Sanodiya"
        string email UK "himanshu.travel@gmail.com"
        string password "bcrypt_hash"
        string role "guest | staff | admin"
        string phone "+91 98765 43210"
        number geniusLevel "2"
        date createdAt
    }

    ROOM {
        ObjectId _id PK
        ObjectId hotelId FK
        string roomNumber UK "STE-101 | DLX-202 | PNT-303"
        string title "Tokyo Skyline Executive Grand Suite"
        string category "Executive Suites | Deluxe King Rooms | Luxury Penthouses"
        number pricePerNight "3899"
        number originalPrice "4899"
        string discountBadge "Genius 20% Off"
        number rating "9.8"
        number capacityAdults "2"
        number capacityChildren "1"
        string bedType "1 King Bed + Lounge Daybed"
        string roomSize "58 m² / 624 ft²"
        array features
        boolean isAvailable "true"
        date createdAt
    }

    BOOKING {
        ObjectId _id PK
        string bookingReference UK "#HP-BKG-8842"
        ObjectId userId FK
        ObjectId roomId FK
        string guestFullName
        string guestEmail
        string guestPhone
        date checkInDate
        date checkOutDate
        number nights "2"
        number adults "2"
        number children "0"
        number roomSubtotal "7798"
        number geniusDiscount "1559"
        number addOnsTotal "1400"
        number taxGST18 "1375"
        number totalPayable "9014"
        string bookingStatus "Confirmed | Cancelled | Checked-In | Completed"
        string invoiceNumber UK "INV-2026-8842"
        date createdAt
    }

    PAYMENT_SETTLEMENT {
        string transactionId UK "TXN-HP99214A"
        string paymentMethod "Credit/Debit Card | UPI QR | Pay at Hotel"
        string paymentStatus "Paid | Pending | Refunded"
        number settledAmount "9014"
        date settledAt
    }

    TAX_INVOICE {
        string invoiceNumber UK "INV-2026-8842"
        string gstin "13AAAAH0000A1Z5"
        string hsnCode "996311"
        number taxableValue "7639"
        number cgstRatePct "9.0"
        number cgstAmount "687"
        number sgstRatePct "9.0"
        number sgstAmount "687"
        number totalInvoiceAmount "9014"
    }

    CANCELLATION_REFUND {
        boolean isCancelled "true | false"
        date cancelledAt
        string refundStatus "100% Instant Refund Processed"
        number refundAmount "9014"
        string refundMethod "Original Payment Instrument"
    }

    REVIEW {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId roomId FK
        string guestName "Vikram & Priya Malhotra"
        string guestCountry "Mumbai, India"
        number rating "10"
        string title "Flawless luxury experience"
        string comment "The Tokyo Skyline Suite was sensational..."
        boolean verifiedStay "true"
        date createdAt
    }
```

---

## 2. Relational Schema & Cardinality Specifications

| Relationship | Cardinality | Business Logic & Constraint |
|---|---|---|
| **Hotel ➔ Room** | 1 to Many (1:N) | A hotel property manages multiple luxury room inventories categorized by suite tiers. |
| **User ➔ Booking** | 1 to Many (1:N) | A registered guest or visitor can place multiple bookings over time. |
| **Room ➔ Booking** | 1 to Many (1:N) | A room can have sequential reservations across distinct stay calendar windows. |
| **Booking ➔ Payment** | 1 to 1 (1:1) | Each confirmed reservation links directly to a unique transaction payment record. |
| **Booking ➔ Tax Invoice** | 1 to 1 (1:1) | Each confirmed reservation automatically generates an itemized GST Tax Invoice. |
| **Booking ➔ Cancellation** | 1 to 1 (1:1) | 1-Click free cancellation updates the booking lifecycle and issues a 100% refund. |
| **User ➔ Review** | 1 to Many (1:N) | Verified guests submit reviews and star ratings linked to their stay. |

---

## 3. Data Integrity & Normalization Standards
1. **Third Normal Form (3NF):** Elimination of transitive dependencies between rooms, taxes, and customer entities.
2. **Denormalization for Fast Read Scaling:** Key room snapshot details (`title`, `roomNumber`, `pricePerNight`) are captured within the `Booking` record to guarantee historical accuracy even if room rates change later.
3. **Atomic State Updates:** Booking status transitions (`Confirmed` ➔ `Cancelled`) execute atomically with instant refund status updates.

# HotelPro - Configure MongoDB Guide

This document provides instructions for configuring and connecting **MongoDB** to the HotelPro backend application to satisfy **SkillWallet Epic 4: Database Development (Task 12)**.

---

## 1. MongoDB Architecture Options
HotelPro supports two database deployment configurations:

### Option A: Local MongoDB Community Server
1. Download and install **MongoDB Community Server** (v5.0 or above).
2. Start the MongoDB daemon process:
   ```bash
   mongod --dbpath /data/db
   ```
3. Set your connection string in `server/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/hotelpro
   ```

### Option B: MongoDB Atlas (Free Cloud Cluster)
1. Create a free M0 cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user with read/write privileges.
3. Whitelist your IP address (or `0.0.0.0/0` for development).
4. Copy the connection URI and paste into `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/hotelpro?retryWrites=true&w=majority
   ```

---

## 2. Collection Indexing Strategy
To guarantee fast query execution and data integrity across thousands of simultaneous hotel queries, HotelPro enforces the following database indexes:

| Collection | Indexed Field | Index Type | Purpose |
|---|---|---|---|
| `users` | `email` | Unique (`unique: true`) | Prevents duplicate user registrations |
| `rooms` | `roomNumber` | Unique (`unique: true`) | Ensures distinct suite numbering |
| `rooms` | `category`, `pricePerNight` | Compound Index | Accelerates multi-tier catalog filtering |
| `bookings` | `bookingReference` | Unique (`unique: true`) | Fast 1-click lookup for vouchers and refund desks |
| `bookings` | `guestDetails.email` | Single Field Index | Accelerates "My Bookings" retrieval by email |
| `bookings` | `user` | Foreign Key Index | Speeds up user reservation history queries |

---

## 3. Database Migration & Seeding
To initialize the database schema and populate it with sample luxury suites and confirmed reservations:
```bash
cd server
npm run seed
```

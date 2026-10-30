# HotelPro - Server Setup Guide

This document details the complete setup, configuration, and verification procedure for the **HotelPro Backend RESTful API Server** to satisfy **SkillWallet Epic 2: Project Setup and Configuration (Task 9)**.

---

## 1. Backend Architecture & Package Manifest
The HotelPro backend is powered by **Node.js** and **Express.js** with **Mongoose** and **JSON Web Tokens (JWT)**:

```json
{
  "name": "hotelpro-server",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.1"
  }
}
```

---

## 2. Environment Variables Configuration (`server/.env`)
Create or edit `server/.env` with the following parameters:

```env
# Application Port
PORT=5000

# MongoDB Connection String (Local Daemon or MongoDB Atlas Cloud URI)
MONGODB_URI=mongodb://127.0.0.1:27017/hotelpro

# Secret Key for Signing JSON Web Tokens
JWT_SECRET=hotelpro_super_secret_jwt_key_2026_secure

# Environment Mode
NODE_ENV=development
```

---

## 3. Step-by-Step Server Setup Instructions

### Step 1: Navigate to Server Directory
```bash
cd server
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Seed Database with Initial Luxury Hotel Data
Populate the database with sample luxury suites, users (Guest, Staff, Admin), hotel information, reviews, and confirmed bookings:
```bash
npm run seed
```
*Note: If MongoDB is not running locally, the seed script will log an informative message and the server automatically runs in resilient in-memory mode.*

### Step 4: Start Express Server
```bash
npm start
# or for live reloading:
npm run dev
```

The server will initialize on port 5000:
```
====================================================
🏨 HotelPro Backend API Server running on port 5000
🔗 API Base URL: http://localhost:5000/api
🔗 Health Check: http://localhost:5000/api/health
====================================================
```

---

## 4. API Health Verification
Verify that the server is operational by navigating to `http://localhost:5000/api/health` in your browser or running:
```bash
curl http://localhost:5000/api/health
```

Expected JSON response:
```json
{
  "status": "ONLINE",
  "project": "HotelPro - Complete Hotel Booking and Management Solution",
  "database": "MongoDB Connected",
  "nodeVersion": "v26.5.0",
  "uptimeSeconds": 14,
  "timestamp": "2026-10-30T12:00:00.000Z"
}
```

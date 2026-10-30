# HotelPro - Create Database Connection

This document details the database connection module implementation in `server/config/db.js` for **HotelPro** to satisfy **SkillWallet Epic 4: Database Development (Task 13)**.

---

## 1. Database Connection Implementation (`server/config/db.js`)

```javascript
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotelpro', {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] Warning: Could not connect to MongoDB (${error.message}).`);
    console.warn(`[Database] The server will continue running and serve API endpoints with fallback in-memory datastore.`);
    return null;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
```

---

## 2. Key Architectural Features
1. **Connection Timeout Handling:** `serverSelectionTimeoutMS: 3000` prevents the Node.js server from hanging indefinitely if a remote MongoDB instance is unreachable.
2. **Connection Status Exposure:** `getDBStatus()` provides downstream controllers and health check endpoints real-time visibility into datastore connectivity.
3. **Resilient Offline Fallback:** If MongoDB is offline, the connection failure is trapped cleanly without crashing the Node.js runtime, and the application seamlessly falls back to pre-seeded in-memory collections.

---

## 3. Testing the Database Connection
Run the following command to test connectivity:
```bash
node -e "const { connectDB } = require('./server/config/db'); connectDB().then(() => process.exit(0));"
```

Expected Output with running MongoDB:
```
[Database] MongoDB Connected Successfully: 127.0.0.1
```

Expected Output without running MongoDB:
```
[Database] Warning: Could not connect to MongoDB (connect ECONNREFUSED 127.0.0.1:27017).
[Database] The server will continue running and serve API endpoints with fallback in-memory datastore.
```

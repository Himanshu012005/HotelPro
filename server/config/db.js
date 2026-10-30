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

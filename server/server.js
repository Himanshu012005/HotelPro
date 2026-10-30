require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB, getDBStatus } = require('./config/db');

// Import Route Handlers
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Connect to Database
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets (built React dist or root standalone)
const distPath = path.join(__dirname, '../client/dist');
const clientPath = path.join(__dirname, '../client');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.use(express.static(clientPath));

// API Health Check & System Status
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    project: 'HotelPro - Complete Hotel Booking and Management Solution',
    database: getDBStatus() ? 'MongoDB Connected' : 'In-Memory Fallback Active',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date()
  });
});

// Mount Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/reviews', reviewRoutes);

// Catch-all route to serve React SPA if requested
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏨 HotelPro Backend API Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

module.exports = app;

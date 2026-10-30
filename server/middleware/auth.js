const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes requiring authentication
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Token missing.'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'hotelpro_jwt_secret_dev_key'
    );

    // Try finding user in database
    try {
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        return next();
      }
    } catch (dbErr) {
      // In case MongoDB is offline or in-memory fallback
    }

    // Fallback user from decoded payload
    req.user = {
      _id: decoded.id,
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role || 'guest'
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Invalid or expired token.'
    });
  }
};

// Grant access to specific roles (e.g. 'admin', 'staff')
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'anonymous'}' is not authorized to perform this action`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };

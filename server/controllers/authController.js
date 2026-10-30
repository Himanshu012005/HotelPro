const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDBStatus } = require('../config/db');

// Fallback demo users for instant zero-dependency evaluation
const DEMO_USERS = [
  {
    _id: 'usr_guest_01',
    name: 'Himanshu Sanodiya',
    email: 'himanshu.travel@gmail.com',
    role: 'guest',
    phone: '+91 98765 43210',
    geniusLevel: 2,
    passwordHash: bcrypt.hashSync('guest123', 10)
  },
  {
    _id: 'usr_staff_01',
    name: 'Kenji Sato (Front Desk)',
    email: 'staff@hotelpro.com',
    role: 'staff',
    phone: '+81 3-5555-0188',
    geniusLevel: 2,
    passwordHash: bcrypt.hashSync('staff123', 10)
  },
  {
    _id: 'usr_admin_01',
    name: 'Hotel General Manager',
    email: 'admin@hotelpro.com',
    role: 'admin',
    phone: '+81 3-5555-0100',
    geniusLevel: 2,
    passwordHash: bcrypt.hashSync('admin123', 10)
  }
];

// Helper to generate token
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id || user.id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'hotelpro_jwt_secret_dev_key',
    { expiresIn: '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      geniusLevel: user.geniusLevel || 2
    }
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    if (getDBStatus()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || 'guest',
        phone: phone || '+91 98765 43210'
      });

      return sendTokenResponse(user, 201, res);
    } else {
      // In-memory registration fallback
      const existing = DEMO_USERS.find((u) => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const newUser = {
        _id: 'usr_' + Date.now(),
        name,
        email: email.toLowerCase(),
        role: role || 'guest',
        phone: phone || '+91 98765 43210',
        geniusLevel: 2,
        passwordHash: bcrypt.hashSync(password, 10)
      };
      DEMO_USERS.push(newUser);
      return sendTokenResponse(newUser, 201, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Login user with email & password
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    if (getDBStatus()) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. User not found.'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      return sendTokenResponse(user, 200, res);
    } else {
      // Fallback in-memory authentication
      const user = DEMO_USERS.find((u) => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. User not found.'
        });
      }

      const isMatch = bcrypt.compareSync(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      return sendTokenResponse(user, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login'
    });
  }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private (JWT Protected)
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  // 🛡️ Resilience Secret: Ensure a stable key even if ENV is missing in production
  const secretKey = process.env.JWT_SECRET || 'MediSync_Tactical_Core_982_Secure_Handshake';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, secretKey);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.error('❌ [AUTH FAILURE]: User associated with token no longer exists.');
        res.status(401);
        return next(new Error('User not found'));
      }

      if (req.user.isBanned) {
        console.warn(`🚨 [AUTH FAILURE]: Suspended user ${req.user.email} attempted access.`);
        res.status(403);
        return next(new Error('Your account has been suspended. Please contact support.'));
      }

      next();
    } catch (error) {
      console.error('❌ [AUTH FAILURE]: JWT verification crashed:', error.message);
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(401);
    next(new Error('Not authorized as an admin'));
  }
};

// Doctor middleware
const doctor = (req, res, next) => {
  if (req.user && (req.user.role === 'Doctor' || req.user.role === 'Admin')) {
    next();
  } else {
    res.status(401);
    next(new Error('Not authorized as a doctor'));
  }
};

export { protect, admin, doctor };

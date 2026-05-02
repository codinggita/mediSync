import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error('🔴 [FATAL] JWT_SECRET environment variable is not set!');
    if (process.env.NODE_ENV === 'production') {
      res.status(500);
      return next(new Error('Server security configuration error'));
    }
  }
  const key = secretKey || 'dev_only_key_not_for_production';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      
      if (token.length > 2000) {
        res.status(401);
        return next(new Error('Not authorized, invalid token format'));
      }

      const decoded = jwt.verify(token, key);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.error('❌ [AUTH FAILURE]: Token references a non-existent user.');
        res.status(401);
        return next(new Error('Not authorized'));
      }

      if (req.user.isBanned) {
        console.warn(`🚨 [SECURITY] Suspended user ${req.user.email} attempted access.`);
        res.status(403);
        return next(new Error('Your account has been suspended. Please contact support.'));
      }

      next();
    } catch (error) {
      console.error('❌ [AUTH FAILURE]: JWT verification failed:', error.message);
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};


const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(401);
    next(new Error('Not authorized as an admin'));
  }
};


const doctor = (req, res, next) => {
  if (req.user && (req.user.role === 'Doctor' || req.user.role === 'Admin')) {
    next();
  } else {
    res.status(401);
    next(new Error('Not authorized as a doctor'));
  }
};

export { protect, admin, doctor };



import rateLimit from 'express-rate-limit';


export const securityAuditLogger = (req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  
  const suspiciousPatterns = [/<script>/i, /javascript:/i, /\$where/i, /\$gt/i, /\.\.\//];
  const bodyStr = JSON.stringify(req.body || '');
  const isSuspicious = suspiciousPatterns.some((p) => p.test(bodyStr) || p.test(url));

  if (isSuspicious) {
    console.warn(`🚨 [SECURITY ALERT] ${timestamp} | IP: ${ip} | ${method} ${url} | Suspicious payload detected`);
  }

  
  if (url.includes('/auth/login') || url.includes('/auth/register')) {
    console.log(`🔐 [AUTH AUDIT] ${timestamp} | IP: ${ip} | ${method} ${url}`);
  }

  next();
};


export const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100,
  message: {
    status: 429,
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests from this IP. MediSync security protocol has temporarily blocked your access.',
    retryAfter: '10 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    console.warn(`🚫 [RATE LIMIT] IP: ${ip} exceeded global limit on ${req.originalUrl}`);
    res.status(429).json({
      status: 429,
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Access temporarily suspended.',
      retryAfter: '10 minutes',
    });
  },
});


export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  skipSuccessfulRequests: true, 
  message: {
    status: 429,
    error: 'AUTH_BRUTE_FORCE_DETECTED',
    message: 'Too many failed login attempts. Account access locked for 15 minutes.',
  },
  handler: (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    console.error(`🔴 [BRUTE FORCE DETECTED] IP: ${ip} | ${new Date().toISOString()} | Endpoint: ${req.originalUrl}`);
    res.status(429).json({
      status: 429,
      error: 'AUTH_BRUTE_FORCE_DETECTED',
      message: 'Too many failed login attempts. Account access locked for 15 minutes.',
    });
  },
});


export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 3,
  message: {
    status: 429,
    error: 'PASSWORD_RESET_LIMIT',
    message: 'Too many password reset attempts. Try again in 1 hour.',
  },
});


export const adminLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 50,
  message: {
    status: 429,
    error: 'ADMIN_RATE_LIMIT',
    message: 'Admin action rate limit exceeded. Please slow down.',
  },
});


export const mongoSanitizer = (req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key in obj) {
      if (key.startsWith('$') || key.includes('.')) {
        const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
        console.error(`🔴 [NOSQL INJECTION ATTEMPT] IP: ${ip} | Key: ${key}`);
        delete obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};


export const xssSanitizer = (req, res, next) => {
  const sanitizeValue = (val) => {
    if (typeof val === 'string') {
      return val
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    }
    return val;
  };

  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        } else {
          obj[key] = sanitizeValue(obj[key]);
        }
      }
    }
    return obj;
  };

  if (req.body) {
    const sanitizedBody = sanitizeObject(JSON.parse(JSON.stringify(req.body)));
    for (const key in req.body) delete req.body[key];
    Object.assign(req.body, sanitizedBody);
  }
  if (req.query) {
    const sanitizedQuery = sanitizeObject(JSON.parse(JSON.stringify(req.query)));
    for (const key in req.query) delete req.query[key];
    Object.assign(req.query, sanitizedQuery);
  }
  if (req.params) {
    const sanitizedParams = sanitizeObject(JSON.parse(JSON.stringify(req.params)));
    for (const key in req.params) delete req.params[key];
    Object.assign(req.params, sanitizedParams);
  }

  next();
};


export const hppProtection = (req, res, next) => {
  
  if (req.query) {
    const cleaned = {};
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        cleaned[key] = Array.isArray(req.query[key])
          ? req.query[key][req.query[key].length - 1]
          : req.query[key];
      }
    }
    for (const key in req.query) delete req.query[key];
    Object.assign(req.query, cleaned);
  }
  next();
};


export const secureHeaders = (req, res, next) => {
  
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  res.setHeader('X-Frame-Options', 'DENY');
  
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
  }
  next();
};


export const requestSizeGuard = (req, res, next) => {
  const MAX_BODY_SIZE = 5 * 1024 * 1024; 
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_BODY_SIZE) {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    console.warn(`⚠️ [SIZE GUARD] IP: ${ip} attempted to send ${contentLength} bytes on ${req.originalUrl}`);
    return res.status(413).json({
      status: 413,
      error: 'PAYLOAD_TOO_LARGE',
      message: 'Request payload exceeds the maximum allowed size of 5MB.',
    });
  }
  next();
};

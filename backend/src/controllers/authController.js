import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, specialty, hospital, dateOfBirth, bloodGroup, gender, medicalLicenseId, orgEmail, licenseCertificateUrl, plan, phone } = req.body;

    // Check if email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('Email already registered');
    }

    // Check if phone exists
    if (phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        res.status(400);
        throw new Error('Mobile number already registered');
      }
    }

    // Generate patientId if Patient
    let patientId;
    if (!role || role === 'Patient') {
       patientId = 'MS-' + Math.floor(10000 + Math.random() * 90000);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Patient',
      specialty,
      hospital,
      patientId,
      dateOfBirth,
      bloodGroup,
      gender,
      medicalLicenseId,
      orgEmail,
      licenseCertificateUrl,
      phone,
      plan: plan || 'Free'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        patientId: user.patientId,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email: identifier, password } = req.body;

    // Check for user by email OR phone
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        patientId: user.patientId,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        patientId: user.patientId,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
        preferences: user.preferences,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Google Login
// @route   POST /api/auth/google-login
// @access  Public
const googleLogin = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      if (user.isBanned) {
        return res.status(403).json({ message: 'This account has been suspended by the administrator.' });
      }

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        patientId: user.patientId,
        specialty: user.specialty,
        hospital: user.hospital,
        token: generateToken(user._id)
      });
    } else {
      // User doesn't exist, tell frontend to redirect to signup
      res.status(404).json({ message: 'User not found. Please register.', isNewUser: true });
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getMe, googleLogin };

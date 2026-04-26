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
        patientId: user.patientId,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
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

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404);
      throw new Error('User not found with this email');
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'MediSync - Password reset token',
        message,
        html: `
          <div style="font-family: sans-serif; padding: 40px; color: #1F2937;">
            <h1 style="color: #2A7FFF;">Access Synchronization Required</h1>
            <p>You requested a password reset for your MediSync account.</p>
            <p>Please click the button below to synchronize your new credentials. This link expires in 10 minutes.</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #2A7FFF; color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">Synchronize Password</a>
            <p style="margin-top: 30px; font-size: 0.8rem; color: #9CA3AF;">If you didn't request this, please ignore this email.</p>
          </div>
        `
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.error(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      res.status(500);
      throw new Error('Email could not be sent');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error('Invalid token or token expired');
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getMe, googleLogin, forgotPassword, resetPassword };

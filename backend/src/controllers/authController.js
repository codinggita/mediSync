import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';


const registerUser = async (req, res, next) => {
  try {
    const { email, phone, role, password, name, ...otherDetails } = req.body;

    
    const [emailExists, phoneExists] = await Promise.all([
      User.findOne({ email }),
      phone ? User.findOne({ phone }) : Promise.resolve(null)
    ]);

    if (emailExists) { res.status(400); throw new Error('Email already registered'); }
    if (phoneExists) { res.status(400); throw new Error('Mobile number already registered'); }

    
    let patientId;
    if (!role || role === 'Patient') {
      patientId = `MS-${Math.floor(10000 + Math.random() * 90000)}`;
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Patient',
      phone,
      patientId,
      ...otherDetails
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
      throw new Error('Invalid user creation protocol');
    }
  } catch (error) {
    next(error);
  }
};


const loginUser = async (req, res, next) => {
  try {
    const { email: identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
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
      throw new Error('Invalid authentication credentials');
    }
  } catch (error) {
    next(error);
  }
};


const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) { res.status(404); throw new Error('User not found'); }

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
  } catch (error) {
    next(error);
  }
};


const googleLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ 
        message: 'Identity not found. Registration required.', 
        isNewUser: true 
      });
    }

    if (user.isBanned) {
      return res.status(403).json({ 
        message: 'Access denied. Account suspended.' 
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      patientId: user.patientId,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getMe, googleLogin };

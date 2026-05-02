import User from '../models/User.js';
import logger from '../utils/logger.js';








export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      patientId: user.patientId,
      bloodGroup: user.bloodGroup,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      specialty: user.specialty,
      hospital: user.hospital,
      vitals: user.vitals,
      preferences: user.preferences,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};


export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const {
      name,
      email,
      password,
      phone,
      bloodGroup,
      gender,
      dateOfBirth,
      specialty,
      hospital,
      preferences,
    } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bloodGroup) user.bloodGroup = bloodGroup;
    if (gender) user.gender = gender;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (specialty) user.specialty = specialty;
    if (hospital) user.hospital = hospital;
    if (password) user.password = password;
    if (preferences) {
      user.preferences = {
        ...(user.preferences?.toObject ? user.preferences.toObject() : user.preferences || {}),
        ...preferences,
      };
    }

    const updatedUser = await user.save();
    logger.info('User profile updated', { userId: updatedUser._id });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      patientId: updatedUser.patientId,
    });
  } catch (error) {
    next(error);
  }
};


export const updateVitals = async (req, res, next) => {
  try {
    const { heartRate, bloodPressure, glucose, spO2 } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.vitals = {
      heartRate: heartRate ?? user.vitals?.heartRate,
      bloodPressure: bloodPressure ?? user.vitals?.bloodPressure,
      glucose: glucose ?? user.vitals?.glucose,
      spO2: spO2 ?? user.vitals?.spO2,
    };

    await user.save();
    logger.info('Vitals updated', { userId: user._id });
    res.json({ message: 'Vitals updated successfully', vitals: user.vitals });
  } catch (error) {
    next(error);
  }
};


export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await User.find({ role: 'Doctor' }).select(
      'name specialty hospital email phone whatsapp address'
    );
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

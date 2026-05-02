import User from '../models/User.js';
import Medicine from '../models/Medicine.js';
import Appointment from '../models/Appointment.js';
import Pharmacy from '../models/Pharmacy.js';
import logger from '../utils/logger.js';






export const getPlatformStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalPatients,
      totalDoctors,
      totalAdmins,
      totalPharmacies,
      totalMedicines,
      totalAppointments,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'Patient' }),
      User.countDocuments({ role: 'Doctor' }),
      User.countDocuments({ role: 'Admin' }),
      Pharmacy.countDocuments(),
      Medicine.countDocuments(),
      Appointment.countDocuments(),
    ]);

    const bannedUsers = await User.countDocuments({ isBanned: true });
    const pendingPharmacies = await Pharmacy.countDocuments({ verificationStatus: 'Pending' });
    const verifiedPharmacies = await Pharmacy.countDocuments({ verificationStatus: 'Verified' });

    const recentUsers = await User.find()
      .select('name email role createdAt isBanned')
      .sort({ createdAt: -1 })
      .limit(10);

    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json({
      stats: {
        totalUsers,
        totalPatients,
        totalDoctors,
        totalAdmins,
        totalPharmacies,
        totalMedicines,
        totalAppointments,
        bannedUsers,
        pendingPharmacies,
        verifiedPharmacies,
      },
      recentUsers,
      userGrowth,
    });
  } catch (error) {
    next(error);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const { role, page = 1, limit = 50, search } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search)
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, page: Number(page), limit: Number(limit), users });
  } catch (error) {
    next(error);
  }
};


export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};


export const updateUserByAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    const { name, email, role, specialty, hospital, phone, whatsapp, address, medicalLicenseId } =
      req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (specialty) user.specialty = specialty;
    if (hospital) user.hospital = hospital;
    if (phone) user.phone = phone;
    if (whatsapp) user.whatsapp = whatsapp;
    if (address) user.address = address;
    if (medicalLicenseId) user.medicalLicenseId = medicalLicenseId;

    const updated = await user.save();
    logger.info('Admin updated user', { adminId: req.user._id, targetId: updated._id });
    res.json({ message: 'User updated', user: updated });
  } catch (error) {
    next(error);
  }
};


export const addDoctorByAdmin = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      specialty,
      hospital,
      phone,
      whatsapp,
      address,
      medicalLicenseId,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const doctor = await User.create({
      name,
      email,
      password, 
      role: 'Doctor',
      specialty,
      hospital,
      phone,
      whatsapp,
      address,
      medicalLicenseId,
    });

    logger.info('Admin added new doctor', { adminId: req.user._id, doctorId: doctor._id });
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    next(error);
  }
};


export const toggleUserBan = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('Cannot ban yourself');
    }
    user.isBanned = !user.isBanned;
    await user.save();
    logger.warn(`Admin ${user.isBanned ? 'banned' : 'activated'} user`, {
      adminId: req.user._id,
      targetId: user._id,
    });
    res.json({
      message: `User ${user.isBanned ? 'banned' : 'activated'} successfully`,
      isBanned: user.isBanned,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('Admin cannot delete their own account');
    }
    await user.deleteOne();
    logger.warn('Admin deleted user', { adminId: req.user._id, deletedId: req.params.id });
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    next(error);
  }
};




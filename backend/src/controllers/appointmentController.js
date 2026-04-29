import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// @desc    Get logged in user's appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
  try {
    let appointments;
    if (req.user.role === 'Patient') {
      appointments = await Appointment.find({ patient: req.user._id })
        .populate('doctor', 'name phone whatsapp address specialty hospital')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'Doctor') {
      appointments = await Appointment.find({ doctor: req.user._id })
        .populate('patient', 'name email patientId phone vitals gender bloodGroup dateOfBirth')
        .sort({ createdAt: -1 });
    } else {
      appointments = await Appointment.find({})
        .populate('patient', 'name patientId')
        .populate('doctor', 'name specialty hospital')
        .sort({ createdAt: -1 });
    }
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res, next) => {
  try {
    const { doctorId, date, time, type, location } = req.body;

    // 🛡️ ID Validation Guard
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      res.status(400);
      throw new Error('Invalid Doctor ID Format');
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'Doctor') {
      res.status(404);
      throw new Error('Doctor not found');
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date,
      time,
      type,
      location: type === 'In Person' ? location || doctor.hospital : undefined,
      meetingLink:
        type === 'Video Consult'
          ? `https://medisync.app/meet/${Math.random().toString(36).substring(7)}`
          : undefined,
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'name phone whatsapp address specialty hospital')
      .populate('patient', 'name email patientId phone vitals gender bloodGroup dateOfBirth');

    res.status(201).json(populatedAppointment);
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Private
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // 🛡️ ID Validation Guard
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid Appointment ID Format');
    }

    const appointment = await Appointment.findById(id);

    if (appointment) {
      // Check authorization
      if (
        req.user.role === 'Admin' ||
        (appointment.patient && appointment.patient.toString() === req.user._id.toString()) ||
        (appointment.doctor && appointment.doctor.toString() === req.user._id.toString())
      ) {
        appointment.status = status;
        const updatedAppointment = await appointment.save();

        const populatedAppointment = await Appointment.findById(updatedAppointment._id)
          .populate('doctor', 'name phone whatsapp address specialty hospital')
          .populate('patient', 'name email patientId phone vitals gender bloodGroup dateOfBirth');

        res.json(populatedAppointment);
      } else {
        res.status(401);
        throw new Error('Not authorized');
      }
    } else {
      res.status(404);
      throw new Error('Appointment not found');
    }
  } catch (error) {
    next(error);
  }
};

export { getAppointments, createAppointment, updateAppointmentStatus };

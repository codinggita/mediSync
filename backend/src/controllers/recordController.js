import MedicalRecord from '../models/MedicalRecord.js';
import SharedRecord from '../models/SharedRecord.js';
import User from '../models/User.js';

// @desc    Get logged in user's records (or patients of a doctor)
// @route   GET /api/records
// @access  Private
const getRecords = async (req, res, next) => {
  try {
    let records;
    if (req.user.role === 'Patient') {
      records = await MedicalRecord.find({ patient: req.user._id }).populate('doctor', 'name specialty hospital');
    } else if (req.user.role === 'Doctor') {
      // Find records where doctor is the primary doctor
      const primaryRecords = await MedicalRecord.find({ doctor: req.user._id }).populate('patient', 'name email patientId phone vitals gender bloodGroup dateOfBirth');
      
      // Find records shared with this doctor
      const sharedMappings = await SharedRecord.find({ doctor: req.user._id }).populate({
        path: 'record',
        populate: { path: 'patient', select: 'name email patientId phone vitals gender bloodGroup dateOfBirth' }
      });
      
      const sharedRecords = sharedMappings.map(m => m.record).filter(r => r !== null);
      
      // Combine and remove duplicates if any
      records = [...primaryRecords, ...sharedRecords];
    } else {
      records = await MedicalRecord.find({}).populate('patient', 'name patientId').populate('doctor', 'name specialty');
    }
    res.json(records);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload a new medical record
// @route   POST /api/records
// @access  Private
const createRecord = async (req, res, next) => {
  try {
    const { title, type, description, hospital, fileUrl, patientId } = req.body;

    let targetPatientId = req.user._id;

    // If a doctor or admin is uploading, they must specify the patient ID
    if (req.user.role === 'Doctor' || req.user.role === 'Admin') {
      if (!patientId) {
        res.status(400);
        throw new Error('Please provide a patient ID to attach this record to');
      }
      targetPatientId = patientId;
    }

    const record = await MedicalRecord.create({
      patient: targetPatientId,
      doctor: req.user.role === 'Doctor' ? req.user._id : undefined,
      title,
      type,
      description,
      hospital: hospital || (req.user.role === 'Doctor' ? req.user.hospital : undefined),
      fileUrl,
    });

    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

// @desc    Get record by ID
// @route   GET /api/records/:id
// @access  Private
const getRecordById = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patient', 'name email patientId')
      .populate('doctor', 'name email specialty hospital');

    if (record) {
      // Check if it's shared with this doctor
      const isShared = await SharedRecord.findOne({ record: record._id, doctor: req.user._id });

      // Check authorization (patient can only see their own, doctor their patients OR if shared)
      if (
        req.user.role === 'Admin' ||
        (record.patient && record.patient._id?.toString() === req.user._id.toString()) ||
        (record.doctor && record.doctor._id?.toString() === req.user._id.toString()) ||
        isShared
      ) {
        res.json(record);
      } else {
        res.status(401);
        throw new Error('Not authorized to view this record');
      }
    } else {
      res.status(404);
      throw new Error('Record not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Share a medical record with a doctor
// @route   POST /api/records/share
// @access  Private
const shareRecord = async (req, res, next) => {
  try {
    const { recordId, doctorId } = req.body;

    // Verify record ownership
    const record = await MedicalRecord.findById(recordId);
    if (!record) {
      res.status(404);
      throw new Error('Medical record not found');
    }

    if (record.patient.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('You can only share your own records');
    }

    // Verify doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'Doctor') {
      res.status(404);
      throw new Error('Doctor not found');
    }

    // Create share entry
    const sharedRecord = await SharedRecord.findOneAndUpdate(
      { record: recordId, doctor: doctorId },
      { patient: req.user._id, record: recordId, doctor: doctorId },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: `Report successfully shared with Dr. ${doctor.name}`,
      sharedRecord
    });
  } catch (error) {
    next(error);
  }
};

export { getRecords, createRecord, getRecordById, shareRecord };

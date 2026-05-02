import MedicalRecord from '../models/MedicalRecord.js';
import SharedRecord from '../models/SharedRecord.js';
import User from '../models/User.js';




const getRecords = async (req, res, next) => {
  try {
    let records;
    if (req.user.role === 'Patient') {
      records = await MedicalRecord.find({ patient: req.user._id }).populate(
        'doctor',
        'name specialty hospital'
      );
    } else if (req.user.role === 'Doctor') {
      
      const primaryRecords = await MedicalRecord.find({ doctor: req.user._id }).populate(
        'patient',
        'name email patientId phone vitals gender bloodGroup dateOfBirth'
      );

      
      const sharedMappings = await SharedRecord.find({ doctor: req.user._id }).populate({
        path: 'record',
        populate: {
          path: 'patient',
          select: 'name email patientId phone vitals gender bloodGroup dateOfBirth',
        },
      });

      const sharedRecords = sharedMappings.map((m) => m.record).filter((r) => r !== null);

      
      records = [...primaryRecords, ...sharedRecords];
    } else {
      records = await MedicalRecord.find({})
        .populate('patient', 'name patientId')
        .populate('doctor', 'name specialty');
    }
    res.json(records);
  } catch (error) {
    next(error);
  }
};




const createRecord = async (req, res, next) => {
  try {
    const { title, type, description, hospital, fileUrl, patientId, date } = req.body;

    let targetPatientId = req.user._id;

    
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
      date: date || Date.now(),
    });

    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};




const getRecordById = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patient', 'name email patientId')
      .populate('doctor', 'name email specialty hospital');

    if (record) {
      
      const isShared = await SharedRecord.findOne({ record: record._id, doctor: req.user._id });

      
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




const shareRecord = async (req, res, next) => {
  try {
    const { recordId, doctorId } = req.body;

    
    const record = await MedicalRecord.findById(recordId);
    if (!record) {
      res.status(404);
      throw new Error('Medical record not found');
    }

    if (record.patient.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('You can only share your own records');
    }

    
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'Doctor') {
      res.status(404);
      throw new Error('Doctor not found');
    }

    
    const sharedRecord = await SharedRecord.findOneAndUpdate(
      { record: recordId, doctor: doctorId },
      { patient: req.user._id, record: recordId, doctor: doctorId },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: `Report successfully shared with Dr. ${doctor.name}`,
      sharedRecord,
    });
  } catch (error) {
    next(error);
  }
};




const deleteRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (!record) {
      res.status(404);
      throw new Error('Medical record not found');
    }

    
    if (record.patient.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      res.status(401);
      throw new Error('Not authorized to delete this record');
    }

    await record.deleteOne();
    res.json({ message: 'Clinical artifact removed successfully' });
  } catch (error) {
    next(error);
  }
};

export { getRecords, createRecord, getRecordById, shareRecord, deleteRecord };

import mongoose from 'mongoose';

/**
 * Record model — aliases MedicalRecord for backward-compatibility.
 * Stores patient-uploaded medical records (lab reports, scans, prescriptions).
 */
const recordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Record title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Lab Report', 'Imaging', 'Prescription', 'Discharge Summary', 'Vaccination', 'Other'],
      default: 'Other',
    },
    fileUrl: {
      type: String, // cloud / local path
    },
    fileName: {
      type: String,
    },
    fileType: {
      type: String, // e.g. application/pdf, image/png
    },
    notes: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isConfidential: {
      type: Boolean,
      default: false,
    },
    recordDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);
export default Record;

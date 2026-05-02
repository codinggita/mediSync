import mongoose from 'mongoose';

const sharedRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    record: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicalRecord',
      required: true,
    },
    sharedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


sharedRecordSchema.index({ doctor: 1, record: 1 }, { unique: true });

const SharedRecord = mongoose.model('SharedRecord', sharedRecordSchema);
export default SharedRecord;

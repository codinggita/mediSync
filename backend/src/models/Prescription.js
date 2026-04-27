import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicines: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
    customName: String,
    dosage: String,
    frequency: String,
    time: String, // e.g., "08:00 AM"
    taken: { type: Boolean, default: false },
    startDate: Date,
    endDate: Date
  }],
  notes: String,
  status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' }
}, { timestamps: true });

export default mongoose.model('Prescription', prescriptionSchema);

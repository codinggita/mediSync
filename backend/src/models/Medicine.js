import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    manufacturer: { type: String },
    description: { type: String },
    category: { type: String }, 
    dosage: { type: String }, 
    image: { type: String },
    stockStatus: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' },
  },
  { timestamps: true }
);

export default mongoose.model('Medicine', medicineSchema);

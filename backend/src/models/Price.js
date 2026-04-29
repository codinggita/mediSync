import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacy',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Prevent duplicate prices for the same medicine in the same pharmacy
priceSchema.index({ medicine: 1, pharmacy: 1 }, { unique: true });

export default mongoose.model('Price', priceSchema);

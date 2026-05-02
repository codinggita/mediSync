import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pharmacy from './src/models/Pharmacy.js';

dotenv.config();

const test = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    console.log('Testing Pharmacy model...');
    const count = await Pharmacy.countDocuments();
    console.log('Pharmacy count:', count);

    console.log('Test passed!');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
};

test();

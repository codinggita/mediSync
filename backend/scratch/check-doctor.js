import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const dashrat = await User.findOne({ name: /Dashrat/i });
    if (dashrat) {
      console.log('Dr. Dashrat found:', JSON.stringify(dashrat, null, 2));
    } else {
      console.log('Dr. Dashrat not found.');
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

check();

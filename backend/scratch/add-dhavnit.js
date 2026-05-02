import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const addDoctor = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({ email: 'dhavnit.psy@medisync.app' });
    if (exists) {
      console.log('Dr. Dhavnit already exists.');
      process.exit(0);
    }

    await User.create({
      name: 'Dr. Dhavnit',
      email: 'dhavnit.psy@medisync.app',
      password: 'password123',
      role: 'Doctor',
      specialty: 'Psychiatrist',
      hospital: 'Mental Health Center',
      medicalLicenseId: 'DL-PSY-88492',
      phone: '+91 88492 99052',
      whatsapp: '+91 88492 99052',
      address: 'Rajkot, Gujarat, India',
      profilePic:
        'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200&h=200',
    });

    console.log('Dr. Dhavnit added successfully!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

addDoctor();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Prescription from './models/Prescription.js';
import MedicalRecord from './models/MedicalRecord.js';
import Appointment from './models/Appointment.js';
import Pharmacy from './models/Pharmacy.js';
import Medicine from './models/Medicine.js';
import Price from './models/Price.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing
    await User.deleteMany();
    await Prescription.deleteMany();
    await MedicalRecord.deleteMany();
    await Appointment.deleteMany();
    await Pharmacy.deleteMany();
    await Medicine.deleteMany();
    await Price.deleteMany();

    // Create Test Patient
    const testUser = await User.create({
      name: 'Priyabrata Sahoo',
      email: 'test@test.com',
      password: '123456',
      role: 'Patient',
      patientId: 'MS-2026-001',
      gender: 'Male',
      dateOfBirth: new Date('1995-08-15'),
      bloodGroup: 'B+',
      vitals: {
        heartRate: { value: 78 },
        bloodPressure: { value: '120/80' },
        glucose: { value: 95 },
        spO2: { value: 98 },
      },
    });

    // Create Admin User
    await User.create({
      name: 'Admin MediSync',
      email: 'admin@medisync.com',
      password: 'Admin@1234',
      role: 'Admin',
    });

    // Create Doctor User
    const doctorUser = await User.create({
      name: 'Dr. Anjali Mehta',
      email: 'anjali@medisync.app',
      password: 'password123',
      role: 'Doctor',
      specialty: 'Cardiologist',
      hospital: 'Apollo Hospital',
      medicalLicenseId: 'DL-MED-2021-88291',
      phone: '+91 98765 00001',
      whatsapp: '+91 98765 00001',
      address: 'Apollo Hospital, Sector 62, New Delhi',
    });

    // Create Dr. Kamlesh - Orthopedic Specialist
    const doctorKamlesh = await User.create({
      name: 'Dr. Kamlesh',
      email: 'kamlesh@medisync.app',
      password: 'password123',
      role: 'Doctor',
      specialty: 'Orthopedic',
      hospital: 'Kalol Medical Center',
      medicalLicenseId: 'DL-MED-2024-99140',
      phone: '+91 99792 65140',
      whatsapp: '+91 99792 65140',
      address: 'Kalol, Gujarat, India - 382721',
      profilePic:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    });

    await User.create({
      name: 'Dr. Dashrat',
      email: 'dashrat.neuro@medisync.app',
      password: 'password123',
      role: 'Doctor',
      specialty: 'Neurologist',
      hospital: 'NeuroCare Institute',
      medicalLicenseId: 'DL-NEURO-81144',
      phone: '+91 81144 96781',
      whatsapp: '+91 81144 96781',
      address: 'Ahmedabad, Gujarat, India',
      profilePic:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200',
    });

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

    // Create Appointment
    await Appointment.create([
      {
        patient: testUser._id,
        doctor: doctorUser._id,
        doctorName: doctorUser.name,
        specialty: doctorUser.specialty,
        date: 'Today',
        time: '10:00 AM - 10:30 AM',
        type: 'Video Consult',
        status: 'Upcoming',
        meetingLink: 'https://medisync.app/meet/mock-video-call',
      },
      {
        patient: testUser._id,
        doctor: doctorUser._id,
        doctorName: doctorUser.name,
        specialty: doctorUser.specialty,
        date: 'Tomorrow',
        time: '02:00 PM - 03:00 PM',
        type: 'In Person',
        status: 'Upcoming',
        location: 'Apollo Hospital, Sector 62',
      },
    ]);

    // Create Pharmacies
    const pharmacies = await Pharmacy.insertMany([
      {
        name: 'Apollo Pharmacy',
        address: 'Sector 14, Main Market',
        phone: '+91 98765 11111',
        rating: 4.8,
        distance: '0.8 km',
        status: 'Open',
        closes: '10 PM',
        verificationStatus: 'Verified',
        location: { coordinates: [77.1, 28.5] },
      },
      {
        name: 'MedPlus',
        address: 'DLF Phase 3',
        phone: '+91 98765 22222',
        rating: 4.5,
        distance: '1.2 km',
        status: 'Open',
        closes: '9 PM',
        verificationStatus: 'Pending',
        location: { coordinates: [77.12, 28.52] },
      },
      {
        name: 'HealthFirst Pharma',
        address: 'Connaught Place',
        phone: '+91 98765 33333',
        rating: 4.2,
        distance: '2.5 km',
        status: 'Open',
        closes: '11 PM',
        verificationStatus: 'Pending',
        location: { coordinates: [77.22, 28.63] },
      },
    ]);

    // Create Medicines
    const medicines = await Medicine.insertMany([
      {
        name: 'Metformin',
        dosage: '500mg',
        manufacturer: 'Sun Pharma',
        category: 'Diabetes',
        description: 'Anti-diabetic medication',
      },
      {
        name: 'Lisinopril',
        dosage: '10mg',
        manufacturer: 'Cipla',
        category: 'Blood Pressure',
        description: 'Used to treat high blood pressure',
      },
      {
        name: 'Vitamin D3',
        dosage: '60K',
        manufacturer: 'Abbott',
        category: 'Supplements',
        description: 'Vitamin supplement',
      },
      {
        name: 'Paracetamol',
        dosage: '500mg',
        manufacturer: 'GSK',
        category: 'Pain Relief',
        description: 'Common pain reliever and fever reducer',
      },
      {
        name: 'Amoxicillin',
        dosage: '250mg',
        manufacturer: 'Pfizer',
        category: 'Antibiotics',
        description: 'Common antibiotic medication',
      },
    ]);

    // Create Prescription for Test User
    await Prescription.create({
      patient: testUser._id,
      status: 'Active',
      medicines: [
        {
          medicine: medicines[0]._id,
          customName: 'Metformin 500mg',
          dosage: '1 tablet',
          time: '08:00 AM',
          taken: true,
        },
        {
          medicine: medicines[1]._id,
          customName: 'Lisinopril 10mg',
          dosage: '1 tablet',
          time: '01:00 PM',
          taken: false,
        },
        {
          medicine: medicines[2]._id,
          customName: 'Vitamin D3',
          dosage: '1 softgel',
          time: '08:00 PM',
          taken: false,
        },
      ],
    });

    // Create Medical Records for Test User
    await MedicalRecord.create([
      {
        patient: testUser._id,
        title: 'CBC & Metabolic Panel',
        type: 'Lab Report',
        description: 'Routine blood checkup. All vitals normal except slight Vitamin D deficiency.',
        hospital: 'Apollo Hospital',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        createdAt: new Date('2026-04-22T10:00:00Z'),
      },
      {
        patient: testUser._id,
        title: 'Chest X-Ray',
        type: 'X-Ray',
        description: 'Clear lungs. No abnormalities detected.',
        hospital: 'Fortis Hospital',
        fileUrl:
          'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=1000&q=80',
        createdAt: new Date('2026-04-10T14:30:00Z'),
      },
      {
        patient: testUser._id,
        title: 'ECG Report',
        type: 'Scan',
        description: 'Normal sinus rhythm.',
        hospital: 'Max Healthcare',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        createdAt: new Date('2026-02-20T09:15:00Z'),
      },
    ]);

    // Create Prices
    await Price.insertMany([
      { pharmacy: pharmacies[0]._id, medicine: medicines[0]._id, price: 45, discount: 5 },
      { pharmacy: pharmacies[1]._id, medicine: medicines[0]._id, price: 42, discount: 2 },
      { pharmacy: pharmacies[0]._id, medicine: medicines[1]._id, price: 120, discount: 10 },
      { pharmacy: pharmacies[1]._id, medicine: medicines[1]._id, price: 115, discount: 0 },
      { pharmacy: pharmacies[0]._id, medicine: medicines[3]._id, price: 25, discount: 10 },
      { pharmacy: pharmacies[1]._id, medicine: medicines[3]._id, price: 28, discount: 5 },
      { pharmacy: pharmacies[2]._id, medicine: medicines[3]._id, price: 22, discount: 0 },
      { pharmacy: pharmacies[0]._id, medicine: medicines[4]._id, price: 85, discount: 15 },
      { pharmacy: pharmacies[1]._id, medicine: medicines[4]._id, price: 90, discount: 10 },
    ]);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

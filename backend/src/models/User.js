import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, 
    },
    role: {
      type: String,
      enum: ['Patient', 'Doctor', 'Admin'],
      default: 'Patient',
    },
    profilePic: {
      type: String,
    },
    
    specialty: {
      type: String,
      required: function () {
        return this.role === 'Doctor';
      },
    },
    hospital: {
      type: String,
      required: function () {
        return this.role === 'Doctor';
      },
    },
    medicalLicenseId: {
      type: String,
      required: function () {
        return this.role === 'Doctor';
      },
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
    },
    orgEmail: {
      type: String,
    },
    licenseCertificateUrl: {
      type: String,
    },
    
    patientId: {
      type: String,
      unique: true,
      sparse: true,
    },
    dateOfBirth: {
      type: Date,
    },
    bloodGroup: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    
    vitals: {
      heartRate: { value: Number, unit: { type: String, default: 'bpm' } },
      bloodPressure: { value: String, unit: { type: String, default: 'mmHg' } },
      glucose: { value: Number, unit: { type: String, default: 'mg/dL' } },
      spO2: { value: Number, unit: { type: String, default: '%' } },
    },
    isBanned: { type: Boolean, default: false },
    plan: {
      type: String,
      enum: ['Free', 'Pro'],
      default: 'Free',
    },
    preferences: {
      vitals: { type: Boolean, default: true },
      priceDrops: { type: Boolean, default: false },
      appointments: { type: Boolean, default: true },
      records: { type: Boolean, default: false },
      passwordLastChanged: { type: String, default: '3 months ago' },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

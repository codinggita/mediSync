import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
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
    doctorName: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    date: {
      type: String, // e.g. "Today", "Tomorrow", or ISO string
      required: true,
    },
    time: {
      type: String, // e.g. "10:00 AM - 10:30 AM"
      required: true,
    },
    type: {
      type: String,
      enum: ['Video Consult', 'In Person'],
      default: 'Video Consult',
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Scheduled', 'Completed', 'Canceled', 'Pending', 'Confirmed'],
      default: 'Pending',
    },
    location: {
      type: String,
    },
    meetingLink: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;

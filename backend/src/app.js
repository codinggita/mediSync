import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import recordRoutes from './routes/recordRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/appointments', appointmentRoutes);

// ── PRODUCTION CONFIGURATION ──────────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(distPath));

  app.get('(.*)', (req, res) => res.sendFile(path.resolve(distPath, 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('MediSync API is running in development mode...');
  });
}

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;

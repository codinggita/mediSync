import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());

// 🌐 Universal Production CORS (Supports Vercel Previews & Main Site)
const allowedOrigins = [
  'https://medi-sync-rho.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const isVercel = origin.endsWith('.vercel.app');
    const isLocal = origin.startsWith('http://localhost');
    
    if (allowedOrigins.indexOf(origin) !== -1 || isVercel || isLocal) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: Origin not authorized by MediSync Security'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🩺 Clinical Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'active', message: 'MediSync Clinical Backend is Synchronized' });
});

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
}

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

  app.get('*any', (req, res) => res.sendFile(path.resolve(distPath, 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('MediSync API is running in development mode...');
  });
}

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;

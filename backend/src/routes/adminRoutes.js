import express from 'express';
import {
  getAllUsers, getUserById, updateUserByAdmin, deleteUser, getPlatformStats, toggleUserBan,
  addDoctorByAdmin,
  getAllPharmacies, verifyPharmacy, deletePharmacy,
} from '../controllers/adminController.js';
import {
  getAdminMedicines, createAdminMedicine, updateAdminMedicine, deleteAdminMedicine,
  getAllPrices, upsertPrice, comparePrices,
  getAnalytics, getAlerts,
} from '../controllers/adminServiceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes: must be logged in AND have role === 'Admin'
router.use(protect, admin);

// ── STATS ────────────────────────────────────────────────────────────────────
router.get('/stats', getPlatformStats);

// ── USERS ────────────────────────────────────────────────────────────────────
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserByAdmin);
router.patch('/users/:id/ban', toggleUserBan);
router.delete('/users/:id', deleteUser);
router.post('/doctors', addDoctorByAdmin);

// ── PHARMACIES ───────────────────────────────────────────────────────────────
router.get('/pharmacies', getAllPharmacies);
router.patch('/pharmacies/:id/verify', verifyPharmacy);
router.delete('/pharmacies/:id', deletePharmacy);

// ── MEDICINES ────────────────────────────────────────────────────────────────
router.get('/medicines', getAdminMedicines);
router.post('/medicines', createAdminMedicine);
router.put('/medicines/:id', updateAdminMedicine);
router.delete('/medicines/:id', deleteAdminMedicine);

// ── PRICES ───────────────────────────────────────────────────────────────────
router.get('/prices', getAllPrices);
router.post('/prices', upsertPrice);
router.get('/prices/compare/:medicineId', comparePrices);

// ── ANALYTICS ────────────────────────────────────────────────────────────────
router.get('/analytics', getAnalytics);

// ── ALERTS ───────────────────────────────────────────────────────────────────
router.get('/alerts', getAlerts);

export default router;

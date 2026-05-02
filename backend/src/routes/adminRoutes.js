import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserByAdmin,
  deleteUser,
  getPlatformStats,
  toggleUserBan,
  addDoctorByAdmin,
} from '../controllers/adminController.js';
import {
  getAllPharmacies,
  verifyPharmacy,
  deletePharmacy,
} from '../controllers/pharmacyAdminController.js';
import {
  getAdminMedicines,
  createAdminMedicine,
  updateAdminMedicine,
  deleteAdminMedicine,
  getAllPrices,
  upsertPrice,
  comparePrices,
  getAnalytics,
  getAlerts,
} from '../controllers/adminServiceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(protect, admin);


router.get('/stats', getPlatformStats);


router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserByAdmin);
router.patch('/users/:id/ban', toggleUserBan);
router.delete('/users/:id', deleteUser);
router.post('/doctors', addDoctorByAdmin);


router.get('/pharmacies', getAllPharmacies);
router.patch('/pharmacies/:id/verify', verifyPharmacy);
router.delete('/pharmacies/:id', deletePharmacy);


router.get('/medicines', getAdminMedicines);
router.post('/medicines', createAdminMedicine);
router.put('/medicines/:id', updateAdminMedicine);
router.delete('/medicines/:id', deleteAdminMedicine);


router.get('/prices', getAllPrices);
router.post('/prices', upsertPrice);
router.get('/prices/compare/:medicineId', comparePrices);


router.get('/analytics', getAnalytics);


router.get('/alerts', getAlerts);

export default router;

import express from 'express';
import { 
  registerPharmacy, 
  getVerifiedPharmacies, 
  getPendingPharmacies, 
  updatePharmacyStatus 
} from '../controllers/pharmacyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', protect, registerPharmacy);
router.get('/verified', getVerifiedPharmacies);
router.get('/pending', protect, admin, getPendingPharmacies);
router.patch('/:id/status', protect, admin, updatePharmacyStatus);

export default router;

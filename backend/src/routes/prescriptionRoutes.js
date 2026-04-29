import express from 'express';
import {
  getMyPrescription,
  updateMedicationStatus,
  addMedication,
} from '../controllers/prescriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my', protect, getMyPrescription);
router.patch('/status', protect, updateMedicationStatus);
router.post('/add', protect, addMedication);

export default router;

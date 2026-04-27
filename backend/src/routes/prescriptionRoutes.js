import express from 'express';
import { getMyPrescription, updateMedicationStatus } from '../controllers/prescriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my', protect, getMyPrescription);
router.patch('/status', protect, updateMedicationStatus);

export default router;

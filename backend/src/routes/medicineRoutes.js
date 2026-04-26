import express from 'express';
import { getMedicines, getMedicinePrices, createMedicine } from '../controllers/medicineController.js';

const router = express.Router();

router.get('/', getMedicines);
router.get('/:id/prices', getMedicinePrices);
router.post('/', createMedicine);

export default router;

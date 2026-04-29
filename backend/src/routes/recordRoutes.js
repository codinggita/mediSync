import express from 'express';
import {
  getRecords,
  createRecord,
  getRecordById,
  shareRecord,
  deleteRecord,
} from '../controllers/recordController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getRecords).post(protect, createRecord);

router.post('/share', protect, shareRecord);

router.route('/:id').get(protect, getRecordById).delete(protect, deleteRecord);

export default router;

import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateVitals,
  getDoctors,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.put('/vitals', updateVitals);
router.get('/doctors', getDoctors);

export default router;

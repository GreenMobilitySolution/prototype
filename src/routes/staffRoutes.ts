import { Router } from 'express';
import StaffController from '../controllers/StaffController';
import { isManagerAuth } from '../middleware/isAuth';

const router = Router();

// Register a new user
router.post('/add', isManagerAuth, StaffController.register);

export default router;
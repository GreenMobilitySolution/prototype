
import accountRoutes from './accountRoutes';
import { Router } from 'express';
import path from 'path';
import authRoutes from './authRoutes';
import staffRoutes from './staffRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/account', accountRoutes);
router.use('/staff', staffRoutes);
export default router;
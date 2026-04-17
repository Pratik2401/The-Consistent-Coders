import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import healthRoutes from '../modules/health/health.routes.js';
import profileRoutes from '../modules/profile/profile.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/health', healthRoutes);
router.use('/profile', profileRoutes);

export default router;

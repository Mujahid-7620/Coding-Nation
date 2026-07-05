import { Router } from 'express';
import authRoutes from './auth.routes';
import courseRoutes from './course.routes';
import jobRoutes from './job.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import aiRoutes from './ai.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/jobs', jobRoutes);
router.use('/admin', adminRoutes);
router.use('/ai', aiRoutes);

export default router;

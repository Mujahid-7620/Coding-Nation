import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

// Protect all admin routes
router.use(authenticate, authorize(['ADMIN', 'SUPER_ADMIN']));

router.get('/analytics', adminController.getAnalytics);
router.get('/users', adminController.getUsers);
router.get('/roles', adminController.getRoles);

export default router;


import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// All roles can access their own profile
router.get('/me', authenticate, userController.getProfile);

export default router;

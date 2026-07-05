import { Router } from 'express';
import * as courseController from '../controllers/course.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { courseSchema } from '../validations';

const router = Router();

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

// Protected
router.post('/', authenticate, authorize(['TRAINER', 'ADMIN']), validateRequest(courseSchema), courseController.createCourse);

export default router;

import { Router } from 'express';
import * as jobController from '../controllers/job.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { z } from 'zod';

const router = Router();

const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  salaryRange: z.string().optional(),
});

const applySchema = z.object({
  resumeUrl: z.string().url(),
});

router.get('/', jobController.getJobs);

// HR only
router.post('/', authenticate, authorize(['HR', 'ADMIN']), validateRequest(jobSchema), jobController.createJob);

// Student only
router.post('/:jobId/apply', authenticate, authorize(['STUDENT']), validateRequest(applySchema), jobController.applyForJob);

export default router;

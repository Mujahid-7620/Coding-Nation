import { Router } from 'express';
import * as aiController from '../controllers/ai.controller';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Protect all AI routes
router.use(authenticate);

router.post('/gemini', aiController.generateWithGemini);
router.post('/openai', aiController.generateWithOpenAI);
router.post('/resume-check', aiController.analyzeResume);
router.post('/roadmap', aiController.generateRoadmap);
router.post('/mock-interview', aiController.mockInterview);
router.post('/coding-assistant', aiController.codingAssistant);

export default router;

import { Request, Response, NextFunction } from 'express';
import { GeminiService } from '../services/gemini.service';
import { OpenAIService } from '../services/openai.service';

export const generateWithGemini = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }
    const result = await GeminiService.generateContent(prompt);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    next(error);
  }
};

export const generateWithOpenAI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }
    const result = await OpenAIService.generateContent(prompt);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    next(error);
  }
};

export const analyzeResume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const result = await GeminiService.analyzeResume(resumeText, jobDescription);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    next(error);
  }
};

export const generateRoadmap = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { goal, currentSkills } = req.body;
    const result = await GeminiService.generateRoadmap(goal, currentSkills);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    next(error);
  }
};

export const mockInterview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, userResponse } = req.body;
    const result = await GeminiService.mockInterview(role, userResponse);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    next(error);
  }
};

export const codingAssistant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, question } = req.body;
    const prompt = `Review this code:\n${code}\n\nQuestion: ${question}\n\nProvide a solution, explanation, and corrected code if necessary.`;
    const result = await GeminiService.generateContent(prompt);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    next(error);
  }
};

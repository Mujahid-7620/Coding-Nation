import { Request, Response, NextFunction } from 'express';
import { JobService } from '../services/job.service';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const job = await JobService.createJob(req.user!.id, req.body);
    res.status(201).json({ success: true, job });
  } catch (error: any) {
    next(error);
  }
};

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allJobs = await JobService.getJobs();
    res.status(200).json({ success: true, jobs: allJobs });
  } catch (error: any) {
    next(error);
  }
};

export const applyForJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const application = await JobService.applyForJob(req.user!.id, req.params.jobId, req.body.resumeUrl);
    res.status(201).json({ success: true, application });
  } catch (error: any) {
    next(error);
  }
};

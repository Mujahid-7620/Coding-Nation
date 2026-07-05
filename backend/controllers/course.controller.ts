import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../services/course.service';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const course = await CourseService.createCourse(req.user!.id, req.body);
    res.status(201).json({ success: true, course });
  } catch (error: any) {
    next(error);
  }
};

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allCourses = await CourseService.getCourses();
    res.status(200).json({ success: true, courses: allCourses });
  } catch (error: any) {
    next(error);
  }
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await CourseService.getCourseById(req.params.id);
    res.status(200).json({ success: true, course });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

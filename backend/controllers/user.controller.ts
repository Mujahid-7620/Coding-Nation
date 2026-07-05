import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const profile = await UserService.getProfile(req.user!.id);
    res.status(200).json({ success: true, profile });
  } catch (error: any) {
    next(error);
  }
};

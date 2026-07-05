import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const analytics = await AdminService.getAnalytics();
    res.status(200).json({ success: true, analytics });
  } catch (error: any) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usersList = await AdminService.getUsers();
    res.status(200).json({ success: true, users: usersList });
  } catch (error: any) {
    next(error);
  }
};

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rolesList = await AdminService.getRoles();
    res.status(200).json({ success: true, roles: rolesList });
  } catch (error: any) {
    next(error);
  }
};


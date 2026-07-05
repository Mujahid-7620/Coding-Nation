import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { db } from '../db/connection';
import { users, userRoles, roles } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: string[];
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       res.status(401).json({ message: 'Unauthorized - No token provided' });
       return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string };

    const userRecords = await db.select({
      id: users.id,
      email: users.email,
      roleName: roles.name,
    })
    .from(users)
    .leftJoin(userRoles, eq(users.id, userRoles.userId))
    .leftJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(users.id, decoded.id));

    if (!userRecords.length) {
       res.status(401).json({ message: 'Unauthorized - User not found' });
       return;
    }

    req.user = {
      id: userRecords[0].id,
      email: userRecords[0].email,
      roles: userRecords.map(r => r.roleName).filter(Boolean) as string[],
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

export const authorize = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
      return;
    }
    
    next();
  };
};

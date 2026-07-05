import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const generateTokens = (userId: string, email: string) => {
  const accessToken = jwt.sign({ id: userId, email }, env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId, email }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

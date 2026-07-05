import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  roleName: z.enum(['STUDENT', 'TRAINER', 'HR', 'ADMIN', 'SUPER_ADMIN']).default('STUDENT'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const requestOtpSchema = z.object({
  email: z.string().email(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(6),
});

export const oAuthLoginSchema = z.object({
  token: z.string(), // ID token from Google or Access Token from Github
  provider: z.enum(['google', 'github']),
});

export const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
});

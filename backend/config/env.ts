import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string().default('postgres://postgres:postgres@localhost:5432/edtech'),
  JWT_SECRET: z.string().default('my_super_secret_jwt_key'),
  JWT_REFRESH_SECRET: z.string().default('my_super_secret_refresh_jwt_key'),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  APP_URL: z.string().default('http://localhost:3000'),
});

export const env = envSchema.parse(process.env);

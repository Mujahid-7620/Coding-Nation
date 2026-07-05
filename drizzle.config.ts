import { defineConfig } from 'drizzle-kit';
import { env } from './backend/config/env';

export default defineConfig({
  schema: './backend/db/schema.ts',
  out: './backend/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});

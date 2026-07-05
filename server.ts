import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import { env } from './backend/config/env';
import logger from './backend/config/logger';
import apiRoutes from './backend/routes';
import { errorHandler } from './backend/middlewares/errorHandler';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(cors({ origin: env.APP_URL, credentials: true }));
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for Vite Dev Server compatibility
  }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // API Routes
  app.use('/api/v1', apiRoutes);
  
  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date() });
  });

  // Global Error Handler
  app.use(errorHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
  });
}

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});

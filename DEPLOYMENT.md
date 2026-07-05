# Deployment Guide

This guide provides instructions on how to deploy the EdTech platform to various hosting providers.

## Environment Variables

Before deploying, ensure you have the following environment variables configured in your hosting provider's dashboard:

```env
# Required for database connection
DATABASE_URL=postgres://user:password@host:port/database

# Required for authentication (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# AI Integrations
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

# Node environment
NODE_ENV=production
```

## 1. Deploying with Docker (Any VPS, DigitalOcean, AWS EC2, etc.)

The project includes a `Dockerfile` and `docker-compose.yml` for easy deployment on any server with Docker installed.

1. Clone your repository onto the server.
2. Create a `.env` file in the root directory and populate it with the environment variables listed above.
3. Run the following command to start the application and the PostgreSQL database in the background:

```bash
docker-compose up -d --build
```

The application will be accessible on port 3000. You can optionally place NGINX (config provided in `nginx/nginx.conf`) in front of it to act as a reverse proxy and handle SSL.

## 2. Deploying to Railway (Recommended for ease of use)

Railway is excellent for full-stack Node.js applications with PostgreSQL.

1. Go to [Railway.app](https://railway.app/) and create a new project.
2. Add a **PostgreSQL** database service.
3. Connect your GitHub repository to Railway and add a new service from your repo.
4. Railway will automatically detect the `Dockerfile` or use Nixpacks to build your Node.js app.
5. Go to the variables section of your web service and add the environment variables. 
   - Use `${{Postgres.DATABASE_URL}}` for the `DATABASE_URL` if you want it dynamically linked.
6. Generate a domain in the settings of your web service.

## 3. Deploying to Vercel

While Vercel is typically for Next.js or purely frontend apps, it can run Express apps via Serverless Functions, but this project builds into a single `server.cjs` file designed for a standard Node environment. 

**Recommended approach for Vercel:**
If you want to use Vercel for the frontend, you should split the Vite frontend and Express backend into separate repositories or use Vercel for the frontend and Render/Railway for the backend.

## 4. Deploying to Render

Render is another great platform for full-stack Node applications.

1. Create a new PostgreSQL database on Render.
2. Create a new **Web Service** and connect your repository.
3. Use the following settings:
   - **Environment:** Node
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`
4. Add your Environment Variables (copy the internal database URL from your Render PostgreSQL instance).

## 5. CI/CD with GitHub Actions

The repository includes a `.github/workflows/main.yml` file that runs on every push and pull request to the `main` branch. 
It currently installs dependencies, lints the code, and builds the application to ensure it's deployable.
You can extend the `deploy` job in the workflow to automatically push to your chosen provider using their specific GitHub Action.

# AI-Powered Coding Nation Platform

A comprehensive, full-stack educational technology platform with built-in AI features powered by Gemini and OpenAI. Built with React (Vite), Express, Node.js, and PostgreSQL (via Drizzle ORM).

## Features

- **Multi-Role Dashboards:** Separate interfaces for Students, Trainers, Admins, and Recruiters.
- **Course Management:** Create, manage, and consume educational content.
- **AI Mentor:** A 24/7 learning assistant utilizing the Gemini API.
- **ATS Resume Checker:** Analyze resumes against job descriptions.
- **AI Career Counsellor:** Get personalized career advice.
- **Roadmap Generator:** Auto-generate learning paths based on skills and goals.
- **Mock Interview Simulator:** Practice interviews with an AI interviewer.
- **AI Coding Assistant:** Get code reviews and debugging help.
- **Job Board:** Post and apply to tech jobs.
- **Authentication:** Secure user authentication using JWT and bcrypt.
- **Database:** Robust relational schema with PostgreSQL.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React, Zustand (State), React Hook Form, React Router.
- **Backend:** Node.js, Express, Drizzle ORM, PostgreSQL, JSON Web Tokens (JWT).
- **AI Integrations:** Google Gemini SDK, OpenAI API.
- **Deployment:** Docker, GitHub Actions, NGINX.

## Getting Started Locally

### Prerequisites
- Node.js (v20+)
- PostgreSQL Database

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone <repo-url>
   cd react-example
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   Copy the example environment file and fill in your details:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Database Setup:**
   Ensure PostgreSQL is running. Run Drizzle migrations or push schema:
   \`\`\`bash
   npx drizzle-kit push
   \`\`\`

5. **Start Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will be running at \`http://localhost:3000\`.

## Deployment

For full deployment instructions (Docker, Railway, Render, etc.), please see [DEPLOYMENT.md](DEPLOYMENT.md).

## Testing

*Currently, manual testing is recommended for UI components. A full testing suite (Jest/Vitest) can be integrated easily.*

## CI/CD

This project uses GitHub Actions for CI. Any push or PR to the \`main\` branch will trigger a build and linting check. See \`.github/workflows/main.yml\`.

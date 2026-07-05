# Enterprise EdTech Platform - Architecture Documentation

## 1. Project Overview
This document outlines the architecture for a Production-Ready Enterprise EdTech Platform. The platform is designed to bridge the gap between education and employment by providing a unified ecosystem for learning management, skill assessment, recruitment, and AI-driven insights. It serves as a comprehensive portal where students learn, trainers educate, HR professionals recruit, and administrators govern the entire lifecycle.

## 2. Functional Requirements
* **Identity & Access Management:** Secure, role-based access control (RBAC) with Single Sign-On (SSO) and Multi-Factor Authentication (MFA).
* **Course Management Engine:** Ability to create, update, and consume multimedia courses (Video, PDF, SCORM).
* **Live Virtual Classrooms:** Integration with WebRTC/video conferencing tools for live interactive sessions.
* **Assessment & Evaluation:** Automated quizzes, coding environments, and assignment submissions with plagiarism detection.
* **Placement & Recruitment Portal:** Job board for HR to post openings, and for students to apply, complete with an interview scheduling system.
* **AI & Analytics:** AI-driven personalized learning paths, automated resume parsing, and predictive analytics for student success.
* **Communication Hub:** Internal messaging, community forums, and automated notifications (Email/SMS/Push).

## 3. Non Functional Requirements
* **Scalability:** Microservices or Modular Monolith architecture capable of supporting 100,000+ concurrent users with horizontal scaling.
* **Performance:** API response times under 200ms at the 95th percentile; 99.99% system uptime.
* **Security:** End-to-end encryption (TLS 1.3 in transit, AES-256 at rest), OWASP Top 10 compliance, and GDPR/CCPA data privacy compliance.
* **Maintainability:** Fully containerized deployments (Docker/Kubernetes), automated CI/CD pipelines, and >80% test coverage.
* **Observability:** Centralized logging, distributed tracing, and real-time metrics (e.g., Prometheus, Grafana, ELK stack).

## 4. User Roles
* **Student:** The primary consumer of content. Can enroll in courses, attend live sessions, submit assessments, build a profile/resume, and apply for jobs.
* **Trainer (Instructor):** Creates and manages course content, conducts live classes, grades manual submissions, and tracks student progress.
* **HR (Recruiter):** Represents corporate partners. Posts job listings, searches student talent pools, reviews AI-screened applications, and schedules interviews.
* **Admin:** Manages platform operations. Approves courses, handles user disputes, manages platform taxonomy (categories, skills), and oversees support tickets.
* **Super Admin:** Controls the highest level of system configuration. Manages billing, global tenant settings, super-admin provisioning, and views macro-level financial/platform analytics.

## 5. Complete Features List
1. **Auth & Security:** OAuth2.0, JWT tokens, MFA, Passwordless login, Session management.
2. **Learning Management System (LMS):** Drip content, progress tracking, bookmarks, note-taking, certification generation.
3. **Virtual Learning Environment (VLE):** Live streaming, chat, screen sharing, recording archives.
4. **Assessment Engine:** Multiple choice, subjective, peer-reviewed, and automated coding assessments.
5. **Job Board & Placements:** Applicant Tracking System (ATS), job matching algorithm, interview calendar integration.
6. **AI Module:** Resume auto-builder, skill-gap analysis, automated grading assistance, chatbot for student queries.
7. **Social & Community:** Discussion threads, upvoting, direct messaging, study groups.
8. **Admin Dashboard:** User management, content moderation queue, financial ledger, system health metrics.
9. **Support System:** Ticketing system, live chat support, knowledge base (FAQ).
10. **Notifications:** Configurable alerts via Email, SMS, and in-app push notifications.

## 6. Complete Folder Structure

```text
/edtech-platform
├── frontend/                  # React/Next.js Client Application
│   ├── components/            # Reusable UI elements (Buttons, Inputs, Modals)
│   ├── dashboard/             # Role-specific dashboard layouts and widgets
│   ├── admin/                 # Dedicated admin portal views and logic
│   ├── pages/                 # Route-based page components
│   ├── hooks/                 # Custom React hooks (e.g., useAuth, useCourse)
│   ├── store/                 # Global state management (Redux/Zustand)
│   ├── utils/                 # Helpers, formatters, and API client configs
│   └── assets/                # Static assets, icons, global styles
├── backend/                   # Node.js/TypeScript (Express or NestJS)
│   ├── api/                   # REST API Routes, Controllers, and Input Validators
│   ├── core/                  # Core Business Logic and Domain Services
│   ├── middlewares/           # Auth, Error Handling, Rate Limiting
│   ├── events/                # Pub/Sub event handlers and message queues
│   ├── utils/                 # Backend helpers (Hashers, Loggers)
│   └── tests/                 # Unit, Integration, and E2E Tests
├── ai_module/                 # Python (FastAPI) - Dedicated AI Microservice
│   ├── models/                # ML models (Resume parsing, recommendations)
│   ├── processors/            # Data preprocessing pipelines
│   └── endpoints/             # AI-specific API routes
└── database/                  # Database Management
    ├── schema/                # DDL definitions / Prisma schema
    ├── migrations/            # Version-controlled schema migrations
    ├── seeds/                 # Initial data and mock data generators
    └── queries/               # Optimized raw SQL queries or repository patterns
```

## 7. Database Design

### ER Diagram (Text Format)
```text
[Users] 1 ------ M [UserRoles] M ------ 1 [Roles]
[Users] 1 ------ M [Enrollments] M ---- 1 [Courses]
[Users] 1 ------ M [Submissions] M ---- 1 [Assessments]
[Users] 1 ------ M [Applications] M --- 1 [Jobs]
[Users] 1 ------ 1 [StudentProfiles]
[Users] 1 ------ 1 [CompanyProfiles]
[Courses] 1 ---- M [Modules]
[Modules] 1 ---- M [Lessons]
[Courses] 1 ---- M [Assessments]
[CompanyProfiles] 1 - M [Jobs]
```

### Database Tables & Schema

**1. Users Table**
* `id` (UUID, Primary Key)
* `email` (VARCHAR, Unique, Indexed)
* `password_hash` (VARCHAR)
* `first_name` (VARCHAR)
* `last_name` (VARCHAR)
* `status` (ENUM: 'active', 'suspended', 'pending')
* `created_at` (TIMESTAMP)

**2. Roles Table**
* `id` (INT, Primary Key)
* `name` (VARCHAR, Unique) - e.g., STUDENT, TRAINER, HR, ADMIN

**3. UserRoles Table**
* `user_id` (UUID, Foreign Key -> Users.id)
* `role_id` (INT, Foreign Key -> Roles.id)
* *Primary Key:* (user_id, role_id)

**4. Courses Table**
* `id` (UUID, Primary Key)
* `trainer_id` (UUID, Foreign Key -> Users.id, Indexed)
* `title` (VARCHAR)
* `description` (TEXT)
* `price` (DECIMAL)
* `status` (ENUM: 'draft', 'published', 'archived')
* `created_at` (TIMESTAMP)

**5. Modules Table**
* `id` (UUID, Primary Key)
* `course_id` (UUID, Foreign Key -> Courses.id, Indexed)
* `title` (VARCHAR)
* `sequence_order` (INT)

**6. Lessons Table**
* `id` (UUID, Primary Key)
* `module_id` (UUID, Foreign Key -> Modules.id, Indexed)
* `title` (VARCHAR)
* `content_type` (ENUM: 'video', 'pdf', 'text')
* `content_url` (VARCHAR)
* `sequence_order` (INT)

**7. Enrollments Table**
* `id` (UUID, Primary Key)
* `student_id` (UUID, Foreign Key -> Users.id, Indexed)
* `course_id` (UUID, Foreign Key -> Courses.id, Indexed)
* `progress_percentage` (DECIMAL)
* `enrolled_at` (TIMESTAMP)

**8. Jobs Table**
* `id` (UUID, Primary Key)
* `hr_id` (UUID, Foreign Key -> Users.id, Indexed)
* `title` (VARCHAR)
* `description` (TEXT)
* `requirements` (JSONB)
* `salary_range` (VARCHAR)
* `status` (ENUM: 'open', 'closed')
* `created_at` (TIMESTAMP)

**9. Applications Table**
* `id` (UUID, Primary Key)
* `student_id` (UUID, Foreign Key -> Users.id, Indexed)
* `job_id` (UUID, Foreign Key -> Jobs.id, Indexed)
* `resume_url` (VARCHAR)
* `status` (ENUM: 'applied', 'shortlisted', 'rejected', 'hired')
* `applied_at` (TIMESTAMP)

**Indexes:**
* B-Tree on `Users.email` for rapid authentication.
* B-Tree on `Enrollments.student_id` and `Enrollments.course_id`.
* B-Tree on `Applications.job_id` and `Applications.student_id`.
* GIN Index on `Jobs.requirements` (if using PostgreSQL JSONB for skill matching).

## 8. API Architecture (RESTful)

### Auth APIs
* **Login**
  * `Method:` POST
  * `URL:` `/api/v1/auth/login`
  * `Request:` `{ "email": "", "password": "" }`
  * `Response:` `{ "token": "jwt...", "user": { "id": "...", "roles": [...] } }`
  * `Auth:` None
  * `Validation:` Valid email format, password presence.

### User APIs
* **Get Profile**
  * `Method:` GET
  * `URL:` `/api/v1/users/me`
  * `Request:` Headers: `Authorization: Bearer <token>`
  * `Response:` `{ "id": "...", "name": "...", "profile_data": {} }`
  * `Auth:` Required (JWT)

### Course APIs
* **Create Course**
  * `Method:` POST
  * `URL:` `/api/v1/courses`
  * `Request:` `{ "title": "...", "description": "...", "price": 0.00 }`
  * `Response:` `{ "id": "...", "status": "created" }`
  * `Auth:` Required (JWT)
  * `Authorization:` Role = TRAINER or ADMIN
  * `Validation:` Title length, positive price.

* **Get Course Details**
  * `Method:` GET
  * `URL:` `/api/v1/courses/:id`
  * `Request:` None
  * `Response:` `{ "id": "...", "modules": [...] }`
  * `Auth:` Required (JWT)
  * `Authorization:` Role = Any (if published)

### Job & Placement APIs
* **Post a Job**
  * `Method:` POST
  * `URL:` `/api/v1/jobs`
  * `Request:` `{ "title": "...", "description": "...", "requirements": [...] }`
  * `Response:` `{ "id": "...", "status": "open" }`
  * `Auth:` Required (JWT)
  * `Authorization:` Role = HR
  * `Validation:` Title required, valid requirement tags.

* **Apply for Job**
  * `Method:` POST
  * `URL:` `/api/v1/jobs/:jobId/apply`
  * `Request:` `{ "resume_url": "..." }`
  * `Response:` `{ "application_id": "...", "status": "applied" }`
  * `Auth:` Required (JWT)
  * `Authorization:` Role = STUDENT

## 9. UI Sitemap

* **/ (Home - Landing Page)**
  * `/about` (About Us)
  * `/contact` (Contact & Support)
  * `/pricing` (Platform Fees / Enterprise Plans)
* **/courses (Course Catalog)**
  * `/courses/:id` (Course Details & Syllabus)
  * `/courses/:id/learn` (Active Learning Video Player/Viewer)
* **/admissions**
  * `/admissions/apply` (Enrollment Form)
  * `/admissions/status` (Application Tracking)
* **/placements (Job Portal)**
  * `/placements/jobs` (Job Listings)
  * `/placements/jobs/:id` (Job Details)
  * `/placements/companies` (Partner Companies)
* **/dashboard (Role-based Routing)**
  * `/dashboard/student` (My Courses, My Applications, AI Resume)
  * `/dashboard/trainer` (My Content, Revenue, Student Analytics)
  * `/dashboard/hr` (My Postings, Applicant Tracking, Interviews)
* **/admin (Administration Portal)**
  * `/admin/users` (User Management)
  * `/admin/courses` (Content Moderation & Approvals)
  * `/admin/reports` (Financials & System Health)
  * `/admin/settings` (Global Configuration)
* **/blog**
  * `/blog/:slug` (Individual Article)
* **/community**
  * `/community/forums` (Discussion Boards)
  * `/community/groups` (Study Groups)
* **/support**
  * `/support/faq` (Knowledge Base)
  * `/support/tickets` (My Tickets)

## 10. Project Roadmap

**Phase 1: Discovery & Architecture (Weeks 1-2)**
* Finalize requirements, tech stack selection, and environment setup.
* Design DB schemas, API contracts, and UI/UX wireframes.
* Set up CI/CD pipelines and infrastructure (Docker, cloud provider).

**Phase 2: Core Platform & Authentication (Weeks 3-5)**
* Implement RBAC (Student, Trainer, HR, Admin, Super Admin).
* Develop user profile modules and SSO integrations.
* Build foundational UI layouts (navbars, footers, dashboard shells).

**Phase 3: LMS & Content Delivery (Weeks 6-10)**
* Develop Course Creator tools (Video upload, text editor).
* Build the Student learning interface and progress tracker.
* Implement the assessment engine (quizzes and assignments).

**Phase 4: Placements & VLE Integration (Weeks 11-14)**
* Build the Job Board and Applicant Tracking System (ATS).
* Integrate WebRTC/Third-party providers for live streaming classes.
* Develop scheduling calendars for interviews and live classes.

**Phase 5: AI Integration & Analytics (Weeks 15-18)**
* Deploy FastAPI Python microservice for AI features.
* Integrate AI resume parsing and job-matching algorithms.
* Build reporting dashboards (Admin global stats, Trainer revenue).

**Phase 6: QA, UAT & Launch (Weeks 19-22)**
* Conduct comprehensive security audits, load testing, and penetration testing.
* User Acceptance Testing (UAT) with a closed beta group.
* Final bug squashing, optimization, and production deployment.

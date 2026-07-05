import { pgTable, uuid, varchar, text, timestamp, decimal, integer, jsonb, primaryKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums (handled as text in PG for simplicity or pgEnum, using text for ease)

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  status: varchar('status', { length: 20 }).default('active'), // active, suspended, pending
  authProvider: varchar('auth_provider', { length: 50 }).default('local'), // local, google, github
  providerId: varchar('provider_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const roles = pgTable('roles', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 50 }).unique().notNull(), // STUDENT, TRAINER, HR, ADMIN, SUPER_ADMIN
});

export const userRoles = pgTable('user_roles', {
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  roleId: integer('role_id').references(() => roles.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.roleId] }),
}));

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const otpCodes = pgTable('otp_codes', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  code: varchar('code', { length: 10 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  trainerId: uuid('trainer_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  status: varchar('status', { length: 20 }).default('draft'), // draft, published, archived
  createdAt: timestamp('created_at').defaultNow(),
});

export const modules = pgTable('modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  sequenceOrder: integer('sequence_order').default(0),
});

export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  moduleId: uuid('module_id').references(() => modules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  contentType: varchar('content_type', { length: 50 }), // video, pdf, text
  contentUrl: varchar('content_url', { length: 255 }),
  sequenceOrder: integer('sequence_order').default(0),
});

export const enrollments = pgTable('enrollments', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  progressPercentage: decimal('progress_percentage', { precision: 5, scale: 2 }).default('0'),
  enrolledAt: timestamp('enrolled_at').defaultNow(),
});

export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  hrId: uuid('hr_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  requirements: jsonb('requirements'),
  salaryRange: varchar('salary_range', { length: 100 }),
  status: varchar('status', { length: 20 }).default('open'), // open, closed
  createdAt: timestamp('created_at').defaultNow(),
});

export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }),
  resumeUrl: varchar('resume_url', { length: 255 }),
  status: varchar('status', { length: 20 }).default('applied'), // applied, shortlisted, rejected, hired
  appliedAt: timestamp('applied_at').defaultNow(),
});

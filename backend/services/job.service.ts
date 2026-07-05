import { db } from '../db/connection';
import { jobs, applications } from '../db/schema';
import { eq } from 'drizzle-orm';

export class JobService {
  static async createJob(hrId: string, data: any) {
    const [job] = await db.insert(jobs).values({
      hrId,
      title: data.title,
      description: data.description,
      requirements: data.requirements || [],
      salaryRange: data.salaryRange,
    }).returning();
    return job;
  }

  static async getJobs() {
    return await db.select().from(jobs);
  }

  static async applyForJob(studentId: string, jobId: string, resumeUrl: string) {
    const [application] = await db.insert(applications).values({
      studentId,
      jobId,
      resumeUrl,
    }).returning();
    return application;
  }
}

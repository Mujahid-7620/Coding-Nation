import { db } from '../db/connection';
import { courses, modules, lessons } from '../db/schema';
import { eq } from 'drizzle-orm';

export class CourseService {
  static async createCourse(trainerId: string, data: any) {
    const [course] = await db.insert(courses).values({
      trainerId,
      title: data.title,
      description: data.description,
      price: data.price ? data.price.toString() : '0',
    }).returning();
    return course;
  }

  static async getCourses() {
    return await db.select().from(courses);
  }

  static async getCourseById(id: string) {
    const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
    if (!course) throw new Error('Course not found');
    
    const courseModules = await db.select().from(modules).where(eq(modules.courseId, id));
    // Fetch lessons for modules here if needed in real app
    
    return { ...course, modules: courseModules };
  }
}

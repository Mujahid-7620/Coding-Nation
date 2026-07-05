import { db } from '../db/connection';
import { users, courses, jobs, roles, userRoles } from '../db/schema';
import { count, eq } from 'drizzle-orm';

export class AdminService {
  static async getAnalytics() {
    const [userCount] = await db.select({ value: count() }).from(users);
    const [courseCount] = await db.select({ value: count() }).from(courses);
    const [jobCount] = await db.select({ value: count() }).from(jobs);

    // Mock revenue/growth for UI purposes
    return {
      totalUsers: userCount.value,
      totalCourses: courseCount.value,
      totalJobs: jobCount.value,
      revenue: 24500,
      activeStudents: Math.floor(userCount.value * 0.8),
    };
  }

  static async getUsers() {
    const userRecords = await db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      status: users.status,
      roleName: roles.name,
      createdAt: users.createdAt,
    })
    .from(users)
    .leftJoin(userRoles, eq(users.id, userRoles.userId))
    .leftJoin(roles, eq(userRoles.roleId, roles.id));

    // Group roles by user id
    const usersMap = new Map();
    userRecords.forEach(u => {
      if (!usersMap.has(u.id)) {
        usersMap.set(u.id, {
          id: u.id,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          status: u.status,
          createdAt: u.createdAt,
          roles: []
        });
      }
      if (u.roleName) {
        usersMap.get(u.id).roles.push(u.roleName);
      }
    });

    return Array.from(usersMap.values());
  }

  static async getRoles() {
    const allRoles = await db.select().from(roles);
    return allRoles;
  }
}


import { db } from '../db/connection';
import { users, roles, userRoles } from '../db/schema';
import { eq } from 'drizzle-orm';

export class UserService {
  static async getProfile(userId: string) {
    const userRecords = await db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      roleName: roles.name,
      status: users.status,
      createdAt: users.createdAt,
    })
    .from(users)
    .leftJoin(userRoles, eq(users.id, userRoles.userId))
    .leftJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(users.id, userId));

    if (!userRecords.length) throw new Error('User not found');

    const profile = {
      id: userRecords[0].id,
      email: userRecords[0].email,
      firstName: userRecords[0].firstName,
      lastName: userRecords[0].lastName,
      status: userRecords[0].status,
      createdAt: userRecords[0].createdAt,
      roles: userRecords.map(r => r.roleName).filter(Boolean) as string[],
    };

    return profile;
  }
}

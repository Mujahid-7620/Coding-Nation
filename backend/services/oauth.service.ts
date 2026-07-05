import { db } from '../db/connection';
import { users, roles, userRoles } from '../db/schema';
import { eq } from 'drizzle-orm';
import { generateTokens } from '../utils/jwt';
import { AuthService } from './auth.service';

export class OAuthService {
  static async handleOAuthLogin(provider: string, profile: any) {
    const existing = await db.select().from(users).where(eq(users.email, profile.email)).limit(1);
    
    let user = existing[0];
    if (!user) {
      const role = await AuthService.getRoleByName('STUDENT'); // default role
      
      const [newUser] = await db.insert(users).values({
        email: profile.email,
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        authProvider: provider,
        providerId: profile.id,
      }).returning();
      
      await db.insert(userRoles).values({ userId: newUser.id, roleId: role.id });
      user = newUser;
    }

    const tokens = generateTokens(user.id, user.email);
    const userRolesList = await db.select({ name: roles.name }).from(userRoles).innerJoin(roles, eq(userRoles.roleId, roles.id)).where(eq(userRoles.userId, user.id));

    return { ...tokens, user: { id: user.id, email: user.email, roles: userRolesList.map(r => r.name) } };
  }
}

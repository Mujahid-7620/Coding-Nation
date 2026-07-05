import { db } from '../db/connection';
import { users, roles, userRoles, refreshTokens, otpCodes } from '../db/schema';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt';
import otpGenerator from 'otp-generator';

export class AuthService {
  static async getRoleByName(roleName: string) {
    const roleRecord = await db.select().from(roles).where(eq(roles.name, roleName)).limit(1);
    if (roleRecord.length > 0) return roleRecord[0];
    
    // Auto-create role if missing (only for bootstrapping, ideally seeds handle this)
    const newRole = await db.insert(roles).values({ id: Math.floor(Math.random() * 10000), name: roleName }).returning();
    return newRole[0];
  }

  static async register(data: any) {
    const existing = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (existing.length > 0) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const role = await this.getRoleByName(data.roleName);

    const [user] = await db.insert(users).values({
      email: data.email,
      passwordHash: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    }).returning();

    await db.insert(userRoles).values({ userId: user.id, roleId: role.id });

    return { message: 'User registered successfully' };
  }

  static async login(data: any) {
    const [user] = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (!user || !user.passwordHash) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');

    const tokens = generateTokens(user.id, user.email);
    
    // Save refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await db.insert(refreshTokens).values({
      userId: user.id,
      token: tokens.refreshToken,
      expiresAt
    });

    const userRolesList = await db.select({ name: roles.name }).from(userRoles).innerJoin(roles, eq(userRoles.roleId, roles.id)).where(eq(userRoles.userId, user.id));

    return { ...tokens, user: { id: user.id, email: user.email, roles: userRolesList.map(r => r.name) } };
  }

  static async requestOtp(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) throw new Error('User not found');

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    await db.insert(otpCodes).values({ email, code: otp, expiresAt });
    // In real app: send email via nodemailer
    console.log(`OTP for ${email}: ${otp}`);

    return { message: 'OTP sent to email' };
  }

  static async verifyOtp(email: string, code: string) {
    const [otpRecord] = await db.select().from(otpCodes)
      .where(and(eq(otpCodes.email, email), eq(otpCodes.code, code), gt(otpCodes.expiresAt, new Date())))
      .limit(1);
    
    if (!otpRecord) throw new Error('Invalid or expired OTP');

    // delete otp
    await db.delete(otpCodes).where(eq(otpCodes.id, otpRecord.id));

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const tokens = generateTokens(user.id, user.email);
    
    const userRolesList = await db.select({ name: roles.name }).from(userRoles).innerJoin(roles, eq(userRoles.roleId, roles.id)).where(eq(userRoles.userId, user.id));
    return { ...tokens, user: { id: user.id, email: user.email, roles: userRolesList.map(r => r.name) } };
  }
}

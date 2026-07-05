import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { OAuthService } from '../services/oauth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body);
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ success: true, accessToken: result.accessToken, user: result.user });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.requestOtp(req.body.email);
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.verifyOtp(req.body.email, req.body.code);
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ success: true, accessToken: result.accessToken, user: result.user });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const oauthLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { provider, token } = req.body;
    // In a real scenario, you verify the token with Google/Github here to get the profile
    // For demo purposes, we assume the token is a JSON string of the profile
    const profile = JSON.parse(token); 
    const result = await OAuthService.handleOAuthLogin(provider, profile);
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ success: true, accessToken: result.accessToken, user: result.user });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema, requestOtpSchema, verifyOtpSchema, oAuthLoginSchema } from '../validations';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/otp/request', validateRequest(requestOtpSchema), authController.requestOtp);
router.post('/otp/verify', validateRequest(verifyOtpSchema), authController.verifyOtp);
router.post('/oauth', validateRequest(oAuthLoginSchema), authController.oauthLogin);

export default router;

import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refresh);
router.get('/me', AuthMiddleware, AuthController.getMe);
router.get('/verify-email', AuthController.verifyEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/validate-reset-code', AuthController.validateResetCode);
router.post('/reset-password', AuthController.resetPassword);

export { router as authRoutes };

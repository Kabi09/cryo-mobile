import express from 'express';
import { login, refresh, logout, getMe, changePassword, resetPassword } from '../controllers/auth/authController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/permission.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, refreshSchema, changePasswordSchema, resetPasswordSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refresh);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.post('/change-password', authenticate, validate(changePasswordSchema), changePassword);
router.post('/reset-password', authenticate, requireAdmin, validate(resetPasswordSchema), resetPassword);

export default router;

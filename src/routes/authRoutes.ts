import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/authController';

const router = express.Router();

// Route: POST /api/auth/request-password-reset
router.post('/request-password-reset', requestPasswordReset);

// Route: POST /api/auth/reset-password/:token
router.post('/reset-password/:token', resetPassword);

export default router;

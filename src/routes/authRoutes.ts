//src/routes/authRoutes.ts
import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/authController';

const router = express.Router();

// Route: POST /api/request-password-reset
router.post('/api/request-password-reset', requestPasswordReset);

// Route: POST /api/reset-password/:token
router.post('/api/reset-password/:token', resetPassword);

export default router;

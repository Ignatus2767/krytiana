// src/routes/authRoute.ts
import express from 'express';
import { requestPasswordReset, resetPassword, validateToken } from '../controllers/authController';

const router = express.Router();

// Password Reset Routes
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

// Token Validation Route
router.get('/validate-token',  validateToken);

export default router;


//src/routes/authRoutes.ts
import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/authController';

const router = express.Router();

// Route: POST /api/request-password-reset
router.post('/api/request-password-reset', requestPasswordReset);

// ❌ Wrong: router.post('/api/reset-password/:token', resetPassword);
// ✅ Correct:
router.post('/api/reset-password', resetPassword);

export default router;


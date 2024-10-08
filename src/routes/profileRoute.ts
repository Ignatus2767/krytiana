// src/routes/profileRoute.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getProfile } from '../controllers/profileController'; // Correct function name

const router = Router();

// Profile route
router.get('/profile', authenticateToken, getProfile); // Use the correct function

export default router;

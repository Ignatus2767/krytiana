// myapp/src/routes/userRoutes.ts
import { Router } from 'express';
import { handleSignUp, handleSignIn, handleForgotPassword } from '../controllers/userController';

import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.post('/forgot-password', handleForgotPassword);

router.get('/profile', authenticateToken, (req, res) => {
  // Since `authenticateToken` attaches `req.user`, we can access it here
  const user = req.user;

  // Respond with user details
  res.json({
    success: true,
    message: 'Welcome to your profile',
    username: user?.username, // Send username back to the client
  });
});


export default router;


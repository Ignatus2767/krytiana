// myapp/src/routes/userRoutes.ts
import { Router } from 'express';
import { handleSignUp, handleSignIn, handleForgotPassword } from '../controllers/userController';

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.post('/forgot-password', handleForgotPassword);

export default router;


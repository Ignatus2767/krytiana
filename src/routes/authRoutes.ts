//src/routes/authRoutes.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import express from 'express';
import { db } from '../config/mongo'; // Import MongoDB connection
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB queries
import { requestPasswordReset, resetPassword } from '../controllers/authController';

const router = express.Router();

// Route: POST /api/refresh-token
router.post('/api/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

    // Convert userId to ObjectId for MongoDB
    const userObjectId = new ObjectId(decoded.userId);

    // Fetch user from MongoDB
    const user = await db.collection("users").findOne({ _id: userObjectId });

    // Check if user exists
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Check if refresh token in database matches the one sent
    if (user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user._id.toString(), email: user.email, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' } // New access token expires in 15 minutes
    );

    // Send new access token to the frontend
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Failed to verify refresh token' });
  }
});

// Route: POST /api/request-password-reset
router.post('/api/request-password-reset', requestPasswordReset);

// Route: POST /api/reset-password
router.post('/api/reset-password', resetPassword);

export default router;

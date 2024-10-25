import jwt, { JwtPayload } from 'jsonwebtoken';
import express from 'express';
import { signupDbPool } from '../db'; // Assuming db is located here

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

    // Fetch user from the database
    const [results] = await signupDbPool.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);

    // Type assertion: ensure results is treated as an array of rows
    const users = results as { id: number; email: string; username: string; refresh_token: string }[];

    // Check if user exists
    if (!users || users.length === 0) {
      return res.status(403).json({ message: 'User not found' });
    }

    const user = users[0]; // Access the first user in the result set

    // Check if refresh token in database matches the one sent
    if (user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' } // New access token expires in 15 minutes
    );

    // Send new access token to the frontend
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Failed to verify refresh token' });
  }
});

export default router;

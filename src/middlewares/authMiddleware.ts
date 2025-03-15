import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { db } from '../config/mongo'; // Import MongoDB connection

// Custom interface for the JWT payload
interface CustomJwtPayload extends JwtPayload {
  id: string;
  userId: number;
  email: string;
  username: string;
}

// Extend Request object to include user property
export interface RequestWithUser extends Request {
  user?: CustomJwtPayload;
}

// Middleware to authenticate access token
const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

export { authenticateToken };

// Refresh Token Endpoint
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as CustomJwtPayload;
    const userObjectId = new ObjectId(decoded.userId);

    // Fetch user from MongoDB
    const user = await db.collection("users").findOne({ _id: userObjectId });

    if (!user) {
      return res.sendStatus(403); // Forbidden (User not found)
    }

    if (user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { id: user._id.toString(), userId: user._id.toString(), email: user.email, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1m' }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error('Refresh token verification error:', error);
    return res.sendStatus(403);
  }
};

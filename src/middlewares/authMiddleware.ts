import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { User } from '../models/usersmodel'; // Adjust the path accordingly

// Custom interface for the JWT payload
interface CustomJwtPayload extends JwtPayload {
  userId: number;
  email: string;
  username: string;
  id: any;
}

interface RequestWithUser extends Request {
  user?: CustomJwtPayload;
}

export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log('authenticateToken middleware invoked');
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  console.log('Token found:', token);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    }

    console.log('Token successfully verified:', decodedToken);

    // The `decodedToken` can either be `string | JwtPayload`
    const user = decodedToken as CustomJwtPayload;

    // Attach user information to the request object
    req.user = user;
    next();
  });
};
// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: any;
        userId: number;
        email: string;
        username: string;
      };
    }
  }
}

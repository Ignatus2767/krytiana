// src/controllers/eserController.ts
import { Request, Response } from 'express';
import { signupDbPool } from '../db'; // Adjusted import
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { sendResetEmail } from '../services/emailService';

// Ensure environment variables are set
const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;
if (!sendinblueApiKey) {
  throw new Error('SENDINBLUE_API_KEY environment variable is not set');
}

// Set up Sendinblue client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = sendinblueApiKey;

// Handle Sign Up
export const handleSignUp = async (req: Request, res: Response) => {
  const { fullname, email, username, password, country } = req.body;

  try {
    const [existingUsers] = await signupDbPool.query<any[]>(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      if (existingUsers[0].email === email) {
        return res.status(400).json({ success: false, message: 'Email already exists.' });
      }
      if (existingUsers[0].username === username) {
        return res.status(400).json({ success: false, message: 'Username already exists.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await signupDbPool.query(
      'INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)',
      [fullname, email, username, hashedPassword, country]
    );

    console.log('Sign up successful:', result);
    res.status(201).json({ success: true, message: 'Sign up successful' });
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Handle Sign In
export const handleSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log(`Attempting sign-in for email: ${email}`);

    const [users] = await signupDbPool.query<any[]>(
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?)',
      [email]
    );

    console.log(`Users found: ${users.length}`);
    
    if (users.length === 0) {
      console.log('User not found');
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    const user = users[0];
    console.log(`User found: ${JSON.stringify(user)}`);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match status: ${isPasswordMatch}`);

    if (!isPasswordMatch) {
      console.log('Incorrect password');
      return res.status(400).json({ success: false, message: 'Incorrect password.' });
    }

    console.log('Sign in successful');
    res.status(200).json({ success: true, message: 'Sign in successful' });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Handle Forgot Password
export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    console.log(`Received forgot password request for email: ${email}`);

    const [users] = await signupDbPool.query<any[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      console.log('User not found for email:', email);
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const user = users[0];

    const token = crypto.randomBytes(20).toString('hex');
    const expireTime = new Date(Date.now() + 3600000); // 1 hour expiry

    await signupDbPool.query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
      [token, expireTime, email]
    );

    console.log(`Generated reset token for email: ${email}, token: ${token}`);

    await sendResetEmail(email, token);

    res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });

  } catch (error) {
    console.error('Error during forgot password process:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

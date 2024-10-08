// src/controllers/userController.ts
import { Request, Response } from 'express';
import { signupDbPool } from '../db'; // Adjusted import
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { sendResetEmail } from '../services/emailService';
import { ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken';

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

    console.log('Starting sign-up process for user:', username);
    const [existingUsers] = await signupDbPool.query<any[]>(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      if (existingUsers[0].email === email) {
        console.log('User already exists:', email, username);
        return res.status(400).json({ success: false, message: 'Email already exists.' });
      }
      if (existingUsers[0].username === username) {
        return res.status(400).json({ success: false, message: 'Username already exists.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Type the result of the INSERT query as ResultSetHeader
    const [result] = await signupDbPool.query<ResultSetHeader>(
      'INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)',
      [fullname, email, username, hashedPassword, country]
    );

    const userId = result.insertId;  // Now TypeScript understands insertId is available
    console.log('User inserted with ID:', userId);
    // Initialize user's dashboard-related entries
    // Insert study reminder (Default to 2 days per week)
    await signupDbPool.query(
      'INSERT INTO study_reminders (user_id, days_per_week) VALUES (?, ?)',
      [userId, 2]
    );

    // Optionally initialize medals (if needed at signup)
    await signupDbPool.query(
      'INSERT INTO medals (user_id, medal_type, earned_on) VALUES (?, ?, ?)',
      [userId, 'Bronze', new Date()]
    );

    // Generate JWT
    const token = jwt.sign(
      { userId, email, username }, // Payload (can include user details)
      process.env.JWT_SECRET as string, // Use your JWT_SECRET from the environment variables
      { expiresIn: '1h' } // Token expiration time
    );
    console.log('JWT token generated:', token);

    res.status(201).json({
      success: true,
      message: 'Sign up successful, dashboard created',
      token // Send token back to the client
    });

    // Log the message for debugging
    console.log('Sign-up Response:', {
      success: true,
      message: 'Sign-up successful, dashboard created',
      token
    });

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

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username }, // Payload
      process.env.JWT_SECRET as string, // Use your JWT_SECRET from the environment variables
      { expiresIn: '1h' } // Token expiration time
    );

    console.log('JWT token generated:', token);

    res.status(200).json({
      success: true,
      message: 'Sign in successful',
      token // Send token back to the client
    });
    
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

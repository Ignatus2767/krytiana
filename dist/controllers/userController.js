"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.handleForgotPassword = exports.handleSignIn = exports.handleSignUp = void 0;
const db_1 = require("../db"); // Adjusted import
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const sib_api_v3_sdk_1 = __importDefault(require("sib-api-v3-sdk"));
const emailService_1 = require("../services/emailService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Ensure environment variables are set
const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;
if (!sendinblueApiKey) {
    throw new Error('SENDINBLUE_API_KEY environment variable is not set');
}
// Set up Sendinblue client
const defaultClient = sib_api_v3_sdk_1.default.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = sendinblueApiKey;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' } // 7-day refresh token
    );
};
// Handle Sign Up
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, username, password, country } = req.body;
    try {
        console.log('Starting sign-up process for user:', username);
        const [existingUsers] = yield db_1.signupDbPool.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUsers.length > 0) {
            if (existingUsers[0].email === email) {
                console.log('User already exists:', email, username);
                return res.status(400).json({ success: false, message: 'Email already exists.' });
            }
            if (existingUsers[0].username === username) {
                return res.status(400).json({ success: false, message: 'Username already exists.' });
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log('Password hashed successfully');
        // Type the result of the INSERT query as ResultSetHeader
        const [result] = yield db_1.signupDbPool.query('INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)', [fullname, email, username, hashedPassword, country]);
        const userId = result.insertId; // Now TypeScript understands insertId is available
        console.log('User inserted with ID:', userId);
        // Initialize user's dashboard-related entries
        yield db_1.signupDbPool.query('INSERT INTO study_reminders (user_id, days_per_week) VALUES (?, ?)', [userId, 2]);
        // Optionally initialize medals (if needed at signup)
        yield db_1.signupDbPool.query('INSERT INTO medals (user_id, medal_type, earned_on) VALUES (?, ?, ?)', [userId, 'Bronze', new Date()]);
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId, email, username }, // Payload (can include user details)
        process.env.JWT_SECRET, // Use your JWT_SECRET from the environment variables
        { expiresIn: '3d' } // Token expiration time
        );
        console.log('JWT token generated:', token);
        const refreshToken = generateRefreshToken({ id: userId });
        // Store refresh token in the database
        yield db_1.signupDbPool.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userId]);
        res.status(201).json({
            success: true,
            message: 'Sign up successful, dashboard created',
            token, // Send token back to the client
            refreshToken
        });
        // Log the message for debugging
        console.log('Sign-up Response:', {
            success: true,
            message: 'Sign-up successful, dashboard created',
            token
        });
    }
    catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.handleSignUp = handleSignUp;
// Handle Sign In
const handleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log(`Attempting sign-in for email: ${email}`);
        const [users] = yield db_1.signupDbPool.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);
        console.log(`Users found: ${users.length}`);
        if (users.length === 0) {
            console.log('User not found');
            return res.status(400).json({ success: false, message: 'User not found.' });
        }
        const user = users[0];
        console.log(`User found: ${JSON.stringify(user)}`);
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        console.log(`Password match status: ${isPasswordMatch}`);
        if (!isPasswordMatch) {
            console.log('Incorrect password');
            return res.status(400).json({ success: false, message: 'Incorrect password.' });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, // Payload
        process.env.JWT_SECRET, // Use your JWT_SECRET from the environment variables
        { expiresIn: '3d' } // Token expiration time
        );
        console.log('JWT token generated:', token);
        const refreshToken = generateRefreshToken(user);
        // Store refresh token in the database
        yield db_1.signupDbPool.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id]);
        res.status(200).json({
            success: true,
            message: 'Sign in successful',
            token, // Send token back to the client
            refreshToken
        });
    }
    catch (error) {
        console.error('Error during sign in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.handleSignIn = handleSignIn;
// Handle Forgot Password
const handleForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        console.log(`Received forgot password request for email: ${email}`);
        const [users] = yield db_1.signupDbPool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            console.log('User not found for email:', email);
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const user = users[0];
        const token = crypto_1.default.randomBytes(20).toString('hex');
        const expireTime = new Date(Date.now() + 3600000); // 1 hour expiry
        yield db_1.signupDbPool.query('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', [token, expireTime, email]);
        console.log(`Generated reset token for email: ${email}, token: ${token}`);
        yield (0, emailService_1.sendResetEmail)(email, token);
        res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
    }
    catch (error) {
        console.error('Error during forgot password process:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.handleForgotPassword = handleForgotPassword;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ success: false, message: 'Refresh token is required' });
    }
    try {
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Check if the refresh token matches the one stored in the database
        const [users] = yield db_1.signupDbPool.query('SELECT * FROM users WHERE id = ? AND refresh_token = ?', [decoded.userId, refreshToken]);
        if (users.length === 0) {
            return res.status(403).json({ success: false, message: 'Invalid refresh token' });
        }
        const user = users[0];
        // Generate a new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' } // Access token expires in 1 hour
        );
        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
    }
});
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=userController.js.map
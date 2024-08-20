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
exports.handleForgotPassword = exports.handleSignIn = exports.handleSignUp = void 0;
const db_1 = require("../db"); // Adjusted import
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const sib_api_v3_sdk_1 = __importDefault(require("sib-api-v3-sdk"));
const emailService_1 = require("../services/emailService");
// Ensure environment variables are set
const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;
if (!sendinblueApiKey) {
    throw new Error('SENDINBLUE_API_KEY environment variable is not set');
}
// Set up Sendinblue client
const defaultClient = sib_api_v3_sdk_1.default.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = sendinblueApiKey;
// Handle Sign Up
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, username, password, country } = req.body;
    try {
        const [existingUsers] = yield db_1.signupDbPool.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUsers.length > 0) {
            if (existingUsers[0].email === email) {
                return res.status(400).json({ success: false, message: 'Email already exists.' });
            }
            if (existingUsers[0].username === username) {
                return res.status(400).json({ success: false, message: 'Username already exists.' });
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [result] = yield db_1.signupDbPool.query('INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)', [fullname, email, username, hashedPassword, country]);
        console.log('Sign up successful:', result);
        res.status(201).json({ success: true, message: 'Sign up successful' });
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
        console.log('Sign in successful');
        res.status(200).json({ success: true, message: 'Sign in successful' });
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

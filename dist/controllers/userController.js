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
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sib_api_v3_sdk_1 = __importDefault(require("sib-api-v3-sdk"));
const emailService_1 = require("../services/emailService");
const User_1 = __importDefault(require("../models/User")); // Import User model
const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;
if (!sendinblueApiKey) {
    throw new Error("SENDINBLUE_API_KEY environment variable is not set");
}
// Set up Sendinblue client
const defaultClient = sib_api_v3_sdk_1.default.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = sendinblueApiKey;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
// Handle Sign Up
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, username, password, country } = req.body;
    try {
        console.log("Starting sign-up process for user:", username);
        const existingUser = yield User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.email === email ? "Email already exists." : "Username already exists.",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log("Password hashed successfully");
        const newUser = new User_1.default({
            fullname,
            email,
            username,
            password: hashedPassword,
            country,
        });
        yield newUser.save();
        console.log("User saved to database");
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, email, username }, process.env.JWT_SECRET, { expiresIn: "3d" });
        console.log("JWT token generated:", token);
        const refreshToken = generateRefreshToken(newUser);
        newUser.refreshToken = refreshToken;
        yield newUser.save();
        res.status(201).json({
            success: true,
            message: "Sign-up successful",
            token,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.handleSignUp = handleSignUp;
// Handle Sign In
const handleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log(`Attempting sign-in for email: ${email}`);
        const user = yield User_1.default.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ success: false, message: "User not found." });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("Incorrect password");
            return res.status(400).json({ success: false, message: "Incorrect password." });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: "3d" });
        console.log("JWT token generated:", token);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        yield user.save();
        res.status(200).json({
            success: true,
            message: "Sign-in successful",
            token,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Error during sign in:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.handleSignIn = handleSignIn;
// Handle Forgot Password
const handleForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        console.log(`Received forgot password request for email: ${email}`);
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const token = crypto_1.default.randomBytes(20).toString("hex");
        const expireTime = new Date(Date.now() + 3600000); // 1-hour expiry
        user.resetToken = token;
        user.resetTokenExpiry = expireTime;
        yield user.save();
        console.log(`Generated reset token for email: ${email}, token: ${token}`);
        yield (0, emailService_1.sendResetEmail)(email, token);
        res.status(200).json({ success: true, message: "Password reset link sent to your email." });
    }
    catch (error) {
        console.error("Error during forgot password process:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.handleForgotPassword = handleForgotPassword;
// Handle Refresh Token
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ success: false, message: "Refresh token is required" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = yield User_1.default.findOne({ _id: decoded.userId, refreshToken });
        if (!user) {
            return res.status(403).json({ success: false, message: "Invalid refresh token" });
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        console.error("Error refreshing access token:", error);
        res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
    }
});
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=userController.js.map
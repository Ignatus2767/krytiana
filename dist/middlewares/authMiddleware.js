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
exports.refreshToken = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const mongo_1 = require("../config/mongo"); // Import MongoDB connection
// Middleware to authenticate access token
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};
exports.authenticateToken = authenticateToken;
// Refresh Token Endpoint
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.sendStatus(401); // Unauthorized
    }
    try {
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userObjectId = new mongodb_1.ObjectId(decoded.userId);
        // Fetch user from MongoDB
        const user = yield mongo_1.db.collection("users").findOne({ _id: userObjectId });
        if (!user) {
            return res.sendStatus(403); // Forbidden (User not found)
        }
        if (user.refresh_token !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        // Generate a new access token
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id.toString(), userId: user._id.toString(), email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1m' });
        res.json({ accessToken });
    }
    catch (error) {
        console.error('Refresh token verification error:', error);
        return res.sendStatus(403);
    }
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=authMiddleware.js.map
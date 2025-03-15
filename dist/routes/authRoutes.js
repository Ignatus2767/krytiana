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
//src/routes/authRoutes.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const mongo_1 = require("../config/mongo"); // Import MongoDB connection
const mongodb_1 = require("mongodb"); // Import ObjectId for MongoDB queries
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Route: POST /api/refresh-token
router.post('/api/refresh-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }
    try {
        // Verify refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Convert userId to ObjectId for MongoDB
        const userObjectId = new mongodb_1.ObjectId(decoded.userId);
        // Fetch user from MongoDB
        const user = yield mongo_1.db.collection("users").findOne({ _id: userObjectId });
        // Check if user exists
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        // Check if refresh token in database matches the one sent
        if (user.refresh_token !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        // Generate new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ userId: user._id.toString(), email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' } // New access token expires in 15 minutes
        );
        // Send new access token to the frontend
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        return res.status(403).json({ message: 'Failed to verify refresh token' });
    }
}));
// Route: POST /api/request-password-reset
router.post('/api/request-password-reset', authController_1.requestPasswordReset);
// Route: POST /api/reset-password
router.post('/api/reset-password', authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
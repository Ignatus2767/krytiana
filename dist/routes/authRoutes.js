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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../db"); // Assuming db is located here
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
        // Fetch user from the database
        const [results] = yield db_1.signupDbPool.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);
        // Type assertion: ensure results is treated as an array of rows
        const users = results;
        // Check if user exists
        if (!users || users.length === 0) {
            return res.status(403).json({ message: 'User not found' });
        }
        const user = users[0]; // Access the first user in the result set
        // Check if refresh token in database matches the one sent
        if (user.refresh_token !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        // Generate new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' } // New access token expires in 15 minutes
        );
        // Send new access token to the frontend
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        return res.status(403).json({ message: 'Failed to verify refresh token' });
    }
}));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
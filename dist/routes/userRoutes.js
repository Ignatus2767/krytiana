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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const mongo_1 = require("../config/mongo"); // Import MongoDB connection
const router = (0, express_1.Router)();
router.post("/signup", userController_1.handleSignUp);
router.post("/signin", userController_1.handleSignIn);
router.post("/forgot-password", userController_1.handleForgotPassword);
router.post("/refresh-token", userController_1.refreshAccessToken);
// Get user profile
router.get("/profile", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Get user ID from token
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Fetch user from MongoDB
        const user = yield mongo_1.db.collection("users").findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            success: true,
            message: "Welcome to your profile",
            username: user.username,
            email: user.email, // Include email if needed
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error });
    }
}));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
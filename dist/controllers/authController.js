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
exports.requestPasswordReset = exports.resetPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
const emailService_1 = require("../services/emailService");
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    try {
        const user = yield User_1.default.findOne({
            resetToken: resetToken, // ✅ Corrected token usage
            resetTokenExpiry: { $gt: new Date() },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        // Hash the new password
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        yield user.save();
        res.json({ message: "Password has been reset successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.resetPassword = resetPassword;
const requestPasswordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(Date.now() + 3600000);
        yield user.save();
        // Send reset email
        yield (0, emailService_1.sendResetEmail)(email, resetToken);
        res.json({ message: "Password reset email sent" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.requestPasswordReset = requestPasswordReset;
//# sourceMappingURL=authController.js.map
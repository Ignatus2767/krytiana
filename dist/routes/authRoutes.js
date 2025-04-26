"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoute.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Password Reset Routes
router.post('/request-password-reset', authController_1.requestPasswordReset);
router.post('/reset-password/:token', authController_1.resetPassword);
// Token Validation Route
router.get('/validate-token', authController_1.validateToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
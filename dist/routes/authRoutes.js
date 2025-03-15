"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Route: POST /api/request-password-reset
router.post('/api/request-password-reset', authController_1.requestPasswordReset);
// Route: POST /api/reset-password/:token
router.post('/api/reset-password/:token', authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
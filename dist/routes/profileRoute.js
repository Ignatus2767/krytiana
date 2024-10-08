"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/profileRoute.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const profileController_1 = require("../controllers/profileController"); // Correct function name
const router = (0, express_1.Router)();
// Profile route
router.get('/profile', authMiddleware_1.authenticateToken, profileController_1.getProfile); // Use the correct function
exports.default = router;
//# sourceMappingURL=profileRoute.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// myapp/src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/signup', userController_1.handleSignUp);
router.post('/signin', userController_1.handleSignIn);
router.post('/forgot-password', userController_1.handleForgotPassword);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// myapp/src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/signup', userController_1.handleSignUp);
router.post('/signin', userController_1.handleSignIn);
router.post('/forgot-password', userController_1.handleForgotPassword);
router.post('/refresh-token', userController_1.refreshAccessToken);
router.get('/profile', authMiddleware_1.authenticateToken, (req, res) => {
    // Since `authenticateToken` attaches `req.user`, we can access it here
    const user = req.user;
    // Respond with user details
    res.json({
        success: true,
        message: 'Welcome to your profile',
        username: user === null || user === void 0 ? void 0 : user.username, // Send username back to the client
    });
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
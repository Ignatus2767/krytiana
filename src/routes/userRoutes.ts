import { Router } from "express";
import { handleSignUp, handleSignIn, handleForgotPassword, refreshAccessToken } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { db } from "../config/mongo"; // Import MongoDB connection

const router = Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.post("/forgot-password", handleForgotPassword);
router.post("/refresh-token", refreshAccessToken);

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.id; // Get user ID from token
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch user from MongoDB
        const user = await db.collection("users").findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            success: true,
            message: "Welcome to your profile",
            username: user.username,
            email: user.email, // Include email if needed
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error });
    }
});

export default router;

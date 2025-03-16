//controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User";
import { sendResetEmail } from "../services/emailService";

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log("🔹 Received password reset request");
  console.log("🔹 Token from URL:", token);
  console.log("🔹 New password received:", newPassword);

  try {
    // Find user by reset token & check if token is still valid
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Check if token is not expired
    });

    console.log("🔹 User found:", user ? user.email : "No user found");

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("🔹 Hashed password:", hashedPassword);

    // Update user password & clear reset token
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    console.log("✅ Password reset successful for:", user.email);
    res.json({ message: "Password has been reset successfully" });

  } catch (error) {
    console.error("❌ Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("🔹 Received forgot password request for email:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("🔹 Generated reset token for:", email, "Token:", resetToken);

    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour
    await user.save();

    // Send reset email
    await sendResetEmail(email, resetToken);
    console.log("✅ Password reset email sent successfully to:", email);

    res.json({ message: "Password reset email sent" });

  } catch (error) {
    console.error("❌ Error in password reset request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

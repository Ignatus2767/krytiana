//controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt"; // ✅ Import bcrypt
import crypto from "crypto";
import User from "../models/User"; // ✅ Ensure correct case
import { sendResetEmail } from "../services/emailService";

export const resetPassword = async (req: Request, res: Response) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: new Date() }, // Ensure token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password has been reset successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken; // ✅ Matches model
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // ✅ Matches model (1-hour expiry)
    await user.save();

    // Send reset email
    await sendResetEmail(email, resetToken);
    res.json({ message: "Password reset email sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

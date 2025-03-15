// src/services/emailService.ts
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

const apiClient = SibApiV3Sdk.ApiClient.instance;
apiClient.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY as string;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendResetEmail = async (email: string, resetToken: string) => {
  try {
    console.log(`Sending password reset email to: ${email}`);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Password Reset Request";
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.CLIENT_URL || "https://krytiana.onrender.com"}/reset-password/${resetToken}">
            Reset Password
          </a>
          <p>This link is valid for only 1 hour.</p>
        </body>
      </html>`;
    sendSmtpEmail.sender = { name: "YourApp", email: "ignatusdonkoh9@gmail.com" };
    sendSmtpEmail.to = [{ email }];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Password reset email sent successfully!", response);
  } catch (error: any) {
    console.error("❌ Error sending password reset email:", error.response?.body || error.message);
  }
};
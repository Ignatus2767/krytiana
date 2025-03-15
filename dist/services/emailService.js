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
exports.sendResetEmail = void 0;
// src/services/emailService.ts
const sib_api_v3_sdk_1 = __importDefault(require("sib-api-v3-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ✅ Initialize API client
const apiClient = sib_api_v3_sdk_1.default.ApiClient.instance;
apiClient.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;
const apiInstance = new sib_api_v3_sdk_1.default.TransactionalEmailsApi();
const sendResetEmail = (email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(`Sending password reset email to: ${email}`);
        const sendSmtpEmail = new sib_api_v3_sdk_1.default.SendSmtpEmail();
        sendSmtpEmail.subject = "Password Reset Request";
        sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.CLIENT_URL || "https://krytiana.onrender.com/"}/reset-password/${resetToken}">
            Reset Password
          </a>
          <p>This link is valid for only 1 hour.</p>
        </body>
      </html>`;
        sendSmtpEmail.sender = { name: "YourApp", email: "ignatusdonkoh9@gmail.com" };
        sendSmtpEmail.to = [{ email }];
        // ✅ Send email
        const response = yield apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("✅ Password reset email sent successfully!", response);
    }
    catch (error) {
        console.error("❌ Error sending password reset email:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.body) || error.message);
    }
});
exports.sendResetEmail = sendResetEmail;
//# sourceMappingURL=emailService.js.map
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
// emailService.ts
const sib_api_v3_sdk_1 = __importDefault(require("sib-api-v3-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendResetEmail = (email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(`Preparing to send email to: ${email}`);
        let apiInstance = new sib_api_v3_sdk_1.default.TransactionalEmailsApi();
        let sendSmtpEmail = new sib_api_v3_sdk_1.default.SendSmtpEmail();
        sendSmtpEmail.subject = "Password Reset";
        sendSmtpEmail.htmlContent = `<html><body><p>Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.</p></body></html>`;
        sendSmtpEmail.sender = { "name": "krydmal", "email": "kry.d.2767@gmail.com" };
        sendSmtpEmail.to = [{ "email": email }];
        sendSmtpEmail.headers = { "X-Mailin-custom": "custom_header_1:custom_value_1|custom_header_2:custom_value_2" };
        const response = yield apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Reset email sent successfully.', response);
    }
    catch (error) { // Assert error type as any
        console.error('Error during email sending process:', error);
        console.error('Error response data:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
    }
});
exports.sendResetEmail = sendResetEmail;

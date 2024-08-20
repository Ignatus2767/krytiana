// emailService.ts
import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

const sendResetEmail = async (email: string, resetToken: string) => {
  try {
    console.log(`Preparing to send email to: ${email}`);

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Password Reset";
    sendSmtpEmail.htmlContent = `<html><body><p>Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.</p></body></html>`;
    sendSmtpEmail.sender = { "name": "krydmal", "email": "kry.d.2767@gmail.com" };
    sendSmtpEmail.to = [{ "email": email }];
    sendSmtpEmail.headers = { "X-Mailin-custom": "custom_header_1:custom_value_1|custom_header_2:custom_value_2" };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Reset email sent successfully.', response);
  } catch (error: any) { // Assert error type as any
    console.error('Error during email sending process:', error);
    console.error('Error response data:', error.response?.data);
  }
};

export { sendResetEmail };


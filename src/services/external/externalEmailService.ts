import nodemailer from "nodemailer";
import { Config } from "../../config";
import fs from "fs";

export class EmailService {
    private transporter: nodemailer.Transporter;
    private sender: string;

    constructor() {
        const config = new Config();
        this.sender = config.smtpSender;

        this.transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            auth: {
                user: config.smtpUsername,
                pass: config.smtpPassword,
            },
        });
    }

    async sendEmailOtp(
        type: "registration" | "login" | "resetPassword",
        customer: { name: string; email: string },
        otp: string,
        expiredAt: Date,
    ): Promise<any> {
        let path;
        let subject;
        if (type === "login") {
            subject = "Login Confirmation - One Time Password (OTP)";
            path = "src/templates/emailOtpLogin.html";
        } else if (type === "registration") {
            subject = "Registration Confirmation - One Time Password (OTP)";
            path = "src/templates/emailOtpRegistration.html";
        } else {
            subject = "Reset Password Confirmation - One Time Password (OTP)";
            path = "src/templates/emailOtpResetPassword.html";
        }

        const template = fs.readFileSync(path, { encoding: "utf-8" });
        const html = template
            .replace("{{user}}", customer.name)
            .replace("{{otp_code}}", otp)
            .replace("{{expire}}", expiredAt.toLocaleString());

        return await this.send(customer.email, subject, html);
    }

    private async send(to: string, subject: string, body: string): Promise<any> {
        const mailOptions = {
            from: this.sender,
            to: to,
            subject: subject,
            text: body,
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

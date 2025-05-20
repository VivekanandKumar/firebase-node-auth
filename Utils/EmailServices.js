import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "node:fs";
const Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
class EmailService {
    constructor(email) {
        this.email = email;
        this.transport = Transporter;
    }

    async sendVerificationEmail(config = {}) {
        try {
            const { name, url } = config;
            const year = new Date().getFullYear();
            const html = fs.readFileSync("./templates/VerifyEmail.hbs", { encoding: "utf-8" });
            const template = Handlebars.compile(html);
            const processedHTML = template({ year, url, name });
            const mailConfig = {
                from: {
                    address: "mo-reply@app.com",
                    name: "User App",
                },
                to: this.email,
                subject: "Verification Email",
                html: processedHTML,
            };
            const emailResponse = await this.transport.sendMail(mailConfig);
            console.info("Verification Email Sent: ", emailResponse.accepted);
        } catch (error) {
            console.error("Error in sending Verification Email: ", error.message);
        }
    }
}

export default function (email) {
    return new EmailService(email);
}

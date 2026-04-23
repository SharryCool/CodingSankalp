import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "src", ".env") });

if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
  throw new Error("SMTP credentials missing. Check SMTP_EMAIL/SMTP_PASSWORD in .env");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter;
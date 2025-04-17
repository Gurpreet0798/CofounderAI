import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import Otp from "@/models/otpModel";
import connectDb from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Parse JSON body from the request
  const { email } = await req.json();

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Connect to the database and save the OTP
  await connectDb();
  const otp_obj = new Otp({ email, otp, createdAt: Date.now() });
  await otp_obj.save();

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT!, 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  });

  // Respond with success message
  return NextResponse.json({ message: "OTP sent successfully" });
}

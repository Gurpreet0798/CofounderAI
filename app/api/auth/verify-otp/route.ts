import { NextResponse, NextRequest } from "next/server";
import Otp from "@/models/otpModel";
import connectDb from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await connectDb(); // Ensure the database is connected

  try {
    const { email, otp } = await req.json();

    // Fetch the latest OTP for the given email
    const storedOtps = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // If no OTP is found
    if (storedOtps.length === 0) {
      return NextResponse.json(
        { error: "OTP expired or invalid" },
        { status: 400 }
      );
    }

    const storedOtp = storedOtps[0];

    // Check if the OTP is expired (e.g., expiration time = 10 minutes)
    const isExpired = Date.now() - new Date(storedOtp.createdAt).getTime() > 10 * 60 * 1000;
    if (isExpired) {
      return NextResponse.json(
        { error: "OTP expired" },
        { status: 400 }
      );
    }

    // Compare the OTPs
    if (storedOtp.otp !== otp) {
      return NextResponse.json(
        { error: "Incorrect OTP" },
        { status: 400 }
      );
    }

    // OTP is valid
    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

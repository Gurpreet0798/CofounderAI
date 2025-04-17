import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "../../../../models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    // Ensure JWT_SECRET is defined
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "JWT_SECRET is not defined in environment variables" },
        { status: 500 }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { email, password } = body;

    // Validate email and password
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set cookie with token
    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Lax`
    );
    

    {/* const header = await fetch("http://localhost:3000/api/auth/set-cookie", { */}
    {/*   method: "POST", */}
    {/*   headers: { "Content-Type": "application/json" }, */}
    {/* }) */}

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200, headers }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}

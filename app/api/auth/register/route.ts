import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb"; // Adjust the path based on your project structure
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { firstName, lastName, email, password } = await req.json();

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required: firstName, lastName, email, password" },
        { status: 400 }
      );
    }

    // Check password strength (optional, based on your security policy)
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "user", // Default role
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Set token in an HTTP-only cookie
    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Lax`
    );

    // Respond with success and the user's details (excluding sensitive fields)
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { name: user.name, email: user.email, role: user.role },
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

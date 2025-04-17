import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json(
      { message: "Access granted", user: decoded },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

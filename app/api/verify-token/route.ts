import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function GET(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("token")?.value

  // If no token, return false
  if (!token) {
    return NextResponse.json({ isValid: false }, { status: 401 })
  }

  try {
    // Verify the token using the same method as in middleware
    await jwtVerify(token, JWT_SECRET)
    
    // Token is valid
    return NextResponse.json({ isValid: true }, { status: 200 })
  } catch (error) {
    // Token verification failed
    console.error('Token verification error:', error)
    return NextResponse.json({ isValid: false }, { status: 401 })
  }
}

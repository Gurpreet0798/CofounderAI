import { NextResponse } from "next/server";

export async function POST() {
  // Clear the `token` cookie
  const headers = new Headers();
  headers.set("Set-Cookie", `token=; HttpOnly; Path=/; Max-Age=0`);

  return NextResponse.json(
    { message: "Logout successful" },
    { status: 200, headers }
  );
}




import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_session", "authenticated", { httpOnly: true, secure: false, sameSite: "strict", maxAge: 60 * 60 * 24 });
      return response;
    }

    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
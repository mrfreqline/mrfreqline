import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const entered = (body.password || "").trim();

    // 1. Read secret from environment
    let expected = (process.env.ADMIN_PASSWORD || "").trim();

    // Remove outer quotes if wrapped in "..." or '...'
    if (
      (expected.startsWith('"') && expected.endsWith('"')) ||
      (expected.startsWith("'") && expected.endsWith("'"))
    ) {
      expected = expected.slice(1, -1).trim();
    }

    // 2. Check if .env.local is actually being read
    if (!expected) {
      return NextResponse.json(
        { error: "Server error: ADMIN_PASSWORD is empty in .env.local or server was not restarted." },
        { status: 500 }
      );
    }

    // 3. Compare passwords
    if (entered === expected) {
      const response = NextResponse.json({ success: true });

      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // 4. Safe Diagnostic (Reveals ONLY character count, NOT your password!)
    return NextResponse.json(
      {
        error: `Incorrect password. (You typed ${entered.length} characters, but your server expects ${expected.length} characters).`,
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: "Server communication error." }, { status: 500 });
  }
}
import { NextResponse } from "next/server";

export async function GET() {
  const pass = process.env.ADMIN_PASSWORD || "NOT SET";
  return NextResponse.json({
    length: pass.length,
    firstChar: pass[0],
    lastChar: pass[pass.length - 1],
  });
}
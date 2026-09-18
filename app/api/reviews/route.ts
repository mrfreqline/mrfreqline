import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase, supabaseAdmin } from "@/lib/supabase";

// Use supabaseAdmin with service role for admin actions
const db = supabaseAdmin || supabase;

// 1. PUBLIC: Anyone can read reviews
export async function GET() {
  try {
    const { data, error } = await db
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reviews: data || [] });
  } catch {
    return NextResponse.json(
      { error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}

// 2. PUBLIC: Anyone can submit a review
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, rating, comment } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please provide a valid rating (1-5 stars)" },
        { status: 400 }
      );
    }

    if (!comment || !comment.trim()) {
      return NextResponse.json(
        { error: "Please enter a comment or suggestion" },
        { status: 400 }
      );
    }

    const { data, error } = await db
      .from("reviews")
      .insert([
        {
          name: name && name.trim() ? name.trim() : "Anonymous User",
          phone: phone && phone.trim() ? phone.trim() : null,
          rating: Number(rating),
          comment: comment.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, review: data });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

// 3. ADMIN ONLY: Only the admin can delete reviews!
export async function DELETE(req: Request) {
  try {
    // 🔒 SECURITY CHECK: Verify Admin Session Cookie or Admin Secret
    const cookieStore = await cookies();
    const adminToken =
      cookieStore.get("admin_token")?.value ||
      cookieStore.get("admin_session")?.value;

    const adminHeader = req.headers.get("x-admin-secret");
    const isAuthorized =
      Boolean(adminToken) ||
      (adminHeader && adminHeader === process.env.ADMIN_PASSWORD);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can delete reviews." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    const { error } = await db.from("reviews").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully by admin",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
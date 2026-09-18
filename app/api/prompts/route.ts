import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

// 1. GET Prompts (Public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabase
      .from("prompts")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category.toLowerCase() !== "all") {
      query = query.ilike("category", category.trim());
    }

    const { data, error } = await query;
    if (error) throw error;

    const formatted = (data || []).map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      promptText: p.prompt_text,
      toolUrl: p.tool_url,
      steps: p.steps || [],
      beforeImageUrl: p.before_image_url,
      resultImageUrl: p.result_image_url,
      createdAt: p.created_at,
    }));

    return NextResponse.json(formatted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. POST New Prompt (Admin Only)
export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      category,
      promptText,
      toolUrl,
      steps,
      beforeImageUrl,
      resultImageUrl,
    } = body;

    if (!title || !promptText) {
      return NextResponse.json(
        { error: "Title and Prompt Text are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("prompts")
      .insert([
        {
          title: title.trim(),
          category: category || "Image Generation",
          prompt_text: promptText.trim(),
          tool_url: toolUrl ? toolUrl.trim() : "",
          steps: Array.isArray(steps) ? steps.filter((s: string) => s.trim()) : [],
          before_image_url: beforeImageUrl || "",
          result_image_url: resultImageUrl || "",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, item: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. DELETE Prompt (Admin Only)
export async function DELETE(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("prompts").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
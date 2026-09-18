import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

/**
 * Normalizes section queries & stored values so variations like
 * "gaming", "gaming-resources", "Free Gaming Resources" all map to "gaming",
 * and "tech", "tech-optimizations", "best-pc-optimization-tools" all map to "tech".
 */
function normalizeSection(sec: string | null | undefined): string {
  if (!sec) return "essential-toolkit";
  const s = sec.toLowerCase().trim().replace(/_/g, "-");

  if (s.includes("gaming") || s.includes("game")) return "gaming";
  if (s.includes("tech") || s.includes("opti") || s.includes("pc")) return "tech";
  if (s.includes("website") || s.includes("best-free") || s.includes("resources")) return "best-free-websites";
  if (s.includes("essential") || s.includes("toolkit") || s.includes("tools")) return "essential-toolkit";

  return s;
}

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const section = searchParams.get("section");
    const category = searchParams.get("category");

    // 1. Fetch News
    if (type === "news") {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      const formattedNews = (data || []).map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        content: item.content,
        imageUrl: item.image_url,
        date: item.date,
      }));
      return NextResponse.json(formattedNews);
    }

    // 2. Fetch Messages (Admin Only)
    if (type === "messages") {
      if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { data, error } = await supabaseAdmin
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return NextResponse.json(data || []);
    }

    // 3. Fetch Links (with section & category filters)
    let query = supabase
      .from("links")
      .select("*")
      .order("created_at", { ascending: false });

    if (section) {
      query = query.eq("section", normalizeSection(section));
    }

    if (category && category.toUpperCase() !== "ALL") {
      query = query.ilike("category", category.trim());
    }

    const { data, error } = await query;
    if (error) throw error;

    const formattedLinks = (data || []).map((item) => ({
      id: item.id,
      section: normalizeSection(item.section),
      title: item.title,
      category: item.category,
      status: item.status,
      url: item.url,
      fileUrl: item.file_url,
      fileName: item.file_name,
      guide: item.guide,
    }));

    return NextResponse.json(formattedLinks);
  } catch (err: any) {
    console.error("API GET Error in /api/links:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Anonymous Inbox Message Submission (Public)
    if (body.type === "message") {
      if (!body.message || !body.message.trim()) {
        return NextResponse.json({ error: "Message required" }, { status: 400 });
      }

      // Uses supabaseAdmin to bypass RLS and allow anonymous submissions safely
      const { data, error } = await supabaseAdmin
        .from("messages")
        .insert([
          {
            message: body.message.trim(),
            timestamp: new Date().toLocaleString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, item: data });
    }

    // Protected endpoints require admin authentication
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Create News Post
    if (body.type === "news") {
      const { data, error } = await supabaseAdmin
        .from("news")
        .insert([
          {
            title: body.title,
            category: body.category,
            content: body.content,
            image_url: body.imageUrl || "",
            date: new Date().toISOString().split("T")[0],
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({
        success: true,
        item: {
          id: data.id,
          title: data.title,
          category: data.category,
          content: data.content,
          imageUrl: data.image_url,
          date: data.date,
        },
      });
    }

    // 3. Create Link
    const normalizedSec = normalizeSection(body.section);
    const { data, error } = await supabaseAdmin
      .from("links")
      .insert([
        {
          section: normalizedSec,
          title: body.title,
          category: body.category,
          status: body.status || "ACTIVE",
          url: body.url || "",
          file_url: body.fileUrl || "",
          file_name: body.fileName || "",
          guide: body.guide || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: data.id,
        section: data.section,
        title: data.title,
        category: data.category,
        status: data.status,
        url: data.url,
        fileUrl: data.file_url,
        fileName: data.file_name,
        guide: data.guide,
      },
    });
  } catch (err: any) {
    console.error("API POST Error in /api/links:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error during upload" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    let error;
    if (type === "news") {
      ({ error } = await supabaseAdmin.from("news").delete().eq("id", id));
    } else if (type === "messages") {
      ({ error } = await supabaseAdmin.from("messages").delete().eq("id", id));
    } else {
      ({ error } = await supabaseAdmin.from("links").delete().eq("id", id));
    }

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("API DELETE Error in /api/links:", err);
    return NextResponse.json({ error: err.message || "Failed to delete" }, { status: 500 });
  }
}
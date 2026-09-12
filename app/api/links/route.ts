import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "db.json");

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

async function readDb() {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const cleaned = data.replace(/^\uFEFF/, "");
      return JSON.parse(cleaned);
    } catch {
      const initialDb = { links: [], news: [], messages: [] };
      await fs.writeFile(filePath, JSON.stringify(initialDb, null, 2), "utf-8");
      return initialDb;
    }
  } catch {
    return { links: [], news: [], messages: [] };
  }
}

async function writeDb(db: any) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(db, null, 2), "utf-8");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const section = searchParams.get("section");
  const category = searchParams.get("category");
  const db = await readDb();

  if (type === "news") return NextResponse.json(db.news || []);
  if (type === "messages") return NextResponse.json(db.messages || []);

  // Map links and ensure every item has a normalized section property
  let links = (db.links || []).map((item: any) => ({
    ...item,
    section: normalizeSection(item.section),
  }));

  // Filter strictly by parent section if requested
  if (section) {
    const targetSection = normalizeSection(section);
    links = links.filter((item: any) => item.section === targetSection);
  }

  // Filter strictly by sub-category if requested
  if (category && category.toUpperCase() !== "ALL") {
    const targetCategory = category.toLowerCase().trim();
    links = links.filter(
      (item: any) => item.category?.toLowerCase().trim() === targetCategory
    );
  }

  return NextResponse.json(links);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Public endpoint for submitting anonymous inbox messages
    if (body.type === "message") {
      if (!body.message || !body.message.trim()) {
        return NextResponse.json({ error: "Message required" }, { status: 400 });
      }
      const db = await readDb();
      const newMessage = {
        id: Date.now().toString(),
        message: body.message.trim(),
        timestamp: new Date().toLocaleString(),
      };
      if (!db.messages) db.messages = [];
      db.messages.unshift(newMessage);
      await writeDb(db);
      return NextResponse.json({ success: true });
    }

    // Protected endpoints requiring admin authentication
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await readDb();

    if (body.type === "news") {
      const newNews = {
        id: Date.now().toString(),
        title: body.title,
        category: body.category,
        content: body.content,
        imageUrl: body.imageUrl || "",
        date: new Date().toISOString().split("T")[0],
      };
      if (!db.news) db.news = [];
      db.news.unshift(newNews);
      await writeDb(db);
      return NextResponse.json({ success: true, item: newNews });
    }

    // Save item with normalized section mapping
    const normalizedSec = normalizeSection(body.section);
    const newLink = {
      id: Date.now().toString(),
      section: normalizedSec,
      title: body.title,
      category: body.category,
      status: body.status || "ACTIVE",
      url: body.url || "",
      fileUrl: body.fileUrl || "",
      fileName: body.fileName || "",
      guide: body.guide || undefined,
    };

    if (!db.links) db.links = [];
    db.links.unshift(newLink);
    await writeDb(db);
    return NextResponse.json({ success: true, item: newLink });
  } catch (err) {
    console.error("API Error in /api/links:", err);
    return NextResponse.json({ error: "Internal Server Error during upload" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const db = await readDb();

  if (type === "news") {
    db.news = (db.news || []).filter((item: any) => item.id !== id);
  } else if (type === "messages") {
    db.messages = (db.messages || []).filter((item: any) => item.id !== id);
  } else {
    db.links = (db.links || []).filter((item: any) => item.id !== id);
  }

  await writeDb(db);
  return NextResponse.json({ success: true });
}
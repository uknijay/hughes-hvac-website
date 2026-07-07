import { NextResponse } from "next/server";
import { replaceCmsDatabase } from "@/lib/cms";
import { verifySessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!verifySessionCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  const imported = await request.json().catch(() => null);
  if (!imported || typeof imported !== "object") {
    return NextResponse.json({ error: "Valid CMS export JSON is required." }, { status: 400 });
  }

  try {
    const result = await replaceCmsDatabase(imported);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Import failed." }, { status: 400 });
  }
}

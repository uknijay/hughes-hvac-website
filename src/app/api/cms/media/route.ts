import { NextResponse } from "next/server";
import { storeCmsImage } from "@/lib/media";
import { verifySessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!verifySessionCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  try {
    const upload = await storeCmsImage(file);
    return NextResponse.json({ ok: true, upload });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 });
  }
}

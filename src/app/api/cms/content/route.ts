import { NextResponse } from "next/server";
import { getCmsState, saveCmsState } from "@/lib/cms";
import { verifySessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

function requireAdmin(request: Request) {
  return verifySessionCookie(request.headers.get("cookie"));
}

export async function GET() {
  return NextResponse.json(await getCmsState());
}

export async function PATCH(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const state = await saveCmsState({ fields: body.fields ?? {}, media: body.media ?? {} });
  return NextResponse.json(state);
}

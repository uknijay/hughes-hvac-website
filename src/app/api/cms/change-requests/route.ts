import { NextResponse } from "next/server";
import { addChangeRequest, listChangeRequests } from "@/lib/cms";
import { verifySessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!verifySessionCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }
  return NextResponse.json({ changeRequests: await listChangeRequests() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = String(body.message || "").trim();
  if (!message) {
    return NextResponse.json({ error: "Change request message is required." }, { status: 400 });
  }
  const changeRequest = await addChangeRequest({
    name: String(body.name || "Owner feedback"),
    message,
    page: String(body.page || "/")
  });
  return NextResponse.json({ ok: true, changeRequest });
}

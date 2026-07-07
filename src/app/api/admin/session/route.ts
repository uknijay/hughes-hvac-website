import { NextResponse } from "next/server";
import { adminEmail, createSessionValue, sessionCookieName, verifyLogin, verifySessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const hasSession = verifySessionCookie(cookieHeader);
  return NextResponse.json({ authenticated: hasSession, email: adminEmail() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "");
  const password = String(body.password || "");
  if (!verifyLogin(email, password)) {
    return NextResponse.json({ ok: false, error: "Invalid admin email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, email: adminEmail() });
  response.cookies.set(sessionCookieName(), createSessionValue(adminEmail()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName(), "", { path: "/", maxAge: 0 });
  return response;
}

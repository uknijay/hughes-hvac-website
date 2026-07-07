import { createHmac, timingSafeEqual } from "node:crypto";

const sessionCookie = "hvac_admin_session";

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "local-preview-session-secret-change-on-vercel";
}

export function adminEmail() {
  return process.env.ADMIN_EMAIL || "admin@hughes.local";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "HughesAdmin2026!";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSessionValue(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, createdAt: Date.now() })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function sessionCookieName() {
  return sessionCookie;
}

export function verifySessionCookie(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  const cookies = Object.fromEntries(cookieHeader.split(";").map((part) => {
    const [key, ...rest] = part.trim().split("=");
    return [key, rest.join("=")];
  }));
  const raw = cookies[sessionCookie];
  if (!raw) return false;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyLogin(email: string, password: string) {
  return email.trim().toLowerCase() === adminEmail().toLowerCase() && password === adminPassword();
}

import { NextResponse } from "next/server";
import { exportCmsDatabase } from "@/lib/cms";
import { verifySessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!verifySessionCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }
  return NextResponse.json(await exportCmsDatabase(), {
    headers: {
      "content-disposition": `attachment; filename="hughes-hvac-cms-export-${new Date().toISOString().slice(0, 10)}.json"`
    }
  });
}

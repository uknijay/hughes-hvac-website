import { readLocalCmsImage } from "@/lib/media";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const image = await readLocalCmsImage(decodeURIComponent(id));
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(image.buffer), {
    headers: {
      "content-type": image.contentType,
      "cache-control": "public, max-age=31536000, immutable"
    }
  });
}

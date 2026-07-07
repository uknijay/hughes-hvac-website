import { promises as fs } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const localUploadDir = path.join(process.cwd(), ".data", "uploads");
const maxUploadBytes = 8 * 1024 * 1024;

export type CmsMediaUpload = {
  url: string;
  storage: "vercel-blob" | "local-file";
  size: number;
  contentType: string;
  filename: string;
};

function hasVercelBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function safeFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase().replace(/[^.a-z0-9]/g, "").slice(0, 12);
  const base = path.basename(filename, ext).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "owner-image";
  return `${Date.now()}-${base}${ext || ".jpg"}`;
}

function contentTypeFromFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "image/jpeg";
}

export function validateCmsImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.");
  }
  if (file.size > maxUploadBytes) {
    throw new Error("Image uploads must be under 8MB.");
  }
}

export async function storeCmsImage(file: File): Promise<CmsMediaUpload> {
  validateCmsImage(file);
  const filename = safeFilename(file.name || "owner-image.jpg");
  const contentType = file.type || contentTypeFromFilename(filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  if (hasVercelBlob()) {
    const blob = await put(`cms/${filename}`, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: false
    });
    return { url: blob.url, storage: "vercel-blob", size: buffer.byteLength, contentType, filename };
  }

  await fs.mkdir(localUploadDir, { recursive: true });
  await fs.writeFile(path.join(localUploadDir, filename), buffer);
  return { url: `/api/cms/media/${encodeURIComponent(filename)}`, storage: "local-file", size: buffer.byteLength, contentType, filename };
}

export async function readLocalCmsImage(filename: string) {
  const safe = path.basename(filename);
  if (safe !== filename) return null;
  const filePath = path.join(localUploadDir, safe);
  try {
    const buffer = await fs.readFile(filePath);
    return { buffer, contentType: contentTypeFromFilename(safe) };
  } catch {
    return null;
  }
}

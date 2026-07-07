import { promises as fs } from "node:fs";
import path from "node:path";

export type CmsState = {
  fields: Record<string, string>;
  media: Record<string, string>;
  updatedAt: string;
};

export type ChangeRequest = {
  id: string;
  name: string;
  message: string;
  page: string;
  createdAt: string;
};

export type CmsExport = {
  exportedAt?: string;
  storage?: string;
  state?: Partial<CmsState>;
  changeRequests?: ChangeRequest[];
};

type LocalDb = {
  state: CmsState;
  changeRequests: ChangeRequest[];
};

const defaultState: CmsState = { fields: {}, media: {}, updatedAt: new Date(0).toISOString() };
const localDbPath = path.join(process.cwd(), ".data", "cms-db.json");

function postgresConnectionString() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || "";
}

function hasPostgres() {
  return Boolean(postgresConnectionString());
}

function canUseLocalFiles() {
  return process.env.VERCEL !== "1";
}

function requireWritableStorage() {
  if (!canUseLocalFiles()) {
    throw new Error("CMS storage is not configured. Add DATABASE_URL for Neon Postgres in Vercel before saving owner edits.");
  }
}

async function sqlClient() {
  const { neon } = await import("@neondatabase/serverless");
  return neon(postgresConnectionString());
}

async function ensureLocalDb(): Promise<LocalDb> {
  await fs.mkdir(path.dirname(localDbPath), { recursive: true });
  try {
    const raw = await fs.readFile(localDbPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalDb>;
    return {
      state: { ...defaultState, ...(parsed.state ?? {}) },
      changeRequests: parsed.changeRequests ?? []
    };
  } catch {
    const initial: LocalDb = { state: defaultState, changeRequests: [] };
    await fs.writeFile(localDbPath, JSON.stringify(initial, null, 2));
    return initial;
  }
}

async function writeLocalDb(db: LocalDb) {
  await fs.mkdir(path.dirname(localDbPath), { recursive: true });
  await fs.writeFile(localDbPath, JSON.stringify(db, null, 2));
}

async function ensurePostgres() {
  const sql = await sqlClient();
  await sql`
    create table if not exists cms_state (
      id text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `;
  await sql`
    create table if not exists change_requests (
      id text primary key,
      name text not null,
      message text not null,
      page text not null,
      created_at timestamptz not null default now()
    )
  `;
}

export async function getCmsState(): Promise<CmsState> {
  if (hasPostgres()) {
    await ensurePostgres();
    const sql = await sqlClient();
    const rows = await sql`select data, updated_at from cms_state where id = 'default' limit 1`;
    if (!rows[0]) return { ...defaultState, updatedAt: new Date().toISOString() };
    const data = rows[0].data as Partial<CmsState>;
    return { fields: data.fields ?? {}, media: data.media ?? {}, updatedAt: new Date(rows[0].updated_at as string).toISOString() };
  }
  if (!canUseLocalFiles()) return { ...defaultState, updatedAt: new Date().toISOString() };
  const db = await ensureLocalDb();
  return db.state;
}

export async function saveCmsState(update: Partial<Pick<CmsState, "fields" | "media">>): Promise<CmsState> {
  const existing = await getCmsState();
  const next: CmsState = {
    fields: { ...existing.fields, ...(update.fields ?? {}) },
    media: { ...existing.media, ...(update.media ?? {}) },
    updatedAt: new Date().toISOString()
  };

  if (hasPostgres()) {
    await ensurePostgres();
    const sql = await sqlClient();
    await sql`
      insert into cms_state (id, data, updated_at)
      values ('default', ${JSON.stringify(next)}::jsonb, now())
      on conflict (id) do update set data = excluded.data, updated_at = now()
    `;
    return next;
  }

  requireWritableStorage();
  const db = await ensureLocalDb();
  db.state = next;
  await writeLocalDb(db);
  return next;
}

export async function addChangeRequest(input: { name?: string; message: string; page?: string }): Promise<ChangeRequest> {
  const request: ChangeRequest = {
    id: `cr_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: input.name?.trim() || "Owner feedback",
    message: input.message.trim(),
    page: input.page || "/",
    createdAt: new Date().toISOString()
  };

  if (hasPostgres()) {
    await ensurePostgres();
    const sql = await sqlClient();
    await sql`
      insert into change_requests (id, name, message, page, created_at)
      values (${request.id}, ${request.name}, ${request.message}, ${request.page}, ${request.createdAt})
    `;
    return request;
  }

  requireWritableStorage();
  const db = await ensureLocalDb();
  db.changeRequests.unshift(request);
  await writeLocalDb(db);
  return request;
}

export async function listChangeRequests(): Promise<ChangeRequest[]> {
  if (hasPostgres()) {
    await ensurePostgres();
    const sql = await sqlClient();
    const rows = await sql`select id, name, message, page, created_at from change_requests order by created_at desc limit 200`;
    return rows.map((row) => ({
      id: String(row.id),
      name: String(row.name),
      message: String(row.message),
      page: String(row.page),
      createdAt: new Date(row.created_at as string).toISOString()
    }));
  }
  if (!canUseLocalFiles()) return [];
  const db = await ensureLocalDb();
  return db.changeRequests;
}

export async function exportCmsDatabase() {
  return {
    exportedAt: new Date().toISOString(),
    storage: hasPostgres() ? "postgres" : "local-json",
    state: await getCmsState(),
    changeRequests: await listChangeRequests()
  };
}

export async function replaceCmsDatabase(imported: CmsExport) {
  const nextState: CmsState = {
    fields: imported.state?.fields ?? {},
    media: imported.state?.media ?? {},
    updatedAt: new Date().toISOString()
  };
  const nextRequests = (imported.changeRequests ?? []).map((request) => ({
    id: String(request.id || `cr_${Date.now()}`),
    name: String(request.name || "Owner feedback"),
    message: String(request.message || ""),
    page: String(request.page || "/"),
    createdAt: request.createdAt ? new Date(request.createdAt).toISOString() : new Date().toISOString()
  })).filter((request) => request.message.trim());

  if (hasPostgres()) {
    await ensurePostgres();
    const sql = await sqlClient();
    await sql`delete from change_requests`;
    await sql`
      insert into cms_state (id, data, updated_at)
      values ('default', ${JSON.stringify(nextState)}::jsonb, now())
      on conflict (id) do update set data = excluded.data, updated_at = now()
    `;
    for (const request of nextRequests) {
      await sql`
        insert into change_requests (id, name, message, page, created_at)
        values (${request.id}, ${request.name}, ${request.message}, ${request.page}, ${request.createdAt})
        on conflict (id) do update set name = excluded.name, message = excluded.message, page = excluded.page, created_at = excluded.created_at
      `;
    }
    return { state: nextState, changeRequests: nextRequests };
  }

  requireWritableStorage();
  const db: LocalDb = { state: nextState, changeRequests: nextRequests };
  await writeLocalDb(db);
  return db;
}

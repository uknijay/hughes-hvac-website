# Hughes HVAC owner handoff

This build now has a database-backed owner editing layer for the pre-deployment review pass.

## Owner login

Local preview defaults:

- URL: `http://localhost:3000/admin`
- Email: `admin@hughes.local`
- Password: `HughesAdmin2026!`

Replace these on Vercel with strong values before sending a public preview link:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Editing content

1. Open `/admin`.
2. Log in through the floating admin panel.
3. Use the page links to open a page with editor mode enabled.
4. Click outlined text to edit inline.
5. Click an outlined image slot, choose `Replace media`, then `Save draft`.
6. Use `Request a change` for anything the owners want Jay to implement manually.
7. Use `Export DB JSON` after the owner pass so the database state and change requests can be handed back to development.

## Database and media storage

Local development uses files that are ignored by Git:

- Content and change requests: `.data/cms-db.json`
- Uploaded images: `.data/uploads/*`

Vercel deployment should attach:

- **Neon Postgres** through Vercel Marketplace for content and change requests (`DATABASE_URL` injected by Vercel).
- **Vercel Blob** for owner-uploaded images (`BLOB_READ_WRITE_TOKEN` injected by Vercel).

The app automatically chooses Vercel storage when those environment variables exist, and falls back to local files when they do not.

## Moving database state

- Export from the current environment with the admin panel's `Export DB JSON` action, or call `/api/cms/export` while logged in.
- Import into another environment with `Import DB JSON` from the admin panel.
- Uploaded local images referenced by an export are local preview URLs. For production, upload images again after Vercel Blob is connected so exports reference durable Blob URLs.

## Vercel deployment checklist

1. Connect the GitHub repo to Vercel.
2. Add Neon Postgres through Vercel Marketplace to the project.
3. Add Vercel Blob to the project.
4. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`.
5. Build command: `npm run build`.
6. Confirm `/admin` works, content saves, image upload returns `vercel-blob`, export downloads JSON, and change requests appear in the export.

## Notes for final launch

The owner editor is for pre-launch content collection. Before final launch, review all owner-provided copy and imagery, replace remaining placeholder policy/legal/recruitment text, and connect the public contact form to the approved inbox or CRM.

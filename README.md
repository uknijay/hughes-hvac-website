# Hughes HVAC website

Production-ready website redesign for Hughes Ventilation Air Conditioning Ltd, built from the supplied research file.

## Stack

- Next.js App Router
- TypeScript
- Structured JSON seed content in `src/content/site.json`
- Database-backed preview CMS with Vercel Postgres / local JSON fallback
- Vercel Blob / local file media upload fallback
- CSS design system in `src/app/globals.css`
- `DESIGN.md` token specification

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` if you want to override the local admin defaults.

## Verification

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

For browser QA:

```bash
npm run dev
npm run test:e2e
```

## Editing content

The static seed content lives in `src/content/site.json`. The owner preview CMS stores overrides in a database so clients can fill in copy, replace images and submit requested changes without editing code.

Local admin preview:

```bash
npm run dev
```

Then open `http://localhost:3000/admin` and log in with the local defaults from `.env.example`.

Owner editor features:

- Inline text editing on every main route via `?admin=1`.
- Image replacement through `/api/cms/media`.
- Content persistence through `/api/cms/content`.
- Owner change requests through `/api/cms/change-requests`.
- Export/import through `/api/cms/export` and `/api/cms/import`.

See `OWNER_HANDOFF.md` for the owner workflow and deployment handoff.

## Deployment

The app is now aimed at Vercel because the owner CMS needs server routes and durable storage. Build command:

```bash
npm run build
```

Set these production environment variables in Vercel:

```bash
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
POSTGRES_URL=
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_CONTACT_ENDPOINT=
NEXT_PUBLIC_MAP_EMBED_URL=
```

Attach Vercel Postgres so `POSTGRES_URL` is injected and attach Vercel Blob so `BLOB_READ_WRITE_TOKEN` is injected. Without those env vars, local development falls back to `.data/cms-db.json` and `.data/uploads/`.

The current public contact form is still a static front-end demo. Connect it to an approved form endpoint, CRM or server action before launch.

## Client content still required

- Approved leadership biographies and portraits.
- Approved project case studies with real images, outcomes and client permissions.
- Approved contact email or form destination.
- Approved map embed.
- Privacy, terms, cookies and recruitment policy wording.
- Real photography to replace the placeholder image URLs.

## GitHub remote

If credentials are available, create a remote repository and push:

```bash
gh repo create hughes-hvac-website --private --source=. --remote=origin --push
```

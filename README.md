# Hughes HVAC website

Production-ready website redesign for Hughes Ventilation Air Conditioning Ltd, built from the supplied research file.

## Stack

- Next.js App Router
- TypeScript
- Structured JSON content in `src/content/site.json`
- CSS design system in `src/app/globals.css`
- `DESIGN.md` token specification

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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

Most website copy lives in `src/content/site.json`. Update services, company details, leadership profiles, project cards, careers and placeholder notes there. Route components read that file rather than embedding long copy in page code.

## Deployment

The app can deploy to Vercel, Netlify or Cloudflare Pages using the standard Next.js build command:

```bash
npm run build
```

Set these optional environment variables in production:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=
NEXT_PUBLIC_MAP_EMBED_URL=
```

The current contact form is a static front-end demo. Connect it to an approved form endpoint, CRM or server action before launch.

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

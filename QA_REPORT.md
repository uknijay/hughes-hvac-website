# QA report

## Scope

Pages reviewed: home, about, services, engineering services, projects, certifications, contact, careers and 404.

## Automated checks

Latest run completed successfully:

- `npm run typecheck` passed.
- `npm run lint` passed with warnings only: direct `<img>` usage pending optimized local client imagery, and one eslint config export warning.
- `npm run test` passed content integrity and static accessibility checks.
- `npm run build` passed and generated 10 static routes.
- `npm run test:e2e` passed 9 Playwright tests with axe critical-violation checks across all main routes and a contact-form smoke test.
- `npx -y @google/design.md lint DESIGN.md` passed with no errors and 3 unused-token warnings.

## Manual checks performed

- Navigation routes exist for all primary pages.
- Content is sourced from `src/content/site.json`.
- Placeholder content is explicitly labelled.
- Contact form has visible labels, validation feedback and a live status region.
- Layout uses responsive single-column fallbacks below tablet width.

## Known limitations

- Placeholder photography must be replaced.
- Contact form needs a production endpoint.
- Map embed is a placeholder.
- Full Lighthouse numbers require running the production build in a browser session.

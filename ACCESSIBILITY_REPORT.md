# Accessibility report

## Browser evidence

Playwright and axe checked home, about, services, engineering services, projects, certifications, contact and careers. No critical accessibility violations were reported in the e2e run.

## Baseline choices

- Semantic landmarks: header, nav, main and footer.
- Skip link included.
- Visible focus styles for keyboard navigation.
- Form labels are visible and associated with inputs.
- Contact form status uses `role="status"` and `aria-live="polite"`.
- Reduced-motion CSS disables non-essential animation.
- Content images have descriptive alt text and are marked as placeholders where needed.

## Items to verify with client content

- Real photography must receive accurate alt text.
- Any future map embed needs an accessible title and fallback address text.
- Legal and policy pages need final accessible content structure.
- Recruitment content should include clear application instructions and equal opportunities wording if supplied by the client.

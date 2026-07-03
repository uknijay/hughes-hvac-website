# Performance report

## Build evidence

`npm run build` completed successfully and generated the site as static routes. Lighthouse should still be run after real image assets are added.

## Performance decisions

- Minimal client-side JavaScript. Only the contact form is a client component.
- CSS animations are transform and opacity based.
- Images use remote placeholders and fixed aspect ratios to reduce layout shift.
- Fonts load through `next/font` with `display: swap`.

## Production recommendations

- Replace placeholder remote images with optimized local `next/image` assets.
- Add an Open Graph image generated from approved photography.
- Run Lighthouse against `npm run build && npm run start` before launch.
- Avoid large third-party widgets unless required by the client.

# Taste and motion review

## Design read

Reading this as: premium industrial B2B service website for offshore, marine, oil and gas procurement and engineering buyers, with a technical dossier language leaning toward Carbon structure, marine photography and restrained Emil Kowalski-style interaction polish.

## Motion rationale

- Hero reveal: communicates hierarchy and prevents a hard page snap on first load.
- Image clip reveal: frames placeholder/approved photography as a physical engineering plate rather than a stock image.
- Load and stagger reveal on sections and tiles: adds sequence while preserving readability for technical buyers.
- Button shimmer and press scale: tactile feedback only, under 300ms for UI response.
- Card/image hover lift: occasional pointer interaction, gated to hover-capable devices.
- Reduced motion: all movement collapses through `prefers-reduced-motion`.

## Animation review table

| Before | After | Why |
| --- | --- | --- |
| Static section entry except a basic `.reveal` class | Load/stagger reveal on major sections, tiles, process cards and form fields | Gives each page a premium sequence without JS scroll listeners or hidden offscreen content |
| Buttons had only background and scale feedback | Added clipped sheen plus existing press scale | Improves tactile response while staying fast and industrial |
| Imagery appeared flat | Added clip reveal and slow image scale on hover | Makes photography feel like a deliberate engineering plate |
| Hover motion could have affected touch devices | Hover effects gated behind `@media (hover:hover) and (pointer:fine)` | Avoids sticky hover behavior on mobile |
| Motion existed but was not documented | Motion rationale and page taste review documented | Makes the motion system auditable and maintainable |

## Taste gate checklist

- No AI-purple gradients, glassmorphism or SaaS hero cards.
- One accent family, sharp geometry and industrial grid language.
- Hero CTA visible in the first viewport.
- Service bento grid is fully populated with no dead cells.
- Motion uses transform, opacity and clip-path only.
- No `window.addEventListener("scroll")` or React scroll state.
- Reduced-motion fallback exists.

## Page review notes

| Page | Taste result | Notes |
| --- | --- | --- |
| Home | Pass | Strong industrial hero, clear CTA contrast, complete services grid, no SaaS/AI visual language. |
| About | Pass | Large editorial hierarchy feels confident; registered details and leadership placeholders are clear and honest. |
| Services | Pass | Dense technical service grid now has no dead bento cell; hierarchy remains readable for procurement and engineering buyers. |
| Engineering services | Pass | Process grid is clean and technical; unrelated placeholder photography was replaced with a client-approved photography plate. |
| Projects | Pass | Case study placeholders are explicit; unrelated stock-looking imagery was removed in favour of industrial placeholder plates. |
| Certifications | Pass | Compliance grid now resolves as a balanced 2x2 system with no empty filler cell or invented claims. |
| Contact | Pass | Form labels, inputs, contact hierarchy and map placeholder are legible and direct. |
| Careers | Pass | Recruitment placeholder is sparse but honest; no fake vacancy detail has been invented. |

## Issues corrected during the gate

- Removed scroll-timeline reveal because full-page QA showed hidden offscreen content in screenshots.
- Replaced it with non-hiding load/stagger animation plus tactile hover and press states.
- Reworked Services and Certifications grids to remove empty bento cells.
- Replaced unrelated project and engineering placeholder photos with branded industrial placeholder plates that clearly ask for client-approved photography.

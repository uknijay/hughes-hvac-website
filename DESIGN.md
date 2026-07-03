---
version: alpha
name: Hughes HVAC industrial dossier
description: Robust, technical website system for an offshore and marine HVAC engineering firm.
colors:
  primary: "#0C2233"
  secondary: "#244F3D"
  tertiary: "#B45B35"
  neutral: "#F2F0EA"
  surface: "#FBFAF6"
  ink: "#111827"
  muted: "#4B5563"
  line: "#C8C3B6"
typography:
  h1:
    fontFamily: IBM Plex Sans
    fontSize: 6.2rem
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.065em"
  h2:
    fontFamily: IBM Plex Sans
    fontSize: 4.6rem
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.052em"
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  technical-label:
    fontFamily: IBM Plex Mono
    fontSize: 0.76rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.11em"
rounded:
  sharp: 2px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  xxl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sharp}"
    padding: 16px
  button-secondary:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.primary}"
    rounded: "{rounded.sharp}"
    padding: 16px
  surface-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: 24px
---

## Overview

The visual system should feel like a technical project dossier, not a SaaS product. It uses an off-white engineering-paper substrate, navy structural panels, dark green credibility accents and small rust highlights for warnings or client-content notices.

## Colors

- **Primary navy (#0C2233):** Main authority color for navigation, dark panels and primary CTAs.
- **Deep green (#244F3D):** Secondary accent for service links and technical labels.
- **Rust (#B45B35):** Sparse placeholder and attention color. Do not use it as a decorative gradient.
- **Off-white (#F2F0EA):** Page background. Keeps the site warmer than a sterile enterprise dashboard.
- **Surface (#FBFAF6):** Cards and content panels.
- **Ink (#111827):** Primary text.
- **Muted (#4B5563):** Secondary copy. Must keep AA contrast on the background.

## Typography

IBM Plex Sans and IBM Plex Mono are used because they read as engineered and credible. Headlines are large, tight and left aligned. Body copy remains plain and readable. Mono is reserved for labels, company numbers and technical metadata.

## Layout

The layout uses visible grid compartments, sharp edges and strong horizontal bands. Cards are flat, separated by lines rather than heavy shadows. Major content areas use asymmetry, but mobile collapses to a single column.

## Elevation & Depth

Depth comes from material changes, not soft SaaS shadows: off-white page, cream surfaces, navy panels, thin rules and photography. Avoid glassmorphism, neon glow and decorative gradients.

## Shapes

Use a sharp 2px radius throughout. Buttons, cards, inputs and image frames must share the same mechanical geometry.

## Components

Primary buttons use navy fill and white text. Secondary buttons use a white or transparent surface with navy stroke. Service tiles use flat surfaces with clear headings and links. Form fields use visible labels above inputs, never placeholder-only labels.

## Do's and Don'ts

Do use real industrial photography once approved by the client. Do keep service content factual and specific. Do mark missing legal, case study and recruitment content as placeholder.

Do not use startup gradients, fake metrics, invented testimonials, soft rounded SaaS cards, decorative status dots or claims that are not in the research file.

# Project Constraints

## 1. STACK
Primary stack:
- Next.js 14.2.15
- React 18.2.0
- Tailwind CSS v4
- PostCSS
- `next.config.mjs`

Do not introduce incompatible patterns or tooling unless explicitly required.

## 2. PRODUCT MODEL
Base project flow:

`SEO → comparativa → decisión → click afiliado`

This flow is a project constraint and should guide implementation decisions.

## 3. SEO AND ROUTING
When modifying or creating routes:
- avoid 404s
- avoid redirect loops
- keep internal linking coherent
- keep canonical consistent
- preserve metadata continuity where applicable

Do not introduce route or metadata changes without validating their impact.

## 4. NON-GOALS
Do not introduce, unless explicitly requested:
- authentication systems
- SaaS-style commercial platform features
- unnecessary backend dynamics
- overengineered architecture

## 5. DATA MODEL
Prefer a single source of truth for product consumption.

When applicable:
- use ASIN as the stable reference key
- avoid real duplication of product records
- avoid parallel data models without explicit justification

## 6. TONE AND POSITIONING
Maintain:
- editorial style
- calm and explanatory tone
- non-medical positioning
- restrained visual presentation

Avoid:
- clinical or medical claims
- invasive ecommerce aggressiveness
- sensationalist copy
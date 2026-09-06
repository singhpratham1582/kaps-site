# KAPS

Website for KAPS (Kothari Advertising and Printing Services), a New Delhi printing house established 1995.

Static HTML, CSS and JavaScript. No framework, no build toolchain beyond a single Node script. The generated pages at the repo root are the deliverable and can be opened straight from disk or dropped on any static host.

## Build

```bash
node build.mjs
```

Assembles eleven pages from `src/shell.html` + `src/partials/` + `src/pages/*.html` and writes them to the repo root.

**Edit the files in `src/`, never the generated HTML at the root.** Anything changed at the root is overwritten on the next build.

## Layout

```
src/
  shell.html            document shell: head, header/footer slots, script tags
  partials/             header.html, footer.html
  pages/                one file per page, each opening with a <!--meta --> block
assets/
  css/tokens.css        design tokens, generated from DESIGN.md
  css/base.css          layout, components, photography grading
  css/motion.css        the motion layer and its failsafes
  js/main.js            no dependencies: reveals, nav, FAQ, loader, marquee
  js/motion.js          Lenis + GSAP ScrollTrigger choreography
  img/photo/            photography, with credits.json
docs/gap-decisions.md   open questions for the client
DESIGN.md               the design system, and the source of truth for it
```

## DESIGN.md

Read it before changing anything visual. It carries the tokens, the component rules, the motion vocabulary and a hard Don't list, and it records why several decisions were made the way they were.

Two rules from it worth repeating here, because both were real production bugs:

- **CSS owns every visible state; a tween may only move it.** No animation may write an inline transform that is the only thing standing between a visitor and the content.
- **Create scroll triggers in document order and sort before the first refresh.** A pinned section adds a spacer, and triggers created before it cache positions that ignore it.

## Third-party

Lenis, GSAP + ScrollTrigger and Splide load from CDN and are all progressive enhancement: with every one of them blocked the site still reads as a complete static document.

Photography is an interim set licensed from Unsplash, to be replaced with photographs of real KAPS work. Attribution data is in `assets/img/photo/credits.json`; the footer credit line is currently switched off (`RENDER_CREDITS` in `build.mjs`).

## Open items

See `docs/gap-decisions.md`. The street address is still missing and the contact form is marked up for Netlify Forms but not wired to a backend.

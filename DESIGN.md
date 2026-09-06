---
version: 2.0
name: KAPS Design System
description: >
  Design language for KAPS, a New Delhi printing house established 1995 that
  prints for courts, hospitals, airlines and ministries. Version 2 inverts the
  ground. A deep blue carries the site, a warm cream is the counter-ground used
  to mark a turn in the argument, and a single amber accent is rationed rather
  than spread. Real photography, graded to the palette, does the work that drawn
  rectangles could not. The register is an annual report, not a SaaS landing page.

dials:
  DESIGN_VARIANCE: 7
  MOTION_INTENSITY: 8
  VISUAL_DENSITY: 5
  rationale: >
    Revised 2026-09-05. Motion went from 4 to 8 when the brief changed: the site
    has to feel expensive and alive, not merely correct. Density went from 4 to 5
    when photography replaced drawn specimens, because real images carry more
    incident than flat shapes and the page can hold more without feeling busy.
    What does NOT change is the Don't list. Expense comes from choreography and
    material, never from decoration, so every banned pattern stays banned. The
    rule is: motion may be ambitious, ornament may not exist.

colors:
  blue-900: "#05101F"
  blue-800: "#0A1B33"
  blue-700: "#12263F"
  blue-600: "#1B3452"
  on-blue: "#F2F6FB"
  on-blue-body: "#C8D4E2"
  on-blue-muted: "#9FB0C4"
  paper: "#F7F4ED"
  paper-2: "#EFEBE1"
  ink: "#0A1B33"
  ink-body: "#3A4657"
  ink-muted: "#5A6879"
  accent: "#E0A458"
  accent-deep: "#D89A44"
  accent-onpaper: "#8A5A1F"
  rule: "rgba(242,246,251,0.14)"
  rule-strong: "rgba(242,246,251,0.28)"
  rule-paper: "rgba(10,27,51,0.14)"
  note: >
    Version 1 was a cream ground with an Instrument Serif display face and a
    copper accent. It was replaced for two measured reasons: the cream build had
    genuinely low contrast on headings, and the client asked to return to blue.
    Every pair below is measured, not estimated.

typography:
  display:
    fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(3rem, 6.6vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  h1:
    fontFamily: "'Newsreader', Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  h2:
    fontFamily: "'Newsreader', Georgia, serif"
    fontSize: "clamp(2rem, 3.6vw, 3.1rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.018em"
  h3:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.7vw, 1.45rem)"
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.35vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.68
  small:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "0.9375rem"
    lineHeight: 1.55
  eyebrow:
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.8125rem"
    letterSpacing: "0.08em"
    textTransform: "uppercase"
    note: "Mono, uppercase, no index number. '01 · Logo assets' is a tell."
  numeric:
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontVariantNumeric: "tabular-nums"
    note: "Quantities, dimensions, GSM, run sizes only."

spacing:
  base: 4
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192]
  section-y: "clamp(4.5rem, 8vw, 8.5rem)"
  section-y-tight: "clamp(3rem, 5vw, 5.5rem)"
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  container: "74rem"
  container-wide: "86rem"
  measure: "64ch"
  measure-display: "19ch"

radius:
  none:  "0"
  default: "6px"
  card:  "14px"
  lg:    "24px"
  pill:  "999px"
  photo: "10px"
  note: "Revised. The 2px scale read as an oversight, not as restraint. Split the
    difference by material: anything standing in for a sheet of paper keeps a tight
    corner (leaf 3px, chip 4px, specimen 2px), because paper does. Interface
    furniture that is not pretending to be paper gets real curvature, and buttons
    are pills."

shadows:
  sm: "0 1px 2px rgba(2,8,18,0.30)"
  md: "0 14px 34px -16px rgba(2,8,18,0.60)"
  lift: "0 40px 80px -32px rgba(2,8,18,0.80)"
  note: "Hairlines carry structure. Shadow is for physically lifted paper only."

photography:
  on-blue: "grayscale(.30) contrast(1.16) brightness(.74) saturate(.88), blue multiply, vignette"
  on-paper: "grayscale(.16) contrast(1.14) brightness(.95) saturate(1), light ink wash"
  band-text: "heavy left scrim so type has a ground; both edges feathered into the sections above and below"
  band-warm: "full saturation, for foil, ink and stock, where the colour of the material is the point"
  hover: "scale(1.04), colour returns"
  note: >
    Raw stock on a branded ground looks like stock. Nothing is dropped in
    ungraded. Current imagery is licensed from Unsplash as an interim set, to
    be replaced with photographs of actual KAPS work.
  credits: >
    The footer credit line was removed on client instruction (2026-09-06).
    Attribution data is kept in assets/img/photo/credits.json and the .credits
    styles remain in base.css; set RENDER_CREDITS to true in build.mjs and
    restore {{credits}} to the footer partial to bring it back. Note that
    Unsplash's API terms do require photographer attribution while their
    images are in use. Replacing the interim set with real KAPS photography
    removes the obligation.

motion:
  ease: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-mask: "cubic-bezier(0.16, 1, 0.3, 1)"
  fast: "160ms"
  base: "280ms"
  slow: "560ms"
  stack: "Lenis for smooth scroll, GSAP + ScrollTrigger for choreography"
  note: "MOTION_INTENSITY 8. Ambitious choreography, zero ornament."
---

## Overview

KAPS sells printed objects to buyers who cannot afford a reprint. The design language has one job: look like the work, and get out of the way of the proof.

Three ideas carry the whole system.

**Blue is the ground, cream is the argument.** A deep blue carries the site for its full length, and a warm cream appears once or twice per page. The cream is not decoration and not variety for its own sake: it marks the point where the page turns from stating a problem to showing the work. Version 1 ran the whole site on cream and read as flat; the value is in the contrast between the two, not in either one.

**Photography does the work.** Version 1 drew specimens: rectangles at true paper proportions standing in for printed pieces. They were honest and they never once looked expensive. Real photographs, graded hard toward the palette, replaced them. A drawn rectangle cannot be premium, because premium is a material quality and a rectangle has no material.

**The accent is rationed.** One amber, used for eyebrows, links, the live nav item, the primary button, and the small marks that indicate state. It is not a fill for large areas and it never appears as a gradient.

## Colors

### Ground
| Token | Value | Use |
|---|---|---|
| `blue-900` | `#05101F` | Deepest band, footer, the sections that need to recede |
| `blue-800` | `#0A1B33` | The primary ground. Most of the site sits here |
| `blue-700` | `#12263F` | Raised surface: cards, tiles, the alternate section band |
| `blue-600` | `#1B3452` | Hover states, hairline-adjacent fills |
| `paper` | `#F7F4ED` | The counter-ground. One or two sections per page |
| `paper-2` | `#EFEBE1` | A second cream tone, used rarely |

Sections must alternate. Three sections of the same background in a row flattens the page, which is what "the blue shades are just there" meant.

### Type on blue
| Token | Value | Contrast | Use |
|---|---|---|---|
| `on-blue` | `#F2F6FB` | 15.89:1 AAA | Headlines, emphasis |
| `on-blue-body` | `#C8D4E2` | 11.48:1 AAA | Body, long-form |
| `on-blue-muted` | `#9FB0C4` | 7.79:1 AAA | Captions, labels, provenance |

### Type on cream
| Token | Value | Contrast | Use |
|---|---|---|---|
| `ink` | `#0A1B33` | 15.70:1 AAA | Headlines |
| `ink-body` | `#3A4657` | 8.72:1 AAA | Body |
| `ink-muted` | `#5A6879` | 5.18:1 AA | Captions |

There is no fainter tier on purpose. A "faint" tier is where accessibility quietly fails, and if text is not worth reading at AA it is not worth putting on the page.

### Accent
| Token | Value | Contrast | Use |
|---|---|---|---|
| `accent` | `#E0A458` | 7.90:1 on blue, AAA | Eyebrows, links, primary button, active nav |
| `accent-deep` | `#D89A44` | on blue | Pressed, hover fill |
| `accent-onpaper` | `#8A5A1F` | 5.37:1 on cream, AA | The accent when a section is cream |

Amber on blue is the honest translation of the brand's gold mandate. Gold on cream is illegible, which is why cream sections use the deeper `accent-onpaper` instead.

### Every component needs both polarities
When a component is added to the site it must be given a cream variant in the same commit. Without one it renders white on cream and disappears. The cream section of the style guide exists to catch exactly this, and it has caught it before.

## Typography

**Newsreader** for display and headings, at weight 500. Not 400. A 400-weight hairline serif on a dark ground was the readability fault in version 1: beautiful at 100px, thin and hard to read at every size that actually appears on the page. Newsreader at 500 has real stroke weight and holds up against the blue.

**IBM Plex Sans** for everything else. It is a workhorse with enough character to sit beside a serif without apologising.

**IBM Plex Mono** for eyebrows and for numbers with `tabular-nums`. Quantities, GSM, dimensions, run sizes, band captions.

### Hierarchy
Control hierarchy with **weight and colour before scale**. An 11rem headline creates a scream, not a voice.

- Display, h1 and h2 use Newsreader at 500. There is no lighter weight in use.
- h3 switches to IBM Plex Sans at 600. The shift in family is the hierarchy signal.
- Body sits at `1.0625rem` / `1.68`. Measure is capped at `64ch`.
- Display measure is capped at `19ch` so headlines break in a controlled way.

### Rules
- `text-wrap: balance` on every heading. `text-wrap: pretty` on body. No orphans.
- Negative tracking on display, zero on body. Do not add positive tracking to small text to make it look "designed."
- Eyebrows are mono uppercase and carry **no index number**. "01 · Logo assets" is a tell.
- Numbers in running text use tabular figures so columns of quantities line up.

## Layout

### Spacing
4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192. Nothing off-scale.

Section rhythm is `clamp(4rem, 7vw, 7.5rem)` top and bottom. Two adjacent sections on the same ground collapse the doubled padding rather than leaving a dead band.

### Grid
Container `72rem`, wide variant `84rem`, gutter `clamp(1.25rem, 4vw, 3rem)`.

Use CSS Grid. Never flexbox percentage math.

**Asymmetry is the default.** A section is a 5/7 or 4/8 split, not two halves. A long section is a sticky left column against a scrolling right column. Three equal columns side by side is banned: it is the most recognisable machine-designed layout there is.

### Whitespace
Whitespace is the luxury signal, and it is cheap. When a section feels thin, the answer is more space and fewer elements, not more decoration.

The counter-rule, learned the hard way: **a section with two lines of content does not get a full section's padding.** Use `section-y-tight`. Full padding on a short band is what reads as a void rather than as breathing room.

## Elevation & Depth

Depth comes from four things only:

1. **Hairlines** at `rule` (`rgba(242,246,251,0.14)`), or `rule-paper` on cream, separate content. One border per boundary, never top and bottom on the same row.
2. **A raised surface** at `blue-700`, or `#FFFFFF` on cream, with `shadow-sm` for a card that is genuinely a separate object.
3. **A real lift** with `shadow-lift` for something depicted as physical paper: a sheet, a leaf, a chip, a printed sample.
4. **A vignette** on every photograph, so its edges fall off into the ground instead of stopping at a hard border. This is the single most effective move for making an image sit *in* a dark page rather than on it.

No glassmorphism. No inner glows. No neon.

## Shapes

Radius is split by material. Anything standing in for a sheet of paper keeps a tight corner, because paper does: leaves `3px`, chips `4px`, specimens `2px`, bands `0`. Interface furniture that is not pretending to be paper gets real curvature: cards and tiles `14px`, photos `10px`, fields `6px`. Buttons and pills are fully rounded.

Images and printed pieces keep true paper proportions: A-series `1:1.414`, business card `1.75:1`, square for packaging. Photographs use the aspect presets so an image never dictates layout: `--wide` 16:9, `--tall` 3:4, `--square` 1:1, `--hero` 4:5, `--band` 21:9.

## Components

### Buttons
Two variants, `pill` radius, and one hover shared between them. The hover is the one finalised in the button lab, in three coordinated parts:

1. **The wipe.** A solid fill rises from the bottom edge, `scaleY(0)` to `scaleY(1)`.
2. **The swap.** The label slides up and out while a duplicate, taken from `data-text`, rises into its place.
3. **The arrow.** The first glyph exits right as the second arrives from the left, on a short delay.

Timing is **Balanced 400**, chosen from three presets in the lab: Brisk `300/250/20/170`, Balanced `400/340/30/240`, Stately `520/460/40/320`. The four numbers are wipe, swap, arrow delay, colour. They live in `tokens.css` as `--btn-dur-*`; change the speed there and nowhere else.

- **Primary**: `accent` fill, `blue-900` label, wiping to a lighter amber.
- **Secondary**: transparent on blue with a `rule-strong` border wiping to `accent`. **On cream it takes a solid `paper` fill**, because the close section has a ruled ground and a transparent button lets those lines read straight through it.

**Nothing sweeps.** A sheen sweeping across the primary button was built, reviewed and removed. It is not to come back.

The markup is load-bearing. Without `.btn__label[data-text]` there is nothing for the swap to move to, and without two `<i>` in `.btn__arrow` there is nothing to travel:

```html
<a class="btn btn--primary" href="contact.html">
  <span class="btn__label" data-text="Send us your file"><span>Send us your file</span></span>
  <span class="btn__arrow" aria-hidden="true"><i>&rarr;</i><i>&rarr;</i></span>
</a>
```

### Loading screen
The mark on the ground colour while the page assembles, then lifting with the curtain. It is a sibling of `.curtain`, not a child: the curtain animates on `scaleY` and would squash anything inside it.

**Dismissal lives in `main.js`, which has no dependencies, on a 2.2s backstop.** A loading screen that outlives its own script hides the entire site, so it must not wait on GSAP arriving or images decoding.

### Textures
Background surface for sections that carry no image. Not media and not a focal point: a material quality, the way a sheet of paper has one. Three, all drawn with gradients so they cost no request: `tex--halftone` (offset dot screen), `tex--grain` (fine fibre), `tex--rule` (ledger lines). Each is masked so it fades out instead of ending at a hard edge, and sits under the content.

Do not run the same texture twice in a row on one page. And note what is deliberately absent: **crop marks and registration targets stay banned.** A surface is a material property; those are technical furniture drawn to look designed, which is the thing the Don't list is about.

### Links
Underlined in running text at rest with `text-underline-offset: 0.2em`. A link that only reveals itself on hover is not a link. On cream, links take `accent-onpaper`.

### Cards
`blue-700` fill, `rule` border, `card` radius, `shadow-sm`. Hover raises the border to `rule-strong`, fills to `blue-600` and lifts 3px. On cream: white fill, `rule-paper` border, shadow instead of a border shift.

### Tiles
The client roster. `blue-700`, `card` radius, an amber rule 28px wide above the name that grows to 56px on hover. **Height follows content.** They were once fixed at 15rem holding two lines of text, which put a 150px hole in the middle of every card.

### Chips
A small cream artefact resting over a photograph, carrying a real specification: stock, weight, finish. 4px radius, a heavy drop shadow, and a slow float. Never more than two in a view, and they must say something true.

### Leaves and the cover
The five sheets of the bundle. A-series proportion, 3px radius, a cream paper gradient, and a pivot set at `50% 158%` so the fan opens rather than stacks. Label and title sit at the **top** of the sheet, because in a fan the middle of every card except the front one is covered. The cover is `blue-800`, carries the wordmark and the stamp, and has a spine.

### Forms
Fields are white on cream, `blue-700` on blue, with a full border rather than a bottom rule. Bottom-rule-only inputs look elegant and test badly. Focus is a `2px accent` ring with `2px` offset. Labels sit above the field, sentence case.

### Section header
Eyebrow, then heading, then optional single lead paragraph. The eyebrow names the topic in plain language. It never carries a number, never a dot separator, and there is no micro-sentence underneath it.

### Photo bands
One full-bleed photograph, edge to edge, at 21:9. `band--text` carries a heading over a heavy left scrim; `band--warm` keeps full saturation for foil, ink and stock. Both feather into the sections above and below so the band never reads as a rectangle dropped onto the page. A mono caption sits in the bottom right, the way a credit sits in print.

### Figures
A full-width band of numerals with one hairline per boundary and a short amber rule above each. Use it wherever the numbers are the content. It replaced a split that put a four-line heading in one column and a short stat block in the other, leaving a hole on the right at every width above 64rem.

**Watch the unit.** `max-width` in `ch` on a wrapper resolves against that wrapper's font size, not the heading's. `34ch` on a body-font div collapsed a display heading to 290px. Use `rem` on wrappers.

### Matrix
The comparison table. Rows are attributes, columns are the options, and the KAPS column is raised by painting the background on its own cells. Do not overlay a positioned `div` across the column: `grid-row: 1 / -1` resolves to a single implicit row, takes a real cell, and shifts every subsequent cell one column across.

**A comparison the seller wins on every line is not a comparison.** The price row says KAPS is not the cheapest, because it is not.

### The close
Every page ends here, and it is the one place the page turns to cream, immediately before the dark footer. The hard edge between the two is the point. Centred, display-scale heading, the stamp at the top, and a meta row carrying email, phone and response time behind a hairline. Before this, eleven pages ended with the same left/right split on the same blue as the four sections above it.

### Client roster
Names set in Newsreader at `h3` scale, in a real grid, one per cell. No marquee, no logo wall until real logo files with permission exist, no sector pills.

## Motion

`MOTION_INTENSITY 8`. The site should feel expensive, and on the web expense reads as *choreography*: things arrive in a considered order, at a considered speed, and they behave like the material they depict. It does not read as more effects.

The distinction that governs everything here: **motion that reveals content is allowed and encouraged. Motion that decorates is banned.** A headline setting itself line by line is the former. A pulsing glow is the latter.

### The vocabulary

Thirteen moves. Anything not on this list needs a reason.

| Move | What it does | Where |
|---|---|---|
| **Smooth scroll** | Lenis, 1.05s duration. Raises perceived quality more than any single effect. | Every page |
| **Line mask** | Headings are split into lines, each rising out of its own clip. 900ms, 70ms stagger. | Every h1 and h2 |
| **Stagger reveal** | Content blocks fade and rise 8px in document order. | Everywhere |
| **Paper wipe** | Images and printed pieces reveal by `clip-path` inset, as if a sheet is being laid down. | All imagery |
| **Sticky choreography** | A pinned left column while the right scrolls, with the aside reacting to progress. | Long sections |
| **Roster marquee** | The client cards drift sideways on their own, draggable, pausing on hover. Splide, initialised globally by id. This replaced a GSAP pinned horizontal scroll that took the page hostage while it ran. | Home |
| **Nav retreat** | The header slides out for the length of the press section and returns as it ends. Re-synced on refresh so it can never stay hidden. | The press |
| **Object tilt** | Real printed pieces tilt toward the cursor in perspective, 3D with real shadow. | Hero, product pages |
| **Page transition** | A paper wipe covers and uncovers between pages. | Site-wide |
| **Scroll progress** | A hairline at the top fills with accent as the page advances. | Site-wide |
| **Band parallax** | A full-bleed photograph drifts 12% of its own height against the scroll. The image is 116% tall with a -8% offset so no edge is ever exposed. | Photo bands |
| **Float** | Cream chips carrying a real specification drift on a 7 to 9 second cycle, each with its own delay and rotation so they never sync. | Hero, styleguide |
| **The bundle** | Five sheets held open as a fan close into one stack, and a cover lands on it carrying the wordmark and the stamp. Scrubbed, pinned for 1.25 viewports. | Home |

### Rules
- **CSS owns every visible state. A tween may only move it.** The hidden state is a class defined in CSS, the reveal is a class change, and a stagger is a transition-delay. No move may write an inline transform that is the only thing standing between the user and the content, because CSS cannot override an inline style and the content is then unrecoverable.
- Every reveal needs three independent paths to visible: shown immediately if already on screen, a scroll trigger, and a timed backstop. This is a system rule because it was a real production bug twice. `initLines` used `gsap.set(inners, { yPercent: 105 })` with no backstop and parked every heading on the site 105% below its own mask; `initWipe` had the same shape and could clip every photograph to nothing.
- `prefers-reduced-motion` disables all thirteen moves. The page stays fully usable and fully legible.
- **Create scroll triggers in document order, and sort before the first refresh.** A pinned section adds a pin-spacer that pushes everything below it down by the pin distance. Any trigger created before that spacer exists caches a scroll position that does not include it. The bundle pins for 1.25 viewports, and because it was initialised after the press, both press triggers sat 1,005px too high: the machine ran its cycle while the bundle was still pinned and the press was a viewport below the fold. Measure drift as `trigger.start` against the element's real document offset; it should be zero.
- **Refresh again on `load` and after `document.fonts.ready`.** Triggers are cached at `DOMContentLoaded`, before images decode and webfonts swap. Both re-wrap and re-flow the page underneath the cached numbers.
- **Reserve a box for every image.** The photo presets do this with `aspect-ratio`; a bare `height: auto` image does not, and everything below it moves when it arrives.
- Motion never blocks reading. No scroll-jacking that traps the user, no forced pauses, no minimum dwell time.
- A scrubbed set piece gets a settle beat: it holds its idle state, fully in view, for roughly half a viewport of scroll before it starts. Arriving at a machine already half-way through its cycle reads as having missed the beginning.
- Two pinned sections per page maximum, and only if they are far apart. Three is a fairground.
- Durations: micro-interactions `160ms`, content reveals `520ms`, headline masks `900ms`, page transitions `700ms`.

### Still banned, at any motion level
Parallax on decorative shapes, counters on fake-perfect numbers, infinite marquees of logos, cursor followers, pulsing glows, auto-playing carousels, animated gradient meshes, and anything on the Don't list below.

## Do's and Don'ts

### Do
- Let paper carry the page and use ink bands twice at most.
- Set headlines in the serif and let size do less work than you think it should.
- Cap measure and use `text-wrap: balance`.
- Use asymmetric grids and sticky columns for long sections.
- Put real numbers in tabular figures.
- Keep one accent and spend it on links and state.

### Don't
These come from the taste-skill Tells list, and every one of them was present in the previous build. They are hard bans.

- **No em-dash anywhere.** Not in headlines, body, captions, alt text. Use a period, comma, colon or a plain hyphen.
- **No middle-dot as a default separator.** One per line maximum in a metadata strip. Prefer line breaks, columns or hairlines.
- **No section-number eyebrows.** Not `01 · Capabilities`, not `Step 03 of 06`, not `Stage 1 / Stage 2`. The step content is the label.
- **No scroll cues.** No `Scroll`, no animated arrow at the fold. The reader knows.
- **No div-built fake product UI or fake documents in the hero.** Use a real photograph, a real scan, or nothing.
- **No three equal feature cards.**
- **No gradient text on large headings.**
- **No decorative hairline grids, crop marks or registration targets** drawn only to make the page feel designed.
- **No all-caps letterspaced micro-labels** on every eyebrow, tag and caption.
- **No `border-top` and `border-bottom` on every row** of a list or spec table. Pick one, use it sparsely.
- **No locale, time or weather strips.** A real address in the footer is fine, atmosphere is not.
- **No decoration text strip at the hero bottom.**
- **No pills or plate captions overlaid on images.**
- **No pure `#000000`, no neon, no glow, no custom cursor.**

## Responsive Behavior

Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.

Full-height sections use `100svh` with a `100vh` fallback declared first. Never `100vh` alone, and never `h-screen`.

Two-column splits collapse to one column at `lg`. Sticky columns become static. The client roster drops from four columns to two, then one. Touch targets are `44px` minimum.

Type scales through `clamp()` so there are no per-breakpoint font-size overrides.

## Accessibility

- Every text pair on the page meets AA. The primary pairs meet AAA.
- Focus is always visible: `2px accent` outline at `2px` offset. Never `outline: none` without a replacement.
- `prefers-reduced-motion` disables the reveal, the arrow slide and any transition over `160ms`.
- Reveal animations have a fallback so content is never left invisible if the observer does not fire. This was a real bug in the previous build and it is now a system rule.

## Iteration Guide

When adding a new section, in order:

1. Write the content first. If it does not survive as plain text on paper, decoration will not save it.
2. Pick a ground: `paper` by default, `surface` if it needs quiet grouping, `ink` only for a close.
3. Choose an asymmetric layout. Reject the first symmetrical arrangement that comes to mind.
4. Add exactly one hairline per real boundary.
5. Stop. Then check it against the Don't list before adding anything else.

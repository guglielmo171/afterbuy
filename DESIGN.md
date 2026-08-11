---
name: AfterBuy
description: Pinned Action Slip — manila pick slip on kraft desk; thermal mono queue with marker urgency on landing only.
colors:
  desk-kraft: "#e0d4c4"
  slip-manila: "#f2ebe0"
  slip-sheet: "#f7f0e4"
  slip-ink: "#1a1a1a"
  slip-body: "#3d3830"
  slip-muted: "#5c5346"
  slip-rule: "#8a7d6c"
  slip-urgent: "#c41e3a"
  cta-primary-bg: "#1a1a1a"
  cta-primary-text: "#f2ebe0"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.65rem, 4vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.12
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  thermal:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.625rem–0.8125rem"
    fontWeight: 400
    letterSpacing: "0.04em–0.22em"
rounded:
  slip: "2px"
  button: "6px"
spacing:
  section-y: "2.5rem"
  section-y-sm: "3.5rem"
  container-x: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.cta-primary-bg}"
    textColor: "{colors.cta-primary-text}"
    rounded: "{rounded.button}"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.slip-ink}"
    borderColor: "{colors.slip-rule}"
    rounded: "{rounded.button}"
    height: "44px"
---

# Design System: AfterBuy

## Overview

**Creative North Star: "Pinned Action Slip"**

The public landing at `/` reads as a warehouse desk: kraft ground, an oversized clipboard pick slip in manila stock, thermal-printed mono rows, and a hand-drawn red marker stripe on the one urgent line. The mechanism — a ranked action queue — fills the first viewport inside the slip before supporting copy. Copy stays calm and practical in Inter; IBM Plex Mono carries thermal labels, column headers, and stamp text.

The product preview at `/app` stays outside this world: light neutral Tailwind surfaces and the shared neutral/signal token set. Do not import slip textures, marker stripes, or clipboard chrome into the app shell.

**Key Characteristics:**

- Mechanism-first hero — clipboard slip with headline, ranked rows, synthetic label
- Material depth — paper fiber noise, desk gradient, clip metal, slip shadow stack
- Red marker stripe for single urgent row — paired with `#c41e3a` status text
- Thermal mono for queue data and instrument labels — not for long paragraphs
- WIP honesty via stamp, status label, Try now / Not yet split, example-data footer

## Colors

Warm paper palette on kraft desk; one urgent red accent.

### Primary

- **Marker Red** (`#c41e3a`): Urgent row stripe, urgent status text, WIP stamp, focus rings on light ground.

### Neutral / Paper

- **Desk Kraft** (`#e0d4c4`): Page background.
- **Slip Manila** (`#f2ebe0`): Hero slip and close card.
- **Slip Sheet** (`#f7f0e4`): Secondary paper blocks.
- **Slip Ink** (`#1a1a1a`): Headlines, primary text, primary CTA fill.
- **Slip Body** (`#3d3830`): Body copy on paper.
- **Slip Muted** (`#5c5346`): Meta, captions, thermal labels.
- **Slip Rule** (`#8a7d6c`): Dashed rules, secondary button borders.

### Named Rules

**The Marker Rule.** `#c41e3a` marks at most one urgent queue row, its status text, WIP stamp, and focus outlines — never primary button fills or large fields.

**The Two-World Rule.** Slip palette applies to `/` only. `/app` uses Tailwind `neutral-*` and `signal-*` on light backgrounds.

## Typography

**Display / Body:** Inter (system sans fallbacks)
**Thermal:** IBM Plex Mono via `--font-thermal`

Thermal uppercase tracking for slip headers, column labels, Try now / Not yet kicker, and stamp text. Inter semibold for headings; Inter regular for paragraphs.

## Layout

Single column `max-width: 920px`. Hero slip caps at `720px` centered. Sections vary density: one large problem sheet, one mechanism sheet with dashed dividers, stacked how-it-works slips, two-column Try now / Not yet from `lg`. No hairline borders between every section.

## Elevation & Depth

Paper shadows and inset highlights — no floating SaaS cards. Slip uses layered box-shadow; desk uses subtle radial lift and noise overlay. Clipboard clip uses metallic gradient.

## Components

### Pinned Action Slip (signature)

Clipboard clip, manila paper, thermal grid (`Purchase | Deadline | Status`), rows ranked by urgency, marker stripe on urgent row, footer `Example data · synthetic preview · not live`, figcaption for screen readers.

### Status stamps

Rotated bordered stamps for `Planned` and `In progress` — replace step numbers.

### Motion

Single `slip-settle` on hero paper load (~640ms). Respects `prefers-reduced-motion`.

## Do's and Don'ts

### Do:

- Show ranked queue rows in the first viewport inside the slip
- Label synthetic data in slip footer and figcaption
- Split Try now vs Not yet with distinct paper blocks
- Keep CTAs ≥44px with visible `#c41e3a` focus outlines

### Don't:

- Apply slip/manila treatments to `/app`
- Use dark concourse backgrounds or split-flap boards on landing
- Add fake metrics, Available badges, or Step 1/2/3 labels
- Use homogeneous card grids with icon+title+text

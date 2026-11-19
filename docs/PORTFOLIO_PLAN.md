# ZIQX Portfolio: UI plan (Wusooly proof of concept)

Status: implemented for Wusooly. This document records what was decided and why, so the other five pages can follow the same rules.

## 1. What this is

A **Portfolio** section for the ZIQX Console, separate from the org-scoped Projects tab. It has two views: an index grid and one case-study page per project. Wusooly is the first page and the template for the rest. The look follows the Console (warm off-white page, white cards with large radii, black pill buttons, Manrope), and the case-study layout is the "B story" wireframe: oversized title, full-width cover, facts, then chapters.

## 2. Page sections

### Index (`/portfolio`)
A three-column grid on wide screens, two on medium, one on narrow. Each cell is a card. There is no search or filter yet: with six entries it would add chrome without helping anyone find anything. The data already carries `industry` and `capabilities`, so filters are a UI-only change when the list grows past roughly a dozen.

### Case study (`/portfolio/[slug]`)
Top to bottom:

| # | Section | Source in the brief | Notes |
|---|---|---|---|
| – | Hero: title, tagline, logo + industry chips, Visit button, full-width cover | Title, Industry | Cover is the shared element for the card transition |
| – | Facts strip | Industry, platforms, delivered by (+ year, status when provided) | Hides any fact with no data |
| – | Overview | Project Overview (2 paragraphs) | First paragraph set large |
| 01 | The challenge + "Unify" moment | Problem / Requirement | One signature animation |
| 02 | What we delivered | What Ziqx Delivered (10 items) | Grouped into four rows: Sell, Operate, Insight, Reliability and access |
| 03 | Screens | – (real screenshot + crop + one mockup) | Tabbed viewer |
| – | Results | – | **Not rendered**: the brief has no figures. Appears automatically when `results` is filled |
| 04 | Quick answers | Restated from the brief only | Uses the FAQ tile |
| 05 | Technology and services | Technology and Services (8 items) | Chips |
| – | Closing card | – | "Start a project" |

Chapter numbers are computed from the sections that actually render, so a project without a FAQ or screens numbers itself correctly. Numbering is kept because the chapters read as a sequence (problem, then what was built, then what it looks like).

## 3. Card structure

The card is the doorway only: cover (16:10), a status badge (`Case study` or `Coming soon`), optional year, name, one-line tagline, at most three capability tags, and a `View case study` link with an arrow. Everything else lives on the page. Entries without a case study render the same card but quiet and non-interactive, so the grid shows the full body of work without dead links.

The badge deliberately does **not** say Product or Client. The brief says "What Ziqx Delivered", which does not settle whether Wusooly is a ZIQX product or client work, and a wrong label on a portfolio is worse than none. The `type` field exists in the data for when that is confirmed.

## 4. Detail-page experience and motion

Principle: one memorable moment, everything else quiet. The memorable moment is the Unify animation, because it is the Wusooly story in one image (separate tools becoming one system).

| Motion | Where | How | Reduced motion |
|---|---|---|---|
| **Unify** (signature) | Challenge | Four chips named in the brief drift together and resolve into the product mark, linked to scroll position (`--p` 0 to 1) | Shows the resolved end state |
| Card reveal | Index | Cards enter once on load, 60 ms apart, 300 ms, 8 px | None |
| Hero entrance | Detail | Title, tagline, meta rise 8 px, 300 ms | None |
| Card to detail morph | Card click | View Transitions API shared element (cover image), ~300 ms | Normal navigation |
| Sync pill | Reliability row | Offline, Syncing, Synced loop (9 s), pauses on hover, text carries the meaning | Static "Synced" |
| Screens viewer | Screens | 200 ms opacity crossfade, arrow-key tabs | Faster fade |
| Chapter rail + progress line | Detail, wide screens | Dots track the active chapter; thin line tracks reading progress | Kept (it is information, not decoration) |
| Hover | Cards, rows, chips | 2 px lift, 3% image zoom, 4 px arrow nudge, only on hover-capable devices | Removed |
| Row and chip reveal | Detail | 8 px fade, once, only for content below the fold | Opacity only |

Rules applied everywhere: durations are 100, 150, 200 or 300 ms; only `transform` and `opacity` animate; ease-out in; content is visible without JavaScript; nothing animates on a loop except the sync pill (functional) and its spinner.

Things deliberately not done: scroll-jacking, parallax, 3D tilt, cursor followers, count-up numbers (there are no figures), auto-playing carousels.

## 5. Assets

All visuals are the files you supplied; nothing was scraped from the web. Originals live in `assets-src/wusooly/`, `npm run assets` regenerates the optimised webp files (13 files, roughly 700 KB in total).

| Output | Source | Used for |
|---|---|---|
| `cover.webp` | Hero banner ("Switch to Wusooly POS") | Hero cover, card cover, OpenGraph image |
| `screen-billing.webp` | **Real billing screenshot** | Screens tab 1 (default) |
| `screen-products.webp` | Crop of the monitor in the banner | Screens tab 2 |
| `screen-cafe.webp` | Tablet on café counter (mockup) | Screens tab 3 |
| `photo-sell.webp` | Card payment at counter | Sell row |
| `photo-operate.webp` | Owner with tablet in aisle | Operate row |
| `photo-insight.webp` | Owner at laptop | Insight row |
| `photo-reliability.webp` | Counter tablet with card reader | Reliability row (sync pill floats on it) |
| `logo-w.webp` | **Tile 4 of the last four**: W mark | Logo chip, Unify end state |
| `tile-menu.webp` | **Last four**: four shapes | "Digital menus" tile |
| `tile-orders.webp` | **Last four**: route and pin | "Online ordering" tile |
| `tile-faq.webp` | **Last four**: FAQ | Quick answers section |
| `tile-takeaway.webp` | Fork, mug, bag, sliders tile | "Takeaway orders" tile |

Supplied but not used (kept out of the repo to stay lean): takeaway hand-off, barcode scan, envelope hand-off, floor-plan tablet, couple with tablet, chef at the pass, café card tap, tablet on wooden stand. They are good candidates for a future gallery or for other pages.

Honesty notes about the visuals:
- The lifestyle photos and the two tablet mockups look like generated stock imagery, and the UI text inside the tablet mockups is distorted when zoomed. That is why the real screenshot is the primary Screens image and the mockups are labelled by setting ("At the counter") rather than as product screens. Swap in real photography or device shots before a client-facing release if available.
- Alt text describes what is visible and makes no claims beyond that.

## 6. Content completeness (the `.md`)

Every line of `wusooly_project.md` renders on the page, verbatim: title, industry, both overview paragraphs, the problem paragraph, all 10 delivered items, all 8 technology and services items. This was checked in a browser by comparing the rendered text with the source strings.

Things that are ours, not from the brief, and easy to change in `data/wusooly.ts`: the tagline, the four cluster names, chip labels in the Unify moment (taken from the four systems named in the problem text), screen captions (they describe what is visible), the FAQ questions and short answers (restatements of the brief only), and the closing-card copy.

## 7. Decisions to confirm

1. **Product or client?** Decides whether to show a type badge. Currently hidden.
2. **Year and status.** Not in the brief. The facts strip shows them as soon as `year` and `status` are set.
3. **Results.** Only add if real, sourced figures exist. The section stays hidden otherwise.
4. **Contact route.** `portfolioConfig.contactHref` is `/contact`; set it to the Console's real route.
5. **Live URL.** `wusooly.com` came from the earlier context document; confirm.
6. **Accent colour.** Wusooly uses its brand green (`#096848`, sampled from your tiles) for chapter numbers, bullets and the progress line; other projects fall back to the Console amber.

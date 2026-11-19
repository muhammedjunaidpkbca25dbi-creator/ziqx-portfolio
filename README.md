# ziqx-portfolio

Portfolio section for the ZIQX Console. Next.js (App Router) + React + TypeScript, CSS Modules, no UI library. First page: **Wusooly**.

```bash
npm install
npm run dev        # http://localhost:3000  ->  /portfolio
npm run build && npm start
npm run assets     # re-optimise images from assets-src/ (needs sharp, already a devDependency)
```

Verified with Next 16, React 19, TypeScript 5. App Router only. `params` is awaited as a Promise (Next 15+); on Next 14 change the two `await params` calls to plain destructuring.

## Structure

```
src/
  app/
    layout.tsx                 scaffold only: Manrope import + global reset
    portfolio/page.tsx         index grid
    portfolio/[slug]/page.tsx  case study (static params from entries that have a caseStudy)
  features/portfolio/          <- the part to copy into the Console repo
    portfolio.css              scoped tokens (.pf-root) + reveal + view-transition rules
    config.ts                  basePath, contactHref, closeHref (the only routing assumptions)
    types.ts                   PortfolioEntry / CaseStudy
    data/
      wusooly.ts               full case study (text verbatim from wusooly_project.md)
      others.ts                five "Coming soon" stubs
      index.ts                 registry
    assets/wusooly/*.webp      optimised images (statically imported, so blur placeholders are automatic)
    components/
      TabFrame, PortfolioGrid, PortfolioCard, Reveal, TransitionLink, TransitionSettle,
      SectionRail, ScrollProgress
      case-study/ CaseStudy, DeliveredRows, Unify, SyncPill, ScreensViewer, Faq
    lib/viewTransition.ts
assets-src/wusooly/            originals
scripts/build-assets.mjs       originals -> webp
docs/PORTFOLIO_PLAN.md         plan, motion spec, asset manifest, decisions to confirm
```

## Add the next project (about 15 minutes)

1. Put originals in `assets-src/<slug>/`, add a job list in `scripts/build-assets.mjs`, run `npm run assets`.
2. Copy `data/wusooly.ts` to `data/<slug>.ts` and fill it in. Every optional section (`screens`, `results`, `faq`, `unify`, `tiles`, `widget`) renders only when its data exists.
3. In `data/index.ts`, replace the stub in `others.ts` with the new entry.

No component changes are needed. The route `/portfolio/<slug>` and the card link appear automatically.

## Dropping it into the Console

- **Copy** `src/features/portfolio/` and the two route files under `src/app/portfolio/`.
- **Tokens:** every colour, radius and duration is a CSS variable in the `.pf-root` block of `portfolio.css`. The values were read from Console screenshots; replace them with the Console's real tokens in that one block.
- **Frame:** `TabFrame` draws the Console tab header (icon, title, count, close). If the Console already provides it, keep the `<div className="pf-root">` wrapper and delete the `<header>`.
- **Font:** the feature reads `--pf-font` (Manrope first). Remove the `@fontsource-variable/manrope` import in `layout.tsx` if the Console already loads Manrope.
- **Routes:** if the Console serves this elsewhere (for example `/console/portfolio`), change `basePath` in `config.ts`, and move the two route files to match.
- **Scroll container:** the reading-progress line and chapter rail listen to window scroll. If the Console scrolls inside a container, give `ScrollProgress` that element.
- **Tailwind:** the feature does not depend on it. CSS Modules coexist with Tailwind, so nothing needs porting.

## Motion and accessibility, in one paragraph

Only `transform` and `opacity` animate, over 100/150/200/300 ms with ease-out. Content is visible without JavaScript, `prefers-reduced-motion` removes movement everywhere (the Unify moment shows its finished state and the sync pill shows "Synced"), hover effects apply only on hover-capable devices, tabs and the accordion are keyboard-operable with visible focus, all interactive targets are at least 44 px, and there is no horizontal overflow at 375 px or 1280 px (checked in a browser).

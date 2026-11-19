// Converts originals in assets-src/<project>/ into optimized webp inside the feature folder.
// Usage: npm run assets                 (all projects)
//        npm run assets -- hermes-one   (one project)
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

// "crop" is in source pixels. Missing source files are skipped with a message.
const projects = {
  wusooly: [
    { out: 'hero.webp',              in: 'hero-banner.jpg',             width: 1920, q: 80 },
    { out: 'cover.webp',             in: 'cover-w.jpg',                 width: 1600, q: 82 },
    { out: 'screen-billing.webp',    in: 'billing-screenshot.jpg',      q: 86 },
    { out: 'screen-products.webp',   in: 'hero-banner.jpg',             crop: { left: 753, top: 496, width: 1237, height: 657 }, q: 86 },
    { out: 'screen-cafe.webp',       in: 'mockup-cafe-tablet.webp',     q: 82 },
    { out: 'photo-sell.webp',        in: 'photo-card-tap.webp',         q: 82 },
    { out: 'photo-operate.webp',     in: 'photo-stock-tablet.webp',     width: 1200, q: 82 },
    { out: 'photo-insight.webp',     in: 'photo-laptop-dashboard.webp', width: 1200, q: 82 },
    { out: 'photo-reliability.webp', in: 'mockup-counter-tablet.webp',  q: 82 },
    { out: 'tile-takeaway.webp',     in: 'tile-takeaway.jpg',           width: 512, q: 90 },
    { out: 'tile-orders.webp',       in: 'tile-orders.jpg',             width: 512, q: 90 },
    { out: 'tile-menu.webp',         in: 'tile-menu.jpg',               width: 512, q: 90 },
    { out: 'tile-faq.webp',          in: 'tile-faq.jpg',                width: 512, q: 90 },
    { out: 'logo-w.webp',            in: 'logo-w.jpg',                  width: 512, q: 90 },
  ],
  'hermes-one': [
    { out: 'cover.webp',           in: 'cover.png',    width: 800,  q: 90 },
    { out: 'hero.webp',            in: 'hero.png',     width: 1920, q: 80 },
    { out: 'screen-features.webp', in: 'features.png', q: 86 },
    { out: 'screen-setup.webp',    in: 'setup.png',    q: 86 },
    { out: 'screen-terminal.webp', in: 'terminal.png', q: 86 },
  ],
}

const only = process.argv[2]
for (const [name, jobs] of Object.entries(projects)) {
  if (only && only !== name) continue
  const SRC = `assets-src/${name}`
  const OUT = `src/features/portfolio/assets/${name}`
  await mkdir(OUT, { recursive: true })
  for (const j of jobs) {
    const from = path.join(SRC, j.in)
    if (!existsSync(from)) {
      console.log(`skip ${name}/${j.out}: missing ${from}`)
      continue
    }
    let img = sharp(from)
    if (j.crop) img = img.extract(j.crop)
    if (j.width) img = img.resize({ width: j.width, withoutEnlargement: true })
    const dest = path.join(OUT, j.out)
    const info = await img.webp({ quality: j.q }).toFile(dest)
    console.log(`${name}/${j.out}`.padEnd(38), `${info.width}x${info.height}`.padEnd(11), `${Math.round((await stat(dest)).size / 1024)} KB`)
  }
}
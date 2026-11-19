import type { CSSProperties } from 'react'
import type { PortfolioEntry } from '../types'
import { PortfolioCard } from './PortfolioCard'
import s from './PortfolioGrid.module.css'

/** Index grid. Cards enter once on load, 60ms apart (the page's single orchestrated moment). */
export function PortfolioGrid({ entries }: { entries: PortfolioEntry[] }) {
  return (
    <div className={s.wrap}>
      <h1 className="pf-sr-only">Portfolio</h1>
      <ul className={s.grid}>
        {entries.map((entry, i) => (
          <li key={entry.slug} className={s.item} data-enter style={{ '--i': i } as CSSProperties}>
            <PortfolioCard entry={entry} />
          </li>
        ))}
      </ul>
    </div>
  )
}

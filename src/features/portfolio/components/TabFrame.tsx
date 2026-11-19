import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import '../portfolio.css'
import { portfolioConfig } from '../config'
import { Footer } from './Footer'
import { ScrollProgress } from './ScrollProgress'
import { TransitionSettle } from './TransitionSettle'
import s from './TabFrame.module.css'

/**
 * The Console tab chrome (icon, title, count pill, close) plus the .pf-root token scope.
 * If the Console already provides this frame, keep the <div className="pf-root"> wrapper
 * and drop the header.
 */
export function TabFrame({
  count,
  progress = false,
  accent,
  children,
}: {
  count: number
  /** Project accent colour (sets --pf-accent for the whole frame, header progress line included) */
  accent?: string
  /** Show the reading-progress line under the header (detail pages) */
  progress?: boolean
  children: ReactNode
}) {
  return (
    <div
      className="pf-root"
      style={accent ? ({ '--pf-accent': accent, '--pf-accent-ink': accent } as CSSProperties) : undefined}
    >
      <TransitionSettle />
      <header className={s.bar}>
        <div className={s.left}>
          <span className={s.icon} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
              <path d="M8 14v-2m4 2v-4m4 4v-1" />
            </svg>
          </span>
          <span className={s.title}>Portfolio</span>
          <span className={s.count}>{count}</span>
        </div>
        <Link href={portfolioConfig.closeHref} className={s.close} aria-label="Close portfolio">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </Link>
        {progress && <ScrollProgress />}
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

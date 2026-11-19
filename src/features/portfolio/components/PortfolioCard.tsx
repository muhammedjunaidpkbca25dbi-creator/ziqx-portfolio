import Image from 'next/image'
import type { CSSProperties } from 'react'
import { entryHref } from '../config'
import type { PortfolioEntry } from '../types'
import { TransitionLink } from './TransitionLink'
import s from './Card.module.css'

/**
 * Card = the doorway, nothing more: cover, status, name, one line, up to three tags.
 * Entries without a case study render as a quiet, non-interactive "Coming soon" card.
 */
export function PortfolioCard({ entry }: { entry: PortfolioEntry }) {
  const live = Boolean(entry.caseStudy)

  const body = (
    <>
      <div
        className={s.cover}
        style={live ? ({ viewTransitionName: `pf-cover-${entry.slug}` } as CSSProperties) : undefined}
      >
        {entry.cover ? (
          <Image
            src={entry.cover.src}
            alt={entry.cover.alt}
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw"
            placeholder="blur"
          />
        ) : (
          <span className={s.initial} aria-hidden>
            {entry.title.charAt(0)}
          </span>
        )}
      </div>

      <div className={s.body}>
        <div className={s.top}>
          <span className={live ? s.badgeLive : s.badge}>{live ? 'Case study' : 'Coming soon'}</span>
          {entry.year && <span className={s.year}>{entry.year}</span>}
        </div>
        <h2 className={s.title}>{entry.title}</h2>
        <p className={s.tagline}>{entry.tagline}</p>
        <ul className={s.tags}>
          {entry.capabilities.slice(0, 3).map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        {live && (
          <span className={s.more}>
            View case study
            <svg className={s.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        )}
      </div>
    </>
  )

  return live ? (
    <TransitionLink href={entryHref(entry.slug)} className={s.card}>
      {body}
    </TransitionLink>
  ) : (
    <div className={`${s.card} ${s.soon}`}>{body}</div>
  )
}

import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import type { PortfolioEntry } from '../../types'
import { portfolioConfig } from '../../config'
import { Reveal } from '../Reveal'
import { SectionRail } from '../SectionRail'
import { TransitionLink } from '../TransitionLink'
import { DeliveredRows } from './DeliveredRows'
import { Faq } from './Faq'
import { ScreensViewer } from './ScreensViewer'
import { ScreensReel } from './ScreensReel'
import { Unify } from './Unify'
import { Orbit } from './Orbit'
import { DeviceSpin } from './DeviceSpin'
import s from './CaseStudy.module.css'

const pad = (n: number) => String(n).padStart(2, '0')

function Chapter({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className={s.chapter} aria-labelledby={`${id}-title`}>
      <div className={s.head}>
        <span className={s.num}>{n}</span>
        <h2 id={`${id}-title`} className={s.h2}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

const rise = (ms: number) => ({ '--pf-rd': `${ms}ms` }) as CSSProperties

/**
 * Wusooly "B story" layout: oversized title, full-width cover, facts, then chapters.
 * Fully data-driven: every section renders from the entry and is skipped when its data is absent,
 * and chapter numbers follow what actually renders.
 */
export function CaseStudyView({ entry }: { entry: PortfolioEntry }) {
  const cs = entry.caseStudy
  if (!cs) return null
  const UnifyView = cs.unifyLayout === 'orbit' ? Orbit : Unify

  const sections = [
    { id: 'challenge', title: 'The challenge' },
    { id: 'delivered', title: 'What we delivered' },
    ...(cs.screens.length ? [{ id: 'screens', title: 'Screens' }] : []),
    ...(cs.results?.length ? [{ id: 'results', title: 'Results' }] : []),
    ...(cs.faq?.length ? [{ id: 'faq', title: 'Quick answers' }] : []),
    { id: 'services', title: 'Technology and services' },
  ].map((x, i) => ({ ...x, n: pad(i + 1) }))
  const n = (id: string) => sections.find((x) => x.id === id)!.n

  const facts = [
    { label: 'Industry', value: entry.industry.join(' / ') },
    entry.platforms && { label: 'Platforms', value: entry.platforms.join(', ') },
    { label: 'Delivered by', value: 'ZIQX' },
    entry.year && { label: 'Year', value: entry.year },
    entry.status && { label: 'Status', value: entry.status },
  ].filter((f): f is { label: string; value: string } => Boolean(f))

  const host = entry.liveUrl ? new URL(entry.liveUrl).host : null
  return (
    <div>
      <SectionRail sections={sections} />

      <div className={s.wrap}>
        {/* ---- hero ---- */}
        <header>
          <TransitionLink href={portfolioConfig.basePath} className={s.back}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
            Back to portfolio
          </TransitionLink>

          <div className={s.heroTop}>
            <h1 className={`${s.title} ${s.rise}`} style={rise(0)}>
              {entry.title}
            </h1>
            <p className={`${s.tagline} ${s.rise}`} style={rise(80)}>
              {entry.tagline}
            </p>
          </div>

          <div className={`${s.meta} ${s.rise}`} style={rise(160)}>
            <div className={s.chips}>
              {entry.logo && <Image src={entry.logo} alt="" width={44} height={44} className={s.logo} />}
              {entry.industry.map((i) => (
                <span key={i} className={s.chip}>
                  {i}
                </span>
              ))}
            </div>
            {entry.liveUrl && host && (
              <a href={entry.liveUrl} className={s.visit} target="_blank" rel="noopener noreferrer">
                Visit {host}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            )}
          </div>

          {entry.cover && (
            <div className={s.cover} style={{ viewTransitionName: `pf-cover-${entry.slug}` } as CSSProperties}>
              <Image
                src={entry.cover.src}
                alt={entry.cover.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1184px, 100vw"
                placeholder="blur"
              />
            </div>
          )}
        </header>

        {/* ---- facts + overview ---- */}
        <dl className={s.facts}>
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 60} className={s.fact}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </Reveal>
          ))}
        </dl>

        <section className={s.overview} aria-label="Overview">
          <div className={s.overviewInner}>
            {cs.overview.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 80} className={i === 0 ? s.lead : s.more}>
                {p}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- chapters ---- */}
        <Chapter id="challenge" n={n('challenge')} title="The challenge">
          <Reveal as="p" className={s.challengeText}>
            {cs.challenge}
          </Reveal>
          {cs.unify &&
            (cs.unifyLayout === 'device' && cs.deviceSpin ? (
              <DeviceSpin
                path={cs.deviceSpin.path}
                count={cs.deviceSpin.count}
                alt={cs.deviceSpin.alt}
                caption={cs.unify.caption}
              />
            ) : (
              <UnifyView
                chips={cs.unify.chips}
                caption={cs.unify.caption}
                ariaLabel={cs.unify.ariaLabel}
                mark={entry.logo}
                name={entry.title}
              />
            ))}
        </Chapter>

        <Chapter id="delivered" n={n('delivered')} title="What we delivered">
          <DeliveredRows clusters={cs.delivered} />
        </Chapter>

        {cs.screens.length > 0 && (
          <Chapter id="screens" n={n('screens')} title="Screens">
            {cs.screensLayout === 'reel' ? (
              <ScreensReel screens={cs.screens} label={`${entry.title} screens`} />
            ) : (
              <ScreensViewer screens={cs.screens} label={`${entry.title} screens`} />
            )}
          </Chapter>
        )}

        {cs.results && cs.results.length > 0 && (
          <Chapter id="results" n={n('results')} title="Results">
            <ul className={s.results}>
              {cs.results.map((r, i) => (
                <Reveal as="li" key={r.label} delay={i * 80} className={s.result}>
                  <strong>{r.value}</strong>
                  <span>{r.label}</span>
                </Reveal>
              ))}
            </ul>
          </Chapter>
        )}

        {cs.faq && cs.faq.length > 0 && (
          <Chapter id="faq" n={n('faq')} title="Quick answers">
            <Faq items={cs.faq} tile={cs.faqTile} />
          </Chapter>
        )}

        <Chapter id="services" n={n('services')} title="Technology and services">
          <ul className={s.services}>
            {cs.services.map((svc, i) => (
              <Reveal as="li" key={svc} delay={i * 40} className={s.service}>
                {svc}
              </Reveal>
            ))}
          </ul>
        </Chapter>

        {/* ---- closing ---- */}
        <section className={s.cta} aria-labelledby="cta-title">
          <div>
            <h2 id="cta-title" className={s.ctaTitle}>
              Got a project in mind?
            </h2>
            <p className={s.ctaText}>Tell us what you need and we&apos;ll take it from there.</p>
          </div>
          <div className={s.ctaActions}>
            <a href={portfolioConfig.contactHref} className={s.btnLight}>
              Start a project
            </a>
            {entry.liveUrl && host && (
              <a href={entry.liveUrl} className={s.btnLine} target="_blank" rel="noopener noreferrer">
                Visit {host}
              </a>
            )}
          </div>
        </section>

        <footer className={s.footer}>
          <TransitionLink href={portfolioConfig.basePath} className={s.back}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
            Back to portfolio
          </TransitionLink>
        </footer>
      </div>
    </div>
  )
}

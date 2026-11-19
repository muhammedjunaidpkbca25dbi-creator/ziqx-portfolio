import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { StaticImageData } from 'next/image'
import s from './Orbit.module.css'

const pos = (i: number, n: number) => {
  const a = (-90 + (360 / n) * i) * (Math.PI / 180)
  return {
    left: `${(50 + 50 * Math.cos(a)).toFixed(3)}%`,
    top: `${(50 + 50 * Math.sin(a)).toFixed(3)}%`,
  } as CSSProperties
}

/**
 * Continuous orbit (not scroll-linked): the needs from the challenge circle the product mark.
 * CSS only: transform-based `rotate` keyframes, chips counter-rotate to stay upright,
 * pauses on hover, static under prefers-reduced-motion. Content is visible without JS.
 */
export function Orbit({
  chips,
  caption,
  ariaLabel,
  mark,
  name,
}: {
  chips: string[]
  caption: string
  ariaLabel: string
  mark?: StaticImageData
  name: string
}) {
  return (
    <figure className={s.fig}>
      <div className={s.card}>
        <div className={s.stage} role="img" aria-label={ariaLabel}>
          <span className={s.halo} aria-hidden />
          <span className={s.outer} aria-hidden>
            <i style={{ left: '50%', top: '0%' }} />
            <i style={{ left: '93.3%', top: '75%' }} />
            <i style={{ left: '6.7%', top: '75%' }} />
          </span>

          <div className={s.ring} aria-hidden>
            {chips.map((c, i) => (
              <span key={c} className={s.slot} style={pos(i, chips.length)}>
                <span className={s.chip}>{c}</span>
              </span>
            ))}
          </div>

          <div className={s.core}>
            {mark && <Image src={mark} alt="" width={72} height={72} className={s.mark} />}
            <span className={s.name}>{name}</span>
          </div>
        </div>
      </div>
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  )
}

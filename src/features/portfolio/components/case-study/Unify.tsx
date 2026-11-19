'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, type CSSProperties } from 'react'
import s from './Unify.module.css'

// Scattered start positions: dx in container-width units, dy in px, r in degrees.
const SCATTER = [
  { dx: -34, dy: -88, r: -7 },
  { dx: 31, dy: -40, r: 6 },
  { dx: -27, dy: 48, r: 5 },
  { dx: 33, dy: 92, r: -6 },
]

/**
 * The page's one signature moment. As the stage scrolls into view, the separate tools named in
 * the challenge drift together and resolve into the product mark. Scroll-linked (--p: 0 -> 1),
 * transform + opacity only. Reduced motion: renders the resolved end state.
 */
export function Unify({
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
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      return
    }

    let raf = 0
    let live = false
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const mid = r.top + r.height / 2
      const t = Math.min(1, Math.max(0, (vh * 0.95 - mid) / (vh * 0.95 - vh * 0.45)))
      el.style.setProperty('--p', (t * t * (3 - 2 * t)).toFixed(3)) // smoothstep
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const attach = () => {
      live = true
      window.addEventListener('scroll', onScroll, { passive: true, capture: true })
      window.addEventListener('resize', onScroll)
      onScroll()
    }
    const detach = () => {
      live = false
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }

    // Only listen to scroll while the stage is near the viewport.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !live) attach()
        else if (!e.isIntersecting && live) detach()
      },
      { rootMargin: '20% 0px' },
    )
    io.observe(el)
    update()
    return () => {
      io.disconnect()
      if (live) detach()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <figure className={s.figure}>
      <div ref={stage} className={s.stage} role="img" aria-label={ariaLabel}>
        {chips.slice(0, SCATTER.length).map((label, i) => (
          <span
            key={label}
            className={s.chip}
            aria-hidden
            style={{ '--dx': SCATTER[i].dx, '--dy': SCATTER[i].dy, '--r': SCATTER[i].r } as CSSProperties}
          >
            {label}
          </span>
        ))}
        <div className={s.tile} aria-hidden>
          {mark && <Image src={mark} alt="" width={96} height={96} className={s.mark} />}
          <span className={s.name}>{name}</span>
        </div>
      </div>
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  )
}

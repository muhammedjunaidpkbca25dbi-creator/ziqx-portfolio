'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Screen } from '../../types'
import s from './ScreensReel.module.css'

const pad = (n: number) => String(n).padStart(2, '0')
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const AUTO_MS = 2000 // time each screen stays in focus
const IDLE_MS = 6000 // how long autoplay waits after the visitor takes over
const SETTLE_MS = 160 // scroll must be idle this long before the silent re-centre

/**
 * Endless coverflow reel for screens. The list is rendered 3 times; after every move that
 * ends in the first or last copy, the track silently jumps one copy back to the middle, so it
 * can keep going the same direction forever (last screen -> first screen, no rewind).
 * Autoplay advances every 2s; click a screen, swipe, scroll or use the arrow keys to take over
 * (autoplay resumes after 6s idle). It also pauses while keyboard-focused, offscreen and in a
 * hidden tab, and is off under prefers-reduced-motion. Only transform and opacity are animated.
 */
export function ScreensReel({ screens, label }: { screens: Screen[]; label: string }) {
  const n = screens.length
  const loop = n > 1
  const copies = loop ? 3 : 1
  const base = loop ? n : 0 // index of the first slide in the middle copy
  const list = Array.from({ length: copies }, (_, c) => screens.map((sc) => ({ sc, c }))).flat()

  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const slides = useRef<(HTMLElement | null)[]>([])
  const globalRef = useRef(base) // index in the tripled list
  const holdUntil = useRef(0)
  const focused = useRef(false)
  const [active, setActive] = useState(0) // logical index 0..n-1

  const centerOf = (el: HTMLElement, it: HTMLElement) =>
    it.offsetLeft + it.offsetWidth / 2 - el.clientWidth / 2

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const mid = el.scrollLeft + el.clientWidth / 2
    const flat = reduced()
    let best = 0
    let bestAbs = Infinity
    slides.current.forEach((it, i) => {
      if (!it) return
      const d = (it.offsetLeft + it.offsetWidth / 2 - mid) / it.offsetWidth
      const a = Math.min(Math.abs(d), 1)
      if (Math.abs(d) < bestAbs) {
        bestAbs = Math.abs(d)
        best = i
      }
      it.style.opacity = String(1 - a * 0.55)
      it.style.transform = flat
        ? ''
        : `perspective(1100px) rotateY(${Math.max(-1, Math.min(1, d)) * -28}deg) scale(${1 - a * 0.14})`
    })
    globalRef.current = best
    setActive(best % n)
  }, [n])

  // Instant, invisible reposition (the copies look identical).
  const jump = useCallback(
    (g: number) => {
      const el = track.current
      const it = slides.current[g]
      if (!el || !it) return
      el.style.scrollSnapType = 'none'
      el.scrollLeft = centerOf(el, it)
      requestAnimationFrame(() => {
        el.style.scrollSnapType = ''
        update()
      })
    },
    [update],
  )

  useEffect(() => {
    const el = track.current
    if (!el) return
    let raf = 0
    let settle = 0
    const recenter = () => {
      const g = globalRef.current
      if (!loop) return
      if (g < n) jump(g + n)
      else if (g >= 2 * n) jump(g - n)
    }
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
      window.clearTimeout(settle)
      settle = window.setTimeout(recenter, SETTLE_MS)
    }
    const onResize = () => jump(globalRef.current)

    jump(base)
    el.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(settle)
      el.removeEventListener('scroll', on)
      window.removeEventListener('resize', onResize)
    }
  }, [update, jump, loop, n, base])

  const goTo = useCallback((g: number) => {
    const el = track.current
    const it = slides.current[Math.min(g, slides.current.length - 1)]
    if (!el || !it) return
    el.scrollTo({ left: centerOf(el, it), behavior: reduced() ? 'auto' : 'smooth' })
  }, [])

  // The visitor took over: hold autoplay for a while.
  const hold = useCallback(() => {
    holdUntil.current = Date.now() + IDLE_MS
  }, [])

  // Autoplay: always forward, so the last screen flows into the first.
  useEffect(() => {
    if (n < 2 || reduced()) return
    const box = root.current
    const el = track.current
    if (!box || !el) return

    // Input that only the visitor produces (programmatic scrolling does not fire these).
    const evts = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const
    evts.forEach((t) => el.addEventListener(t, hold, { passive: true }))

    const id = window.setInterval(() => {
      if (document.hidden) return
      const r = box.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return // offscreen
      if (focused.current || Date.now() < holdUntil.current) return
      goTo(globalRef.current + 1)
    }, AUTO_MS)

    return () => {
      window.clearInterval(id)
      evts.forEach((t) => el.removeEventListener(t, hold))
    }
  }, [n, goTo, hold])

  return (
    <div
      ref={root}
      className={s.reel}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onFocus={(e) => (focused.current = e.target.matches(':focus-visible'))}
      onBlur={() => (focused.current = false)}
    >
      <div ref={track} className={s.track} tabIndex={0}>
        {list.map(({ sc, c }, g) => (
          <figure
            key={`${g}-${sc.id}`}
            ref={(node) => {
              slides.current[g] = node
            }}
            className={s.slide}
            style={{ aspectRatio: `${sc.media.src.width} / ${sc.media.src.height}` }}
            data-active={g % n === active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${(g % n) + 1} of ${n}: ${sc.label}`}
            aria-hidden={loop && c !== 1 ? true : undefined}
            onClick={() => {
              hold()
              goTo(g)
            }}
          >
            <Image
              src={sc.media.src}
              alt={sc.media.alt}
              fill
              sizes="(min-width: 1056px) 760px, 72vw"
              placeholder="blur"
            />
          </figure>
        ))}
      </div>

      <p className={s.caption} aria-live="off">
        <span className={s.count}>
          {pad(active + 1)} / {pad(n)}
        </span>
        <span key={active} className={s.text}>
          {screens[active].caption}
        </span>
      </p>
    </div>
  )
}

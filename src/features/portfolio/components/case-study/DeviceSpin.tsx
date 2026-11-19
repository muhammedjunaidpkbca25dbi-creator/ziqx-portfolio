'use client'

import { useEffect, useRef, type PointerEvent as PE } from 'react'
import s from './DeviceSpin.module.css'

const W = 960 // canvas backing size (frames are 480x276, drawn at 2x for smoother scaling)
const H = 552
const PERIOD_MS = 16000 // one full swing there and back

/**
 * Auto-rotating product spin. A pre-rendered frame sequence is drawn on a canvas and
 * plays on a continuous loop; it can also be dragged, then resumes from where you left it.
 * Frames live in /public (plain URLs): `${path}001.webp` ... `${path}${count}.webp`.
 * Static first frame under prefers-reduced-motion (drag still works).
 */
export function DeviceSpin({
  path,
  count,
  alt,
  caption,
}: {
  path: string
  count: number
  alt: string
  caption: string
}) {
  const box = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const imgs = useRef<HTMLImageElement[]>([])
  const want = useRef(0)
  const shown = useRef(-1)
  const phase = useRef(0) // 0..2π, position in the swing
  const drag = useRef<{ x: number; f: number } | null>(null)

  const render = (force = false) => {
    const ctx = cv.current?.getContext('2d')
    if (!ctx) return
    let i = Math.max(0, Math.min(count - 1, Math.round(want.current)))
    // while frames are still loading, fall back to the nearest earlier loaded frame
    while (i > 0 && !(imgs.current[i]?.complete && imgs.current[i].naturalWidth)) i--
    const im = imgs.current[i]
    if (!im?.complete || !im.naturalWidth || (i === shown.current && !force)) return
    shown.current = i
    ctx.clearRect(0, 0, W, H)
    ctx.drawImage(im, 0, 0, W, H)
  }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    imgs.current = Array.from({ length: count }, (_, i) => {
      const im = new Image()
      im.decoding = 'async'
      im.onload = () => render()
      im.src = `${path}${String(i + 1).padStart(3, '0')}.webp`
      return im
    })

    // Continuous loop: swings front -> back -> front with eased ends (the clip is not a
    // seamless 360, so ping-pong avoids a visible jump). Pauses offscreen and in hidden tabs.
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      const el = box.current
      if (el && !drag.current && !document.hidden) {
        const r = el.getBoundingClientRect()
        if (r.bottom > 0 && r.top < window.innerHeight) {
          phase.current = (phase.current + (dt / PERIOD_MS) * Math.PI * 2) % (Math.PI * 2)
          want.current = (0.5 - 0.5 * Math.cos(phase.current)) * (count - 1)
          render()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    if (!reduce) raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, count])

  const onDown = (e: PE<HTMLCanvasElement>) => {
    drag.current = { x: e.clientX, f: want.current }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: PE<HTMLCanvasElement>) => {
    const d = drag.current
    if (!d) return
    const w = e.currentTarget.getBoundingClientRect().width
    // dragging across the full width = one full turn
    want.current = Math.max(0, Math.min(count - 1, d.f + ((e.clientX - d.x) / w) * (count - 1)))
    render()
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
    const p = want.current / (count - 1)
    phase.current = Math.acos(1 - 2 * Math.max(0, Math.min(1, p))) // resume moving forward
  }

  return (
    <figure className={s.fig}>
      <div ref={box} className={s.card}>
        <canvas
          ref={cv}
          width={W}
          height={H}
          className={s.canvas}
          role="img"
          aria-label={alt}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>
      <figcaption className={s.caption}>
        {caption} <span className={s.hint}>Drag to rotate.</span>
      </figcaption>
    </figure>
  )
}

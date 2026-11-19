'use client'

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type Tag = 'div' | 'li' | 'article' | 'p' | 'section'

/**
 * Fades + lifts 8px once, when the element first scrolls into view.
 * Content is visible until hydration, and anything already on screen never hides,
 * so there is no flash and no invisible content without JS.
 */
export function Reveal({
  as = 'div',
  delay = 0,
  className,
  children,
}: {
  as?: Tag
  /** Stagger offset in ms (not a duration) */
  delay?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

    el.dataset.reveal = 'hidden'
    let cleanup = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        el.dataset.reveal = 'shown'
        // Drop the attribute afterwards so hover transitions on the element are not overridden.
        cleanup = window.setTimeout(() => delete el.dataset.reveal, 300 + delay + 60)
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(cleanup)
    }
  }, [delay])

  return createElement(
    as,
    { ref, className, style: { '--pf-d': `${delay}ms` } as CSSProperties },
    children,
  )
}

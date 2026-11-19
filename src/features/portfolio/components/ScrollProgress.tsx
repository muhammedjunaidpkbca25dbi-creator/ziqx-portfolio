'use client'

import { useEffect, useRef } from 'react'
import s from './Rail.module.css'

/** Thin reading-progress line on the header's lower edge. Transform only, rAF-throttled. */
export function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = document.scrollingElement
      if (!el || !fill.current) return
      const max = el.scrollHeight - el.clientHeight
      fill.current.style.transform = `scaleX(${max > 0 ? Math.min(1, el.scrollTop / max) : 0})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className={s.progress} aria-hidden>
      <div ref={fill} className={s.fill} />
    </div>
  )
}

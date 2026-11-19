'use client'

import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import type { Screen } from '../../types'
import s from './ScreensViewer.module.css'

/** Tabbed screen viewer: 200ms opacity crossfade, arrow-key navigation, one caption per screen. */
export function ScreensViewer({ screens, label }: { screens: Screen[]; label: string }) {
  const uid = useId()
  const [i, setI] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = screens.length
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % n
    else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    setI(next)
    tabs.current[next]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className={s.tabs} onKeyDown={onKeyDown}>
        {screens.map((sc, k) => (
          <button
            key={sc.id}
            ref={(el) => {
              tabs.current[k] = el
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${sc.id}`}
            aria-selected={k === i}
            aria-controls={`${uid}-panel-${sc.id}`}
            tabIndex={k === i ? 0 : -1}
            className={s.tab}
            onClick={() => setI(k)}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className={s.stage}>
        {screens.map((sc, k) => (
          <figure
            key={sc.id}
            role="tabpanel"
            id={`${uid}-panel-${sc.id}`}
            aria-labelledby={`${uid}-tab-${sc.id}`}
            data-active={k === i}
            inert={k !== i}
            className={s.panel}
          >
            <Image
              src={sc.media.src}
              alt={sc.media.alt}
              fill
              sizes="(min-width: 1280px) 1184px, 100vw"
              placeholder="blur"
            />
          </figure>
        ))}
      </div>

      <p className={s.caption} aria-live="polite">
        {screens[i].caption}
      </p>
    </div>
  )
}

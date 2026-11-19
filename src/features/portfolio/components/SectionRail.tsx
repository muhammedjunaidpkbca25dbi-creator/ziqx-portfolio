'use client'

import { useEffect, useState } from 'react'
import s from './Rail.module.css'

export interface RailSection {
  id: string
  n: string
  title: string
}

/** Chapter dots on the right edge (wide screens only): shows where you are, jumps on click. */
export function SectionRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const els = sections
      .map((x) => document.getElementById(x.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <nav className={s.rail} aria-label="Chapters">
      <ol className={s.list}>
        {sections.map((x) => (
          <li key={x.id}>
            <a
              href={`#${x.id}`}
              className={s.link}
              aria-current={active === x.id ? 'true' : undefined}
              aria-label={`${x.n} ${x.title}`}
            >
              <span className={s.label} aria-hidden>
                {x.n} {x.title}
              </span>
              <span className={s.dot} aria-hidden />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

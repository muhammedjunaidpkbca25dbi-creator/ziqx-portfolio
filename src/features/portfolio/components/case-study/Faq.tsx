'use client'

import Image, { type StaticImageData } from 'next/image'
import { useId, useState } from 'react'
import type { Faq as FaqItem } from '../../types'
import s from './Faq.module.css'

/** Accessible accordion. Opening is instant (no height animation), the answer fades in over 150ms. */
export function Faq({ items, tile }: { items: FaqItem[]; tile?: StaticImageData }) {
  const uid = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className={s.layout}>
      {tile && <Image src={tile} alt="" width={168} height={168} className={s.tile} />}
      <div className={s.list}>
        {items.map((it, i) => {
          const isOpen = open === i
          return (
            <div key={it.q} className={s.item}>
              <h3 className={s.heading}>
                <button
                  type="button"
                  id={`${uid}-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-a-${i}`}
                  className={s.button}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <svg className={s.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </h3>
              <div id={`${uid}-a-${i}`} role="region" aria-labelledby={`${uid}-q-${i}`} hidden={!isOpen} className={s.answer}>
                <p>{it.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

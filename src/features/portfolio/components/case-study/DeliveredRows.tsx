import Image from 'next/image'
import type { Cluster } from '../../types'
import { Reveal } from '../Reveal'
import { SyncPill } from './SyncPill'
import s from './CaseStudy.module.css'

/** "What we delivered": one row per cluster, image and text alternating sides. */
export function DeliveredRows({ clusters }: { clusters: Cluster[] }) {
  return (
    <div className={s.rows}>
      {clusters.map((c) => (
        <Reveal as="article" key={c.id} className={s.row}>
          <div className={s.mediaCol}>
            {c.media && (
              <div className={s.media}>
                <Image
                  src={c.media.src}
                  alt={c.media.alt}
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                />
                {c.widget === 'sync' && (
                  <div className={s.overlay}>
                    <SyncPill />
                  </div>
                )}
              </div>
            )}
            {c.tiles && (
              <ul className={s.tiles}>
                {c.tiles.map((t) => (
                  <li key={t.label} className={s.tile}>
                    <Image src={t.image} alt="" width={36} height={36} />
                    {t.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className={s.rowTitle}>{c.title}</h3>
            <ul className={s.items}>
              {c.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

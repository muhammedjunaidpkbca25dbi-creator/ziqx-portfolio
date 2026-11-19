import s from './SyncPill.module.css'

/**
 * Offline -> Syncing -> Synced, pure CSS (9s loop, pauses on hover). It stands in for the
 * "Offline-capable billing and synchronisation" deliverable. Reduced motion: static "Synced".
 * The meaning is also in text, so the animation never carries it alone.
 */
export function SyncPill() {
  return (
    <div className={s.pill} role="img" aria-label="Offline-capable billing and synchronisation">
      <span className={`${s.state} ${s.s1}`} aria-hidden>
        <i className={s.dotOffline} />
        Offline
      </span>
      <span className={`${s.state} ${s.s2}`} aria-hidden>
        <i className={s.spin} />
        Syncing
      </span>
      <span className={`${s.state} ${s.s3}`} aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
        Synced
      </span>
    </div>
  )
}

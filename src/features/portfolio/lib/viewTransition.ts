/**
 * Shared-element transition between the card cover and the detail hero.
 * startViewTransition needs a promise that resolves once the NEW page is in the DOM;
 * Next navigates asynchronously, so the destination page calls settleTransition()
 * from <TransitionSettle /> after it mounts. Unsupported browsers and reduced-motion
 * users get a normal navigation.
 */
type VTDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { finished?: Promise<unknown> }
}

let settle: (() => void) | null = null

export function canTransition(): boolean {
  if (typeof document === 'undefined') return false
  if (!('startViewTransition' in document)) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function navigateWithTransition(go: () => void): void {
  const doc = document as VTDocument
  const root = document.documentElement
  // While set, entrance animations are suppressed so the cover morph captures a settled page.
  root.dataset.pfVt = '1'
  const transition = doc.startViewTransition!(
    () =>
      new Promise<void>((resolve) => {
        settle = resolve
        go()
        // Safety net: never leave the page frozen if the destination fails to mount.
        window.setTimeout(settleTransition, 1500)
      }),
  )
  const clear = () => delete root.dataset.pfVt
  transition.finished ? transition.finished.then(clear, clear) : clear()
}

export function settleTransition(): void {
  settle?.()
  settle = null
}

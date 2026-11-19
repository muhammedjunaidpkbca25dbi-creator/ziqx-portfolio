'use client'

import { useEffect } from 'react'
import { settleTransition } from '../lib/viewTransition'

/**
 * Mounted on every portfolio page: tells a pending view transition the new page is in the DOM.
 * Deliberately NOT wrapped in requestAnimationFrame: rendering (and therefore rAF) is suspended
 * while a view transition waits for its update callback, so waiting for a frame would deadlock
 * until the safety timeout.
 */
export function TransitionSettle() {
  useEffect(() => {
    settleTransition()
  }, [])
  return null
}

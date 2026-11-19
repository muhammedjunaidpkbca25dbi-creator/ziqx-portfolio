'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentProps, MouseEvent } from 'react'
import { canTransition, navigateWithTransition } from '../lib/viewTransition'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string }

/** next/link that morphs the shared cover image when the browser supports it. */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter()

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (!canTransition()) return
    e.preventDefault()
    navigateWithTransition(() => router.push(href))
  }

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  )
}

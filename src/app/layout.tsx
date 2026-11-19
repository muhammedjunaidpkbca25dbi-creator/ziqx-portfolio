import type { Metadata } from 'next'
import type { ReactNode } from 'react'
// Self-hosted Manrope for this standalone scaffold. Inside the Console, delete this
// import if the Console already loads Manrope; the feature only reads --pf-font.
import '@fontsource-variable/manrope'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'ZIQX Console', template: '%s | ZIQX' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

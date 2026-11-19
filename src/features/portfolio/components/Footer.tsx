import type { ReactNode } from 'react'
import s from './Footer.module.css'

const columns = [
  { title: 'Product', links: [['Features', '#'], ['Pricing', '#'], ['Integrations', '#'], ['Changelog', '#']] },
  { title: 'Resources', links: [['Documentation', '#'], ['Tutorials', '#'], ['Blog', '#'], ['Support', '#']] },
  { title: 'Company', links: [['About', '#'], ['Careers', '#'], ['Contact', '#'], ['Partners', '#']] },
] as const

const legal = [['Privacy Policy', '#'], ['Terms of Service', '#'], ['Cookie Settings', '#']] as const

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
  </svg>
)

const socials = [
  { label: 'Twitter', href: '#', icon: <Icon><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></Icon> },
  { label: 'Instagram', href: '#', icon: <Icon><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Icon> },
  { label: 'LinkedIn', href: '#', icon: <Icon><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Icon> },
  { label: 'Facebook', href: '#', icon: <Icon><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Icon> },
]

export function Footer() {
  return (
    <footer className={s.outer}>
      <div className={s.card}>
        <div className={s.top}>
          <div className={s.brand}>
            {/* replace public/ziqx-logo.png with your SVG logo when available */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ziqx-logo.png" alt="ZIQX" height={40} className={s.logo} />
            <p className={s.about}>
              ZIQX empowers teams to transform ideas into reality, making development easier to share, understand, and act on.
            </p>
            <ul className={s.socials}>
              {socials.map((x) => (
                <li key={x.label}>
                  <a href={x.href} aria-label={x.label} className={s.social}>
                    {x.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title} className={s.col}>
              <h2 className={s.colTitle}>{c.title}</h2>
              <ul>
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className={s.link}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>© {new Date().getFullYear()} ZIQX Creative Clique LLP. All rights reserved.</p>
          <ul className={s.legal}>
            {legal.map(([label, href]) => (
              <li key={label}>
                <a href={href} className={s.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

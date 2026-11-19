import type { StaticImageData } from 'next/image'

/**
 * One PortfolioEntry = one portfolio page. Add a project by adding a file in ./data
 * (see wusooly.ts) and registering it in ./data/index.ts. No component changes needed.
 * Optional sections (screens, results, faq, unify, tiles, widget) render only when present.
 */

export type Media = { src: StaticImageData; alt: string }
export type EntryType = 'product' | 'client'

export interface Tile {
  label: string
  image: StaticImageData
}

export interface Cluster {
  id: string
  title: string
  /** Verbatim list items from the project brief */
  items: string[]
  media?: Media
  /** Small labelled brand tiles under the media */
  tiles?: Tile[]
  /** Optional live widget floated over the media */
  widget?: 'sync'
}

export interface Screen {
  id: string
  label: string
  caption: string
  media: Media
}

export interface Faq {
  q: string
  a: string
}

export interface Result {
  value: string
  label: string
}

export interface CaseStudy {
  /** Paragraphs; the first is set large */
  overview: string[]
  challenge: string
  /** Scroll-linked "separate tools -> one system" moment */
  unify?: { chips: string[]; caption: string; ariaLabel: string }
  /** 'orbit' = logo orbit variant of the unify moment (same data) */
  /** 'device' = scroll-scrubbed product spin (needs deviceSpin) */
  unifyLayout?: 'default' | 'orbit' | 'device'
  /** Frame sequence in /public: `${path}001.webp` ... `${path}${count}.webp` */
  deviceSpin?: { path: string; count: number; alt: string }
  delivered: Cluster[]
  screens: Screen[]
  /** 'reel' = coverflow gallery (no buttons); default is the tabbed viewer */
  screensLayout?: 'tabs' | 'reel'
  /** Leave empty until real figures exist: the section is not rendered */
  results?: Result[]
  faq?: Faq[]
  faqTile?: StaticImageData
  services: string[]
}

export interface PortfolioEntry {
  slug: string
  title: string
  tagline: string
  type: EntryType
  industry: string[]
  platforms?: string[]
  /** Up to 3 are shown on the card; the full list is for future filters */
  capabilities: string[]
  year?: string
  status?: string
  liveUrl?: string
  /** Project accent for chapter numbers and bullets; falls back to the Console amber */
  accent?: string
  logo?: StaticImageData
  cover?: Media
  /** Absent = listed on the grid as "Coming soon", no page yet */
  caseStudy?: CaseStudy
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { entries, entriesWithPages, getEntry } from '@/features/portfolio/data'
import { CaseStudyView } from '@/features/portfolio/components/case-study/CaseStudy'
import { TabFrame } from '@/features/portfolio/components/TabFrame'

type Props = { params: Promise<{ slug: string }> }

// Only entries that have a case study get a page; everything else 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return entriesWithPages().map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry?.caseStudy) return {}
  const description = entry.caseStudy.overview[0].split('. ')[0] + '.'
  return {
    title: entry.title,
    description,
    openGraph: entry.cover
      ? {
          title: `${entry.title} | ZIQX`,
          description,
          images: [{ url: entry.cover.src.src, width: entry.cover.src.width, height: entry.cover.src.height }],
        }
      : undefined,
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry?.caseStudy) notFound()

  return (
    <TabFrame count={entries.length} progress accent={entry.accent}>
      <CaseStudyView entry={entry} />
    </TabFrame>
  )
}

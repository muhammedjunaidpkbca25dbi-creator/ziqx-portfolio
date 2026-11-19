import type { Metadata } from 'next'
import { entries } from '@/features/portfolio/data'
import { PortfolioGrid } from '@/features/portfolio/components/PortfolioGrid'
import { TabFrame } from '@/features/portfolio/components/TabFrame'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Selected work from ZIQX.',
}

export default function PortfolioPage() {
  return (
    <TabFrame count={entries.length}>
      <PortfolioGrid entries={entries} />
    </TabFrame>
  )
}

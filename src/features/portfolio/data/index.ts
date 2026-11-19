import type { PortfolioEntry } from '../types'
import { wusooly } from './wusooly'
import { others } from './others'
import { hermesOne } from './hermes-one'    

/** Display order on the grid. Register new pages here. */
export const entries: PortfolioEntry[] = [wusooly, hermesOne, ...others]

export const getEntry = (slug: string) => entries.find((e) => e.slug === slug)

export const entriesWithPages = () => entries.filter((e) => e.caseStudy)

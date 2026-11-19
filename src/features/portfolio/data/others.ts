import type { PortfolioEntry } from '../types'

/**
 * Listed on the grid without a page ("Coming soon") until their case studies exist.
 * To promote one: copy wusooly.ts, fill `caseStudy`, add its assets, done.
 */
export const others: PortfolioEntry[] = [
 
  {
    slug: 'tezt',
    title: 'Tezt',
    tagline: 'Create, run and evaluate online exams from one place.',
    type: 'product',
    industry: ['Education Technology', 'Assessment Technology'],
    capabilities: ['Web', 'API & Integrations', 'UI/UX'],
    liveUrl: 'https://tezt.cc',
  },
  {
    slug: 'cartex',
    title: 'Cartex',
    tagline: 'Own your online store, without the subscription lock-in.',
    type: 'product',
    industry: ['E-commerce Technology'],
    capabilities: ['E-commerce', 'Web', 'AI', 'Cloud & Infra', 'UI/UX'],
    liveUrl: 'https://getcartex.com',
  },
  {
    slug: 'libstackz',
    title: 'Libstackz',
    tagline: 'Run a library from catalogue to circulation, in one platform.',
    type: 'product',
    industry: ['Library Management Technology'],
    capabilities: ['Web', 'Mobile', 'Cloud & Infra', 'UI/UX'],
    liveUrl: 'https://libstackz.com',
  },
  {
    slug: 'mysukoon',
    title: 'MySukoon',
    tagline: "A digital home for a non-profit's mission to expand education.",
    type: 'client',
    industry: ['Education', 'Non-profit', 'Community Development'],
    capabilities: ['Web', 'Branding', 'UI/UX'],
  },
]

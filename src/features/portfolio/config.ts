/**
 * The only routing assumptions in the feature. If the Console serves the portfolio from
 * somewhere else (for example /console/portfolio), change basePath here and nothing else.
 */
export const portfolioConfig = {
  basePath: '/portfolio',
  contactHref: '/contact',
  closeHref: '/',
} as const

export const entryHref = (slug: string) => `${portfolioConfig.basePath}/${slug}`

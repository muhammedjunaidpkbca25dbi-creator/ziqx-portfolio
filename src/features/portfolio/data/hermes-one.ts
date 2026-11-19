import type { PortfolioEntry } from '../types'

import cover from '../assets/hermes-one/cover.webp'
import hero from '../assets/hermes-one/hero.webp'
import screenFeatures from '../assets/hermes-one/screen-features.webp'
import screenSetup from '../assets/hermes-one/screen-setup.webp'
import screenTerminal from '../assets/hermes-one/screen-terminal.webp'

/**
 * Source of truth: the Hermes One brief. Brief text is verbatim.
 * Items marked "draft" are ours (tagline, cluster names, captions, FAQ restatements).
 */
export const hermesOne: PortfolioEntry = {
  slug: 'hermes-one',
  title: 'Hermes One',
  tagline: 'Build, manage and deploy AI agents with your own business knowledge.', // draft
  type: 'product',
  industry: ['Artificial Intelligence', 'AI Agent Management'],
  capabilities: ['AI', 'Web', 'API & Integrations', 'UI/UX'],
  liveUrl: 'https://hermesone.org',
  // year / status: not in the brief. Add when confirmed.
  // accent: omitted, falls back to the Console amber.
  cover: {
    src: cover,
    alt: 'Hermes One logo on a dark gradient',
  },
  hero: {
    src: hero,
    alt: 'Hermes One landing page with the headline "Your AI agent. Always improving." and download buttons',
  },

  caseStudy: {
    overview: [
      'Hermes One is an AI agent platform designed to help businesses create, manage and deploy intelligent agents using their own business knowledge. It brings agent configuration, knowledge integration, workflow automation and performance monitoring into a unified environment.',
    ],

    challenge:
      'Businesses want to use AI to handle customer interactions and internal workflows, but deploying useful AI agents requires technical configuration, knowledge preparation, integrations and continuous monitoring.',

    // Chips are the four needs named in the challenge text above.
    unify: {
      chips: ['Configuration', 'Knowledge preparation', 'Integrations', 'Monitoring'],
      caption: 'One environment to create, manage and deploy agents.',
      ariaLabel:
        'Configuration, knowledge preparation, integrations and monitoring merging into one platform',
    },

    unifyLayout: 'orbit',

    // The seven "What Ziqx delivered" items, grouped into three chapters (grouping is a draft).
    delivered: [
      {
        id: 'configure',
        title: 'Configure',
        items: [
          'AI agent management platform',
          'Agent configuration and management interface',
          'Multi-model support',
        ],
      },
      {
        id: 'connect',
        title: 'Connect',
        items: [
          'Business knowledge integration',
          'Workflow and tool integrations',
          'Agent deployment across communication channels',
        ],
      },
      {
        id: 'monitor',
        title: 'Monitor',
        items: ['Monitoring and management dashboard'],
      },
    ],
    screensLayout: 'reel',
    screens: [
      {
        id: 'features',
        label: 'Features',
        caption: 'Features: learning loop, messaging channels, memory, automations and backends.',
        media: {
          src: screenFeatures,
          alt: 'Hermes One features grid: Closed Learning Loop, Lives Where You Do, Deep Memory, Scheduled Automations, Delegates and Parallelizes, Runs Anywhere',
        },
      },
      {
        id: 'setup',
        label: 'Setup',
        caption: 'Setup in three steps: download, pick a provider, go live.',
        media: {
          src: screenSetup,
          alt: 'Hermes One setup section with three steps: Download and open, Pick a provider, Your agent is live',
        },
      },
      {
        id: 'terminal',
        label: 'Terminal install',
        caption: 'Install from the terminal with a single command.',
        media: {
          src: screenTerminal,
          alt: 'Hermes One terminal install section with a PowerShell command and the hermes command after install',
        },
      },
    ],

    // results: omitted on purpose. The brief has no figures, so the section stays hidden.

    // Answers are restatements of the brief only.
    faq: [
      {
        q: 'What problem does Hermes One solve?',
        a: 'Deploying useful AI agents requires technical configuration, knowledge preparation, integrations and continuous monitoring. Hermes One brings these into one environment.',
      },
      {
        q: 'Can agents use our own business knowledge?',
        a: 'Yes. Business knowledge integration is part of what ZIQX delivered.',
      },
      {
        q: 'Does it work with more than one AI model?',
        a: 'Yes. Multi-model support is part of the platform.',
      },
      {
        q: 'Where can agents be deployed?',
        a: 'Across communication channels, with workflow and tool integrations.',
      },
    ],

    services: [
      'AI agent architecture',
      'LLM integrations',
      'Knowledge retrieval',
      'SaaS product design',
      'UI/UX and software development',
    ],
  },
}

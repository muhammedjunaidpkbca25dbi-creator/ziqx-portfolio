import type { PortfolioEntry } from '../types'

import cover from '../assets/wusooly/cover.webp'
import screenBilling from '../assets/wusooly/screen-billing.webp'
import screenProducts from '../assets/wusooly/screen-products.webp'
import screenCafe from '../assets/wusooly/screen-cafe.webp'
import photoSell from '../assets/wusooly/photo-sell.webp'
import photoOperate from '../assets/wusooly/photo-operate.webp'
import photoInsight from '../assets/wusooly/photo-insight.webp'
import photoReliability from '../assets/wusooly/photo-reliability.webp'
import tileTakeaway from '../assets/wusooly/tile-takeaway.webp'
import tileOrders from '../assets/wusooly/tile-orders.webp'
import tileMenu from '../assets/wusooly/tile-menu.webp'
import tileFaq from '../assets/wusooly/tile-faq.webp'
import logoW from '../assets/wusooly/logo-w.webp'
import s_orgList from '../assets/wusooly/screen-org-list.webp'
import s_orgDetail from '../assets/wusooly/screen-org-detail.webp'
import s_branchOverview from '../assets/wusooly/screen-branch-overview.webp'
import s_basicInfo from '../assets/wusooly/screen-basic-info.webp'
import s_contactScr from '../assets/wusooly/screen-contact.webp'
import s_business from '../assets/wusooly/screen-business.webp'
import s_eMenu from '../assets/wusooly/screen-e-menu.webp'
import s_productsAdmin from '../assets/wusooly/screen-products.webp'
import s_tax from '../assets/wusooly/screen-tax.webp'
import s_staff from '../assets/wusooly/screen-staff.webp'
import s_addOns from '../assets/wusooly/screen-add-ons.webp'
import s_licenses from '../assets/wusooly/screen-licenses.webp'
import s_posSignin from '../assets/wusooly/screen-pos-signin.webp'
import s_posBilling from '../assets/wusooly/screen-pos-billing.webp'
import s_posOrder from '../assets/wusooly/screen-pos-order.webp'
import s_posCheckout from '../assets/wusooly/screen-pos-checkout.webp'
import s_posTables from '../assets/wusooly/screen-pos-tables.webp'

/**
 * Source of truth: wusooly_project.md. All brief text below is verbatim.
 * Items marked "draft" are ours (tagline, cluster names, captions, FAQ answers rephrased
 * strictly from the brief) and are easy to edit.
 */
export const wusooly: PortfolioEntry = {
  slug: 'wusooly',
  title: 'Wusooly',
  tagline: 'Billing, menus, orders and stock in one POS.', // draft
  type: 'product',
  industry: ['Retail Technology', 'Restaurant Management'],
  platforms: ['Software', 'Mobile applications', 'Web dashboards'],
  capabilities: ['POS & Billing', 'Web', 'Mobile', 'API & Integrations', 'UI/UX'],
  liveUrl: 'https://wusooly.com',
  // year / status: not in the brief. Add when confirmed, the facts strip picks them up.
  accent: '#096848', // sampled from the supplied brand tiles
  logo: logoW,
  cover: {
    src: cover,
    alt: 'Wusooly POS on a monitor beside a receipt printer, under the headline "Switch to Wusooly POS"',
  },

  caseStudy: {
    overview: [
      'Wusooly is an integrated point-of-sale (POS) and business management platform built for restaurants and retail businesses. It brings billing, digital menus, online ordering, takeaway operations, inventory management, and business administration together through software, mobile applications, and web dashboards.',
      'The platform is designed to simplify daily operations and give business owners a unified view of sales, orders, and inventory.',
    ],

    challenge:
      'Restaurants and retail businesses often rely on separate systems for billing, online orders, inventory, and customer-facing services. This fragmentation creates operational complexity, duplicate work, and limited visibility into overall business performance.',

    // Chips are the four systems named in the challenge text above.
    unify: {
      chips: ['Billing', 'Online orders', 'Inventory', 'Customer-facing services'],
      caption: 'One system, with a unified view of sales, orders, and inventory.',
      ariaLabel:
        'Billing, online orders, inventory and customer-facing services merging into one system',
    },

    unifyLayout: 'device',
    deviceSpin: {
      path: '/portfolio-spin/wusooly/f',
      count: 120,
      alt: 'Wusooly POS on a dual-screen counter terminal rotating through 360 degrees',
    },

    // The ten "What Ziqx Delivered" items, grouped into four chapters (grouping is a draft).
    delivered: [
      {
        id: 'sell',
        title: 'Sell',
        items: [
          'POS and billing system',
          'Digital menu management',
          'Online ordering',
          'Takeaway order management',
        ],
        media: {
          src: photoSell,
          alt: 'A customer paying by card at a counter terminal',
        },
        tiles: [
          { label: 'Digital menus', image: tileMenu },
          { label: 'Online ordering', image: tileOrders },
          { label: 'Takeaway orders', image: tileTakeaway },
        ],
      },
      {
        id: 'operate',
        title: 'Operate',
        items: [
          'Product and stock management',
          'Multi-device and multi-branch management',
        ],
        media: {
          src: photoOperate,
          alt: 'A shop owner checking stock on a tablet in a retail aisle',
        },
      },
      {
        id: 'insight',
        title: 'Insight',
        items: ['Web-based management dashboard', 'Sales and inventory reporting'],
        media: {
          src: photoInsight,
          alt: 'A business owner working on a laptop at a table',
        },
      },
      {
        id: 'reliability',
        title: 'Reliability and access',
        items: [
          'Offline-capable billing and synchronisation',
          'Application-based access',
        ],
        media: {
          src: photoReliability,
          alt: 'Wusooly on a counter tablet beside a card reader',
        },
        widget: 'sync',
      },
    ],

    screensLayout: 'reel',

    screens: [
      {
        id: 'billing',
        label: 'Billing',
        caption:
          'Billing: categories and items on the left, the running order with totals on the right, in dine-in, takeaway and delivery modes.',
        media: {
          src: screenBilling,
          alt: 'Wusooly billing screen with a product grid and the current order with subtotal and checkout',
        },
      },
      {
        id: 'products',
        label: 'Products',
        caption: 'Products: categories and dishes with stock counts in one catalogue.',
        media: {
          src: screenProducts,
          alt: 'Wusooly products screen listing categories and dishes with stock counts',
        },
      },
      {
        id: 'counter',
        label: 'At the counter',
        caption: 'On a tablet at a café counter.',
        media: {
          src: screenCafe,
          alt: 'Wusooly billing screen on a tablet on a café counter',
        },
      },
      {
        id: 'org-list',
        label: 'Organizations',
        caption: 'Organizations: every organization you own, with its branch count.',
        media: { src: s_orgList, alt: 'Wusooly organizations page listing one organization with two branches' },
      },
      {
        id: 'org-detail',
        label: 'Branches',
        caption: 'Organization panel: its branches, with settings, editing and Add branch.',
        media: { src: s_orgDetail, alt: 'Wusooly organization panel listing two branches with Settings, Edit and Add branch' },
      },
      {
        id: 'branch-overview',
        label: 'Branch overview',
        caption: 'Branch overview: net and gross sales, daily average, sales trend and payment mix.',
        media: { src: s_branchOverview, alt: 'Wusooly branch overview with sales summary tiles, a gross sales chart and a payment mix breakdown' },
      },
      {
        id: 'basic-info',
        label: 'Basic info',
        caption: 'Basic info: branch identity, business type, currency, language and opening hours.',
        media: { src: s_basicInfo, alt: 'Wusooly basic info page showing branch name, business type, currency, language and opening hours' },
      },
      {
        id: 'contact',
        label: 'Contact',
        caption: 'Contact: phone, WhatsApp, email and website, each editable in place.',
        media: { src: s_contactScr, alt: 'Wusooly contact page with phone, WhatsApp, email and website cards' },
      },
      {
        id: 'business',
        label: 'Business',
        caption: 'Business: currency, language and the daily operating window.',
        media: { src: s_business, alt: 'Wusooly business page showing currency, language, opening and closing time' },
      },
      {
        id: 'e-menu',
        label: 'E-menu',
        caption: 'E-menu: set up the branch digital menu and online orders.',
        media: { src: s_eMenu, alt: 'Wusooly e-menu setup with digital menu and online ordering options' },
      },
      {
        id: 'products-admin',
        label: 'Products',
        caption: 'Products: the branch catalogue, managed per terminal licence.',
        media: { src: s_productsAdmin, alt: 'Wusooly products page asking to add a terminal licence first' },
      },
      {
        id: 'tax',
        label: 'Tax',
        caption: 'Tax: branch-wide tax settings, plus tax groups.',
        media: { src: s_tax, alt: 'Wusooly global tax settings and taxes and groups' },
      },
      {
        id: 'staff',
        label: 'Staff',
        caption: 'Staff: team members with their roles and status.',
        media: { src: s_staff, alt: 'Wusooly staff page with a manager and an owner' },
      },
      {
        id: 'add-ons',
        label: 'Add-ons',
        caption: 'Add-ons: purchase, VAT report, tables, credits, delivery and digital menu, per terminal.',
        media: { src: s_addOns, alt: 'Wusooly add-ons page with purchase, VAT report, tables, credits, delivery and digital menu' },
      },
      {
        id: 'licenses',
        label: 'Terminals',
        caption: 'Terminals: activation licences for the terminals in a branch.',
        media: { src: s_licenses, alt: 'Wusooly terminal licences list with activation status' },
      },
      {
        id: 'pos-signin',
        label: 'Staff sign-in',
        caption: 'Terminal sign-in: pick who is billing and enter a PIN.',
        media: { src: s_posSignin, alt: 'Wusooly terminal sign-in with staff selection and a PIN pad' },
      },
      {
        id: 'pos-billing',
        label: 'POS billing',
        caption: 'POS billing: categories and items on the left, the running order on the right.',
        media: { src: s_posBilling, alt: 'Wusooly POS billing screen with item grid and an empty order' },
      },
      {
        id: 'pos-order',
        label: 'Order in progress',
        caption: 'An order in progress, with quantities, subtotal and net payable.',
        media: { src: s_posOrder, alt: 'Wusooly POS billing screen with seven items added and a net payable total' },
      },
      {
        id: 'pos-checkout',
        label: 'Checkout',
        caption: 'Checkout: amount received, payment method and status, then complete and print.',
        media: { src: s_posCheckout, alt: 'Wusooly checkout dialog with cash, card, online and wallet payment methods' },
      },
      {
        id: 'pos-tables',
        label: 'Tables',
        caption: 'Tables: floor layouts for dine-in table management.',
        media: { src: s_posTables, alt: 'Wusooly table management with a ground floor layout' },
      },
    ],

    // results: omitted on purpose. The brief has no figures, so the section stays hidden.

    // Answers are restatements of the brief only.
    faq: [
      {
        q: 'What problem does Wusooly solve?',
        a: 'Restaurants and retail businesses often rely on separate systems for billing, online orders, inventory, and customer-facing services. That fragmentation creates operational complexity, duplicate work, and limited visibility into overall business performance.',
      },
      {
        q: 'What does it bring together?',
        a: 'Billing, digital menus, online ordering, takeaway operations, inventory management, and business administration, through software, mobile applications, and web dashboards.',
      },
      {
        q: 'Can billing work offline?',
        a: 'Yes. Offline-capable billing and synchronisation is part of what ZIQX delivered.',
      },
      {
        q: 'Does it support more than one branch or device?',
        a: 'Yes. Multi-device and multi-branch management is part of the platform.',
      },
    ],
    faqTile: tileFaq,

    services: [
      'POS software development',
      'Web application development',
      'Mobile application development',
      'Inventory management',
      'Order management',
      'API integrations',
      'UI/UX design',
      'Business dashboard development',
    ],
  },
}

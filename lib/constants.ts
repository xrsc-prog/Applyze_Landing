export const SITE_URL = 'https://applyze.ai'
export const APP_URL = 'https://app.applyze.ai'

export const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
]

export const LOGO_COMPANIES = [
  'ACME CORP',
  'BUILDTECH',
  'NEXWAVE',
  'CREATIFY',
  'DATAFLOW',
  'URBANIZE',
]

export const STATS = [
  {
    value: 500,
    suffix: '+',
    label: 'CVs processed per customer per month',
  },
  {
    value: 3,
    suffix: ' min',
    label: 'From upload to ranked shortlist',
  },
  {
    value: 38,
    suffix: '%',
    label: 'Average vacancy cost below industry benchmark',
  },
]

export interface Dimension {
  name: string
  description: string
  score: number
  maxScore: number
  color: string
}

export const DIMENSIONS: Dimension[] = [
  {
    name: 'd0Name',
    description: 'd0Description',
    score: 9,
    maxScore: 10,
    color: '#3B6FE8',
  },
  {
    name: 'd1Name',
    description: 'd1Description',
    score: 8,
    maxScore: 10,
    color: '#8B5CF6',
  },
  {
    name: 'd2Name',
    description: 'd2Description',
    score: 9,
    maxScore: 10,
    color: '#10B981',
  },
  {
    name: 'd3Name',
    description: 'd3Description',
    score: 7,
    maxScore: 10,
    color: '#10B981',
  },
  {
    name: 'd4Name',
    description: 'd4Description',
    score: 8,
    maxScore: 10,
    color: '#8B5CF6',
  },
  {
    name: 'd5Name',
    description: 'd5Description',
    score: 6,
    maxScore: 10,
    color: '#F59E0B',
  },
]

export interface PricingPlan {
  name: string
  price: number | null
  credits: number | null
  volumeHint?: string
  volumeSub?: string | null
  features: string[]
  cta: string
  ctaHref: string
  recommended?: boolean
  enterprise?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: 39,
    credits: 100,
    volumeHint: 'starterVolumeHint',
    volumeSub: '100 standard analyses or ~33 premium deep-dives',
    features: [
      'starterF0',
      'starterF1',
      'starterF2',
      'starterF3',
      'starterF4',
      'starterF5',
    ],
    cta: 'getStarted',
    ctaHref: 'https://app.applyze.ai',
  },
  {
    name: 'Growth',
    price: 90,
    credits: 400,
    volumeHint: 'growthVolumeHint',
    volumeSub: '400 standard analyses or ~133 premium deep-dives',
    features: [
      'growthF0',
      'growthF1',
      'growthF2',
      'growthF3',
    ],
    cta: 'getStarted',
    ctaHref: 'https://app.applyze.ai',
    recommended: true,
  },
  {
    name: 'Premium',
    price: 299,
    credits: 1800,
    volumeHint: 'premiumVolumeHint',
    volumeSub: '1,800 standard analyses or ~600 premium deep-dives',
    features: [
      'premiumF0',
      'premiumF1',
      'premiumF2',
      'premiumF3',
    ],
    cta: 'getStarted',
    ctaHref: 'https://app.applyze.ai',
  },
  {
    name: 'Enterprise',
    price: null,
    credits: null,
    volumeHint: 'enterpriseVolumeHint',
    volumeSub: null,
    features: [
      'enterpriseF0',
      'enterpriseF1',
      'enterpriseF2',
      'enterpriseF3',
      'enterpriseF4',
      'enterpriseF5',
    ],
    cta: 'talkToUs',
    ctaHref: '/contact',
    enterprise: true,
  },
]

export const CREDIT_TOPUPS = [
  { credits: 100, price: 29, savings: null },
  { credits: 500, price: 149, savings: 'save20' },
  { credits: 1500, price: 399, savings: 'save30' },
]

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'q0', answer: 'a0' },
  { question: 'q1', answer: 'a1' },
  { question: 'q2', answer: 'a2' },
  { question: 'q3', answer: 'a3' },
  { question: 'q4', answer: 'a4' },
  { question: 'q5', answer: 'a5' },
]

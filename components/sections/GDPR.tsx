'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, scaleIn, defaultTransition } from '@/lib/animations'
import { useTranslations } from '@/lib/i18n'

const TRUST_CARDS = [
  {
    titleKey: 'card1Title',
    bodyKey: 'card1Body',
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titleKey: 'card2Title',
    bodyKey: 'card2Body',
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    titleKey: 'card3Title',
    bodyKey: 'card3Body',
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    titleKey: 'card4Title',
    bodyKey: 'card4Body',
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
]

export default function GDPRSection() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('gdpr')

  return (
    <section id="gdpr" className="py-32 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          {/* Shield icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <svg className="w-9 h-9 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-ink mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('sub')}
          </p>
        </motion.div>

        {/* 2x2 trust cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {TRUST_CARDS.map((card) => (
            <motion.div
              key={card.titleKey}
              variants={prefersReducedMotion ? {} : scaleIn}
              transition={defaultTransition}
              className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100 flex gap-5 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div>
                <h3 className="font-bold text-ink text-lg mb-2">{t(card.titleKey)}</h3>
                <p className="text-slate-600 leading-relaxed">{t(card.bodyKey)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Full-width highlight bar */}
        <motion.div
          className="rounded-2xl bg-emerald-600 px-8 py-6 text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <p className="text-white font-semibold text-lg">
            {t('highlight')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

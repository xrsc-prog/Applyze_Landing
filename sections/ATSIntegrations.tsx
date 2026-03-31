'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'

const ATS_PARTNERS = [
  {
    name: 'Personio',
    color: '#003399',
    weight: '800',
    size: 'text-4xl',
  },
  {
    name: 'BambooHR',
    color: '#73ac26',
    weight: '700',
    size: 'text-4xl',
  },
  {
    name: 'Greenhouse',
    color: '#1d704b',
    weight: '800',
    size: 'text-4xl',
  },
  {
    name: 'Workday',
    color: '#0875e1',
    weight: '700',
    size: 'text-4xl',
  },
  {
    name: 'JOIN',
    color: '#0a0a0a',
    weight: '900',
    size: 'text-5xl',
  },
]

export default function ATSIntegrations() {
  const t = useTranslations('atsIntegrations')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-muted mb-4">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl font-extrabold text-ink mb-3">{t('title')}</h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">{t('sub')}</p>
        </motion.div>

        {/* ATS wordmarks row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mb-8"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
        >
          {ATS_PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.06, y: -2 }}
              className="relative cursor-default select-none"
            >
              <span
                className={`${partner.size} tracking-tight leading-none`}
                style={{
                  color: partner.color,
                  fontWeight: partner.weight,
                  opacity: 0.85,
                }}
              >
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon badge */}
        <motion.div
          className="flex justify-center mb-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/30 text-amber font-semibold text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('comingSoon')}
          </span>
        </motion.div>

        {/* Standalone reassurance */}
        <motion.p
          className="text-center text-sm text-muted"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {t('standalone')}
        </motion.p>

      </div>
    </section>
  )
}

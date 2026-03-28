'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, defaultTransition } from '@/lib/animations'
import { PRICING_PLANS } from '@/lib/constants'
import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'

export default function Pricing() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('pricing')

  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <h2 className="text-5xl font-bold text-ink mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-slate-600">
            {t('sub')}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, rotateY: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: plan.recommended ? 1.03 : 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ ...defaultTransition, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border-2 flex flex-col ${
                plan.enterprise
                  ? 'bg-ink border-ink shadow-xl'
                  : plan.recommended
                  ? 'border-primary shadow-xl shadow-primary/10'
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {plan.recommended && (
                <>
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-primary text-white text-xs font-bold">
                      {t('mostPopular')}
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                    animate={prefersReducedMotion ? {} : {
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.enterprise ? 'text-white' : 'text-ink'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  {plan.price !== null ? (
                    <>
                      <span className={`text-4xl font-extrabold ${plan.enterprise ? 'text-white' : 'text-ink'}`}>
                        €{plan.price}
                      </span>
                      <span className={plan.enterprise ? 'text-white/60' : 'text-muted'}>{t('perMonth')}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-white">{t('customPrice')}</span>
                  )}
                </div>
                {plan.credits !== null ? (
                  <p className={`text-sm ${plan.enterprise ? 'text-white/60' : 'text-muted'}`}>
                    {plan.credits} {t('creditsIncluded')}
                  </p>
                ) : (
                  <p className="text-sm text-white/60">{t('customVolume')}</p>
                )}
                {plan.volumeHint && (
                  <p className={`text-xs italic mt-2 ${plan.enterprise ? 'text-white/50' : 'text-muted'}`}>
                    {t(plan.volumeHint)}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.enterprise ? 'bg-white/20' : 'bg-success/15'
                    }`}>
                      <svg className={`w-2.5 h-2.5 ${plan.enterprise ? 'text-white' : 'text-success'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={`text-sm ${plan.enterprise ? 'text-white/80' : 'text-slate-700'}`}>
                      {t(feature)}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.ctaHref.startsWith('http') ? (
                <a
                  href={plan.ctaHref}
                  className={`block text-center py-3 rounded-xl font-semibold text-base transition-all ${
                    plan.enterprise
                      ? 'border-2 border-white/30 text-white hover:border-white/60'
                      : plan.recommended
                      ? 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/25'
                      : 'border-2 border-slate-200 text-ink hover:border-primary hover:text-primary'
                  }`}
                >
                  {t(plan.cta)}
                </a>
              ) : (
                <Link
                  href={plan.ctaHref}
                  className={`block text-center py-3 rounded-xl font-semibold text-base transition-all ${
                    plan.enterprise
                      ? 'border-2 border-white/30 text-white hover:border-white/60'
                      : plan.recommended
                      ? 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/25'
                      : 'border-2 border-slate-200 text-ink hover:border-primary hover:text-primary'
                  }`}
                >
                  {t(plan.cta)}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, defaultTransition } from '@/lib/animations'
import Link from 'next/link'
import { APP_URL } from '@/lib/constants'
import { useTranslations } from '@/lib/i18n'

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('finalCTA')

  return (
    <section className="py-32 bg-ink">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={prefersReducedMotion ? {} : fadeUp}
            transition={defaultTransition}
            className="text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={prefersReducedMotion ? {} : fadeUp}
            transition={defaultTransition}
            className="text-xl text-slate-400 mb-10 max-w-xl mx-auto"
          >
            {t('sub')}
          </motion.p>
          <motion.div
            variants={prefersReducedMotion ? {} : fadeUp}
            transition={defaultTransition}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <a
              href={APP_URL}
              className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-ink font-bold text-base hover:bg-slate-100 transition-colors shadow-lg"
            >
              {t('ctaPrimary')}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-base hover:border-white/60 transition-colors"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>
          <motion.p
            variants={prefersReducedMotion ? {} : fadeUp}
            transition={defaultTransition}
            className="text-sm text-slate-500"
          >
            {t('trust')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

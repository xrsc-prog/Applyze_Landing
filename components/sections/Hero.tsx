'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import HeroDemoSequence from '@/components/ui/HeroDemoSequence'
import { APP_URL } from '@/lib/constants'
import { useTranslations } from '@/lib/i18n'

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('hero')

  const words1 = t('headline1').split(' ')
  const words2 = t('headline2').split(' ')
  const gradientWords = [t('headlineGradient')]
  const words3 = t('headline3').split(' ')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-amber/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 xl:gap-16 items-center">

          {/* LEFT: Copy */}
          <div className="order-1">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-ink leading-[1.05] mb-5">
              <div className="flex flex-wrap gap-x-3 mb-1">
                {words1.map((word, i) => (
                  <motion.span
                    key={`w1-${i}`}
                    variants={prefersReducedMotion ? {} : wordVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 mb-1">
                {words2.map((word, i) => (
                  <motion.span
                    key={`w2-${i}`}
                    variants={prefersReducedMotion ? {} : wordVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: (words1.length + i) * 0.06 }}
                  >
                    {word}
                  </motion.span>
                ))}
                {gradientWords.map((word, i) => (
                  <motion.span
                    key={`g-${i}`}
                    className="gradient-text"
                    variants={prefersReducedMotion ? {} : wordVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: (words1.length + words2.length + i) * 0.06 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3">
                {words3.map((word, i) => (
                  <motion.span
                    key={`w3-${i}`}
                    variants={prefersReducedMotion ? {} : wordVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: 0.5,
                      delay: (words1.length + words2.length + gradientWords.length + i) * 0.06,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>

            {/* Kicker */}
            <motion.p
              className="text-xl font-semibold text-primary mb-5"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {t('kicker')}
            </motion.p>

            {/* Sub-headline */}
            <motion.p
              className="text-lg leading-relaxed text-slate-600 mb-8 max-w-xl"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {t('sub')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <a
                href={APP_URL}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-white font-semibold text-base hover:bg-blue-600 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {t('ctaPrimary')}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-slate-200 text-ink font-semibold text-base hover:border-primary hover:text-primary transition-colors"
              >
                {t('ctaSecondary')}
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              className="text-sm text-muted mb-5"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <span className="font-medium text-emerald-600">{t('trust1')}</span>
              {' · '}{t('trust2')}
              {' · '}{t('trust3')}
              {' · '}{t('trust4')}
            </motion.p>

            {/* Scroll teaser */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <a
                href="#application-flood"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('application-flood')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
              >
                <motion.span
                  animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ↓
                </motion.span>
                {t('scrollTeaser')}
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Demo sequence */}
          <motion.div
            className="order-2 w-full max-w-full overflow-hidden"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <HeroDemoSequence />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

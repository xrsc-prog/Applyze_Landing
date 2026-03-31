'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, defaultTransition } from '@/lib/animations'
import DimensionCard from '@/components/ui/DimensionCard'
import ScoreCircle from '@/components/ui/ScoreCircle'
import { DIMENSIONS } from '@/lib/constants'
import { useTranslations } from '@/lib/i18n'

export default function SixDimensions() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('sixDimensions')

  return (
    <section id="features" className="py-32 bg-white">
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
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('sub')}
          </p>
          <p className="text-base font-medium text-muted mt-3 italic">
            {t('tagline')}
          </p>
        </motion.div>

        <motion.div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 lg:-mx-0 lg:px-0 mb-8 lg:mb-16"
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {DIMENSIONS.map((dimension) => (
            <div key={dimension.name} className="snap-start flex-shrink-0 w-[80vw] lg:w-auto lg:flex-shrink">
              <DimensionCard dimension={dimension} />
            </div>
          ))}
        </motion.div>

        {/* Overall Score CTA */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 bg-surface rounded-3xl p-10 border border-slate-100"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <ScoreCircle score={81} size={120} strokeWidth={8} label={t('overallScoreLabel')} />
          <div>
            <h3 className="text-2xl font-bold text-ink mb-2">{t('overallScoreLabel')}</h3>
            <p className="text-lg text-slate-600 max-w-xl">
              {t('overallScoreDesc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

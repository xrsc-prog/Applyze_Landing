'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, defaultTransition } from '@/lib/animations'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { STATS } from '@/lib/constants'
import { useTranslations } from '@/lib/i18n'

export default function Stats() {
  const t = useTranslations('stats')
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={defaultTransition}
              className="text-center px-8 py-8 md:py-4"
            >
              <div className="text-5xl font-extrabold text-ink mb-2">
                <AnimatedCounter value={stat.value} suffix={i === 1 ? t('stat1Suffix') : stat.suffix} />
              </div>
              <p className="text-base text-muted">{t(`stat${i}Label`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp, defaultTransition } from '@/lib/animations'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { useTranslations } from '@/lib/i18n'

const METRICS = [
  { value: 18, suffix: 'd', prefix: undefined, labelKey: 'metric0Label', subKey: 'metric0Sub', color: 'text-amber' },
  { value: 12, suffix: 'k', prefix: '$',       labelKey: 'metric1Label', subKey: 'metric1Sub', color: 'text-success' },
  { value: 14, suffix: '',  prefix: undefined,  labelKey: 'metric2Label', subKey: 'metric2Sub', color: 'text-primary' },
]

const DIAGNOSTICS = [
  { icon: '✓', labelKey: 'diag0Label', statusKey: 'diag0Status', noteKey: 'diag0Note', healthy: true },
  { icon: '⚠', labelKey: 'diag1Label', statusKey: 'diag1Status', noteKey: 'diag1Note', healthy: false },
  { icon: '✓', labelKey: 'diag2Label', statusKey: 'diag2Status', noteKey: 'diag2Note', healthy: true },
  { icon: '⚠', labelKey: 'diag3Label', statusKey: 'diag3Status', noteKey: 'diag3Note', healthy: false },
]

export default function HiringIntelligence() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('hiringIntelligence')

  return (
    <section className="py-32 bg-surface">
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
        </motion.div>

        {/* Metric cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              variants={prefersReducedMotion ? {} : fadeUp}
              transition={defaultTransition}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center"
            >
              <div className={`text-5xl font-extrabold mb-2 ${metric.color}`}>
                {metric.prefix && <span>{metric.prefix}</span>}
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
              <p className="font-semibold text-ink mb-1">{t(metric.labelKey)}</p>
              <p className="text-sm text-muted">{t(metric.subKey)}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Diagnostics */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-ink">{t('diagnosticsTitle')}</h3>
          </div>
          <motion.div
            variants={prefersReducedMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="divide-y divide-slate-100"
          >
            {DIAGNOSTICS.map((d, i) => (
              <motion.div
                key={i}
                variants={prefersReducedMotion ? {} : fadeUp}
                transition={defaultTransition}
                className="flex flex-wrap items-center gap-4 px-6 py-4"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    d.healthy ? 'bg-success' : 'bg-amber'
                  }`}
                />
                <span className="font-semibold text-ink w-32">{t(d.labelKey)}</span>
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    d.healthy
                      ? 'bg-success/10 text-success'
                      : 'bg-amber/10 text-amber'
                  }`}
                >
                  {t(d.statusKey)}
                </span>
                <span className="text-sm text-muted ml-2">{t(d.noteKey)}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

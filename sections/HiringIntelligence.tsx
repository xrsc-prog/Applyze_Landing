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
  {
    labelKey: 'diag0Label', statusKey: 'diag0Status', noteKey: 'diag0Note', healthy: true,
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 17L9 10.5l4 4L21 7" />,
  },
  {
    labelKey: 'diag1Label', statusKey: 'diag1Status', noteKey: 'diag1Note', healthy: false,
    icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4M12 16h.01" /></>,
  },
  {
    labelKey: 'diag2Label', statusKey: 'diag2Status', noteKey: 'diag2Note', healthy: true,
    icon: <><circle cx="9" cy="12" r="4" strokeWidth={2} /><circle cx="15" cy="12" r="4" strokeWidth={2} /></>,
  },
  {
    labelKey: 'diag3Label', statusKey: 'diag3Status', noteKey: 'diag3Note', healthy: false,
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M10 18h4" />,
  },
  {
    labelKey: 'diag4Label', statusKey: 'diag4Status', noteKey: 'diag4Note', healthy: true,
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  },
  {
    labelKey: 'diag5Label', statusKey: 'diag5Status', noteKey: 'diag5Note', healthy: true,
    icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></>,
  },
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

        {/* Intelligence Brief */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary tracking-wide uppercase">
              {t('briefTitle')}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted">Live</span>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed mb-4 max-w-3xl">
            {t('briefBody')}
          </p>
          <p className="text-xs text-muted">{t('briefFooter')}</p>
        </motion.div>

        {/* Metric cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  d.healthy ? 'bg-success/10' : 'bg-amber/10'
                }`}>
                  <svg
                    className={`w-4 h-4 ${d.healthy ? 'text-success' : 'text-amber'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {d.icon}
                  </svg>
                </div>
                <span className="font-semibold text-ink w-44">{t(d.labelKey)}</span>
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    d.healthy
                      ? 'bg-success/10 text-success'
                      : 'bg-amber/10 text-amber'
                  }`}
                >
                  {t(d.statusKey)}
                </span>
                <span className="text-sm text-muted">{t(d.noteKey)}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

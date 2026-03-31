'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp, defaultTransition } from '@/lib/animations'
import ScoreCircle from '@/components/ui/ScoreCircle'
import ScoreBar from '@/components/ui/ScoreBar'
import { useTranslations } from '@/lib/i18n'

const DR_SUBSCORES = [
  { name: 'd0Name', score: 9,  maxScore: 10, color: '#3B6FE8' },
  { name: 'd1Name', score: 10, maxScore: 10, color: '#8B5CF6' },
  { name: 'd2Name', score: 9,  maxScore: 10, color: '#10B981' },
  { name: 'd3Name', score: 9,  maxScore: 10, color: '#10B981' },
  { name: 'd4Name', score: 8,  maxScore: 10, color: '#8B5CF6' },
  { name: 'd5Name', score: 7,  maxScore: 10, color: '#F59E0B' },
]

function Panel1() {
  const t = useTranslations('decisionRoom')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="mb-4">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">{t('panel1Label')}</p>
        <div className="space-y-2 mb-4">
          {[
            { initials: 'JC', name: 'Jia Chen', score: 81 },
            { initials: 'LD', name: 'Linus Dashboard', score: 71 },
            { initials: 'DJ', name: 'Dr. Jonas Datenberg', score: 64 },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-4 h-4 rounded border-2 border-primary bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {c.initials}
              </div>
              <span className="text-xs font-medium text-ink flex-1 truncate">{c.name}</span>
              <span className="text-xs font-bold text-success">{c.score}%</span>
            </div>
          ))}
        </div>
        <button className="w-full py-2 rounded-lg bg-primary text-white text-xs font-semibold">
          {t('panel1Cta')}
        </button>
      </div>
      <p className="text-xs text-muted text-center mt-auto pt-2 border-t border-slate-100">{t('panel1Footer')}</p>
    </div>
  )
}

function Panel2() {
  const t = useTranslations('decisionRoom')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">{t('panel2Label')}</p>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink">{t('panel2Created')}</p>
            <p className="text-xs text-muted">{t('panel2Share')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 mb-3">
          <span className="text-xs text-muted font-mono flex-1 truncate">
            app.applyze.ai/#/share/9d38...
          </span>
          <button className="flex-shrink-0 px-2 py-1 rounded bg-slate-200 text-xs font-medium text-ink">Copy</button>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {t('panel2ValidFor')}
        </div>
      </div>
      <p className="text-xs text-muted text-center mt-auto pt-2 border-t border-slate-100">{t('panel2Footer')}</p>
    </div>
  )
}

function Panel3() {
  const t = useTranslations('decisionRoom')
  const tDDR = useTranslations('demoDecisionRoom')
  const tProfile = useTranslations('profile')
  const tDimensions = useTranslations('dimensions')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">{t('panel3Label')}</p>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-amber/10 flex items-center justify-center flex-shrink-0">
            <span className="text-amber font-bold text-sm">JC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-ink text-sm truncate">Jia Chen</p>
            <p className="text-xs text-muted truncate">Senior Business Data Analyst</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-success/10 text-success font-bold text-xs flex-shrink-0">81%</span>
        </div>

        <div className="flex gap-4 mb-3">
          <div className="flex flex-col items-center gap-0.5">
            <ScoreCircle score={81} size={52} strokeWidth={4} showLabel={false} />
            <span className="text-xs text-muted">{tProfile('matchLabel')}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <ScoreCircle score={100} size={52} strokeWidth={4} color="#10B981" showLabel={false} />
            <span className="text-xs text-muted">{tProfile('trustConfidenceLabel')}</span>
          </div>
        </div>

        <div className="space-y-1.5 mb-4">
          {DR_SUBSCORES.slice(0, 4).map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="text-xs text-muted w-16 flex-shrink-0">{tDimensions(s.name)}</span>
              <div className="flex-1">
                <ScoreBar score={s.score} maxScore={s.maxScore} color={s.color} height={4} showLabel={false} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-lg border border-danger/30 text-danger text-xs font-semibold">{tDDR('reject')}</button>
          <button className="flex-1 py-2 rounded-lg bg-ink text-white text-xs font-semibold">{tDDR('interview')}</button>
        </div>
      </div>
      <p className="text-xs text-muted text-center mt-auto pt-2 border-t border-slate-100">{t('panel3FooterNoLogin')}</p>
    </div>
  )
}

export default function DecisionRoom() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('decisionRoom')
  const tCommon = useTranslations('common')

  const bullets = ['bullet1', 'bullet2', 'bullet3'] as const

  return (
    <section className="py-32 bg-gradient-to-b from-blue-50 to-white">
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

        {/* 3-panel grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12"
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={prefersReducedMotion ? {} : scaleIn} transition={defaultTransition} className="flex flex-col">
            <Panel1 />
          </motion.div>

          <motion.div variants={prefersReducedMotion ? {} : scaleIn} transition={{ ...defaultTransition, delay: 0.1 }} className="flex flex-col">
            <Panel2 />
          </motion.div>

          <motion.div variants={prefersReducedMotion ? {} : scaleIn} transition={{ ...defaultTransition, delay: 0.2 }} className="flex flex-col">
            <Panel3 />
          </motion.div>
        </motion.div>

        {/* Feature bullets */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {bullets.map((key) => (
            <motion.div
              key={key}
              variants={prefersReducedMotion ? {} : fadeUp}
              transition={defaultTransition}
              className="flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700">{t(key)}</span>
            </motion.div>
          ))}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeUp}
            transition={defaultTransition}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700">{tCommon('teamDecides')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

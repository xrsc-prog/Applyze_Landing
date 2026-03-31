'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { slideFromLeft, slideFromRight, defaultTransition } from '@/lib/animations'
import CandidateCard from '@/components/ui/CandidateCard'
import { useTranslations } from '@/lib/i18n'

const MINI_CANDIDATES = [
  { name: 'Jia Chen', title: 'Senior Business Data Analyst', score: 81 },
  { name: 'Linus Dashboard', title: 'Senior Data Analyst', score: 71 },
  { name: 'Dr. Jonas Datenberg', title: 'Senior Business Analyst', score: 64 },
]

function JobFormMockup() {
  const t = useTranslations('howItWorks')
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 w-full max-w-md">
      <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">{t('mockupCreateNewJob')}</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">{t('mockupJobTitle')}</label>
          <div className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-ink bg-slate-50">Senior Data Analyst</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">{t('mockupDepartment')}</label>
            <div className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-muted bg-white flex items-center justify-between">
              <span>Analytics</span>
              <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">{t('mockupEmploymentType')}</label>
            <div className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-muted bg-white flex items-center justify-between">
              <span>Full-time</span>
              <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">{t('mockupMustHaves')}</label>
          <div className="w-full rounded-lg border border-primary/50 px-3 py-2 text-sm text-ink bg-white min-h-[80px]">
            <span className="text-muted text-xs">5+ years data analysis, Python/SQL required, experience with BI tools...</span>
          </div>
        </div>
        <button className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors">{t('mockupCreateJobCta')}</button>
      </div>
    </div>
  )
}

function UploadMockup() {
  const t = useTranslations('howItWorks')
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 w-full max-w-md">
      <h4 className="text-sm font-semibold text-ink mb-4">{t('mockupChooseAnalysis')}</h4>
      <div className="space-y-3 mb-4">
        <div className="rounded-xl border-2 border-primary p-4 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary" /></div>
            <div>
              <p className="font-semibold text-ink text-sm">{t('mockupPremiumDeepDive')}</p>
              <p className="text-xs text-muted">{t('mockupPremiumCredits')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center gap-3 bg-slate-50 hover:border-primary/50 transition-colors cursor-pointer">
        <svg className="w-10 h-10 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-muted text-center">{t('mockupDropCVs')} <span className="text-primary font-semibold">{t('mockupBrowseFiles')}</span></p>
        <p className="text-xs text-muted">{t('mockupFileTypes')}</p>
      </div>
    </div>
  )
}

function CandidateListMockup() {
  const t = useTranslations('howItWorks')
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden w-full max-w-md">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide">{t('mockupCandidatesRanked')}</p>
      </div>
      {MINI_CANDIDATES.map((c, i) => (
        <CandidateCard key={i} {...c} size="sm" />
      ))}
    </div>
  )
}

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('howItWorks')
  const tCommon = useTranslations('common')

  const steps = [
    { number: '01', titleKey: 'step1Title', descKey: 'step1Description', visual: 'form', textSide: 'left' },
    { number: '02', titleKey: 'step2Title', descKey: 'step2Description', visual: 'upload', textSide: 'right' },
    { number: '03', titleKey: 'step3Title', descKey: 'step3Description', visual: 'list', textSide: 'right' },
  ]

  return (
    <section id="how-it-works" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <h2 className="text-5xl font-bold text-ink mb-4">{t('title')}</h2>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step) => {
            const isTextLeft = step.textSide === 'left'
            const textVariant = isTextLeft ? slideFromLeft : slideFromRight
            const visualVariant = isTextLeft ? slideFromRight : slideFromLeft

            return (
              <div
                key={step.number}
                className={`grid lg:grid-cols-2 gap-16 items-center ${!isTextLeft ? 'lg:grid-flow-col' : ''}`}
              >
                <motion.div
                  className={!isTextLeft ? 'lg:order-2' : ''}
                  variants={textVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  transition={defaultTransition}
                >
                  <div className="text-6xl lg:text-8xl font-extrabold text-primary/10 leading-none mb-4">{step.number}</div>
                  <h3 className="text-3xl font-bold text-ink mb-4">{t(step.titleKey)}</h3>
                  {step.number === '03' && (
                    <p className="text-base font-bold text-primary mb-3">{tCommon('teamDecides')}</p>
                  )}
                  <p className="text-lg leading-relaxed text-slate-600">{t(step.descKey)}</p>
                </motion.div>

                <motion.div
                  className={!isTextLeft ? 'lg:order-1' : ''}
                  variants={visualVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  transition={defaultTransition}
                >
                  {step.visual === 'form' && <JobFormMockup />}
                  {step.visual === 'upload' && <UploadMockup />}
                  {step.visual === 'list' && <CandidateListMockup />}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { defaultTransition, fadeUp, staggerContainer } from '@/lib/animations'
import AnnotatedProfileCard from '@/components/ui/AnnotatedProfileCard'
import InteractionPulse from '@/components/ui/InteractionPulse'
import { useTranslations } from '@/lib/i18n'

// ── Candidate data ──────────────────────────────────────────

const ALEX_MORGAN = {
  name: 'Alex Morgan',
  initials: 'AM',
  title: 'Senior Product Manager',
  bgColor: '#8B5CF6',
  matchScore: 84,
  trustScore: 96,
  subscores: [
    { name: 'd0Name', score: 8, maxScore: 10, color: '#3B6FE8' },
    { name: 'd1Name', score: 9, maxScore: 10, color: '#8B5CF6' },
    { name: 'd2Name', score: 8, maxScore: 10, color: '#10B981' },
    { name: 'd3Name', score: 9, maxScore: 10, color: '#10B981' },
    { name: 'd4Name', score: 8, maxScore: 10, color: '#8B5CF6' },
    { name: 'd5Name', score: 6, maxScore: 10, color: '#F59E0B' },
  ],
  strengths: [
    "Launched 3 products from 0→1, each reaching 100k+ users",
    "Reduced time-to-market by 35% through process improvements",
  ],
  risks: [
    "No direct B2B SaaS experience — primarily consumer-facing",
  ],
  annotations: [
    "Matches 8 of 9 required technical skills",
    "9 years — exceeds the 5yr requirement",
    "Proficient in all listed platforms",
    "Quantified results in every role",
    "Strong growth trajectory, proactive learner",
    "Minor B2B gap — noted and flagged",
  ],
}

const STEP_KEYS = [
  { id: 0, textKey: 'step0', completesAt: 600,  type: 'normal' as const },
  { id: 1, textKey: 'step1', completesAt: 1300, type: 'normal' as const },
  { id: 2, textKey: 'step2', completesAt: 2100, type: 'normal' as const },
  { id: 3, textKey: 'step3', completesAt: 2900, type: 'verify' as const },
  { id: 4, textKey: 'step4', completesAt: 3600, type: 'verify' as const },
  { id: 5, textKey: 'step5', completesAt: 4300, type: 'normal' as const },
]
const TOTAL_MS = 4500

const BULLET_KEYS = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5']

type DemoState = 'drop' | 'processing' | 'result'

export default function DemoCV() {
  const t = useTranslations('demoCV')

  const [demoState, setDemoState]           = useState<DemoState>('drop')
  const [progress, setProgress]             = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [dragOver, setDragOver]             = useState(false)
  const [dragging, setDragging]             = useState(false)
  const [showHint, setShowHint]             = useState(false)

  const prefersReducedMotion = useReducedMotion()
  const timerRef             = useRef<ReturnType<typeof setInterval> | null>(null)
  const hintTimerRef         = useRef<ReturnType<typeof setTimeout> | null>(null)
  const chipRef              = useRef<HTMLDivElement>(null)

  // Attach native HTML5 drag event listeners to the chip element.
  // Using addEventListener avoids the Framer Motion onDragStart type conflict.
  useEffect(() => {
    const el = chipRef.current
    if (!el) return
    const handleDragStart = (e: DragEvent) => {
      setDragging(true)
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', 'cv-file')
      }
    }
    const handleDragEnd = () => setDragging(false)
    el.addEventListener('dragstart', handleDragStart)
    el.addEventListener('dragend', handleDragEnd)
    return () => {
      el.removeEventListener('dragstart', handleDragStart)
      el.removeEventListener('dragend', handleDragEnd)
    }
  }, [])

  useEffect(() => () => {
    if (timerRef.current)    clearInterval(timerRef.current)
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
  }, [])

  const startProcessing = () => {
    setDemoState('processing')
    setProgress(0)
    setCompletedSteps([])
    setDragging(false)
    setDragOver(false)

    const startTime = Date.now()
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct     = Math.min((elapsed / TOTAL_MS) * 100, 100)
      setProgress(pct)
      const done = STEP_KEYS.filter(s => elapsed >= s.completesAt).map(s => s.id)
      setCompletedSteps(done)

      if (elapsed >= TOTAL_MS) {
        clearInterval(timerRef.current!)
        setTimeout(() => {
          setDemoState('result')
          hintTimerRef.current = setTimeout(() => setShowHint(true), 2800)
        }, 200)
      }
    }, 50)
  }

  const reset = () => {
    setDemoState('drop')
    setProgress(0)
    setCompletedSteps([])
    setShowHint(false)
    setDragging(false)
    setDragOver(false)
  }

  const activeStep    = STEP_KEYS.findIndex(s => !completedSteps.includes(s.id))
  const isVerifyPhase = activeStep >= 3 && activeStep <= 4

  return (
    <section id="demo-cv" className="bg-white">
      <AnimatePresence mode="wait">

        {/* ── DROP + PROCESSING: full-viewport-height interaction area ── */}
        {demoState !== 'result' && (
          <motion.div
            key="interaction"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
            transition={defaultTransition}
            className="min-h-screen flex flex-col items-center justify-center py-16 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30"
          >
            <AnimatePresence mode="wait">

              {/* DROP STATE */}
              {demoState === 'drop' && (
                <motion.div
                  key="drop"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                  transition={defaultTransition}
                  className="w-full max-w-lg"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-ink mb-4">{t('titleDrop')}</h2>
                    <p className="text-xl text-slate-600">{t('subtitleDrop')}</p>
                  </div>

                  {/* Mobile: tap to analyse */}
                  <div className="block lg:hidden">
                    {!prefersReducedMotion && (
                      <div className="flex justify-center mb-3">
                        <motion.span
                          className="inline-flex items-center bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20"
                          animate={{ opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          {t('dragBadge')}
                        </motion.span>
                      </div>
                    )}
                    <div className="flex justify-center mb-6">
                      <div className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border border-slate-200 shadow-md bg-white select-none">
                        <div className="w-9 h-11 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">PDF</div>
                        <div className="text-left min-w-0">
                          <p className="font-semibold text-ink text-sm truncate">alex_morgan_cv.pdf</p>
                          <p className="text-xs text-muted truncate">Senior Product Manager · 847 KB</p>
                        </div>
                        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </div>
                    </div>
                    <button
                      onClick={startProcessing}
                      className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25"
                    >
                      {t('tapToAnalyse')}
                    </button>
                  </div>

                  {/* Desktop: drag experience */}
                  <div className="hidden lg:block">
                  {/* Animated pill badge */}
                  {!prefersReducedMotion && (
                    <div className="flex justify-center mb-3">
                      <motion.span
                        className="inline-flex items-center bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20"
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {t('dragBadge')}
                      </motion.span>
                    </div>
                  )}

                  {/* Chip + instruction + arrow */}
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <InteractionPulse rounded="rounded-xl" active={!dragging}>
                      <motion.div
                        ref={chipRef}
                        draggable={true}
                        animate={
                          prefersReducedMotion
                            ? {}
                            : dragging
                              ? { opacity: 0.5, rotate: 3, scale: 0.95, y: 0 }
                              : { y: [0, -5, 0], opacity: 1, rotate: 0, scale: 1 }
                        }
                        transition={
                          dragging
                            ? { duration: 0.15 }
                            : { duration: 2, repeat: 3, ease: 'easeInOut' }
                        }
                        title={t('fileCardDragHint')}
                        className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border border-slate-200 shadow-md bg-white cursor-grab select-none relative group"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {t('fileCardDragHint')}
                        </div>
                        <div className="w-9 h-11 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">PDF</div>
                        <div className="text-left min-w-0">
                          <p className="font-semibold text-ink text-sm truncate">alex_morgan_cv.pdf</p>
                          <p className="text-xs text-muted truncate">Senior Product Manager · 847 KB</p>
                        </div>
                        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </motion.div>
                    </InteractionPulse>

                    <p className="text-sm text-muted">{t('fileCardDragInstructions')}</p>

                    <motion.div
                      animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-muted text-lg"
                    >
                      ↓
                    </motion.div>
                  </div>

                  {/* Drop zone */}
                  <motion.div
                    animate={dragging && !prefersReducedMotion ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.8, repeat: dragging ? Infinity : 0 }}
                    onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDragOver(true) }}
                    onDragEnter={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false)
                    }}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); startProcessing() }}
                    className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 mb-4 ${
                      dragOver ? 'border-primary bg-blue-50' : dragging ? 'border-primary/50 bg-blue-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <p className={`text-sm font-semibold transition-colors ${dragOver ? 'text-primary' : 'text-muted'}`}>
                      {dragOver ? t('dropZoneActive') : t('dropZoneIdle')}
                    </p>
                  </motion.div>

                  <button
                    onClick={startProcessing}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-base hover:bg-blue-600 transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                  >
                    {t('ctaAnalyse')}
                  </button>
                  </div>
                </motion.div>
              )}

              {/* PROCESSING STATE */}
              {demoState === 'processing' && (
                <motion.div
                  key="processing"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                  transition={defaultTransition}
                  className="w-full max-w-lg"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-ink mb-4">{t('titleDrop')}</h2>
                    <p className="text-xl text-slate-600">{t('subtitleDrop')}</p>
                  </div>
                  <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={defaultTransition}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-11 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">PDF</div>
                      <div>
                        <p className="font-semibold text-ink text-sm">alex_morgan_cv.pdf</p>
                        <p className="text-xs text-muted">
                          {isVerifyPhase ? t('processingVerify') : t('processingAnalysing')}
                        </p>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="space-y-4">
                      {STEP_KEYS.map((step, i) => {
                        const isDone    = completedSteps.includes(step.id)
                        const isActive  = activeStep === i
                        const isVerify  = step.type === 'verify'
                        return (
                          <div key={step.id} className="flex items-center gap-3">
                            {isDone ? (
                              <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : isActive ? (
                              isVerify ? (
                                <motion.div
                                  className="w-5 h-5 flex-shrink-0"
                                  animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                >
                                  <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                </motion.div>
                              ) : (
                                <motion.div
                                  className="w-5 h-5 flex-shrink-0"
                                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                >
                                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                </motion.div>
                              )
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${
                              isDone   ? 'text-success font-medium' :
                              isActive ? (isVerify ? 'text-amber font-semibold' : 'text-ink font-semibold') :
                              'text-muted'
                            }`}>
                              {t(step.textKey)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}

        {/* ── RESULT STATE: 2-column layout, full section width ── */}
        {demoState === 'result' && (
          <motion.div
            key="result"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={defaultTransition}
            className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
              <div className="grid lg:grid-cols-2 gap-16 items-start">

                {/* Left column: copy, bullets, hint, actions */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...defaultTransition, delay: 0.1 }}
                >
                  <h2 className="text-5xl font-bold text-ink mb-6">{t('sectionTitle')}</h2>
                  <p className="text-lg leading-relaxed text-slate-600 mb-8">{t('sectionSub')}</p>

                  <motion.ul
                    className="space-y-3 mb-10"
                    variants={prefersReducedMotion ? {} : staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {BULLET_KEYS.map((key) => (
                      <motion.li
                        key={key}
                        variants={prefersReducedMotion ? {} : fadeUp}
                        transition={defaultTransition}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-base text-slate-700">{t(key)}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        key="hint"
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                      >
                        <div className="h-px bg-slate-200 mb-6" />
                        <p className="text-sm text-muted mb-2">{t('hintSub')}</p>
                        <motion.div
                          animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="text-muted text-lg mb-3"
                        >
                          ↓
                        </motion.div>
                        <a
                          href="#demo-decision-room"
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById('demo-decision-room')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors"
                        >
                          {t('hintCta')}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col items-start gap-3">
                    <button
                      onClick={reset}
                      className="px-6 py-3 rounded-xl border-2 border-slate-200 text-ink font-semibold text-base hover:border-primary hover:text-primary transition-colors"
                    >
                      {t('tryAnother')}
                    </button>
                    <p className="text-xs text-muted italic">{t('disclaimer')}</p>
                  </div>
                </motion.div>

                {/* Right column: annotated profile card */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...defaultTransition, delay: 0.15 }}
                >
                  <AnnotatedProfileCard
                    candidate={ALEX_MORGAN}
                    showAnnotations={true}
                    animateOnMount={true}
                  />
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  )
}

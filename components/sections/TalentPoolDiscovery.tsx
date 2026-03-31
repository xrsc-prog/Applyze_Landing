'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'
import { slideFromLeft, slideFromRight, defaultTransition } from '@/lib/animations'

const CANDIDATE_SCORES = [92, 84, 78]

export default function TalentPoolDiscovery() {
  const t = useTranslations('talentPool')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [scanTextIndex, setScanTextIndex] = useState(0)
  const [displayScores, setDisplayScores] = useState([0, 0, 0])

  // Step transition loop
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return
    const durations: Record<1 | 2 | 3, number> = { 1: 2000, 2: 3000, 3: 5000 }
    const nextStepMap: Record<1 | 2 | 3, 1 | 2 | 3> = { 1: 2, 2: 3, 3: 1 }
    const timer = setTimeout(() => setStep(nextStepMap[step]), durations[step])
    return () => clearTimeout(timer)
  }, [step, isInView, prefersReducedMotion])

  // Reset when leaving view
  useEffect(() => {
    if (!isInView && !prefersReducedMotion) {
      setStep(1)
      setScanTextIndex(0)
      setDisplayScores([0, 0, 0])
    }
  }, [isInView, prefersReducedMotion])

  // Scan text cycling (step 2 only)
  useEffect(() => {
    if (step !== 2 || prefersReducedMotion) return
    setScanTextIndex(0)
    const t1 = setTimeout(() => setScanTextIndex(1), 1000)
    const t2 = setTimeout(() => setScanTextIndex(2), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [step, prefersReducedMotion])

  // Score count-up (step 3 only)
  useEffect(() => {
    if (step !== 3 || prefersReducedMotion) return
    setDisplayScores([0, 0, 0])
    const rafIds: number[] = []
    CANDIDATE_SCORES.forEach((target, idx) => {
      const delay = idx * 400
      const duration = 800
      let startTime: number | null = null
      const tick = (now: number) => {
        if (startTime === null) startTime = now + delay
        const elapsed = now - startTime
        if (elapsed < 0) { rafIds[idx] = requestAnimationFrame(tick); return }
        const progress = Math.min(elapsed / duration, 1)
        setDisplayScores(prev => {
          const next = [...prev]
          next[idx] = Math.round(target * progress)
          return next
        })
        if (progress < 1) rafIds[idx] = requestAnimationFrame(tick)
      }
      rafIds[idx] = requestAnimationFrame(tick)
    })
    return () => { rafIds.forEach(id => cancelAnimationFrame(id)) }
  }, [step, prefersReducedMotion])

  const activeStep = prefersReducedMotion ? 3 : step
  const activeScores = prefersReducedMotion ? CANDIDATE_SCORES : displayScores

  return (
    <section ref={sectionRef} className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            variants={prefersReducedMotion ? {} : slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={defaultTransition}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold mb-4">
              {t('eyebrow')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-5 leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              {t('sub')}
            </p>
            <ul className="space-y-4">
              {(['bullet1', 'bullet2', 'bullet3'] as const).map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-base text-ink">{t(key)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Animated mockup */}
          <motion.div
            variants={prefersReducedMotion ? {} : slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={defaultTransition}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-0.5">
                    {t('eyebrow')}
                  </p>
                  <h3 className="font-bold text-ink text-sm">{t('mockupJobTitle')}</h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-xs font-semibold text-indigo-600">AI Active</span>
                </div>
              </div>

              {/* Animated content area */}
              <div className="relative" style={{ minHeight: 240 }}>
                <AnimatePresence mode="wait">

                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8"
                    >
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-ink mb-1">{t('mockupNoCandidates')}</p>
                      <p className="text-xs text-muted text-center max-w-[200px]">{t('mockupNoCandidatesHint')}</p>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 gap-5"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      >
                        <svg className="w-9 h-9 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3l1.5 4.268L18 9l-4.5 1.732L12 15l-1.5-4.268L6 9l4.5-1.732L12 3z" />
                          <path d="M19.5 16l.75 2.25L22.5 19l-2.25.75L19.5 22l-.75-2.25L16.5 19l2.25-.75L19.5 16z" opacity={0.5} />
                          <path d="M4.5 16l.75 2.25L7.5 19l-2.25.75L4.5 22l-.75-2.25L1.5 19l2.25-.75L4.5 16z" opacity={0.3} />
                        </svg>
                      </motion.div>

                      <div className="h-6 relative w-full flex justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={scanTextIndex}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.3 }}
                            className="absolute text-sm font-medium text-indigo-600 whitespace-nowrap"
                          >
                            {t(`scanText${scanTextIndex}`)}
                          </motion.p>
                        </AnimatePresence>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-indigo-500"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 3, ease: 'linear' }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col px-5 py-4 gap-3"
                    >
                      {/* Discovery banner */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-semibold text-indigo-600">{t('discoveryBanner')}</p>
                      </div>

                      {/* Candidate rows */}
                      {[0, 1, 2].map((idx) => (
                        <motion.div
                          key={idx}
                          initial={prefersReducedMotion ? {} : { opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.4 }}
                          className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100"
                        >
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-600">
                            {t(`c${idx + 1}Name`).charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-ink">{t(`c${idx + 1}Name`)}</p>
                            <p className="text-xs text-muted truncate">{t(`c${idx + 1}Title`)}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-sm font-bold text-indigo-600">{activeScores[idx]}%</span>
                            <p className="text-xs text-muted">{t('matchLabel')}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

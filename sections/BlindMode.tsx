'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'
import { APP_URL } from '@/lib/constants'
import InteractionPulse from '@/components/ui/InteractionPulse'

export default function BlindMode() {
  const [isBlind, setIsBlind] = useState(false)
  const [autoTriggered, setAutoTriggered] = useState(false)
  const [everToggled, setEverToggled] = useState(false)
  const t = useTranslations('blindMode')
  const tCommon = useTranslations('common')
  const prefersReducedMotion = useReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' })

  useEffect(() => {
    if (isInView && !isBlind && !autoTriggered && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsBlind(true)
        setAutoTriggered(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInView, isBlind, autoTriggered, prefersReducedMotion])

  const PERSONAL_INFO = [
    t('normalCardAge'),
    t('normalCardNationality'),
    t('normalCardReligion'),
    t('normalCardGender'),
  ]

  const REMAINING = [
    t('remaining1'),
    t('remaining2'),
    t('remaining3'),
    t('remaining4'),
  ]

  return (
    <motion.section
      ref={sectionRef}
      animate={{ backgroundColor: isBlind ? '#1e1b4b' : '#ffffff' }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="py-32"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            animate={{ color: isBlind ? '#a5b4fc' : '#6366f1' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
          >
            {t('eyebrow')}
          </motion.span>
          <motion.h2
            animate={{ color: isBlind ? '#ffffff' : '#0F172A' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="text-5xl lg:text-6xl font-extrabold mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            animate={{ color: isBlind ? '#a5b4fc' : '#64748b' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="text-xl max-w-xl mx-auto"
          >
            {t('sub')}
          </motion.p>
        </div>

        {/* Toggle button + hint */}
        <div className="flex flex-col items-center mb-12">
          <InteractionPulse rounded="rounded-2xl" active={!everToggled}>
            <button
              onClick={() => { setIsBlind(!isBlind); setEverToggled(true) }}
              className={`relative flex items-center gap-4 px-6 py-3.5 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg ${
                isBlind
                  ? 'bg-indigo-500 text-white shadow-indigo-500/30'
                  : 'bg-slate-900 text-white shadow-slate-900/20'
              }`}
            >
              {/* Toggle switch */}
              <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isBlind ? 'bg-white/30' : 'bg-white/20'}`}>
                <motion.div
                  animate={{ left: isBlind ? '26px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                  style={{ position: 'absolute' }}
                />
              </div>
              <span>{isBlind ? t('toggleOn') : t('toggleOff')}</span>
            </button>
          </InteractionPulse>
          <motion.p
            animate={{ color: isBlind ? '#a5b4fc' : '#64748b' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            className="mt-3 text-sm font-medium"
          >
            {isBlind ? t('toggleHintBlind') : t('toggleHintNormal')}
          </motion.p>
        </div>

        {/* Main content: card + info */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">

          {/* Left: Candidate card */}
          <motion.div
            animate={{
              borderColor: isBlind ? 'rgba(99,102,241,0.4)' : 'rgba(226,232,240,1)',
              backgroundColor: isBlind ? 'rgba(30,27,75,0.6)' : '#ffffff',
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="rounded-2xl border-2 shadow-xl p-6"
          >
            {/* Photo + name row */}
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                animate={{
                  backgroundColor: isBlind ? '#3730a3' : '#e2e8f0',
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {isBlind ? (
                    <motion.span
                      key="question"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl font-black text-indigo-300"
                    >
                      ?
                    </motion.span>
                  ) : (
                    <motion.div
                      key="person"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Candidate profile"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div>
                <motion.h3
                  animate={{ color: isBlind ? '#c7d2fe' : '#0F172A' }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                  className="font-extrabold text-xl"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isBlind ? 'blind' : 'normal'}
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    >
                      {isBlind ? t('blindCardName') : t('normalCardName')}
                    </motion.span>
                  </AnimatePresence>
                </motion.h3>
                <motion.p
                  animate={{ color: isBlind ? '#818cf8' : '#64748b' }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                  className="text-sm"
                >
                  Senior Business Analyst
                </motion.p>
              </div>
            </div>

            {/* Personal info / blind banner */}
            <AnimatePresence mode="wait">
              {!isBlind ? (
                <motion.div
                  key="normal-info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {PERSONAL_INFO.map((item) => (
                      <div key={item} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs text-slate-600 font-medium truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber/8 border border-amber/25">
                    <svg className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-xs text-amber font-medium leading-relaxed">{t('normalWarning')}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="blind-info"
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                >
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {PERSONAL_INFO.map((_, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 bg-indigo-900/40 rounded-xl border border-indigo-700/30">
                        <div className="h-2.5 bg-indigo-700/50 rounded flex-1" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-xs text-emerald-300 font-semibold">{t('blindBanner')}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: What remains + quote + CTA */}
          <div>
            <motion.p
              animate={{ color: isBlind ? '#c7d2fe' : '#0F172A' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="font-bold text-lg mb-4"
            >
              {t('whatRemainsTitle')}
            </motion.p>
            <ul className="space-y-3 mb-8">
              {REMAINING.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <motion.div
                    animate={{ backgroundColor: isBlind ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.15)' }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <svg
                      className={`w-3 h-3 ${isBlind ? 'text-indigo-300' : 'text-success'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <motion.span
                    animate={{ color: isBlind ? '#c7d2fe' : '#334155' }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                    className="font-medium"
                  >
                    {item}
                  </motion.span>
                </li>
              ))}
            </ul>

            <motion.p
              animate={{ color: isBlind ? '#c7d2fe' : '#64748b' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
              className="text-sm font-semibold italic mb-6"
            >
              {tCommon('teamDecides')}
            </motion.p>

            <motion.p
              animate={{ color: isBlind ? '#a5b4fc' : '#64748b' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="text-base italic mb-8 leading-relaxed"
            >
              {t('quote')}
            </motion.p>

            <a
              href={APP_URL}
              className={`inline-flex items-center px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:-translate-y-0.5 ${
                isBlind
                  ? 'bg-white text-indigo-900 hover:bg-indigo-50 shadow-white/20'
                  : 'bg-ink text-white hover:bg-slate-800 shadow-ink/20'
              }`}
            >
              {t('cta')}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

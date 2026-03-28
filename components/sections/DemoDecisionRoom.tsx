'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { defaultTransition } from '@/lib/animations'
import { useTranslations } from '@/lib/i18n'
import InteractionPulse from '@/components/ui/InteractionPulse'

function MiniCircle({ score, size, strokeWidth, color }: { score: number; size: number; strokeWidth: number; color?: string }) {
  const [animated, setAnimated] = useState(false)
  const pct = score / 100
  const radius = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * radius
  const scoreColor = color || (score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444')
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={scoreColor} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={animated ? circ * (1 - pct) : circ}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-ink" style={{ fontSize: size * 0.22 }}>{score}%</span>
      </div>
    </div>
  )
}

function MiniBar({ score, maxScore = 10, color, delay = 0 }: { score: number; maxScore?: number; color: string; delay?: number }) {
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400 + delay * 100)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: animated ? `${(score/maxScore)*100}%` : '0%', backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold text-ink w-8 text-right">{score}/{maxScore}</span>
    </div>
  )
}

interface Candidate { initials: string; name: string; title: string; score: number; bg: string }

const ALL_CANDIDATES: Candidate[] = [
  { initials: 'JC', name: 'Jia Chen',            title: 'Senior Business Data Analyst', score: 81, bg: '#3B6FE8' },
  { initials: 'JC', name: 'Jia Chen',            title: 'Administrative Operations',     score: 80, bg: '#3B6FE8' },
  { initials: 'LD', name: 'Linus Dashboard',     title: 'Senior Data Analyst',           score: 71, bg: '#F59E0B' },
  { initials: 'DJ', name: 'Dr. Jonas Datenberg', title: 'Senior Business Analyst',       score: 64, bg: '#64748B' },
  { initials: 'RA', name: 'Rajesh Analytics',    title: 'Senior Data Science Cons.',     score: 37, bg: '#EF4444' },
]

const SUBSCORES_DR = [
  { name: 'd0Name', score: 9,  color: '#3B6FE8' },
  { name: 'd1Name', score: 10, color: '#8B5CF6' },
  { name: 'd2Name', score: 9,  color: '#10B981' },
  { name: 'd3Name', score: 9,  color: '#10B981' },
  { name: 'd4Name', score: 8,  color: '#8B5CF6' },
  { name: 'd5Name', score: 7,  color: '#F59E0B' },
]

type DemoState = 'select' | 'link' | 'review' | 'complete'

export default function DemoDecisionRoom() {
  const t = useTranslations('demoDecisionRoom')
  const tProfile = useTranslations('profile')
  const tDimensions = useTranslations('dimensions')

  const [demoState, setDemoState] = useState<DemoState>('select')
  const [selected, setSelected] = useState<number[]>([])
  const [copied, setCopied] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [votes, setVotes] = useState<Record<number, 'interview' | 'reject'>>({})
  const [flash, setFlash] = useState<'interview' | 'reject' | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const selectedCandidates = selected.map(i => ALL_CANDIDATES[i])
  const scoreColor = (s: number) => s >= 80 ? '#10B981' : s >= 60 ? '#F59E0B' : '#EF4444'

  const toggleSelect = (i: number) => {
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVote = (type: 'interview' | 'reject') => {
    const candidateIdx = selected[reviewIndex]
    setFlash(type)
    setTimeout(() => {
      setFlash(null)
      setVotes(prev => ({ ...prev, [candidateIdx]: type }))
      if (reviewIndex + 1 >= selectedCandidates.length) {
        setDemoState('complete')
      } else {
        setReviewIndex(i => i + 1)
      }
    }, 600)
  }

  const reset = () => {
    setDemoState('select')
    setSelected([])
    setCopied(false)
    setReviewIndex(0)
    setVotes({})
    setFlash(null)
  }

  const currentCandidate = selectedCandidates[reviewIndex]
  const interviewCount = Object.values(votes).filter(v => v === 'interview').length
  const rejectCount = Object.values(votes).filter(v => v === 'reject').length

  return (
    <section id="demo-decision-room" className="py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <h2 className="text-5xl font-bold text-ink mb-4">{t('title')}</h2>
          <p className="text-xl text-slate-600">{t('subtitle')}</p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">

            {/* STATE 1 — SELECT */}
            {demoState === 'select' && (
              <motion.div key="select"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                transition={defaultTransition}
              >
                {/* Browser chrome */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-muted border border-slate-200 font-mono">
                      app.applyze.ai/jobs/senior-data-analyst
                    </div>
                  </div>

                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ink text-sm">{t('jobTitle')}</p>
                      {selected.length > 0 && (
                        <p className="text-xs text-primary font-medium">{selected.length} {t('selectedLabel')}</p>
                      )}
                    </div>
                    <button
                      onClick={() => selected.length > 0 && setDemoState('link')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selected.length > 0
                          ? 'bg-primary text-white hover:bg-blue-600 shadow-md shadow-primary/20'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {t('createRoom')}
                    </button>
                  </div>

                  <div>
                    {ALL_CANDIDATES.map((c, i) => {
                      const rowContent = (
                        <div
                          key={i}
                          onClick={() => toggleSelect(i)}
                          className={`flex items-center gap-3 px-4 py-3 min-h-[52px] border-b border-slate-50 cursor-pointer transition-colors ${
                            selected.includes(i) ? 'bg-blue-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected.includes(i) ? 'border-primary bg-primary' : 'border-slate-300'
                          }`}>
                            {selected.includes(i) && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: c.bg }}>
                            {c.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-ink truncate">{c.name}</p>
                            <p className="text-xs text-muted truncate">{c.title}</p>
                          </div>
                          <span className="text-sm font-bold flex-shrink-0" style={{ color: scoreColor(c.score) }}>
                            {c.score}%
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-muted text-xs font-medium flex-shrink-0">{t('newStatus')}</span>
                        </div>
                      )

                      if (i === 0) {
                        return (
                          <div key={i} className="relative">
                            <InteractionPulse rounded="rounded-lg" active={selected.length === 0} className="w-full">
                              {rowContent}
                            </InteractionPulse>
                            {selected.length === 0 && (
                              <motion.span
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary font-medium pointer-events-none"
                                animate={prefersReducedMotion ? {} : { opacity: [1, 0.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              >
                                {t('selectHintInline')}
                              </motion.span>
                            )}
                          </div>
                        )
                      }
                      return rowContent
                    })}
                  </div>
                </div>
                <p className="text-xs text-muted italic text-center mt-4">
                  {t('selectHint')}
                </p>
              </motion.div>
            )}

            {/* STATE 2 — LINK */}
            {demoState === 'link' && (
              <motion.div key="link"
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, scale: 1.02 }}
                transition={defaultTransition}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
              >
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-1">{t('roomCreated')}</h3>
                  <p className="text-sm text-muted">{t('shareWith')}</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 mb-4">
                  <span className="text-xs text-muted font-mono flex-1 truncate">
                    https://app.applyze.ai/#/share/9d38da7c...
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      copied ? 'bg-success/15 text-success' : 'bg-slate-200 text-ink hover:bg-slate-300'
                    }`}
                  >
                    {copied ? t('copied') : t('copyLink')}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber mb-6">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {t('linkValid')}
                </div>

                <button
                  onClick={() => setDemoState('review')}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-600 transition-colors"
                >
                  {t('previewStakeholder')}
                </button>
              </motion.div>
            )}

            {/* STATE 3 — REVIEW */}
            {demoState === 'review' && currentCandidate && (
              <motion.div key={`review-${reviewIndex}`}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, x: flash === 'reject' ? -60 : 60 }}
                transition={defaultTransition}
              >
                {/* Flash overlay */}
                <AnimatePresence>
                  {flash && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.15 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 rounded-2xl z-10 pointer-events-none ${
                        flash === 'interview' ? 'bg-success' : 'bg-danger'
                      }`}
                    />
                  )}
                </AnimatePresence>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
                  {/* Decision Room header */}
                  <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-ink">Decision Room</span>
                    </div>
                    <span className="text-xs text-muted font-medium">
                      {t('candidateLabel')} {reviewIndex + 1} {t('ofLabel')} {selectedCandidates.length}
                    </span>
                  </div>

                  {/* Candidate header */}
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: currentCandidate.bg }}>
                      {currentCandidate.initials}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-ink">{currentCandidate.name}</h3>
                      <p className="text-xs text-muted">{currentCandidate.title}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full font-bold text-sm"
                      style={{ backgroundColor: `${scoreColor(currentCandidate.score)}20`, color: scoreColor(currentCandidate.score) }}>
                      {currentCandidate.score}% {tProfile('matchLabel')}
                    </span>
                  </div>

                  {/* Summary */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{t('summaryLabel')}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {t('summaryText')}
                    </p>
                  </div>

                  {/* Score circles */}
                  <div className="px-5 py-4 flex gap-8 border-b border-slate-100">
                    <div className="flex flex-col items-center gap-1">
                      <MiniCircle score={currentCandidate.score} size={68} strokeWidth={5} />
                      <span className="text-xs text-muted">{tProfile('overallMatchLabel')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <MiniCircle score={100} size={68} strokeWidth={5} color="#10B981" />
                      <span className="text-xs text-muted">{tProfile('trustConfidenceLabel')}</span>
                    </div>
                  </div>

                  {/* Sub-scores */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{tProfile('rubricLabel')}</p>
                    <div className="space-y-2">
                      {SUBSCORES_DR.map((s, i) => (
                        <div key={s.name} className="flex items-center gap-3">
                          <span className="text-xs font-medium text-ink w-20 flex-shrink-0">{tDimensions(s.name)}</span>
                          <div className="flex-1"><MiniBar score={s.score} color={s.color} delay={i} /></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Risks */}
                  <div className="px-5 py-4 grid grid-cols-2 gap-3 border-b border-slate-100">
                    <div className="rounded-xl bg-success/5 border border-success/20 p-3">
                      <p className="text-xs font-semibold text-success uppercase tracking-wide mb-1.5">{tProfile('strengthsLabel')}</p>
                      <ul className="space-y-1">
                        <li className="text-xs text-slate-600">• {t('drStrength1')}</li>
                        <li className="text-xs text-slate-600">• {t('drStrength2')}</li>
                      </ul>
                    </div>
                    <div className="rounded-xl bg-amber/5 border border-amber/20 p-3">
                      <p className="text-xs font-semibold text-amber uppercase tracking-wide mb-1.5">{tProfile('risksLabel')}</p>
                      <ul className="space-y-1">
                        <li className="text-xs text-slate-600">• {t('drRisk1')}</li>
                      </ul>
                    </div>
                  </div>

                  {/* Navigation + Actions */}
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between text-xs text-muted mb-4">
                      <button
                        disabled={reviewIndex === 0}
                        onClick={() => setReviewIndex(i => Math.max(0, i - 1))}
                        className="flex items-center gap-1 disabled:opacity-30 hover:text-ink transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('previous')}
                      </button>
                      <span>{reviewIndex + 1} / {selectedCandidates.length}</span>
                      <button
                        disabled={reviewIndex >= selectedCandidates.length - 1}
                        onClick={() => setReviewIndex(i => Math.min(selectedCandidates.length - 1, i + 1))}
                        className="flex items-center gap-1 disabled:opacity-30 hover:text-ink transition-colors"
                      >
                        {t('next')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleVote('reject')}
                        className="flex-1 py-3 rounded-xl border-2 border-danger/30 text-danger font-bold text-sm hover:bg-danger/5 transition-colors"
                      >
                        {t('reject')}
                      </button>
                      <button
                        onClick={() => handleVote('interview')}
                        className="flex-1 py-3 rounded-xl bg-ink text-white font-bold text-sm hover:bg-slate-800 transition-colors"
                      >
                        {flash === 'interview' ? t('addedToInterview') : t('interview')}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted italic text-center mt-4">
                  {t('stakeholderHint')}
                </p>
              </motion.div>
            )}

            {/* STATE 4 — COMPLETE */}
            {demoState === 'complete' && (
              <motion.div key="complete"
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={defaultTransition}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 text-center"
              >
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-ink mb-2">{t('allCandidatesReviewed')}</h3>
                <p className="text-slate-600 mb-2">
                  <span className="font-semibold text-success">{interviewCount} {t('forInterview')}</span>
                  {' · '}
                  <span className="font-semibold text-danger">{rejectCount} {t('rejected')}</span>
                </p>
                <p className="text-sm text-muted mb-8">{t('resultsSyncedPipeline')}</p>
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-blue-600 transition-colors"
                >
                  {t('startOver')} →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

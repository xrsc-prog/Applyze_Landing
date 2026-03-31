'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp, defaultTransition } from '@/lib/animations'
import { useTranslations } from '@/lib/i18n'
import { useIsMobile } from '@/lib/useIsMobile'
import InteractionPulse from '@/components/ui/InteractionPulse'
import ScoreCircle from '@/components/ui/ScoreCircle'
import ScoreBar from '@/components/ui/ScoreBar'

// ─── Mini score components ────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Candidate { initials: string; name: string; title: string; score: number; bg: string }

const ALL_CANDIDATES: Candidate[] = [
  { initials: 'JC', name: 'Jia Chen',            title: 'Senior Business Data Analyst', score: 81, bg: '#3B6FE8' },
  { initials: 'LD', name: 'Linus Dashboard',     title: 'Senior Data Analyst',           score: 71, bg: '#F59E0B' },
  { initials: 'DJ', name: 'Dr. Jonas Datenberg', title: 'Senior Business Analyst',       score: 64, bg: '#64748B' },
  { initials: 'RA', name: 'Rajesh Analytics',    title: 'Senior Data Science Cons.',     score: 37, bg: '#EF4444' },
]

const SUBSCORES_DR = [
  { name: 'd0Name', score: 9,  maxScore: 10, color: '#3B6FE8' },
  { name: 'd1Name', score: 10, maxScore: 10, color: '#8B5CF6' },
  { name: 'd2Name', score: 9,  maxScore: 10, color: '#10B981' },
  { name: 'd3Name', score: 9,  maxScore: 10, color: '#10B981' },
  { name: 'd4Name', score: 8,  maxScore: 10, color: '#8B5CF6' },
  { name: 'd5Name', score: 7,  maxScore: 10, color: '#F59E0B' },
]

// ─── Result panels (lifted from DecisionRoom) ─────────────────────────────────

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
          <span className="text-xs text-muted font-mono flex-1 truncate">app.applyze.ai/#/share/9d38...</span>
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
          {SUBSCORES_DR.slice(0, 4).map((s) => (
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

// ─── Main component ───────────────────────────────────────────────────────────

type DemoState = 'select' | 'link' | 'review' | 'result'

export default function DemoDecisionRoom() {
  const t = useTranslations('demoDecisionRoom')
  const tDR = useTranslations('decisionRoom')
  const tCommon = useTranslations('common')
  const tProfile = useTranslations('profile')
  const tDimensions = useTranslations('dimensions')

  const [demoState, setDemoState] = useState<DemoState>('select')
  const [selected, setSelected] = useState<number[]>([])
  const [copied, setCopied] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [votes, setVotes] = useState<Record<number, 'interview' | 'reject'>>({})
  const [flash, setFlash] = useState<'interview' | 'reject' | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  const selectedCandidates = selected.map(i => ALL_CANDIDATES[i])
  const scoreColor = (s: number) => s >= 80 ? '#10B981' : s >= 60 ? '#F59E0B' : '#EF4444'

  const toggleSelect = (i: number) => {
    if (isMobile) return
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
        setDemoState('result')
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

  // ─── Mobile auto-play ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!isMobile || !isInView || prefersReducedMotion) return

    const timers: ReturnType<typeof setTimeout>[] = []

    const run = () => {
      setDemoState('select')
      setSelected([])
      setReviewIndex(0)
      setVotes({})
      setFlash(null)

      timers.push(setTimeout(() => setSelected([0]), 700))
      timers.push(setTimeout(() => setSelected([0, 1]), 1400))
      timers.push(setTimeout(() => setSelected([0, 1, 2]), 2100))
      timers.push(setTimeout(() => setDemoState('link'), 4000))
      timers.push(setTimeout(() => {
        setSelected([0, 1, 2])
        setReviewIndex(0)
        setDemoState('review')
      }, 6000))
      timers.push(setTimeout(() => setDemoState('result'), 9500))
    }

    run()
    return () => timers.forEach(clearTimeout)
  }, [isMobile, isInView, prefersReducedMotion])

  useEffect(() => {
    if (isMobile && !isInView) reset()
  }, [isMobile, isInView])

  const currentCandidate = selectedCandidates[reviewIndex]
  const bullets = ['bullet1', 'bullet2', 'bullet3'] as const

  return (
    <section id="demo-decision-room" className="py-16 lg:py-32 bg-slate-50" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-8 lg:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-ink mb-3">{t('title')}</h2>
          <p className="text-base lg:text-xl text-slate-600">{t('subtitle')}</p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* STATE: SELECT */}
          {demoState === 'select' && (
            <motion.div key="select"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
              transition={defaultTransition}
              className="max-w-lg mx-auto"
            >
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
                    onClick={() => !isMobile && selected.length > 0 && setDemoState('link')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selected.length > 0
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {t('createRoom')}
                  </button>
                </div>

                <div>
                  {ALL_CANDIDATES.map((c, i) => {
                    const isSelected = selected.includes(i)
                    const row = (
                      <div
                        key={i}
                        onClick={() => toggleSelect(i)}
                        className={`flex items-center gap-3 px-4 py-3 min-h-[52px] border-b border-slate-50 transition-colors ${
                          isMobile ? '' : 'cursor-pointer'
                        } ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? 'border-primary bg-primary' : 'border-slate-300'
                        }`}>
                          {isSelected && (
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

                    if (i === 0 && !isMobile) {
                      return (
                        <div key={i} className="relative">
                          <InteractionPulse rounded="rounded-lg" active={selected.length === 0} className="w-full">
                            {row}
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
                    return row
                  })}
                </div>
              </div>
              {!isMobile && (
                <p className="text-xs text-muted italic text-center mt-4">{t('selectHint')}</p>
              )}
            </motion.div>
          )}

          {/* STATE: LINK */}
          {demoState === 'link' && (
            <motion.div key="link"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, scale: 1.02 }}
              transition={defaultTransition}
              className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
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
              {!isMobile && (
                <button
                  onClick={() => setDemoState('review')}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-600 transition-colors"
                >
                  {t('previewStakeholder')}
                </button>
              )}
            </motion.div>
          )}

          {/* STATE: REVIEW */}
          {demoState === 'review' && currentCandidate && (
            <motion.div key={`review-${reviewIndex}`}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, x: flash === 'reject' ? -60 : 60 }}
              transition={defaultTransition}
              className="max-w-lg mx-auto"
            >
              <AnimatePresence>
                {flash && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }}
                    className={`absolute inset-0 rounded-2xl z-10 pointer-events-none ${flash === 'interview' ? 'bg-success' : 'bg-danger'}`}
                  />
                )}
              </AnimatePresence>

              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
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

                <div className="px-5 py-4 border-b border-slate-100">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{t('summaryLabel')}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{t('summaryText')}</p>
                </div>

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

                {/* Vote buttons — desktop only */}
                {!isMobile && (
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
                )}
              </div>
              {!isMobile && (
                <p className="text-xs text-muted italic text-center mt-4">{t('stakeholderHint')}</p>
              )}
            </motion.div>
          )}

          {/* STATE: RESULT — merged from DecisionRoom */}
          {demoState === 'result' && (
            <motion.div key="result"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={defaultTransition}
            >
              <motion.div
                className="text-center mb-12"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...defaultTransition, delay: 0.1 }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-ink mb-4">{tDR('title')}</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">{tDR('sub')}</p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-10"
                variants={prefersReducedMotion ? {} : staggerContainer}
                initial="hidden"
                animate="visible"
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

              <motion.div
                className="flex flex-wrap justify-center gap-6 mb-8"
                variants={prefersReducedMotion ? {} : staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {bullets.map((key) => (
                  <motion.div key={key} variants={prefersReducedMotion ? {} : fadeUp} transition={defaultTransition} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{tDR(key)}</span>
                  </motion.div>
                ))}
                <motion.div variants={prefersReducedMotion ? {} : fadeUp} transition={defaultTransition} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{tCommon('teamDecides')}</span>
                </motion.div>
              </motion.div>

              <div className="text-center">
                <button onClick={reset} className="text-sm text-muted hover:text-ink transition-colors">
                  ← {t('startOver')}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}

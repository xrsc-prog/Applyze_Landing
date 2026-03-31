'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'

// ---- Shared primitives ----

interface MiniScoreCircleProps {
  score: number
  maxScore?: number
  size: number
  strokeWidth: number
  color?: string
  animate?: boolean
}

function MiniScoreCircle({ score, maxScore = 100, size, strokeWidth, color, animate: shouldAnimate = true }: MiniScoreCircleProps) {
  const [animated, setAnimated] = useState(false)
  const percentage = (score / maxScore) * 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const scoreColor = color || (percentage >= 80 ? '#10B981' : percentage >= 60 ? '#F59E0B' : '#EF4444')

  useEffect(() => {
    if (shouldAnimate) {
      const t = setTimeout(() => setAnimated(true), 100)
      return () => clearTimeout(t)
    } else {
      setAnimated(true)
    }
  }, [shouldAnimate])

  const offset = animated ? circumference * (1 - percentage / 100) : circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={scoreColor} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      <span className="absolute font-bold text-ink" style={{ fontSize: size * 0.22 }}>
        {score}{maxScore === 100 ? '%' : ''}
      </span>
    </div>
  )
}

interface MiniScoreBarProps {
  score: number
  maxScore?: number
  color: string
  animate?: boolean
}

function MiniScoreBar({ score, maxScore = 10, color, animate: shouldAnimate = true }: MiniScoreBarProps) {
  const [animated, setAnimated] = useState(false)
  const pct = (score / maxScore) * 100

  useEffect(() => {
    if (shouldAnimate) {
      const t = setTimeout(() => setAnimated(true), 200)
      return () => clearTimeout(t)
    } else {
      setAnimated(true)
    }
  }, [shouldAnimate])

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: animated ? `${pct}%` : '0%', backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold text-ink w-8 text-right flex-shrink-0">{score}/{maxScore}</span>
    </div>
  )
}

interface AnimatedBarProps {
  value: number
  max: number
  color: string
  animate?: boolean
}

function AnimatedBar({ value, max, color, animate: shouldAnimate = true }: AnimatedBarProps) {
  const [animated, setAnimated] = useState(false)
  const pct = (value / max) * 100
  useEffect(() => {
    if (shouldAnimate) {
      const t = setTimeout(() => setAnimated(true), 150)
      return () => clearTimeout(t)
    } else {
      setAnimated(true)
    }
  }, [shouldAnimate])
  return (
    <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: animated ? `${pct}%` : '0%', backgroundColor: color }}
      />
    </div>
  )
}

function CountUp({ to, duration = 1200 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [to, duration])
  return <>{val}</>
}

// ==========================================
// SCREEN 1 — Dashboard Overview
// ==========================================
function Screen1() {
  const t = useTranslations('heroDemoSequence')

  const pipeline = [
    { labelKey: 's1StatusNew',       count: 45, pct: 32, color: '#3B6FE8' },
    { labelKey: 's1StatusScreening', count: 38, pct: 27, color: '#F59E0B' },
    { labelKey: 's1StatusInterview', count: 19, pct: 13, color: '#3B6FE8' },
    { labelKey: 's1StatusOffer',     count: 7,  pct: 5,  color: '#10B981' },
    { labelKey: 's1StatusHired',     count: 3,  pct: 2,  color: '#10B981' },
    { labelKey: 's1StatusRejected',  count: 30, pct: 21, color: '#EF4444' },
  ]
  const topJobs = [
    { title: 'Senior Frontend Engineer', candidates: 42, score: 71 },
    { title: 'Product Manager',          candidates: 38, score: 68 },
    { title: 'DevOps Engineer',          candidates: 28, score: 74 },
    { title: 'UX Designer',              candidates: 19, score: 61 },
  ]
  const recent = [
    { initials: 'TB', name: 'Tom Brenner',    role: 'DevOps Engineer',       statusKey: 's1StatusInterview',   score: 91, bg: '#3B6FE8' },
    { initials: 'SC', name: 'Sarah Chen',     role: 'Senior Frontend Eng.',  statusKey: 's1StatusShortlisted', score: 89, bg: '#8B5CF6' },
    { initials: 'LM', name: 'Lukas Meyer',    role: 'Product Manager',       statusKey: 's1StatusShortlisted', score: 82, bg: '#10B981' },
    { initials: 'MW', name: 'Marcus Weber',   role: 'Product Manager',       statusKey: 's1StatusScreening',   score: 74, bg: '#F59E0B' },
    { initials: 'JH', name: 'Julia Hoffmann', role: 'Senior Frontend Eng.',  statusKey: 's1StatusNew',         score: 62, bg: '#64748B' },
    { initials: 'AS', name: 'Anna Schmidt',   role: 'UX Designer',           statusKey: 's1StatusRejected',    score: 55, bg: '#EF4444' },
  ]

  const scoreColor = (s: number) => s >= 80 ? '#10B981' : s >= 60 ? '#F59E0B' : '#EF4444'
  const statusDot = (key: string) => {
    if (key === 's1StatusInterview')   return 'bg-blue-500'
    if (key === 's1StatusShortlisted') return 'bg-purple-500'
    if (key === 's1StatusScreening')   return 'bg-amber-500'
    if (key === 's1StatusRejected')    return 'bg-red-500'
    return 'bg-slate-400'
  }

  const stats = [
    { labelKey: 's1OpenJobs',         value: 8 },
    { labelKey: 's1ActiveCandidates', value: 142 },
    { labelKey: 's1AvgScore',         value: 67, suffix: '%' },
    { labelKey: 's1AwaitingReview',   value: 23 },
  ]

  return (
    <div className="p-4 bg-white min-h-0">
      <div className="grid grid-cols-4 gap-3 mb-4">
        {stats.map((s) => (
          <div key={s.labelKey} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="text-xl font-extrabold text-ink">
              <CountUp to={s.value} />{s.suffix}
            </div>
            <div className="text-xs text-muted mt-0.5">{t(s.labelKey)}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-3">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-ink uppercase tracking-wide mb-3">{t('s1Pipeline')}</p>
            <div className="space-y-2">
              {pipeline.map((p) => (
                <div key={p.labelKey} className="flex items-center gap-2">
                  <span className="text-xs text-muted w-16">{t(p.labelKey)}</span>
                  <AnimatedBar value={p.pct} max={100} color={p.color} />
                  <span className="text-xs font-semibold text-ink w-6 text-right">{p.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-ink uppercase tracking-wide mb-3">{t('s1TopActiveJobs')}</p>
            <div className="space-y-2">
              {topJobs.map((j) => (
                <div key={j.title} className="flex items-center gap-2">
                  <span className="text-xs text-ink flex-1 truncate">{j.title}</span>
                  <span className="text-xs text-muted">{j.candidates}</span>
                  <span className="text-xs font-bold" style={{ color: scoreColor(j.score) }}>{j.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-semibold text-ink uppercase tracking-wide mb-3">{t('s1RecentCandidates')}</p>
          <div className="space-y-2.5">
            {recent.map((c) => (
              <div key={c.name + c.statusKey} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: c.bg, fontSize: 8, fontWeight: 700 }}>
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink truncate leading-tight">{c.name}</p>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${statusDot(c.statusKey)}`} />
                    <span className="text-xs text-muted truncate">{t(c.statusKey)}</span>
                  </div>
                </div>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: scoreColor(c.score) }}>
                  {c.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// SCREEN 2 — Candidate Ranked List
// ==========================================
function Screen2() {
  const t = useTranslations('heroDemoSequence')

  const candidates = [
    { initials: 'JC', name: 'Jia Chen',            title: 'Senior Business Data Analyst', score: 81, bg: '#3B6FE8' },
    { initials: 'JC', name: 'Jia Chen',            title: 'Administrative Operations',     score: 80, bg: '#3B6FE8' },
    { initials: 'LD', name: 'Linus Dashboard',     title: 'Senior Data Analyst',           score: 71, bg: '#F59E0B' },
    { initials: 'DJ', name: 'Dr. Jonas Datenberg', title: 'Senior Business Analyst',       score: 64, bg: '#64748B' },
    { initials: 'RA', name: 'Rajesh Analytics',    title: 'Senior Data Science Cons.',     score: 37, bg: '#EF4444' },
  ]

  return (
    <div className="bg-white">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-ink text-sm">Senior Data Analyst</h3>
          <p className="text-xs text-muted">{t('s2CandidatesRanked')}</p>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold">{t('s2UploadCVs')}</button>
      </div>
      <div>
        {candidates.map((c, i) => {
          const scoreColor = c.score >= 80 ? '#10B981' : c.score >= 60 ? '#F59E0B' : '#EF4444'
          const radius = 14; const sw = 2.5
          const circ = 2 * Math.PI * radius
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.3 }}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: c.bg }}>
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{c.name}</p>
                <p className="text-xs text-muted truncate">{c.title}</p>
              </div>
              <div className="relative flex-shrink-0" style={{ width: 36, height: 36 }}>
                <svg width={36} height={36} viewBox="0 0 36 36" className="-rotate-90">
                  <circle cx={18} cy={18} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={sw} />
                  <motion.circle cx={18} cy={18} r={radius} fill="none"
                    stroke={scoreColor} strokeWidth={sw} strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ * (1 - c.score / 100) }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-ink">{c.score}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-muted text-xs font-medium flex-shrink-0">{t('s1StatusNew')}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// SCREEN 3 — Candidate Profile
// ==========================================
function Screen3() {
  const t = useTranslations('heroDemoSequence')
  const tProfile = useTranslations('profile')
  const tDimensions = useTranslations('dimensions')

  const subscores = [
    { name: 'd0Name', score: 9,  maxScore: 10, color: '#3B6FE8' },
    { name: 'd1Name', score: 10, maxScore: 10, color: '#8B5CF6' },
    { name: 'd2Name', score: 9,  maxScore: 10, color: '#10B981' },
    { name: 'd3Name', score: 9,  maxScore: 10, color: '#10B981' },
    { name: 'd4Name', score: 8,  maxScore: 10, color: '#8B5CF6' },
    { name: 'd5Name', score: 7,  maxScore: 10, color: '#F59E0B' },
  ]

  return (
    <div className="bg-white">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary font-bold text-base">JC</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-ink text-base">Jia Chen</h3>
          <p className="text-xs text-muted">Senior Business Data Analyst</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-success/10 text-success font-bold text-xs">81% {tProfile('matchLabel')}</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-xs">{tProfile('analysedLabel')}</span>
        </div>
      </div>
      <div className="px-5 py-4 flex gap-8 border-b border-slate-100">
        <div className="flex flex-col items-center gap-1">
          <MiniScoreCircle score={81} size={72} strokeWidth={6} />
          <span className="text-xs text-muted font-medium">{tProfile('overallMatchLabel')}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MiniScoreCircle score={100} size={72} strokeWidth={6} color="#10B981" />
          <span className="text-xs text-muted font-medium">{tProfile('trustConfidenceLabel')}</span>
        </div>
      </div>
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{tProfile('rubricLabel')}</p>
        <div className="space-y-2">
          {subscores.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span className="text-xs font-medium text-ink w-20 flex-shrink-0">{tDimensions(s.name)}</span>
              <div className="flex-1">
                <MiniScoreBar score={s.score} maxScore={s.maxScore} color={s.color} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-success/5 border border-success/20 p-3">
          <p className="text-xs font-semibold text-success uppercase tracking-wide mb-2">{tProfile('strengthsLabel')}</p>
          <ul className="space-y-1">
            <li className="text-xs text-slate-600">• {t('s3StrengthBullet1')}</li>
            <li className="text-xs text-slate-600">• {t('s3StrengthBullet2')}</li>
          </ul>
        </div>
        <div className="rounded-xl bg-amber/5 border border-amber/20 p-3">
          <p className="text-xs font-semibold text-amber uppercase tracking-wide mb-2">{tProfile('risksLabel')}</p>
          <ul className="space-y-1">
            <li className="text-xs text-slate-600">• {t('s3RiskBullet1')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// SCREEN 4 — Decision Room View
// ==========================================
function Screen4() {
  const t = useTranslations('heroDemoSequence')
  const tProfile = useTranslations('profile')
  const tDimensions = useTranslations('dimensions')

  const subscores = [
    { name: 'd0Name', score: 9,  color: '#3B6FE8' },
    { name: 'd1Name', score: 10, color: '#8B5CF6' },
    { name: 'd2Name', score: 9,  color: '#10B981' },
    { name: 'd3Name', score: 9,  color: '#10B981' },
    { name: 'd4Name', score: 8,  color: '#8B5CF6' },
    { name: 'd5Name', score: 7,  color: '#F59E0B' },
  ]

  return (
    <div className="bg-white">
      {/* Decision Room header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-ink">Decision Room</span>
        </div>
        <span className="text-xs text-muted">{t('s4CandidateOfText')}</span>
      </div>

      {/* Candidate header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary font-bold text-sm">JC</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-ink text-sm">Jia Chen</h3>
          <p className="text-xs text-muted">Senior Business Data Analyst</p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-success/10 text-success font-bold text-xs">81% {tProfile('matchLabel')}</span>
      </div>

      {/* Summary */}
      <div className="px-5 py-3 border-b border-slate-100">
        <p className="text-xs text-slate-600 leading-relaxed">
          {t('s4Summary')}
        </p>
      </div>

      {/* Score circles */}
      <div className="px-5 py-3 flex gap-6 border-b border-slate-100">
        <div className="flex flex-col items-center gap-1">
          <MiniScoreCircle score={81} size={60} strokeWidth={5} />
          <span className="text-xs text-muted">{tProfile('overallMatchLabel')}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MiniScoreCircle score={100} size={60} strokeWidth={5} color="#10B981" />
          <span className="text-xs text-muted">{tProfile('trustConfidenceLabel')}</span>
        </div>
      </div>

      {/* Sub-scores */}
      <div className="px-5 py-3 border-b border-slate-100">
        <div className="space-y-1.5">
          {subscores.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="text-xs text-muted w-20 flex-shrink-0">{tDimensions(s.name)}</span>
              <MiniScoreBar score={s.score} maxScore={10} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-5 py-4">
        <div className="flex gap-3 mb-2">
          <button className="flex-1 py-2 rounded-lg border border-danger/30 text-danger text-xs font-semibold">{t('s4Reject')}</button>
          <button className="flex-1 py-2 rounded-lg bg-ink text-white text-xs font-semibold">{t('s4Interview')}</button>
        </div>
        <p className="text-center text-xs text-muted">{t('s4NoLoginRequired')}</p>
      </div>
    </div>
  )
}

// ==========================================
// SCREEN 5 — Hiring Intelligence
// ==========================================
function Screen5() {
  const t = useTranslations('heroDemoSequence')

  const diagnostics = [
    { key: 's5Diag1', labelKey: 's5Diag1Label', statusKey: 's5Diag1Status', noteKey: 's5Diag1Note', healthy: true },
    { key: 's5Diag2', labelKey: 's5Diag2Label', statusKey: 's5Diag2Status', noteKey: 's5Diag2Note', healthy: false },
    { key: 's5Diag3', labelKey: 's5Diag3Label', statusKey: 's5Diag3Status', noteKey: 's5Diag3Note', healthy: true },
    { key: 's5Diag4', labelKey: 's5Diag4Label', statusKey: 's5Diag4Status', noteKey: 's5Diag4Note', healthy: false },
  ]

  return (
    <div className="p-4 bg-white min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-ink text-sm">{t('s5Title')}</h3>
            <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-xs font-bold">{t('s5Beta')}</span>
          </div>
          <p className="text-xs text-muted">{t('s5SubTitle')}</p>
        </div>
      </div>

      {/* Intelligence Brief */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xs font-semibold text-ink">{t('s5IntelligenceBrief')}</span>
          <span className="ml-auto flex items-center gap-1 text-xs text-amber">
            <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" />
            {t('s5NeedsAttention')}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          {t('s5Brief')}
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-2 bg-amber/5 rounded-lg p-2 border border-amber/20">
            <span className="text-amber text-xs mt-0.5">⚠</span>
            <div>
              <p className="text-xs font-semibold text-ink">{t('s5Alert1Title')} <span className="text-muted font-normal">· {t('s5Alert1Confidence')}</span></p>
              <p className="text-xs text-muted">{t('s5Alert1Text')}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-success/5 rounded-lg p-2 border border-success/20">
            <span className="text-success text-xs mt-0.5">○</span>
            <div>
              <p className="text-xs font-semibold text-ink">{t('s5Alert2Title')} <span className="text-muted font-normal">· {t('s5Alert2Confidence')}</span></p>
              <p className="text-xs text-muted">{t('s5Alert2Text')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3">
        <p className="text-xs font-semibold text-muted mb-2">{t('s5HealthSummary')}</p>
        <div className="space-y-1.5">
          {diagnostics.map((d) => (
            <div key={d.key} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${d.healthy ? 'bg-success' : 'bg-amber'}`} />
              <span className="text-xs font-medium text-ink w-24">{t(d.labelKey)}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${d.healthy ? 'bg-success/10 text-success' : 'bg-amber/10 text-amber'}`}>
                {t(d.statusKey)}
              </span>
              <span className="text-xs text-muted truncate">{t(d.noteKey)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: '18d', labelKey: 's5MetricDaysToFill' },
          { value: '$12k', labelKey: 's5MetricVacancyCost' },
          { value: '14', labelKey: 's5MetricPositiveSignals' },
        ].map((m) => (
          <div key={m.labelKey} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
            <div className="text-base font-extrabold text-ink">{m.value}</div>
            <div className="text-xs text-muted">{t(m.labelKey)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// MAIN COMPONENT
// ==========================================
const SCREEN_COUNT = 5
const SCREEN_LABEL_KEYS = [
  'screenLabelDashboard',
  'screenLabelCandidates',
  'screenLabelProfile',
  'screenLabelDecision',
  'screenLabelIntelligence',
]
const SCREEN_URLS = [
  'app.applyze.ai/dashboard',
  'app.applyze.ai/jobs/senior-data-analyst',
  'app.applyze.ai/jobs/senior-data-analyst/jia-chen',
  'app.applyze.ai/#/share/9d38da7c',
  'app.applyze.ai/intelligence',
]

export default function HeroDemoSequence() {
  const t = useTranslations('heroDemoSequence')
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const INTERVAL = 4000

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SCREEN_COUNT)
    }, INTERVAL)
  }, [])

  useEffect(() => {
    if (!paused && !prefersReducedMotion) startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, prefersReducedMotion, startInterval])

  const goTo = (i: number) => {
    setCurrent(i)
    startInterval()
  }

  const screens = [
    <Screen1 key="s1" />,
    <Screen2 key="s2" />,
    <Screen3 key="s3" />,
    <Screen4 key="s4" />,
    <Screen5 key="s5" />,
  ]

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[400px] rounded-full bg-primary/15 blur-3xl" />
      </div>

      {/* Browser chrome */}
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        className="rounded-2xl shadow-2xl overflow-hidden border border-slate-200 bg-white"
      >
        {/* Chrome bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-muted border border-slate-200 font-mono truncate">
            {SCREEN_URLS[current]}
          </div>
          <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
            {SCREEN_LABEL_KEYS.map((key, i) => (
              <button
                key={key}
                onClick={() => goTo(i)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  i === current ? 'bg-primary/10 text-primary' : 'text-muted hover:text-ink'
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </div>

        {/* Screen content */}
        <div className="overflow-hidden" style={{ maxHeight: 420 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {screens[current]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        {!prefersReducedMotion && !paused && (
          <div className="h-0.5 bg-slate-100">
            <motion.div
              className="h-full bg-primary/40"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              key={current}
            />
          </div>
        )}
      </motion.div>

      {/* Dot indicators — 5 dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {Array.from({ length: SCREEN_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to screen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

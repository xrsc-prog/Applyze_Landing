'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import ScoreCircle from './ScoreCircle'
import ScoreBar from './ScoreBar'
import { useTranslations } from '@/lib/i18n'

interface SubScore {
  name: string
  score: number
  maxScore: number
  color: string
}

interface Candidate {
  name: string
  initials: string
  title: string
  bgColor: string
  matchScore: number
  trustScore: number
  subscores: SubScore[]
  strengths: string[]
  risks: string[]
  annotations: string[]
}

interface AnnotatedProfileCardProps {
  candidate: Candidate
  showAnnotations: boolean
  animateOnMount: boolean
}

const ANNOTATION_LINE_LENGTH = 48

function AnnotationLines({
  subscores,
  annotations,
  visible,
  prefersReducedMotion,
}: {
  subscores: SubScore[]
  annotations: string[]
  visible: boolean
  prefersReducedMotion: boolean
}) {
  if (prefersReducedMotion) return null

  return (
    <div className="hidden xl:flex flex-col justify-center pl-2 gap-[13px] pt-[260px]">
      {subscores.map((s, i) => (
        <motion.div
          key={s.name}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -8 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.4, delay: i * 0.2 + 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Animated line */}
          <div className="flex items-center flex-shrink-0">
            <svg width={ANNOTATION_LINE_LENGTH} height={16} viewBox={`0 0 ${ANNOTATION_LINE_LENGTH} 16`} className="overflow-visible">
              <motion.path
                d={`M 0 8 C 20 8, 50 8, ${ANNOTATION_LINE_LENGTH} 8`}
                fill="none"
                stroke={s.color}
                strokeWidth={1.5}
                strokeOpacity={0.7}
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: 0 }}
                animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2, ease: 'easeOut' }}
              />
              <motion.circle
                cx={ANNOTATION_LINE_LENGTH}
                cy={8}
                r={3}
                fill={s.color}
                fillOpacity={0.8}
                initial={{ opacity: 0, scale: 0 }}
                animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.2, delay: i * 0.2 + 0.35 }}
              />
            </svg>
          </div>
          {/* Bubble */}
          <motion.div
            className="rounded-lg bg-white shadow-sm px-3 py-1.5 max-w-[175px]"
            style={{ borderLeftWidth: 2, borderLeftColor: s.color, borderLeftStyle: 'solid' }}
            initial={{ opacity: 0, x: -4 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            transition={{ duration: 0.3, delay: i * 0.2 + 0.4 }}
          >
            <p className="text-xs text-slate-600 leading-snug whitespace-nowrap">{annotations[i]}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default function AnnotatedProfileCard({
  candidate,
  showAnnotations,
  animateOnMount,
}: AnnotatedProfileCardProps) {
  const tProfile = useTranslations('profile')
  const tDimensions = useTranslations('dimensions')

  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [annotationsVisible, setAnnotationsVisible] = useState(false)

  const triggerVisible = animateOnMount ? true : isInView

  useEffect(() => {
    if (showAnnotations && triggerVisible) {
      const t = setTimeout(() => setAnnotationsVisible(true), animateOnMount ? 800 : 400)
      return () => clearTimeout(t)
    }
    if (!showAnnotations) {
      setAnnotationsVisible(false)
    }
  }, [showAnnotations, triggerVisible, animateOnMount])

  const cardVariants = animateOnMount
    ? {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
      }

  return (
    <div ref={cardRef} className="w-full">
      {/* Desktop layout: card + annotation lines */}
      <div className="hidden xl:flex items-start gap-0">
        {/* Profile card */}
        <motion.div
          className="flex-shrink-0 w-80"
          variants={prefersReducedMotion ? {} : cardVariants}
          initial="hidden"
          animate={triggerVisible ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${candidate.bgColor}20` }}
                >
                  <span className="font-bold text-lg" style={{ color: candidate.bgColor }}>
                    {candidate.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ink text-base">{candidate.name}</h3>
                  <p className="text-sm text-muted truncate">{candidate.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-success/10 text-success font-bold text-xs">
                  {candidate.matchScore}% {tProfile('matchLabel')}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                  {tProfile('analysedLabel')}
                </span>
              </div>
            </div>

            {/* Score circles */}
            <div className="px-5 py-4 flex gap-6 border-b border-slate-100">
              <div className="flex flex-col items-center gap-1">
                <ScoreCircle score={candidate.matchScore} size={68} strokeWidth={5} showLabel={false} />
                <span className="text-xs text-muted font-medium">{tProfile('overallMatchLabel')}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ScoreCircle score={candidate.trustScore} size={68} strokeWidth={5} color="#10B981" showLabel={false} />
                <span className="text-xs text-muted font-medium">{tProfile('trustConfidenceLabel')}</span>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                {tProfile('rubricLabel')}
              </p>
              <div className="space-y-2.5">
                {candidate.subscores.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-ink w-20 flex-shrink-0">{tDimensions(s.name)}</span>
                    <div className="flex-1">
                      <ScoreBar
                        score={s.score}
                        maxScore={s.maxScore}
                        color={s.color}
                        height={5}
                        showLabel={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Risks */}
            <div className="px-5 py-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-success/5 border border-success/20 p-3">
                <p className="text-xs font-semibold text-success uppercase tracking-wide mb-2">
                  {tProfile('strengthsLabel')}
                </p>
                <ul className="space-y-1.5">
                  {candidate.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-slate-600">• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-amber/5 border border-amber/20 p-3">
                <p className="text-xs font-semibold text-amber uppercase tracking-wide mb-2">{tProfile('risksLabel')}</p>
                <ul className="space-y-1.5">
                  {candidate.risks.map((r, i) => (
                    <li key={i} className="text-xs text-slate-600">• {r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Annotation lines (desktop) */}
        <AnnotationLines
          subscores={candidate.subscores}
          annotations={candidate.annotations}
          visible={annotationsVisible}
          prefersReducedMotion={!!prefersReducedMotion}
        />
      </div>

      {/* Mobile layout: card full width */}
      <div className="xl:hidden">
        <motion.div
          variants={prefersReducedMotion ? {} : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate={triggerVisible ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
            <div className="px-5 py-5 border-b border-slate-100">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${candidate.bgColor}20` }}
                >
                  <span className="font-bold text-lg" style={{ color: candidate.bgColor }}>
                    {candidate.initials}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-ink text-lg">{candidate.name}</h3>
                  <p className="text-sm text-muted">{candidate.title}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-success/10 text-success font-bold text-sm">
                  {candidate.matchScore}% {tProfile('matchLabel')}
                </span>
              </div>
            </div>

            <div className="px-5 py-5 flex gap-8 border-b border-slate-100">
              <div className="flex flex-col items-center gap-1">
                <ScoreCircle score={candidate.matchScore} size={72} strokeWidth={6} showLabel={false} />
                <span className="text-xs text-muted font-medium">{tProfile('overallMatchLabel')}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ScoreCircle score={candidate.trustScore} size={72} strokeWidth={6} color="#10B981" showLabel={false} />
                <span className="text-xs text-muted font-medium">{tProfile('trustConfidenceLabel')}</span>
              </div>
            </div>

            <div className="px-5 py-5 border-b border-slate-100">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
                {tProfile('rubricLabel')}
              </p>
              <div className="space-y-3">
                {candidate.subscores.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-ink w-24 flex-shrink-0">{tDimensions(s.name)}</span>
                    <div className="flex-1">
                      <ScoreBar score={s.score} maxScore={s.maxScore} color={s.color} height={5} showLabel={true} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Inline annotation list — mobile only */}
              <div className="block lg:hidden mt-3 space-y-1.5">
                {candidate.subscores.map((s, i) => (
                  <div key={s.name} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: s.color }} />
                    <p className="text-xs text-slate-600">{candidate.annotations[i]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-success/5 border border-success/20 p-4">
                <p className="text-xs font-semibold text-success uppercase tracking-wide mb-2">
                  {tProfile('strengthsLabel')}
                </p>
                <ul className="space-y-1.5">
                  {candidate.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-slate-600">• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-amber/5 border border-amber/20 p-4">
                <p className="text-xs font-semibold text-amber uppercase tracking-wide mb-2">{tProfile('risksLabel')}</p>
                <ul className="space-y-1.5">
                  {candidate.risks.map((r, i) => (
                    <li key={i} className="text-xs text-slate-600">• {r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { scaleIn, defaultTransition } from '@/lib/animations'
import ScoreBar from './ScoreBar'
import type { Dimension } from '@/lib/constants'
import { useTranslations } from '@/lib/i18n'

interface DimensionCardProps {
  dimension: Dimension
}

export default function DimensionCard({ dimension }: DimensionCardProps) {
  const t = useTranslations('dimensions')

  return (
    <motion.div
      variants={scaleIn}
      transition={defaultTransition}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 relative overflow-hidden"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ backgroundColor: dimension.color }}
      />
      <div className="pl-2">
        <h3 className="font-bold text-ink text-lg mb-1">{t(dimension.name)}</h3>
        <p className="text-sm text-muted mb-4">{t(dimension.description)}</p>
        <ScoreBar
          score={dimension.score}
          maxScore={dimension.maxScore}
          color={dimension.color}
        />
      </div>
    </motion.div>
  )
}

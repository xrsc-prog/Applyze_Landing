'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScoreBarProps {
  score: number
  maxScore?: number
  color?: string
  height?: number
  showLabel?: boolean
}

export default function ScoreBar({
  score,
  maxScore = 10,
  color = '#3B6FE8',
  height = 6,
  showLabel = true,
}: ScoreBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const percentage = (score / maxScore) * 100

  return (
    <div ref={ref} className="flex items-center gap-3 w-full">
      <div
        className="flex-1 rounded-full bg-slate-100 overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-ink w-10 text-right">
          {score}/{maxScore}
        </span>
      )}
    </div>
  )
}

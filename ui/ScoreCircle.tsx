'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'

interface ScoreCircleProps {
  score: number
  maxScore?: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  showLabel?: boolean
}

export default function ScoreCircle({
  score,
  maxScore = 100,
  size = 80,
  strokeWidth = 6,
  color,
  label,
  showLabel = true,
}: ScoreCircleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  const percentage = (score / maxScore) * 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const scoreColor =
    color ||
    (percentage >= 80 ? '#10B981' : percentage >= 60 ? '#F59E0B' : '#EF4444')

  useEffect(() => {
    if (isInView) {
      animate(motionValue, score, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      })
    }
  }, [isInView, score, motionValue])

  return (
    <div ref={ref} className="relative inline-flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />
          {/* Animated foreground */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference * (1 - percentage / 100) } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-bold text-ink"
            style={{ fontSize: size * 0.22 }}
          >
            {displayValue}
            {maxScore === 100 ? '%' : ''}
          </span>
        </div>
      </div>
      {showLabel && label && (
        <span className="text-xs text-muted text-center font-medium">{label}</span>
      )}
    </div>
  )
}

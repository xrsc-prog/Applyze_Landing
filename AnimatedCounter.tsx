'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      })
    }
  }, [isInView, value, motionValue])

  return (
    <span ref={ref} className={className}>
      <span>{displayValue}</span>
      {suffix}
    </span>
  )
}

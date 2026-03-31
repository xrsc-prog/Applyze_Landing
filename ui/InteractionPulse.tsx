'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

export default function InteractionPulse({
  children,
  className = '',
  rounded = 'rounded-2xl',
  active = true,
}: {
  children: ReactNode
  className?: string
  rounded?: string
  active?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()
  if (!active || prefersReducedMotion) return <div className={className}>{children}</div>
  return (
    <div className={`relative inline-flex ${className}`}>
      <motion.div
        className={`absolute inset-0 ${rounded} bg-primary/20 pointer-events-none`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  )
}

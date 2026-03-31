'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'

export default function FloatingDemoButton() {
  const [visible, setVisible] = useState(true)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('floatingDemo')

  useEffect(() => {
    const target = document.getElementById('demo-cv')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide when demo-cv is visible or has been passed
        setVisible(entry.boundingClientRect.top > 0)
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    document.getElementById('demo-cv')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.button
      onClick={handleClick}
      initial={prefersReducedMotion ? {} : { y: 80, opacity: 0 }}
      animate={{
        y: visible ? 0 : 80,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      transition={{ delay: visible ? 0.8 : 0, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-shadow md:bottom-8 md:right-8"
      aria-label={t('label')}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
      {t('label')}
    </motion.button>
  )
}

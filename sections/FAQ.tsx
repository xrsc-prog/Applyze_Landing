'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, defaultTransition } from '@/lib/animations'
import { FAQ_ITEMS } from '@/lib/constants'
import { useTranslations } from '@/lib/i18n'
import InteractionPulse from '@/components/ui/InteractionPulse'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [autoOpened, setAutoOpened] = useState(false)
  const [anyOpened, setAnyOpened] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('faq')

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView && !autoOpened && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        setOpenIndex(0)
        setAutoOpened(true)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isInView, autoOpened, prefersReducedMotion])

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
    setAnyOpened(true)
  }

  return (
    <section ref={sectionRef} id="faq" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={defaultTransition}
        >
          <h2 className="text-5xl font-bold text-ink mb-4">
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden"
        >
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={prefersReducedMotion ? {} : fadeUp}
              transition={defaultTransition}
            >
              {i === 0 ? (
                <>
                  <InteractionPulse rounded="rounded-xl" active={!anyOpened} className="w-full">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between px-6 py-5 min-h-[44px] text-left hover:bg-slate-50 transition-colors"
                      aria-expanded={openIndex === i}
                    >
                      <span className="font-semibold text-ink text-base pr-4">
                        {t(item.question)}
                      </span>
                      <motion.div
                        animate={openIndex === i ? { rotate: 45 } : { rotate: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </motion.div>
                    </button>
                  </InteractionPulse>
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="content"
                        initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-slate-600 leading-relaxed">{t(item.answer)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                    aria-expanded={openIndex === i}
                  >
                    <span className="font-semibold text-ink text-base pr-4">
                      {t(item.question)}
                    </span>
                    <motion.div
                      animate={openIndex === i ? { rotate: 45 } : { rotate: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"
                    >
                      <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="content"
                        initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-slate-600 leading-relaxed">{t(item.answer)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

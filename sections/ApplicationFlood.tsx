'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'
import { APP_URL } from '@/lib/constants'

const CV_CARDS = [
  { name: 'sarah_k_cv.pdf',   meta: 'Marketing Manager · 542 KB',    rotation: -6 },
  { name: 'marco_p_cv.pdf',   meta: 'Product Designer · 1.2 MB',     rotation: 3 },
  { name: 'lisa_w_cv.pdf',    meta: 'Senior Engineer · 688 KB',       rotation: -4 },
  { name: 'james_t_cv.pdf',   meta: 'Data Analyst · 445 KB',         rotation: 7 },
  { name: 'anna_b_cv.pdf',    meta: 'HR Business Partner · 892 KB',  rotation: -2 },
  { name: 'david_m_cv.pdf',   meta: 'UX Researcher · 1.1 MB',        rotation: 5 },
  { name: 'rachel_s_cv.pdf',  meta: 'Software Engineer · 768 KB',    rotation: -7 },
  { name: 'tom_h_cv.pdf',     meta: 'Project Manager · 523 KB',      rotation: 4 },
]

export default function ApplicationFlood() {
  const t = useTranslations('applicationFlood')
  const prefersReducedMotion = useReducedMotion()
  const pileRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(pileRef, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-danger/80 mb-6 px-3 py-1 bg-danger/8 rounded-full border border-danger/20">
            {t('eyebrow')}
          </span>

          {/* Giant counter */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[10rem] lg:text-[14rem] font-black text-ink leading-none mb-2 tabular-nums"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            247
          </motion.div>
          <p className="text-2xl font-semibold text-muted mb-12">{t('counterLabel')}</p>

          {/* 3 sub-stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
            {[
              { value: t('stat1Value'), label: t('stat1Label'), icon: 'clock' },
              { value: t('stat2Value'), label: t('stat2Label'), icon: 'eye' },
              { value: t('stat3Value'), label: t('stat3Label'), icon: 'calendar' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center"
              >
                <div className="flex justify-center mb-3">
                  {stat.icon === 'clock' && (
                    <div className="w-9 h-9 rounded-xl bg-amber/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  {stat.icon === 'eye' && (
                    <div className="w-9 h-9 rounded-xl bg-danger/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </div>
                  )}
                  {stat.icon === 'calendar' && (
                    <div className="w-9 h-9 rounded-xl bg-slate-200/80 flex items-center justify-center">
                      <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-extrabold text-ink mb-1">{stat.value}</p>
                <p className="text-xs text-muted leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CV Pile animation */}
        <div className="flex justify-center mb-20">
          <div ref={pileRef} className="relative w-72 h-52">
            {/* Inbox tray behind the pile */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-12 rounded-b-2xl bg-slate-300/40 border-b-4 border-x-4 border-slate-300" />

            {/* Stacked CV cards */}
            {CV_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? {} : { y: -120, opacity: 0 }}
                animate={isInView ? { y: -(i * 3), opacity: 1 } : { y: -120, opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : i * 0.1,
                  ease: [0.2, 0.8, 0.4, 1],
                }}
                style={{ rotate: card.rotation, zIndex: i }}
                className="absolute left-1/2 bottom-8 -translate-x-1/2 w-56 bg-white rounded-xl shadow-md border border-slate-200 px-4 py-3 flex items-center gap-3"
              >
                <div className="w-7 h-9 rounded bg-red-500 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                  PDF
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink truncate">{card.name}</p>
                  <p className="text-[10px] text-muted truncate">{card.meta}</p>
                </div>
              </motion.div>
            ))}

            {/* Inbox badge counter */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.0, type: 'spring', stiffness: 300 }}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-danger flex items-center justify-center shadow-lg z-20"
            >
              <span className="text-white text-xs font-black">247</span>
            </motion.div>
          </div>
        </div>

        {/* Pivot: "There is a better way." */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-12" />
          <h2 className="text-5xl lg:text-6xl font-extrabold text-ink mb-5">
            {t('pivotTitle')}
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            {t('pivotSub')}
          </p>
          <a
            href={APP_URL}
            className="inline-flex items-center px-8 py-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-blue-600 transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5"
          >
            {t('cta')}
          </a>
        </motion.div>

      </div>
    </section>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { APP_URL } from '@/lib/constants'
import { useTranslations, useLocale, LOCALE_LABELS, type Locale } from '@/lib/i18n'

const NAV_KEYS = ['features', 'howItWorks', 'pricing', 'faq'] as const
const NAV_HREFS = ['/#features', '/#how-it-works', '/#pricing', '/#faq']

function LanguageSelector() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const locales = Object.keys(LOCALE_LABELS) as Locale[]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-medium text-ink"
        aria-label="Select language"
      >
        <span>{LOCALE_LABELS[locale].flag}</span>
        <span className="hidden sm:inline">{LOCALE_LABELS[locale].label}</span>
        <svg
          className={`w-3.5 h-3.5 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50 min-w-[96px]"
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => { setLocale(l); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 ${
                  l === locale ? 'text-primary bg-blue-50' : 'text-ink'
                }`}
              >
                <span>{LOCALE_LABELS[l].flag}</span>
                <span>{LOCALE_LABELS[l].label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-ink tracking-tight">Applyze</span>
          </div>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_KEYS.map((key, i) => (
            <Link
              key={key}
              href={NAV_HREFS[i]}
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Right: Language selector + GDPR badge + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />

          {/* GDPR badge */}
          <motion.div
            onClick={() => document.getElementById('gdpr')?.scrollIntoView({ behavior: 'smooth' })}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            title={t('gdprTooltip')}
          >
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-semibold text-emerald-700">GDPR</span>
          </motion.div>

          <a
            href={APP_URL}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-md py-4 px-6"
          >
            <div className="flex flex-col mb-4">
              {NAV_KEYS.map((key, i) => (
                <Link
                  key={key}
                  href={NAV_HREFS[i]}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium text-ink hover:text-primary transition-colors border-b border-slate-100 last:border-0"
                >
                  {t(key)}
                </Link>
              ))}
            </div>
            <div className="mb-4">
              <LanguageSelector />
            </div>
            <a
              href={APP_URL}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-600 transition-colors"
            >
              {t('cta')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

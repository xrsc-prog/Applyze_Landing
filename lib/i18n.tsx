'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from '@/messages/en.json'
import de from '@/messages/de.json'
import fr from '@/messages/fr.json'
import es from '@/messages/es.json'

export type Locale = 'en' | 'de' | 'fr' | 'es'

const MESSAGES: Record<Locale, Record<string, unknown>> = { en, de, fr, es }

export const LOCALE_LABELS: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'EN' },
  de: { flag: '🇩🇪', label: 'DE' },
  fr: { flag: '🇫🇷', label: 'FR' },
  es: { flag: '🇪🇸', label: 'ES' },
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
}

const I18nContext = createContext<I18nContextValue>({ locale: 'en', setLocale: () => {} })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('applyze-locale') as Locale | null
    if (saved && saved in MESSAGES) { setLocaleState(saved); return }
    const browser = navigator.language.slice(0, 2) as Locale
    if (browser in MESSAGES) setLocaleState(browser)
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    if (typeof window !== 'undefined') localStorage.setItem('applyze-locale', l)
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLocale() {
  return useContext(I18nContext)
}

function resolve(obj: Record<string, unknown>, path: string): string {
  const parts = path.split('.')
  let cur: unknown = obj
  for (const p of parts) {
    if (cur && typeof cur === 'object') cur = (cur as Record<string, unknown>)[p]
    else return path
  }
  return typeof cur === 'string' ? cur : path
}

export function useTranslations(namespace: string) {
  const { locale } = useContext(I18nContext)
  const messages = MESSAGES[locale]
  return (key: string): string => resolve(messages, `${namespace}.${key}`)
}

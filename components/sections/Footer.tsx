'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'

const NAV_KEYS = ['features', 'howItWorks', 'pricing', 'faq'] as const
const NAV_HREFS = ['/#features', '/#how-it-works', '/#pricing', '/#faq']

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-ink">Applyze</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">
              {t('product')}
            </h4>
            <ul className="space-y-2">
              {NAV_KEYS.map((key, i) => (
                <li key={key}>
                  <Link
                    href={NAV_HREFS[i]}
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">
              {t('legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal" className="text-sm text-muted hover:text-ink transition-colors">
                  {t('legalNotice')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted hover:text-ink transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted hover:text-ink transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <p className="text-sm text-muted text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

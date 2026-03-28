import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Applyze — AI-Powered Recruiting Intelligence',
  description:
    'Analyse CVs with AI, rank candidates by match score, and surface the people worth your time. In minutes, not days.',
  metadataBase: new URL('https://applyze.ai'),
  openGraph: {
    title: 'Applyze — AI-Powered Recruiting Intelligence',
    description:
      'Analyse CVs with AI, rank candidates by match score, and surface the people worth your time. In minutes, not days.',
    url: 'https://applyze.ai',
    siteName: 'Applyze',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-ink">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}

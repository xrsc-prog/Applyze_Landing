'use client'

import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import HowItWorks from '@/components/sections/HowItWorks'
import DemoCV from '@/components/sections/DemoCV'
import DemoDecisionRoom from '@/components/sections/DemoDecisionRoom'
import SixDimensions from '@/components/sections/SixDimensions'
import BlindMode from '@/components/sections/BlindMode'
import DecisionRoom from '@/components/sections/DecisionRoom'
import HiringIntelligence from '@/components/sections/HiringIntelligence'
import GDPRSection from '@/components/sections/GDPR'
import TrustStrip from '@/components/sections/TrustStrip'
import ATSIntegrations from '@/components/sections/ATSIntegrations'
import FAQ from '@/components/sections/FAQ'
import Pricing from '@/components/sections/Pricing'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/sections/Footer'
import FloatingDemoButton from '@/components/ui/FloatingDemoButton'
import { useTranslations } from '@/lib/i18n'

function ActDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 max-w-5xl mx-auto px-6 lg:px-8 py-6">
      <div className="flex-1 h-px bg-slate-200" />
      <span className="text-xs font-semibold text-muted uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )
}

export default function Home() {
  const t = useTranslations('page')

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <ActDivider label={t('actDividerSolution')} />
        <HowItWorks />
        <DemoCV />
        <DemoDecisionRoom />
        <ActDivider label={t('actDividerWhy')} />
        <SixDimensions />
        <BlindMode />
        <DecisionRoom />
        <HiringIntelligence />
        <ActDivider label={t('actDividerBuilt')} />
        <GDPRSection />
        <TrustStrip />
        <ATSIntegrations />
        <FAQ />
        <ActDivider label={t('actDividerStart')} />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingDemoButton />
    </>
  )
}

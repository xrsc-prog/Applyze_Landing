# Applyze Landing Page

Production-grade Next.js 14 landing page for [Applyze](https://applyze.ai) — AI-powered recruiting intelligence platform.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** with custom design tokens
- **Framer Motion** (scroll animations, counters)
- **Deployed on Vercel**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx        # Metadata, fonts, global styles
  page.tsx          # Main landing page
  contact/page.tsx  # Contact form
components/
  sections/         # Full-page sections
  ui/               # Reusable UI components
lib/
  animations.ts     # Framer Motion variants
  constants.ts      # Copy, pricing, dimensions data
```

## Deploy to Vercel

```bash
npx vercel
```

## Design System

| Token    | Color   | Usage                         |
|----------|---------|-------------------------------|
| primary  | #3B6FE8 | Brand blue, CTAs              |
| amber    | #F59E0B | Energy, highlights            |
| success  | #10B981 | High scores, healthy states   |
| danger   | #EF4444 | Risk scores, warnings         |
| ink      | #0F172A | Primary text                  |
| muted    | #64748B | Secondary text                |
| surface  | #F8FAFC | Alternating section background|

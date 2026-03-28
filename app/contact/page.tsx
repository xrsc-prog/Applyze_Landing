'use client'

import { useState } from 'react'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/sections/Footer'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, defaultTransition } from '@/lib/animations'

interface FormData {
  name: string
  company: string
  email: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submission:', form)
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-20 bg-surface">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              transition={defaultTransition}
              className="text-5xl font-extrabold text-ink mb-4"
            >
              Get in touch
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={defaultTransition}
              className="text-lg text-muted mb-10"
            >
              Have a question or want to explore Applyze for your team? We&apos;d
              love to hear from you.
            </motion.p>

            {submitted ? (
              <motion.div
                variants={fadeUp}
                transition={defaultTransition}
                className="bg-success/10 border border-success/20 rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-ink mb-2">Message sent!</h2>
                <p className="text-muted">We&apos;ll be in touch within 1 business day.</p>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                transition={defaultTransition}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-ink mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-ink mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      placeholder="Your company"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-ink mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    placeholder="Tell us about your recruiting needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-blue-600 transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                >
                  Send message
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

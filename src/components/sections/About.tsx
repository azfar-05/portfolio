'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GithubActivity } from '@/components/ui/GithubActivity'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function About() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <section
      id="about"
      ref={ref}
      className="border-t border-white/[0.04] px-6 py-36 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-screen-xl">

        {/* Section label */}
        <motion.div
          className="mb-16 flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
            03 / About
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-28">

          {/* Left — education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span className="mb-6 block font-mono text-[10px] tracking-[0.2em] text-slate uppercase">
              Education
            </span>

            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-chalk">
              B.Tech, Artificial Intelligence &amp; Machine Learning
            </h3>
            <p className="mt-1.5 text-[14px] text-silver">
              NMAM Institute of Technology
            </p>

            <dl className="mt-7 max-w-xs">
              <div className="flex items-baseline justify-between border-t border-white/[0.05] py-2.5">
                <dt className="font-mono text-[9px] tracking-[0.2em] text-ghost uppercase">Period</dt>
                <dd className="font-mono text-[11px] text-silver/80">2024 — 2028</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-white/[0.05] py-2.5">
                <dt className="font-mono text-[9px] tracking-[0.2em] text-ghost uppercase">CGPA</dt>
                <dd className="font-mono text-[11px] text-silver/80">9.70 / 10</dd>
              </div>
            </dl>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <div className="space-y-5 text-[15px] leading-[1.82]">
              <p className="text-silver">
                I&apos;m Mohammad Azfar — a B.Tech student in AI &amp; Machine
                Learning at NMAM Institute of Technology, two years in. My
                projects keep orbiting one question: what does it take to
                understand why software fails?
              </p>
              <p className="text-silver/80">
                That thread runs from CauseTrace&apos;s deterministic commit
                ranking, to SEFI&apos;s pipeline failure analytics, to ML models
                that predict machine breakdowns before they happen. Along the
                way I shipped real software for a real client — and learned
                that the unglamorous parts, the schemas and migrations and
                admin tooling, are where systems earn trust.
              </p>
              <p className="text-silver/60">
                Currently digging into retrieval-augmented generation and the
                widening space where LLM reasoning meets engineering workflows.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-7">
              <a
                href="#contact"
                className="rounded-sm border border-white/[0.10] px-5 py-2.5 font-mono text-[11px] tracking-[0.15em] text-chalk uppercase transition-colors duration-200 hover:border-white/[0.25]"
              >
                Get in touch
              </a>
              <a
                href="https://github.com/azfar-05"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.15em] text-slate uppercase transition-colors duration-200 hover:text-silver"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* Activity strip */}
        <div className="mt-24">
          <GithubActivity />
        </div>
      </div>
    </section>
  )
}

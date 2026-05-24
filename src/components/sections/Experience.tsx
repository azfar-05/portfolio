'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '@/lib/data/experience'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const FOCUS_AREAS = [
  'CI/CD failure analysis and debugging tooling',
  'AI-assisted engineering workflows',
  'Machine learning applied to system behaviour',
  'Developer tooling and infrastructure',
]

export function Experience() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const edu = experience[0]

  return (
    <section
      ref={ref}
      className="border-t border-white/[0.04] px-6 py-36 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-screen-xl">

        <motion.div
          className="mb-16 flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
            04 / Background
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-28">

          {/* Left: education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="mb-6 block font-mono text-[10px] tracking-[0.2em] text-slate uppercase">
              Education
            </span>

            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-chalk">
              {edu.role}
            </h3>
            <p className="mt-1.5 text-[14px] text-silver">{edu.org}</p>
            <span className="mt-4 block font-mono text-[10px] tracking-[0.18em] text-slate uppercase">
              {edu.period}
            </span>
          </motion.div>

          {/* Right: current focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span className="mb-6 block font-mono text-[10px] tracking-[0.2em] text-slate uppercase">
              Currently building around
            </span>

            <ul className="space-y-4">
              {FOCUS_AREAS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.07, ease: EASE }}
                  className="flex items-start gap-3 text-[14px] text-silver/80"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-ghost">→</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

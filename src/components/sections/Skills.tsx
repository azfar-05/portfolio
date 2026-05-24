'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/lib/data/skills'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function Skills() {
  const ref        = useRef<HTMLElement>(null)
  const inView     = useInView(ref, { once: true, margin: '-10% 0px' })
  const categories = Object.entries(skills)

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
            05 / Stack
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        {/* Framing statement */}
        <motion.p
          className="mb-14 max-w-lg text-[14px] leading-[1.78] text-silver/65"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        >
          Primarily working in Python and TypeScript. Building full-stack with Next.js,
          exploring ML tooling through project work, and leaning into AI-assisted
          development workflows.
        </motion.p>

        {/* Editorial stack rows */}
        <div className="space-y-0">
          {categories.map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.07, ease: EASE }}
              className="grid grid-cols-1 items-baseline gap-4 border-t border-white/[0.04] py-6 md:grid-cols-[160px_1fr] md:gap-12"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-slate uppercase">
                {category}
              </span>

              <div className="flex flex-wrap gap-x-7 gap-y-2">
                {items.map((skill) => (
                  <span key={skill} className="text-[14px] text-silver">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

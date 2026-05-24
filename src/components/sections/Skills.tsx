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

        {/* Section label */}
        <motion.div
          className="mb-16 flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
            05 / Capabilities
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        {/* Capability grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-slate uppercase block mb-5">
                {category}
              </span>

              <ul className="space-y-2.5">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-[13px] text-silver/65"
                  >
                    <span className="h-px w-3 shrink-0 bg-ghost" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

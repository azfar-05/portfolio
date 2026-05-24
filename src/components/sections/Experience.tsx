'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '@/lib/data/experience'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function Experience() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

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
            04 / Journey
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-xl">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              className="relative border-l border-white/[0.06] pl-7 pb-12 last:pb-0"
            >
              {/* Timeline node */}
              <div className="absolute -left-[3px] top-1.5 h-[5px] w-[5px] rounded-full bg-ghost ring-2 ring-canvas" />

              <span className="font-mono text-[10px] tracking-[0.18em] text-slate uppercase block mb-2">
                {item.period}
              </span>

              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-chalk mb-0.5">
                {item.role}
              </h3>
              <span className="text-[13px] text-silver block mb-3">{item.org}</span>

              <p className="text-[13px] leading-[1.72] text-silver/55">
                {item.description}
              </p>

              {item.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-wider text-ghost border border-white/[0.04] px-2.5 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

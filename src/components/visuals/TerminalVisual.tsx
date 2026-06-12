'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * CauseTrace terminal — output mirrors the real example from the project
 * README (flask regression eca5fd1, signal-by-signal score breakdown).
 */
export function TerminalVisual() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  const row = (delay: number) => ({
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : {},
    transition: { duration: 0.4, delay, ease: EASE },
  })

  return (
    <div
      ref={ref}
      className="rounded border border-white/[0.07] bg-panel p-5 font-mono text-[11px] leading-[1.7] md:p-6"
    >
      {/* Title bar */}
      <div className="mb-5 flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-white/[0.10]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.10]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.10]" />
        <span className="ml-2 truncate text-[10px] text-ghost">causetrace</span>
      </div>

      <div className="space-y-1 text-slate">
        <motion.div {...row(0.1)} className="text-silver">
          <span className="text-ghost">$</span> causetrace --repo flask --good e71a5ff8 --bad 025589ee
        </motion.div>

        <motion.div {...row(0.35)} className="flex items-center gap-2 py-1">
          <span className="text-ghost">›</span>
          <span className="text-[10px]">scoring commit window</span>
          <div className="h-px flex-1 overflow-hidden bg-white/[0.06]">
            <motion.div
              className="h-full bg-white/[0.28]"
              initial={{ width: '0%' }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1.3, delay: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Top candidate — real benchmark output */}
        <motion.div {...row(0.9)} className="pt-2">
          <div className="flex justify-between text-chalk/85">
            <span>#1&nbsp;&nbsp;eca5fd1&nbsp;&nbsp;redirect defaults to 303</span>
            <span className="text-chalk">27.60</span>
          </div>
        </motion.div>

        <motion.div {...row(1.05)} className="space-y-0.5 pl-4 text-[10px]">
          <div className="flex justify-between text-chalk/55">
            <span>✓ file&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;helpers.py</span>
            <span>+7.0</span>
          </div>
          <div className="flex justify-between text-chalk/55">
            <span>✓ line&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Δ=0 · changed 242, failure 242</span>
            <span>+10.0</span>
          </div>
          <div className="flex justify-between text-chalk/55">
            <span>✓ function&nbsp;&nbsp;redirect()</span>
            <span>+8.0</span>
          </div>
          <div className="flex justify-between text-ghost">
            <span>&nbsp;&nbsp;recency&nbsp;&nbsp;&nbsp;5.0 / 5.0</span>
            <span>+5.0</span>
          </div>
          <div className="flex justify-between text-ghost">
            <span>&nbsp;&nbsp;size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 files changed</span>
            <span>−2.4</span>
          </div>
        </motion.div>

        <motion.div
          {...row(1.3)}
          className="mt-3 flex flex-wrap justify-between gap-2 border-t border-white/[0.05] pt-3 text-[10px]"
        >
          <span className="text-ghost">benchmark</span>
          <span className="text-chalk/60">12/12 top-1 · real regressions</span>
        </motion.div>
      </div>
    </div>
  )
}

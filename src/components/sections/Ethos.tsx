'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function Ethos() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <section
      id="ethos"
      ref={ref}
      className="border-t border-white/[0.04] px-6 py-36 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-screen-xl">

        {/* Section label */}
        <motion.div
          className="mb-20 flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
            01 / Ethos
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        {/* Statement */}
        <div className="max-w-5xl">
          <AnimatedText className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-chalk">
            Software fails
          </AnimatedText>
          <AnimatedText delay={0.09} className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-chalk/30">
            in interesting ways.
          </AnimatedText>
        </div>

        {/* Supporting copy — offset right, editorial */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
          <div className="hidden lg:block" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
          >
            <p className="max-w-md text-[15px] leading-[1.85] text-silver">
              Most tooling tells you what broke. The better question is why —
              which commit, which assumption, which moment a system started
              disagreeing with itself. That&apos;s the problem space I keep
              returning to: failure investigation, explainable systems, tools
              that make engineers faster.
            </p>
            <p className="mt-6 font-mono text-[12px] tracking-[0.04em] text-slate">
              Two years in. Compounding.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

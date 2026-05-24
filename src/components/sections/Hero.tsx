'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const
const BASE  = 0.4
const GAP   = 0.08

function ClipReveal({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '112%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const contentY  = useTransform(scrollYProgress, [0, 1], [0, 130])
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen flex-col overflow-hidden bg-canvas px-6 md:px-10 lg:px-16"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[70vh] w-[55vw]"
        aria-hidden
      >
        <div className="absolute right-[-15%] top-[-15%] h-full w-full rounded-full bg-signal opacity-[0.04] blur-[140px]" />
      </div>

      {/* Document marker */}
      <motion.div
        className="relative z-10 pt-[5.5rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.4 }}
      >
        <span className="font-mono text-[10px] tracking-[0.22em] text-ghost uppercase">
          Portfolio&nbsp;/&nbsp;2026
        </span>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 mt-auto pb-16"
        style={{ y: contentY, opacity: contentOp }}
      >
        {/* Role label */}
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: BASE, ease: EASE }}
        >
          <div className="h-px w-7 bg-slate" />
          <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
            AI / ML Engineering Student
          </span>
        </motion.div>

        {/* Name + tagline — editorial two-column at desktop */}
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">

          {/* Left: name */}
          <div>
            <ClipReveal delay={BASE + GAP}>
              <h1 className="text-[clamp(4.5rem,12.5vw,16rem)] font-bold leading-[0.86] tracking-[-0.03em] text-chalk">
                Mohammad
              </h1>
            </ClipReveal>

            <ClipReveal delay={BASE + GAP * 2}>
              <h1 className="text-[clamp(4.5rem,12.5vw,16rem)] font-bold leading-[0.86] tracking-[-0.03em] text-chalk/25">
                Azfar
              </h1>
            </ClipReveal>
          </div>

          {/* Right: tagline block — anchors to the name baseline at desktop */}
          <motion.div
            className="lg:pb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: BASE + GAP * 4, ease: EASE }}
          >
            <p className="max-w-sm text-[15px] leading-[1.78] text-silver">
              Building AI-assisted tools and systems — focused on
              debugging, engineering workflows, and intelligent automation.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom hairline */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-white/[0.05]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
      />
    </section>
  )
}

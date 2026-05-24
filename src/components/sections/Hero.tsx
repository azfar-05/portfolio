'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [time, setTime]   = useState('')
  const containerRef      = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const contentY  = useTransform(scrollYProgress, [0, 1], [0, 130])
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTime(
        d.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen flex-col overflow-hidden bg-canvas px-6 md:px-10 lg:px-16"
    >
      {/* Subtle upper-right ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[70vh] w-[55vw]"
        aria-hidden
      >
        <div className="absolute right-[-15%] top-[-15%] h-full w-full rounded-full bg-signal opacity-[0.04] blur-[140px]" />
      </div>

      {/* Status bar */}
      <motion.div
        className="relative z-10 flex items-center justify-between pt-[5.5rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.5 }}
      >
        <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
          Portfolio &nbsp;/&nbsp; 2025
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-slate tabular-nums">
          {time}
        </span>
      </motion.div>

      {/* Main content — parallaxes up on scroll */}
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
            AI / ML Engineer
          </span>
        </motion.div>

        {/* Name */}
        <ClipReveal delay={BASE + GAP}>
          <h1 className="text-[clamp(4.5rem,12.5vw,16rem)] font-bold leading-[0.86] tracking-[-0.03em] text-chalk">
            AZFAR
          </h1>
        </ClipReveal>

        <ClipReveal delay={BASE + GAP * 2}>
          <h1 className="text-[clamp(4.5rem,12.5vw,16rem)] font-bold leading-[0.86] tracking-[-0.03em] text-chalk/18">
            HAMEED
          </h1>
        </ClipReveal>

        {/* Tagline + scroll indicator */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            className="max-w-xs text-[13px] leading-[1.8] text-silver"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: BASE + GAP * 4, ease: EASE }}
          >
            Building at the intersection of machine learning
            <br className="hidden sm:block" />
            and systems engineering.
          </motion.p>

          <motion.div
            className="flex items-end gap-3 text-slate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: BASE + GAP * 5 }}
          >
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase">Scroll</span>
            <motion.div
              className="mb-0.5 h-7 w-px bg-slate/50"
              animate={{ scaleY: [1, 0.25, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom hairline — sweeps in from left */}
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

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/** Abstract monochrome vignette of the HAP storefront — structure, not screenshot. */
export function StorefrontVisual() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: EASE },
  })

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded border border-white/[0.07] bg-panel"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.05] px-5 py-3">
        <div className="h-2 w-2 rounded-full bg-white/[0.10]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.10]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.10]" />
        <div className="ml-3 h-4 w-36 rounded-sm bg-white/[0.04]" />
      </div>

      <div className="p-5 md:p-6">
        {/* Storefront nav */}
        <motion.div {...reveal(0.1)} className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[12px] tracking-[0.3em] text-chalk/80">HAP</span>
          <div className="flex gap-3">
            <div className="h-1.5 w-8 rounded-full bg-white/[0.08]" />
            <div className="h-1.5 w-8 rounded-full bg-white/[0.08]" />
            <div className="h-1.5 w-8 rounded-full bg-white/[0.08]" />
          </div>
        </motion.div>

        {/* Hero band */}
        <motion.div
          {...reveal(0.22)}
          className="mb-4 flex h-20 items-end rounded-sm bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-3 md:h-24"
        >
          <div className="space-y-1.5">
            <div className="h-2 w-32 rounded-full bg-white/[0.16]" />
            <div className="h-1.5 w-20 rounded-full bg-white/[0.07]" />
          </div>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} {...reveal(0.34 + i * 0.08)}>
              <div
                className="mb-2 aspect-[4/5] rounded-sm bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
              />
              <div className="h-1.5 w-3/4 rounded-full bg-white/[0.09]" />
              <div className="mt-1 h-1.5 w-1/3 rounded-full bg-white/[0.05]" />
            </motion.div>
          ))}
        </div>

        {/* WhatsApp inquiry hint */}
        <motion.div
          {...reveal(0.66)}
          className="mt-5 flex items-center justify-between rounded-sm border border-white/[0.06] px-3.5 py-2.5"
        >
          <span className="font-mono text-[9px] tracking-[0.16em] text-slate uppercase">
            Inquire via WhatsApp
          </span>
          <span className="text-[11px] text-ghost">→</span>
        </motion.div>
      </div>
    </div>
  )
}

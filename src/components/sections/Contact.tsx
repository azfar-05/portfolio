'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const CHANNELS = [
  {
    label: 'Email',
    value: 'azfarhameed2005@gmail.com',
    href: 'mailto:azfarhameed2005@gmail.com',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'azfar-05',
    href: 'https://github.com/azfar-05',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'azfar05',
    href: 'https://linkedin.com/in/azfar05',
    external: true,
  },
]

export function Contact() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="contact"
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
            05 / Contact
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-24">

          {/* Left: closing statement */}
          <div>
            <AnimatedText className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-chalk">
              Open to internships
            </AnimatedText>
            <AnimatedText delay={0.09} className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-chalk/32">
              and what comes next.
            </AnimatedText>

            <motion.p
              className="mt-10 max-w-sm text-[14px] leading-[1.78] text-silver/60"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
            >
              Second-year B.Tech student at NMAMIT, building toward roles at the
              intersection of ML and developer tooling.
            </motion.p>
          </div>

          {/* Right: three channels, equal weight */}
          <motion.div
            className="lg:pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
          >
            <div>
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-baseline justify-between gap-6 border-t border-white/[0.06] py-5 last:border-b last:border-white/[0.06]"
                >
                  <span className="font-mono text-[9px] tracking-[0.22em] text-ghost uppercase transition-colors duration-200 group-hover:text-slate">
                    {c.label}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span className="text-[14px] text-silver transition-colors duration-200 group-hover:text-chalk">
                      {c.value}
                    </span>
                    <span className="inline-block text-slate transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk">
                      ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

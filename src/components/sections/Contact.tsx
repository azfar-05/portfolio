'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function Contact() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="border-t border-white/[0.04] px-6 py-44 md:px-10 lg:px-16"
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
            06 / Contact
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        <div className="max-w-3xl">
          {/* Display heading */}
          <AnimatedText className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.97] tracking-[-0.03em] text-chalk">
            Let&apos;s build
          </AnimatedText>
          <AnimatedText delay={0.1} className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.97] tracking-[-0.03em] text-chalk/20">
            something.
          </AnimatedText>

          {/* Email link */}
          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
          >
            <a
              href="mailto:azfarhameed2005@gmail.com"
              className="group inline-flex items-center gap-2.5"
            >
              <span className="text-[15px] text-silver group-hover:text-chalk transition-colors duration-200">
                azfarhameed2005@gmail.com
              </span>
              <span className="text-slate group-hover:text-chalk text-[15px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block">
                ↗
              </span>
            </a>
          </motion.div>

          {/* Social row */}
          <motion.div
            className="mt-8 flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.5, ease: EASE }}
          >
            <a
              href="https://github.com/azfar-05"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.2em] text-ghost hover:text-silver uppercase transition-colors duration-200"
            >
              GitHub ↗
            </a>
            <div className="h-3 w-px bg-ghost/40" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-ghost uppercase">
              Based Anywhere
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

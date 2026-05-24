'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function About() {
  const ref     = useRef<HTMLElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <section
      id="about"
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
            02 / About
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-28">

          {/* Left — display headline */}
          <div>
            <AnimatedText className="text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.0] tracking-[-0.025em] text-chalk">
              Engineer by
            </AnimatedText>
            <AnimatedText delay={0.07} className="text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.0] tracking-[-0.025em] text-chalk">
              instinct.
            </AnimatedText>
            <AnimatedText delay={0.16} className="text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.0] tracking-[-0.025em] text-chalk/20">
              Builder by
            </AnimatedText>
            <AnimatedText delay={0.22} className="text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.0] tracking-[-0.025em] text-chalk/20">
              obsession.
            </AnimatedText>
          </div>

          {/* Right — body copy */}
          <motion.div
            className="lg:pt-14"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <div className="space-y-5 text-[15px] leading-[1.78]">
              <p className="text-silver">
                I&apos;m Azfar — an AI/ML engineering student with a deep focus on systems that work
                at scale, under pressure, without excuses.
              </p>
              <p className="text-silver/65">
                My work lives at the intersection of machine learning infrastructure, distributed
                systems, and developer tooling. I&apos;m drawn to the hardest engineering problems:
                training at scale, inference optimization, consensus algorithms, and the
                infrastructure that makes ambitious AI systems actually possible.
              </p>
              <p className="text-silver/40">
                I believe great systems engineering is invisible. It just works. That standard
                drives every decision I make.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-7">
              <a
                href="#contact"
                className="font-mono text-[11px] tracking-[0.15em] text-chalk border border-white/[0.10] hover:border-white/[0.22] px-5 py-2.5 rounded-sm uppercase transition-colors duration-200"
              >
                Get in touch
              </a>
              <a
                href="https://github.com/azfar-05"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.15em] text-slate hover:text-silver uppercase transition-colors duration-200"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

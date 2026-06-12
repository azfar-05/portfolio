'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { featured, compact, type FeaturedProject, type CompactProject } from '@/lib/data/projects'
import { TerminalVisual } from '@/components/visuals/TerminalVisual'
import { StorefrontVisual } from '@/components/visuals/StorefrontVisual'
import { cn } from '@/lib/utils'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/* ─── Featured case study ──────────────────────────────────────── */
function FeaturedCase({
  project,
  flip,
}: {
  project: FeaturedProject
  flip: boolean
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <div ref={ref} className="border-t border-white/[0.05] py-20 first:border-t-0 first:pt-0 md:py-24">

      {/* Case header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] text-ghost">{project.id}</span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
              {project.label}
            </span>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-slate uppercase transition-colors duration-200 hover:text-chalk"
          >
            GitHub&nbsp;↗
          </a>
        </div>

        <h3 className="text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[1.0] tracking-[-0.03em] text-chalk">
          {project.name}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-[1.6] text-silver">
          {project.tagline}
        </p>
      </motion.div>

      {/* Body — narrative | visual+facts, alternating sides */}
      <div
        className={cn(
          'mt-12 grid grid-cols-1 gap-12 lg:gap-20',
          flip ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.15fr_1fr]'
        )}
      >
        {/* Narrative */}
        <motion.div
          className={cn(flip && 'lg:order-2')}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <div className="space-y-5">
            {project.narrative.map((para, i) => (
              <p
                key={i}
                className={cn(
                  'text-[14px] leading-[1.85]',
                  i === 0 ? 'text-silver' : 'text-silver/75'
                )}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-white/[0.07] px-2.5 py-1 font-mono text-[10px] tracking-wider text-slate"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Visual + facts */}
        <motion.div
          className={cn(flip && 'lg:order-1')}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
        >
          {project.visual === 'terminal' ? <TerminalVisual /> : <StorefrontVisual />}

          <dl className="mt-6">
            {project.facts.map((f) => (
              <div
                key={f.term}
                className="flex items-baseline justify-between gap-6 border-t border-white/[0.05] py-2.5 first:border-t-0"
              >
                <dt className="shrink-0 font-mono text-[9px] tracking-[0.2em] text-ghost uppercase">
                  {f.term}
                </dt>
                <dd className="text-right text-[12px] text-silver/80">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Compact project row ──────────────────────────────────────── */
function CompactRow({ project, index }: { project: CompactProject; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-4% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: EASE }}
      className="border-t border-white/[0.05]"
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-1 gap-4 py-8 md:grid-cols-[minmax(220px,1fr)_1.6fr_auto] md:gap-12"
      >
        {/* Name */}
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] text-ghost">{project.id}</span>
            <span className="text-[16px] font-semibold tracking-[-0.01em] text-chalk/85 transition-colors duration-200 group-hover:text-chalk">
              {project.name}
            </span>
          </div>
          <span className="mt-1 block pl-7 text-[12px] text-slate transition-colors duration-200 group-hover:text-silver md:pl-7">
            {project.tagline}
          </span>
        </div>

        {/* Detail */}
        <p className="text-[13px] leading-[1.75] text-silver/65 transition-colors duration-200 group-hover:text-silver/85">
          {project.detail}
        </p>

        {/* Meta */}
        <div className="flex items-baseline gap-4 md:flex-col md:items-end md:gap-2">
          <span className="whitespace-nowrap font-mono text-[11px] text-ghost transition-colors duration-200 group-hover:text-chalk">
            {project.year}&nbsp;↗
          </span>
          <span className="font-mono text-[9px] tracking-wider text-ghost/80">
            {project.tech.slice(0, 2).join(' · ')}
          </span>
        </div>
      </a>
    </motion.div>
  )
}

/* ─── Section ──────────────────────────────────────────────────── */
export function Projects() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="projects"
      ref={ref}
      className="border-t border-white/[0.04] px-6 py-36 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-screen-xl">

        <motion.div
          className="mb-20 flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-slate uppercase">
            02 / Work
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        {featured.map((p, i) => (
          <FeaturedCase key={p.id} project={p} flip={i % 2 === 1} />
        ))}

        <div className="mt-4 border-b border-white/[0.05]">
          {compact.map((p, i) => (
            <CompactRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

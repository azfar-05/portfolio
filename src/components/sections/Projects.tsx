'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects, type Project } from '@/lib/data/projects'
import { cn } from '@/lib/utils'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/* ─── Terminal animation inside the featured card ─────────────── */
function TerminalBlock() {
  return (
    <div className="rounded border border-white/[0.06] bg-panel p-5 font-mono text-[11px] leading-[1.65]">
      {/* Window chrome */}
      <div className="mb-4 flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <span className="ml-2 text-[10px] text-ghost">nexus triage ––run CI-2847</span>
      </div>

      {/* Output lines */}
      <div className="space-y-1 text-slate">
        <div>
          <span className="text-signal/50">›</span>
          {' '}Ingesting 312 commits across 4 services
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-signal/50">›</span>
          <div className="h-1 flex-1 rounded-sm bg-ghost overflow-hidden">
            <motion.div
              className="h-full rounded-sm bg-signal/35"
              initial={{ width: '0%' }}
              animate={{ width: '78%' }}
              transition={{ duration: 2.2, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="text-ghost">78%</span>
        </div>

        {/* Results */}
        <div className="pt-1.5 space-y-0.5">
          <div className="flex justify-between">
            <span className="text-ghost">Candidates identified</span>
            <span className="text-silver/60">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ghost">Root cause confidence</span>
            <span className="text-signal/70">94.2%</span>
          </div>
        </div>

        {/* Finding */}
        <div className="pt-2 border-t border-white/[0.05]">
          <div className="text-chalk/45">
            <span className="text-[#4ade80]/50">✓</span>
            {' '}auth/middleware.py L247 — race condition
          </div>
          <div className="mt-0.5 pl-3.5 text-[10px] text-ghost">
            Introduced: a9b3c1 &nbsp;·&nbsp; Impacted: 8 / 12 runs
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Featured project card ────────────────────────────────────── */
function FeaturedCard({ project }: { project: Project }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE }}
      className="mb-16 rounded border border-white/[0.06] bg-panel/40 p-8 md:p-10"
    >
      {/* Card header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.22em] text-signal/70 uppercase">
            Featured Project
          </span>
          <h3 className="mt-2 text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.025em] text-chalk">
            {project.name}
          </h3>
          <p className="mt-1 text-[13px] text-silver/70">{project.tagline}</p>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 shrink-0 font-mono text-[10px] tracking-[0.15em] text-slate hover:text-chalk uppercase transition-colors duration-200"
        >
          {project.year}&nbsp;↗
        </a>
      </div>

      {/* Two-column: description + terminal */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-[13.5px] leading-[1.8] text-silver/70 mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-wider text-slate border border-white/[0.06] px-2.5 py-1 rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <TerminalBlock />
      </div>
    </motion.div>
  )
}

/* ─── Single project row ───────────────────────────────────────── */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-4% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: EASE }}
      className="border-t border-white/[0.05]"
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between py-7 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left: index + name + tagline */}
        <div className="flex items-baseline gap-6 md:gap-10">
          <span
            className={cn(
              'font-mono text-[11px] tracking-wider transition-colors duration-300',
              hovered ? 'text-signal' : 'text-ghost'
            )}
          >
            {project.id}
          </span>

          <div>
            <span
              className={cn(
                'block text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200',
                hovered ? 'text-chalk' : 'text-chalk/65'
              )}
            >
              {project.name}
            </span>
            <span
              className={cn(
                'block text-[12px] mt-0.5 transition-colors duration-200',
                hovered ? 'text-silver' : 'text-slate'
              )}
            >
              {project.tagline}
            </span>
          </div>
        </div>

        {/* Right: tech tags (hover reveal) + year + arrow */}
        <div className="flex items-center gap-5">
          <div
            className={cn(
              'hidden md:flex flex-wrap gap-1.5 max-w-[260px] justify-end transition-opacity duration-200',
              hovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] tracking-wider text-slate border border-white/[0.05] px-2 py-0.5 rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>

          <span
            className={cn(
              'font-mono text-[11px] transition-colors duration-200 whitespace-nowrap',
              hovered ? 'text-chalk' : 'text-ghost'
            )}
          >
            {project.year}&nbsp;↗
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

  const featured = projects[0]
  const rest     = projects.slice(1)

  return (
    <section
      id="projects"
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
            03 / Work
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

        <FeaturedCard project={featured} />

        <div className="border-b border-white/[0.05]">
          {rest.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

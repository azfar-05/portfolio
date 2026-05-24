'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects, type Project } from '@/lib/data/projects'
import { cn } from '@/lib/utils'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/* ─── Terminal — CauseTrace causal chain output ────────────────── */
function TerminalBlock() {
  return (
    <div className="rounded border border-white/[0.06] bg-panel p-5 font-mono text-[11px] leading-[1.65]">
      <div className="mb-4 flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <span className="ml-2 text-[10px] text-ghost">causetrace run ./build-failure-0521</span>
      </div>

      <div className="space-y-1.5 text-slate">
        <div>
          <span className="text-signal/50">›</span>
          {' '}Parsing 847 log lines
        </div>

        <div className="flex items-center gap-2">
          <span className="text-signal/50">›</span>
          <div className="h-px flex-1 overflow-hidden bg-ghost">
            <motion.div
              className="h-full bg-signal/40"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, delay: 0.7, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Causal chain */}
        <div className="pt-2">
          <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-ghost">
            Causal chain
          </div>
          <div className="space-y-0.5">
            <div className="flex justify-between text-chalk/35">
              <span>[1] test/auth_test.go:142</span>
              <span className="text-ghost">AssertionError</span>
            </div>
            <div className="flex justify-between pl-4 text-chalk/50">
              <span>↳ auth/session.go:89</span>
              <span className="text-ghost">nil deref</span>
            </div>
            <div className="flex justify-between pl-8 text-chalk/70">
              <span>↳ db/conn.go:34</span>
              <span className="text-signal/65">likely origin</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-2">
          <div className="flex justify-between">
            <span className="text-ghost">Introduced</span>
            <span className="text-chalk/40">a8f3c1 · 3 commits ago</span>
          </div>
          <div className="mt-0.5 text-[9px] text-ghost">
            status — investigating
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
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.22em] text-signal uppercase">
            Featured Project
          </span>
          <h3 className="mt-2 text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.025em] text-chalk">
            {project.name}
          </h3>
          <p className="mt-1 text-[13px] text-silver/70">{project.tagline}</p>
        </div>

        {/* Year + link or status badge */}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 shrink-0 font-mono text-[10px] tracking-[0.15em] text-slate hover:text-chalk uppercase transition-colors duration-200"
          >
            {project.year}&nbsp;↗
          </a>
        ) : (
          <span className="mt-1 shrink-0 rounded-sm border border-white/[0.05] px-2.5 py-1 font-mono text-[9px] tracking-wider text-ghost uppercase">
            {project.status ?? project.year}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="mb-6 text-[14px] leading-[1.8] text-silver">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-white/[0.06] px-2.5 py-1 font-mono text-[10px] tracking-wider text-slate"
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

/* ─── Secondary project row ────────────────────────────────────── */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-4% 0px' })

  const inner = (
    <div
      className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 md:gap-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Index */}
      <span
        className={cn(
          'font-mono text-[11px] tracking-wider transition-colors duration-300 w-6',
          hovered ? 'text-signal' : 'text-slate'
        )}
      >
        {project.id}
      </span>

      {/* Name + tagline */}
      <div>
        <span
          className={cn(
            'block text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200',
            hovered ? 'text-chalk' : 'text-chalk/85'
          )}
        >
          {project.name}
        </span>
        <span
          className={cn(
            'mt-0.5 block text-[12px] transition-colors duration-200',
            hovered ? 'text-silver' : 'text-slate'
          )}
        >
          {project.tagline}
        </span>
      </div>

      {/* Right: primary tech + status + year */}
      <div className="flex items-center gap-4">
        {/* Primary tech — always visible, subtly */}
        <div className="hidden gap-2 md:flex">
          {project.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              className={cn(
                'rounded-sm border px-2 py-0.5 font-mono text-[9px] tracking-wider transition-colors duration-200',
                hovered ? 'border-white/[0.07] text-slate' : 'border-white/[0.03] text-ghost'
              )}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Status badge */}
        {project.status && (
          <span className="hidden rounded-sm border border-white/[0.04] px-2 py-0.5 font-mono text-[9px] tracking-wider text-ghost md:block">
            {project.status}
          </span>
        )}

        {/* Year + arrow */}
        <span
          className={cn(
            'whitespace-nowrap font-mono text-[11px] transition-colors duration-200',
            hovered ? 'text-chalk' : 'text-ghost'
          )}
        >
          {project.year}
          {project.github && ' ↗'}
        </span>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: EASE }}
      className="border-t border-white/[0.05]"
    >
      {project.github ? (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="block">
          {inner}
        </a>
      ) : (
        <div>{inner}</div>
      )}
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

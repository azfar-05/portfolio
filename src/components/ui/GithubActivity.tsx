'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Day {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ApiResponse {
  total: { lastYear: number }
  contributions: Day[]
}

const LEVEL_OPACITY = [0.045, 0.14, 0.28, 0.5, 0.85] as const

/**
 * Live contribution graph, fetched client-side from GitHub data
 * (github-contributions-api proxy). Renders nothing if the fetch fails —
 * the section never shows stale or fabricated activity.
 */
export function GithubActivity() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  const [weeks, setWeeks] = useState<Day[][] | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetch('https://github-contributions-api.jogruber.de/v4/azfar-05?y=last')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((data: ApiResponse) => {
        if (cancelled) return
        const days = data.contributions

        // Chunk days into week columns, breaking on Sundays.
        const cols: Day[][] = []
        let col: Day[] = []
        for (const day of days) {
          if (new Date(day.date).getDay() === 0 && col.length > 0) {
            cols.push(col)
            col = []
          }
          col.push(day)
        }
        if (col.length > 0) cols.push(col)

        setWeeks(cols)
        setTotal(data.total.lastYear)
      })
      .catch(() => {
        /* strip simply doesn't render */
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    /* Wrapper stays mounted so the in-view observer has a node to watch
       while the contribution data is still loading. */
    <div ref={ref}>
      {weeks && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-4 flex items-baseline justify-between">
            <span className="font-mono text-[9px] tracking-[0.22em] text-ghost uppercase">
              GitHub — last 12 months
            </span>
            <a
              href="https://github.com/azfar-05"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.1em] text-slate transition-colors duration-200 hover:text-chalk"
            >
              {total} contributions ↗
            </a>
          </div>

          {/* justify-end keeps the most recent weeks visible when narrow viewports clip the strip */}
          <div className="flex justify-end gap-[3px] overflow-hidden" aria-hidden>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex shrink-0 flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className="h-[7px] w-[7px] rounded-[1.5px]"
                    style={{ backgroundColor: `rgba(237, 237, 235, ${LEVEL_OPACITY[day.level]})` }}
                    title={`${day.date} — ${day.count}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

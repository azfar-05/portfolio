'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Work',    href: '#projects' },
  { label: 'About',   href: '#about'    },
  { label: 'Contact', href: '#contact'  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  return (
    <motion.header
      className={cn(
        'fixed inset-x-0 top-0 z-[9990] transition-[background,border-color] duration-500',
        scrolled
          ? 'bg-canvas/85 backdrop-blur-md border-b border-white/[0.04]'
          : 'bg-transparent border-b border-transparent'
      )}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        {/* Wordmark */}
        <a
          href="#"
          className="font-mono text-[11px] tracking-[0.18em] text-chalk/80 uppercase hover:text-chalk transition-colors duration-200"
        >
          AZFAR
        </a>

        {/* Links */}
        <div className="flex items-center gap-5 md:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.14em] text-slate hover:text-chalk uppercase transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://github.com/azfar-05"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[10px] tracking-[0.14em] text-slate hover:text-chalk uppercase transition-colors duration-200 border border-white/[0.07] hover:border-white/[0.16] px-3 py-1.5 rounded-sm sm:block"
          >
            GitHub&nbsp;↗
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

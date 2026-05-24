'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  external?: boolean
  onClick?: () => void
}

export function MagneticButton({ children, className, href, external = false, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width  / 2) * 0.32,
      y: (e.clientY - rect.top  - rect.height / 2) * 0.32,
    })
  }

  const onLeave = () => setPos({ x: 0, y: 0 })

  const inner = (
    <motion.div
      ref={ref}
      className={cn('inline-flex cursor-none select-none items-center justify-center', className)}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, mass: 0.5 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  return <div role="button" tabIndex={0} onClick={onClick}>{inner}</div>
}

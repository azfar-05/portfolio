'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedText({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={cn(className)}
        initial={{ y: '108%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

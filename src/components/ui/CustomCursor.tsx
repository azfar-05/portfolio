'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [visible, setVisible]   = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch, setIsTouch]   = useState(true)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const dotX  = useSpring(mx, { stiffness: 800, damping: 40 })
  const dotY  = useSpring(my, { stiffness: 800, damping: 40 })
  const ringX = useSpring(mx, { stiffness: 180, damping: 22 })
  const ringY = useSpring(my, { stiffness: 180, damping: 22 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsTouch(false)

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-cursor-hover]')
      setHovering(!!el)
    }

    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mx, my])

  if (isTouch) return null

  return (
    <>
      {/* Inner dot — tracks exactly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chalk"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      />

      {/* Outer ring — lags behind */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          width:       hovering ? 44 : 28,
          height:      hovering ? 44 : 28,
          borderColor: hovering
            ? 'rgba(240,240,238,0.55)'
            : 'rgba(240,240,238,0.22)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}

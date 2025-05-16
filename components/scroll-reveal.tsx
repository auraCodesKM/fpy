"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  threshold?: number
}

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const directionOffset = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  const initialAnimation = {
    opacity: 0,
    ...directionOffset[direction],
  }

  return (
    <motion.div
      ref={ref}
      initial={initialAnimation}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initialAnimation}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

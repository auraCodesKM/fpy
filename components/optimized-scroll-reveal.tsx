"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface OptimizedScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  threshold?: number
}

export const OptimizedScrollReveal = ({
  children,
  direction = "up",
  distance = 30,
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  threshold = 0.2,
}: OptimizedScrollRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Calculate initial offset based on direction
  const getInitialOffset = () => {
    if (direction === "none") return {}

    const offset = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
    }

    return offset[direction]
  }

  const initialAnimation = {
    opacity: 0,
    ...getInitialOffset(),
  }

  return (
    <motion.div
      ref={ref}
      initial={initialAnimation}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initialAnimation}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

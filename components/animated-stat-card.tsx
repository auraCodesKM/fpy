"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface AnimatedStatCardProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
  color?: "blue" | "teal" | "purple" | "amber" | "green" | "red"
}

export const AnimatedStatCard = ({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  color = "blue",
}: AnimatedStatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Color configurations
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-600",
    },
    teal: {
      bg: "bg-teal-50",
      border: "border-teal-100",
      text: "text-teal-600",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-600",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-600",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-600",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-600",
    },
  }

  useEffect(() => {
    if (!isInView) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      setDisplayValue(Math.floor(progress * value))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const timeoutId = setTimeout(() => {
      window.requestAnimationFrame(step)
    }, delay * 1000)

    return () => clearTimeout(timeoutId)
  }, [isInView, value, duration, delay])

  return (
    <motion.div
      ref={ref}
      className={`p-6 rounded-xl ${colors[color].bg} border ${colors[color].border}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      <motion.div
        className={`text-3xl font-bold ${colors[color].text} mb-2`}
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        viewport={{ once: true }}
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </motion.div>
      <div className="text-slate-600">{label}</div>
    </motion.div>
  )
}

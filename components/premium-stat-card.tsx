"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface PremiumStatCardProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
  color?: "blue" | "sky" | "teal" | "purple" | "amber" | "green" | "red"
  variant?: "default" | "bordered" | "elevated" | "glass"
}

export const PremiumStatCard = ({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  color = "blue",
  variant = "default",
}: PremiumStatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Card style variants
  const cardStyles = {
    default: "bg-white border border-slate-100 shadow-sm",
    bordered: `bg-white border-2 ${
      color === "blue"
        ? "border-blue-200"
        : color === "sky"
          ? "border-sky-200"
          : color === "teal"
            ? "border-teal-200"
            : color === "purple"
              ? "border-purple-200"
              : color === "amber"
                ? "border-amber-200"
                : color === "green"
                  ? "border-green-200"
                  : "border-red-200"
    } shadow-sm`,
    elevated: "bg-white border border-slate-100 shadow-md",
    glass: "bg-white/80 backdrop-blur-sm border border-slate-100/80 shadow-sm",
  }

  // Text color variants
  const textColors = {
    blue: "text-blue-600",
    sky: "text-sky-600",
    teal: "text-teal-600",
    purple: "text-purple-600",
    amber: "text-amber-600",
    green: "text-green-600",
    red: "text-red-600",
  }

  // Background color variants
  const bgColors = {
    blue: "bg-blue-50",
    sky: "bg-sky-50",
    teal: "bg-teal-50",
    purple: "bg-purple-50",
    amber: "bg-amber-50",
    green: "bg-green-50",
    red: "bg-red-50",
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
      className={`p-6 rounded-xl ${cardStyles[variant]} ${bgColors[color]} overflow-hidden relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -z-10"
        initial={{ opacity: 0, x: "-100%" }}
        whileHover={{
          opacity: 0.3,
          x: "100%",
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        }}
      />

      <motion.div
        className={`text-3xl font-bold ${textColors[color]} mb-2`}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: delay + 0.2,
        }}
        viewport={{ once: true }}
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </motion.div>

      <motion.div
        className="text-slate-700 font-medium"
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.4 }}
        viewport={{ once: true }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}

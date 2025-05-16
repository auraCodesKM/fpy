"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { AnimatedIcon } from "./animated-icon"

interface AnimatedStepProps {
  icon: ReactNode
  title: string
  description: string
  stepNumber: number
  totalSteps: number
  color?: "blue" | "teal" | "purple" | "amber" | "green" | "red"
}

export const AnimatedStep = ({
  icon,
  title,
  description,
  stepNumber,
  totalSteps,
  color = "blue",
}: AnimatedStepProps) => {
  const delay = 0.2 + (stepNumber - 1) * 0.15

  return (
    <div className="relative">
      {/* Connecting line between steps */}
      {stepNumber < totalSteps && (
        <motion.div
          className="absolute top-6 left-6 w-full h-0.5 bg-slate-200 -z-10"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        />
      )}

      <motion.div
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 hover:border-blue-100 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="absolute -top-3 -left-3 w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center text-sm font-bold"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: delay + 0.2,
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {stepNumber}
        </motion.div>

        <AnimatedIcon icon={icon} color={color} size="medium" />

        <motion.h3
          className="text-xl font-semibold mb-2 mt-4"
          initial={{ opacity: 0, x: -5 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  )
}

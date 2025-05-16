"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { PremiumAnimatedIcon } from "./premium-animated-icon"

interface PremiumStepProps {
  icon: ReactNode
  title: string
  description: string
  stepNumber: number
  totalSteps: number
  color?: "blue" | "sky" | "teal" | "purple" | "amber" | "green" | "red"
  variant?: "default" | "bordered" | "elevated" | "glass"
}

export const PremiumStep = ({
  icon,
  title,
  description,
  stepNumber,
  totalSteps,
  color = "blue",
  variant = "default",
}: PremiumStepProps) => {
  const delay = 0.2 + (stepNumber - 1) * 0.15

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

  // Badge color variants
  const badgeColors = {
    blue: "bg-blue-600",
    sky: "bg-sky-600",
    teal: "bg-teal-600",
    purple: "bg-purple-600",
    amber: "bg-amber-600",
    green: "bg-green-600",
    red: "bg-red-600",
  }

  // Line color variants
  const lineColors = {
    blue: "bg-blue-200",
    sky: "bg-sky-200",
    teal: "bg-teal-200",
    purple: "bg-purple-200",
    amber: "bg-amber-200",
    green: "bg-green-200",
    red: "bg-red-200",
  }

  return (
    <div className="relative">
      {/* Connecting line between steps */}
      {stepNumber < totalSteps && (
        <motion.div
          className={`absolute top-6 left-6 w-full h-0.5 ${lineColors[color]} -z-10`}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        />
      )}

      <motion.div
        className={`p-6 rounded-xl ${cardStyles[variant]} relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, margin: "-100px" }}
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
        {/* Step number badge */}
        <motion.div
          className={`absolute -top-3 -left-3 w-7 h-7 ${badgeColors[color]} rounded-full text-white flex items-center justify-center text-sm font-bold shadow-lg`}
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

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -z-10"
          initial={{ opacity: 0, x: "-100%" }}
          whileHover={{
            opacity: 0.2,
            x: "100%",
            transition: {
              duration: 0.8,
              ease: "easeOut",
            },
          }}
        />

        <PremiumAnimatedIcon icon={icon} color={color} />

        <motion.h3
          className={`text-xl font-semibold mb-2 mt-4 ${
            color === "blue"
              ? "text-blue-700"
              : color === "sky"
                ? "text-sky-700"
                : color === "teal"
                  ? "text-teal-700"
                  : color === "purple"
                    ? "text-purple-700"
                    : color === "amber"
                      ? "text-amber-700"
                      : color === "green"
                        ? "text-green-700"
                        : "text-red-700"
          }`}
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

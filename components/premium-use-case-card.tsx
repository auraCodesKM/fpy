"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { PremiumAnimatedIcon } from "./premium-animated-icon"

interface PremiumUseCaseCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  color?: "blue" | "sky" | "teal" | "purple" | "amber" | "green" | "red"
  variant?: "default" | "bordered" | "elevated" | "glass"
}

export const PremiumUseCaseCard = ({
  icon,
  title,
  description,
  delay = 0,
  color = "blue",
  variant = "default",
}: PremiumUseCaseCardProps) => {
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

  return (
    <motion.div
      className={`p-6 rounded-xl ${cardStyles[variant]} h-full overflow-hidden relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -8,
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
          opacity: 0.2,
          x: "100%",
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        }}
      />

      <div className="flex gap-4">
        <PremiumAnimatedIcon icon={icon} color={color} className="flex-shrink-0" />

        <div>
          <motion.h3
            className={`text-xl font-semibold mb-2 ${
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
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
            whileHover={{
              x: 5,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-slate-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

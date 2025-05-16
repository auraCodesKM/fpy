"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { PremiumAnimatedIcon } from "./premium-animated-icon"

interface PremiumFeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  index?: number
  color?: "blue" | "sky" | "teal" | "purple" | "amber" | "green" | "red"
  variant?: "default" | "bordered" | "elevated" | "glass"
}

export const PremiumFeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  index = 0,
  color = "blue",
  variant = "default",
}: PremiumFeatureCardProps) => {
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

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      x: -5,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: delay + 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Shine effect animation
  const shineVariants = {
    initial: {
      opacity: 0,
      x: "-100%",
    },
    hover: {
      opacity: 0.2,
      x: "100%",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={`p-6 rounded-xl ${cardStyles[variant]} h-full overflow-hidden relative`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -z-10"
        variants={shineVariants}
        initial="initial"
        whileHover="hover"
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
        variants={textVariants}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-slate-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

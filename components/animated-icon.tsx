"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedIconProps {
  icon: ReactNode
  color?: "blue" | "teal" | "purple" | "amber" | "green" | "red"
  size?: "small" | "medium" | "large"
  animated?: boolean
  className?: string
}

export const AnimatedIcon = ({
  icon,
  color = "blue",
  size = "medium",
  animated = true,
  className = "",
}: AnimatedIconProps) => {
  // Size configurations
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }

  // Color configurations
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "group-hover:bg-blue-200",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-600",
      hover: "group-hover:bg-teal-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "group-hover:bg-purple-200",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      hover: "group-hover:bg-amber-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "group-hover:bg-green-200",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      hover: "group-hover:bg-red-200",
    },
  }

  // Animation variants
  const containerVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: animated
      ? {
          rotate: [0, 5, 0, -5, 0],
          transition: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      : {},
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <motion.div
      className={`group ${sizes[size]} rounded-full ${colors[color].bg} ${colors[color].hover} flex items-center justify-center transition-colors duration-300 ${className}`}
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`${colors[color].text}`}
        variants={iconVariants}
        initial="initial"
        animate={animated ? "animate" : "initial"}
        whileHover="hover"
      >
        {icon}
      </motion.div>
    </motion.div>
  )
}

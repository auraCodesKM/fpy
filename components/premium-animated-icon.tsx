"use client"

import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"

interface PremiumAnimatedIconProps {
  icon: ReactNode
  color?: "blue" | "sky" | "teal" | "purple" | "amber" | "green" | "red"
  size?: "small" | "medium" | "large"
  animated?: boolean
  className?: string
  label?: string
  variant?: "circle" | "rounded" | "pill"
  intensity?: "light" | "medium" | "strong"
  interactive?: boolean
}

export const PremiumAnimatedIcon = ({
  icon,
  color = "blue",
  size = "medium",
  animated = true,
  className = "",
  label,
  variant = "circle",
  intensity = "medium",
  interactive = true,
}: PremiumAnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false)

  // Size configurations
  const sizes = {
    small: {
      container: "w-10 h-10",
      icon: "w-5 h-5",
      text: "text-xs",
    },
    medium: {
      container: "w-14 h-14",
      icon: "w-7 h-7",
      text: "text-sm",
    },
    large: {
      container: "w-20 h-20",
      icon: "w-10 h-10",
      text: "text-base",
    },
  }

  // Color configurations
  const colors = {
    blue: {
      bg: {
        light: "bg-blue-50",
        medium: "bg-blue-100",
        strong: "bg-blue-200",
      },
      text: "text-blue-600",
      border: "border-blue-200",
      glow: "from-blue-400/20 to-blue-600/20",
      hover: "group-hover:bg-blue-200",
    },
    sky: {
      bg: {
        light: "bg-sky-50",
        medium: "bg-sky-100",
        strong: "bg-sky-200",
      },
      text: "text-sky-600",
      border: "border-sky-200",
      glow: "from-sky-400/20 to-sky-600/20",
      hover: "group-hover:bg-sky-200",
    },
    teal: {
      bg: {
        light: "bg-teal-50",
        medium: "bg-teal-100",
        strong: "bg-teal-200",
      },
      text: "text-teal-600",
      border: "border-teal-200",
      glow: "from-teal-400/20 to-teal-600/20",
      hover: "group-hover:bg-teal-200",
    },
    purple: {
      bg: {
        light: "bg-purple-50",
        medium: "bg-purple-100",
        strong: "bg-purple-200",
      },
      text: "text-purple-600",
      border: "border-purple-200",
      glow: "from-purple-400/20 to-purple-600/20",
      hover: "group-hover:bg-purple-200",
    },
    amber: {
      bg: {
        light: "bg-amber-50",
        medium: "bg-amber-100",
        strong: "bg-amber-200",
      },
      text: "text-amber-600",
      border: "border-amber-200",
      glow: "from-amber-400/20 to-amber-600/20",
      hover: "group-hover:bg-amber-200",
    },
    green: {
      bg: {
        light: "bg-green-50",
        medium: "bg-green-100",
        strong: "bg-green-200",
      },
      text: "text-green-600",
      border: "border-green-200",
      glow: "from-green-400/20 to-green-600/20",
      hover: "group-hover:bg-green-200",
    },
    red: {
      bg: {
        light: "bg-red-50",
        medium: "bg-red-100",
        strong: "bg-red-200",
      },
      text: "text-red-600",
      border: "border-red-200",
      glow: "from-red-400/20 to-red-600/20",
      hover: "group-hover:bg-red-200",
    },
  }

  // Shape variants
  const shapes = {
    circle: "rounded-full",
    rounded: "rounded-xl",
    pill: "rounded-full px-2",
  }

  // Animation variants
  const containerVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    hover: interactive
      ? {
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }
      : {},
    tap: interactive
      ? {
          scale: 0.95,
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }
      : {},
  }

  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    animate: animated
      ? {
          rotate: [0, 5, 0, -5, 0],
          transition: {
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      : {},
    hover: interactive
      ? {
          scale: 1.1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }
      : {},
  }

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 1.2,
    },
    animate: animated
      ? {
          opacity: [0, 0.3, 0],
          scale: [1.2, 1.3, 1.2],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      : {},
    hover: interactive
      ? {
          opacity: 0.4,
          scale: 1.4,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }
      : {},
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`group relative ${sizes[size].container} ${shapes[variant]} ${colors[color].bg[intensity]} border ${colors[color].border} flex items-center justify-center transition-colors duration-300 ${className}`}
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => interactive && setIsHovered(true)}
        onHoverEnd={() => interactive && setIsHovered(false)}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors[color].glow} blur-md`}
          variants={glowVariants}
          initial="initial"
          animate={animated ? "animate" : "initial"}
          whileHover={isHovered ? "hover" : ""}
        />

        {/* Icon */}
        <motion.div
          className={`${sizes[size].icon} ${colors[color].text} relative z-10`}
          variants={iconVariants}
          initial="initial"
          animate={animated ? "animate" : "initial"}
          whileHover={isHovered ? "hover" : ""}
        >
          {icon}
        </motion.div>
      </motion.div>

      {label && (
        <motion.span
          className={`mt-2 ${sizes[size].text} font-medium text-slate-700`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  )
}

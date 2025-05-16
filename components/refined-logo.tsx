"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function RefinedLogo({ size = "large", darkMode = false, interactive = true }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger initial animation
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Size configurations
  const sizes = {
    small: {
      container: "w-12 h-12",
      outerRing: "w-12 h-12",
      middleRing: "w-9 h-9",
      innerCircle: "w-6 h-6",
      text: "text-lg",
      textContainer: "mt-2",
    },
    medium: {
      container: "w-20 h-20",
      outerRing: "w-20 h-20",
      middleRing: "w-15 h-15",
      innerCircle: "w-10 h-10",
      text: "text-xl",
      textContainer: "mt-3",
    },
    large: {
      container: "w-32 h-32",
      outerRing: "w-32 h-32",
      middleRing: "w-24 h-24",
      innerCircle: "w-16 h-16",
      text: "text-3xl",
      textContainer: "mt-4",
    },
  }

  const selectedSize = sizes[size]

  // Animation variants
  const containerVariants = {
    initial: { scale: 0.95 },
    animate: { scale: 1 },
    hover: interactive ? { scale: 1.05 } : {},
    animating: { scale: [0.9, 1.05, 1] },
  }

  const outerRingVariants = {
    initial: { rotate: 0, opacity: 0.7 },
    animate: {
      rotate: 360,
      opacity: 0.7,
      transition: { duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    },
    hover: interactive ? { opacity: 0.9, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : {},
    animating: { opacity: [0, 0.9, 0.7], rotate: [0, 30, 0], scale: [0.9, 1.1, 1] },
  }

  const middleRingVariants = {
    initial: { rotate: 0, opacity: 0.7 },
    animate: {
      rotate: -360,
      opacity: 0.7,
      transition: { duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    },
    hover: interactive ? { opacity: 0.9, boxShadow: "0 0 15px rgba(14, 165, 233, 0.5)" } : {},
    animating: { opacity: [0, 0.9, 0.7], rotate: [0, -45, 0], scale: [0.8, 1.15, 1] },
  }

  const innerCircleVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.9, 1],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
    hover: interactive ? { scale: 1.1, boxShadow: "0 0 25px rgba(2, 132, 199, 0.7)" } : {},
    animating: { scale: [0.7, 1.2, 1], opacity: [0, 1, 1] },
  }

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    hover: interactive ? { y: -2 } : {},
    animating: { opacity: [0, 1], y: [10, -2, 0] },
  }

  // Dynamic colors based on dark mode
  const colors = {
    outerRing: darkMode ? "#1e40af" : "#3b82f6", // blue-700 or blue-500
    middleRing: darkMode ? "#0284c7" : "#0ea5e9", // sky-700 or sky-500
    innerCircle: {
      from: darkMode ? "#0891b2" : "#06b6d4", // cyan-700 or cyan-500
      to: darkMode ? "#0d9488" : "#14b8a6", // teal-700 or teal-500
    },
    text: {
      from: darkMode ? "#2563eb" : "#3b82f6", // blue-600 or blue-500
      via: darkMode ? "#0ea5e9" : "#0ea5e9", // sky-500
      to: darkMode ? "#0d9488" : "#14b8a6", // teal-700 or teal-500
    },
    shadow: darkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`${selectedSize.container} relative`}
        variants={containerVariants}
        initial="initial"
        animate={isAnimating ? "animating" : "animate"}
        whileHover="hover"
        transition={{ duration: 0.5 }}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
      >
        {/* Outer ring */}
        <motion.div
          className={`${selectedSize.outerRing} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed`}
          style={{ borderColor: colors.outerRing }}
          variants={outerRingVariants}
          transition={{ duration: isAnimating ? 2 : 0.3 }}
        />

        {/* Middle ring */}
        <motion.div
          className={`${selectedSize.middleRing} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2`}
          style={{ borderColor: colors.middleRing }}
          variants={middleRingVariants}
          transition={{ duration: isAnimating ? 2 : 0.3, delay: isAnimating ? 0.2 : 0 }}
        />

        {/* Inner circle with gradient */}
        <motion.div
          className={`${selectedSize.innerCircle} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-lg`}
          style={{
            background: `linear-gradient(135deg, ${colors.innerCircle.from}, ${colors.innerCircle.to})`,
            boxShadow: `0 0 15px ${colors.shadow}`,
          }}
          variants={innerCircleVariants}
          transition={{ duration: isAnimating ? 2 : 0.3, delay: isAnimating ? 0.4 : 0 }}
        >
          {/* Logo symbol */}
          <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(255,255,255,0.2)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </svg>
        </motion.div>

        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : [0, 0.15, 0],
            scale: isHovered ? [0.8, 1.2, 0.8] : [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: isHovered ? 1.5 : 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${colors.shadow} 0%, rgba(255,255,255,0) 70%)`,
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Text */}
      {size === "large" && (
        <motion.div
          className={`${selectedSize.textContainer} text-center`}
          variants={textVariants}
          initial="initial"
          animate={isAnimating ? "animating" : "animate"}
          whileHover="hover"
          transition={{ duration: 0.5, delay: isAnimating ? 0.7 : 0 }}
        >
          <h2
            className={`font-bold ${selectedSize.text} bg-clip-text text-transparent`}
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.text.from}, ${colors.text.via}, ${colors.text.to})`,
            }}
          >
            FusionPay
          </h2>
          <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Global Payments Reimagined</p>
        </motion.div>
      )}
    </div>
  )
}

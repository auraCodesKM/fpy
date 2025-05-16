"use client"
import { motion } from "framer-motion"

export const EnhancedLogo = ({ size = "large" }: { size?: "small" | "medium" | "large" }) => {
  // Size configurations
  const sizes = {
    small: {
      container: "w-10 h-10",
      logo: "w-6 h-6",
      text: "text-lg",
    },
    medium: {
      container: "w-14 h-14",
      logo: "w-8 h-8",
      text: "text-xl",
    },
    large: {
      container: "w-24 h-24",
      logo: "w-14 h-14",
      text: "text-2xl",
    },
  }

  const selectedSize = sizes[size]

  // Animation variants
  const containerVariants = {
    initial: {
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  // Inner circle animation
  const circleVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  // Diamond animation
  const diamondVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`${selectedSize.container} bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center relative overflow-hidden`}
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {/* Background pulse effect */}
        <motion.div
          className="absolute w-full h-full rounded-full bg-blue-500 opacity-30"
          variants={circleVariants}
          initial="initial"
          animate="animate"
        />

        {/* Logo */}
        <motion.div className={selectedSize.logo} variants={diamondVariants} initial="initial" animate="animate">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M30 10C18.954 10 10 18.954 10 30C10 41.046 18.954 50 30 50C41.046 50 50 41.046 50 30C50 18.954 41.046 10 30 10ZM30 15C38.284 15 45 21.716 45 30C45 38.284 38.284 45 30 45C21.716 45 15 38.284 15 30C15 21.716 21.716 15 30 15Z"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M30 20L20 30L30 40L40 30L30 20Z"
              fill="white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.circle
              cx="30"
              cy="30"
              r="5"
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </svg>
        </motion.div>

        {/* Subtle shine effect */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{
            opacity: [0, 0.3, 0],
            left: ["-100%", "100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {size === "large" && (
        <motion.h2
          className="mt-3 font-bold text-2xl text-slate-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          FusionPay
        </motion.h2>
      )}
    </div>
  )
}

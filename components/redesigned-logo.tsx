"use client"
import { motion } from "framer-motion"

export const RedesignedLogo = ({
  size = "large",
  animated = true,
}: { size?: "small" | "medium" | "large"; animated?: boolean }) => {
  // Size configurations
  const sizes = {
    small: {
      container: "w-10 h-10",
      innerCircle: "w-7 h-7",
      outerRing: "w-10 h-10 border-[2px]",
      middleRing: "w-8 h-8 border-[1.5px]",
      icon: "w-4 h-4",
      text: "text-lg",
    },
    medium: {
      container: "w-14 h-14",
      innerCircle: "w-10 h-10",
      outerRing: "w-14 h-14 border-[2.5px]",
      middleRing: "w-12 h-12 border-[2px]",
      icon: "w-6 h-6",
      text: "text-xl",
    },
    large: {
      container: "w-24 h-24",
      innerCircle: "w-16 h-16",
      outerRing: "w-24 h-24 border-[3px]",
      middleRing: "w-20 h-20 border-[2.5px]",
      icon: "w-10 h-10",
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

  // Outer ring animation
  const outerRingVariants = {
    initial: { rotate: 0 },
    animate: animated
      ? {
          rotate: 360,
          transition: {
            duration: 60,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }
      : {},
  }

  // Middle ring animation
  const middleRingVariants = {
    initial: { rotate: 0 },
    animate: animated
      ? {
          rotate: -360,
          transition: {
            duration: 45,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }
      : {},
  }

  // Inner circle pulse animation
  const innerCircleVariants = {
    initial: { scale: 1 },
    animate: animated
      ? {
          scale: [1, 1.05, 1],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }
      : {},
  }

  // Icon animation
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: animated
      ? {
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0, -5, 0],
          transition: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      : {},
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`${selectedSize.container} relative flex items-center justify-center`}
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {/* Outer rotating ring with gradient */}
        <motion.div
          className={`${selectedSize.outerRing} absolute rounded-full border-dashed border-blue-400/50`}
          variants={outerRingVariants}
          initial="initial"
          animate="animate"
        />

        {/* Middle rotating ring with gradient */}
        <motion.div
          className={`${selectedSize.middleRing} absolute rounded-full border-dotted border-teal-400/60`}
          variants={middleRingVariants}
          initial="initial"
          animate="animate"
        />

        {/* Inner circle with gradient background */}
        <motion.div
          className={`${selectedSize.innerCircle} z-10 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 flex items-center justify-center shadow-lg`}
          variants={innerCircleVariants}
          initial="initial"
          animate="animate"
        >
          {/* Icon */}
          <motion.div
            className={`${selectedSize.icon} text-white`}
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.2)"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Subtle shine effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{
              opacity: [0, 0.3, 0],
              left: ["-100%", "100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 7,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {size === "large" && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 bg-clip-text text-transparent">
            FusionPay
          </h2>
          <p className="text-sm text-slate-500 mt-1">Global Payments Simplified</p>
        </motion.div>
      )}
    </div>
  )
}

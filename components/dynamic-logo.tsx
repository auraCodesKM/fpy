"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const DynamicLogo = ({
  size = "large",
  animated = true,
  interactive = true,
}: {
  size?: "small" | "medium" | "large"
  animated?: boolean
  interactive?: boolean
}) => {
  // Size configurations
  const sizes = {
    small: {
      container: "w-10 h-10",
      outerCircle: "w-10 h-10",
      middleCircle: "w-7 h-7",
      innerCircle: "w-4 h-4",
      text: "text-lg",
      glow: "w-12 h-12",
    },
    medium: {
      container: "w-16 h-16",
      outerCircle: "w-16 h-16",
      middleCircle: "w-11 h-11",
      innerCircle: "w-6 h-6",
      text: "text-xl",
      glow: "w-20 h-20",
    },
    large: {
      container: "w-28 h-28",
      outerCircle: "w-28 h-28",
      middleCircle: "w-20 h-20",
      innerCircle: "w-10 h-10",
      text: "text-2xl",
      glow: "w-36 h-36",
    },
  }

  const selectedSize = sizes[size]
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger animation sequence on initial load
  useEffect(() => {
    if (animated) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [animated])

  // Outer circle animation
  const outerCircleVariants = {
    initial: {
      rotate: 0,
      scale: 1,
    },
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
    hover: interactive
      ? {
          scale: 1.05,
          filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }
      : {},
    animating: {
      scale: [1, 1.1, 1],
      filter: [
        "drop-shadow(0 0 0px rgba(59, 130, 246, 0))",
        "drop-shadow(0 0 15px rgba(59, 130, 246, 0.7))",
        "drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))",
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  // Middle circle animation
  const middleCircleVariants = {
    initial: {
      rotate: 0,
      scale: 1,
    },
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
    hover: interactive
      ? {
          scale: 1.08,
          filter: "drop-shadow(0 0 5px rgba(14, 165, 233, 0.5))",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }
      : {},
    animating: {
      scale: [1, 1.15, 1],
      filter: [
        "drop-shadow(0 0 0px rgba(14, 165, 233, 0))",
        "drop-shadow(0 0 12px rgba(14, 165, 233, 0.7))",
        "drop-shadow(0 0 4px rgba(14, 165, 233, 0.3))",
      ],
      transition: {
        duration: 2,
        delay: 0.2,
        ease: "easeInOut",
      },
    },
  }

  // Inner circle animation
  const innerCircleVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    animate: animated
      ? {
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }
      : {},
    hover: interactive
      ? {
          scale: 1.15,
          filter: "drop-shadow(0 0 10px rgba(20, 184, 166, 0.7))",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }
      : {},
    animating: {
      scale: [1, 1.3, 1],
      filter: [
        "drop-shadow(0 0 0px rgba(20, 184, 166, 0))",
        "drop-shadow(0 0 20px rgba(20, 184, 166, 0.8))",
        "drop-shadow(0 0 6px rgba(20, 184, 166, 0.4))",
      ],
      transition: {
        duration: 2,
        delay: 0.4,
        ease: "easeInOut",
      },
    },
  }

  // Glow effect animation
  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 1.2,
    },
    animate: animated
      ? {
          opacity: [0, 0.2, 0],
          scale: [1.2, 1.3, 1.2],
          transition: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      : {},
    hover: interactive
      ? {
          opacity: 0.3,
          scale: 1.3,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }
      : {},
    animating: {
      opacity: [0, 0.4, 0.1],
      scale: [1.2, 1.4, 1.2],
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  // Connector lines animation
  const connectorVariants = {
    initial: {
      pathLength: 0,
      opacity: 0,
    },
    animate: animated
      ? {
          pathLength: 1,
          opacity: 0.7,
          transition: {
            pathLength: {
              duration: 1.5,
              ease: "easeInOut",
            },
            opacity: {
              duration: 0.5,
              ease: "easeIn",
            },
          },
        }
      : { pathLength: 1, opacity: 0.7 },
    hover: interactive
      ? {
          opacity: 1,
          filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }
      : {},
    animating: {
      pathLength: [0, 1, 1],
      opacity: [0, 1, 0.7],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  // Text animation
  const textVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      },
    },
    hover: interactive
      ? {
          y: -2,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }
      : {},
    animating: {
      opacity: [0, 1],
      y: [10, 0],
      transition: {
        duration: 1,
        delay: 1,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`${selectedSize.container} relative`}
        onHoverStart={() => interactive && setIsHovered(true)}
        onHoverEnd={() => interactive && setIsHovered(false)}
        initial="initial"
        animate={isAnimating ? "animating" : isHovered ? "hover" : "animate"}
      >
        {/* Background glow effect */}
        <motion.div
          className={`${selectedSize.glow} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/30 via-sky-500/30 to-teal-500/30 blur-md`}
          variants={glowVariants}
        />

        {/* Outer circle */}
        <motion.div
          className={`${selectedSize.outerCircle} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/80`}
          variants={outerCircleVariants}
        />

        {/* Middle circle */}
        <motion.div
          className={`${selectedSize.middleCircle} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-500/80`}
          variants={middleCircleVariants}
        />

        {/* Inner circle */}
        <motion.div
          className={`${selectedSize.innerCircle} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-teal-400 to-teal-600`}
          variants={innerCircleVariants}
        />

        {/* SVG for connector lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connector lines from inner to middle */}
          <motion.path
            d="M50 35 L30 50 L50 65 L70 50 Z"
            stroke="white"
            strokeWidth="1.5"
            variants={connectorVariants}
          />

          {/* Connector lines from middle to outer */}
          <motion.path
            d="M50 25 L20 50 L50 75 L80 50 Z"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="2 2"
            variants={connectorVariants}
            custom={1}
          />

          {/* Pulse lines */}
          {animated && (
            <>
              <motion.circle
                cx="50"
                cy="50"
                r="15"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 1.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                  delay: 0,
                }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="15"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 1.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                  delay: 1.5,
                }}
              />
            </>
          )}
        </svg>
      </motion.div>

      {size === "large" && (
        <motion.div
          className="mt-4 text-center"
          variants={textVariants}
          initial="initial"
          animate={isAnimating ? "animating" : "animate"}
          whileHover={interactive ? "hover" : ""}
        >
          <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
            FusionPay
          </h2>
          <p className="text-sm text-slate-500 mt-1">Global Payments Reimagined</p>
        </motion.div>
      )}
    </div>
  )
}

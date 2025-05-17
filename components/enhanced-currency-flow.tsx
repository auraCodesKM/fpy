"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"

// Currency types with their symbols and colors
const currencies = [
  { code: "USD", symbol: "$", color: "#3b82f6", textColor: "#2563eb", label: "US Dollar" },
  { code: "EUR", symbol: "€", color: "#0ea5e9", textColor: "#0284c7", label: "Euro" },
  { code: "GBP", symbol: "£", color: "#6366f1", textColor: "#4f46e5", label: "British Pound" },
  { code: "USDC", symbol: "₮", color: "#2563eb", textColor: "#1d4ed8", label: "USD Coin" },
  { code: "BASE", symbol: "◆", color: "#1d4ed8", textColor: "#1e40af", label: "Base Network" },
  { code: "INR", symbol: "₹", color: "#0d9488", textColor: "#0f766e", label: "Indian Rupee" },
  { code: "MXN", symbol: "₱", color: "#7c3aed", textColor: "#6d28d9", label: "Mexican Peso" },
  { code: "NGN", symbol: "₦", color: "#0891b2", textColor: "#0e7490", label: "Nigerian Naira" },
]

// Define the transaction routes
const transactionRoutes = [
  { path: ["USD", "USDC", "BASE", "INR"], label: "USD → INR" },
  { path: ["EUR", "USDC", "BASE", "MXN"], label: "EUR → MXN" },
  { path: ["GBP", "USDC", "BASE", "NGN"], label: "GBP → NGN" },
]

export const EnhancedCurrencyFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [activeRouteIndex, setActiveRouteIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  // Change route every 6 seconds with more time for animations
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveRouteIndex((prev) => (prev + 1) % transactionRoutes.length)
        setIsAnimating(true)

        // Reset animation state after animation completes
        setTimeout(() => {
          setIsAnimating(false)
        }, 5000) // Slightly less than the interval to ensure animations complete
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [isInView, isAnimating])

  // Get the active route
  const activeRoute = transactionRoutes[activeRouteIndex]

  // Get currency by code
  const getCurrency = (code: string) => {
    return currencies.find((c) => c.code === code) || currencies[0]
  }

  // Get tooltip text based on currency code
  const getTooltipText = (code: string) => {
    switch (code) {
      case "USD":
      case "EUR":
      case "GBP":
        return "Source Currency"
      case "USDC":
        return "Stablecoin on Base"
      case "BASE":
        return "Fast & low-cost L2 network"
      case "INR":
      case "MXN":
      case "NGN":
        return "Destination Currency"
      default:
        return code
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-40 relative overflow-hidden bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center"
    >
      {/* Route label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoute.label}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm font-medium text-slate-700">{activeRoute.label}</span>
        </motion.div>
      </AnimatePresence>

      {/* Main flow container */}
      <div className="relative w-full max-w-2xl mx-auto px-4">
        {/* Enhanced Path line with animated particles */}
        <svg
          className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
        >
          {/* Base path */}
          <motion.path
            d="M0,4 C20,1 30,7 50,4 C70,1 80,7 100,4"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeDasharray="1 2"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Animated gradient path */}
          <motion.path
            d="M0,4 C20,1 30,7 50,4 C70,1 80,7 100,4"
            fill="none"
            stroke="url(#gradient-line)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, strokeDashoffset: 0 }}
            animate={{ 
              pathLength: isInView ? 1 : 0,
              strokeDashoffset: isInView ? [0, -20, -40, -60, -80, -100] : 0
            }}
            transition={{ 
              pathLength: { duration: 2, ease: "easeInOut" },
              strokeDashoffset: { 
                duration: 5, 
                ease: "linear", 
                repeat: Infinity,
                repeatType: "loop" 
              }
            }}
            strokeDasharray="4 4"
          />
          
          {/* Animated flowing particles */}
          <motion.circle 
            cx="0" 
            cy="4" 
            r="1.5" 
            fill="#3b82f6"
            animate={{
              cx: [0, 100],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1],
              repeat: Infinity,
              delay: 0.5
            }}
          />
          <motion.circle 
            cx="0" 
            cy="4" 
            r="1.5" 
            fill="#0ea5e9"
            animate={{
              cx: [0, 100],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1],
              repeat: Infinity,
              delay: 2
            }}
          />
          <motion.circle 
            cx="0" 
            cy="4" 
            r="1.5" 
            fill="#0d9488"
            animate={{
              cx: [0, 100],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1],
              repeat: Infinity,
              delay: 3.5
            }}
          />
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
        </svg>

        {/* Currency nodes */}
        <div className="flex justify-between items-center relative z-10">
          {activeRoute.path.map((currencyCode, index) => {
            const currency = getCurrency(currencyCode)
            const position = index / (activeRoute.path.length - 1)
            const delay = index * 0.5

            return (
              <motion.div
                key={`${activeRouteIndex}-${currencyCode}-${index}`}
                className="flex flex-col items-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                onMouseEnter={() => setShowTooltip(currencyCode)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
                  style={{ backgroundColor: currency.color }}
                  whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  <span className="text-white font-bold text-xl">{currency.symbol}</span>

                  {/* Enhanced pulsing effect with multiple layers */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: currency.color }}
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Number.POSITIVE_INFINITY, 
                      repeatDelay: 0.5,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: currency.color }}
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.4 }}
                    transition={{ 
                      duration: 2, 
                      repeat: Number.POSITIVE_INFINITY, 
                      repeatDelay: 0.8,
                      delay: 0.3,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>

                <motion.span 
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                >
                  {currencyCode}
                </motion.span>

                {/* Enhanced Tooltip */}
                {showTooltip === currencyCode && (
                  <motion.div
                    className="absolute -bottom-12 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 whitespace-nowrap z-20"
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{getTooltipText(currencyCode)}</span>
                    <motion.div 
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-800 border-t border-l border-slate-200 dark:border-slate-700 rotate-45"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Animated currency bubble */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-20"
              initial={{ left: "0%", opacity: 0, scale: 0.5 }}
              animate={{
                left: ["0%", "33%", "66%", "100%"],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 4,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: getCurrency(activeRoute.path[0]).color,
                  boxShadow: `0 0 10px ${getCurrency(activeRoute.path[0]).color}`,
                }}
                animate={{
                  backgroundColor: [
                    getCurrency(activeRoute.path[0]).color,
                    getCurrency(activeRoute.path[1]).color,
                    getCurrency(activeRoute.path[2]).color,
                    getCurrency(activeRoute.path[3]).color,
                  ],
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                <motion.span
                  className="text-white font-bold text-xs"
                  animate={{
                    content: [
                      getCurrency(activeRoute.path[0]).symbol,
                      getCurrency(activeRoute.path[1]).symbol,
                      getCurrency(activeRoute.path[2]).symbol,
                      getCurrency(activeRoute.path[3]).symbol,
                    ],
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut",
                  }}
                >
                  {getCurrency(activeRoute.path[0]).symbol}
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

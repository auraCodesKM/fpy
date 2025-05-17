"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { FusionPayLogo } from "./fusion-pay-logo"
import { EnhancedCurrencyFlow } from "./enhanced-currency-flow"
import { useTheme } from "next-themes"

export function EnhancedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [pulseActive, setPulseActive] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const isDarkMode = mounted && theme === "dark"
  
  // Start the pulse animation after the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setPulseActive(true)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24">
      {/* Professional background grid pattern */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-600/20 z-0"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: pulseActive ? [1, 1.1, 1] : 1
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-600/20 z-0"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: pulseActive ? [1, 1.15, 1] : 1
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div
        ref={containerRef}
        className="container relative z-10 px-4 mx-auto max-w-7xl md:px-6 py-24 md:py-32 flex flex-col items-center"
      >
        {/* Enhanced Logo */}
        <div className="mb-8 text-center">
          <FusionPayLogo darkMode={false} size="large" />
        </div>
        
        {/* Main heading with enhanced animations */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              className="block relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Send Money Across Borders.
              {/* Enhanced animated underline with gradient pulse */}
              <motion.span 
                className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                initial={{ width: 0, opacity: 0.7 }}
                animate={{
                  width: pulseActive ? "100%" : 0,
                  opacity: pulseActive ? [0.7, 1, 0.7] : 0.7
                }}
                transition={{
                  width: { duration: 1.2, delay: 1 },
                  opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              No Banks. Just Stablecoins.
            </motion.span>
          </motion.h1>
          <motion.p
            className="max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            FusionPay uses AI to find the fastest, cheapest route for your international payments.
            Send money globally in <span className="font-semibold text-blue-600 dark:text-blue-300">minutes</span>, not days.
          </motion.p>
        </div>
        
        {/* CTA buttons with enhanced styling and pulse effect */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="relative px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Pulse effect on primary button */}
            {pulseActive && (
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-30"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0, 0.2, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            )}
            Get Started
          </motion.a>
          <motion.a
            href="#"
            className="px-6 py-3 text-base font-medium text-blue-600 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-blue-300 dark:border-slate-700 dark:hover:bg-slate-700"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            How It Works
          </motion.a>
        </motion.div>
        
        {/* Enhanced Currency Flow Visualization with improved animations */}
        <motion.div
          className="w-full max-w-4xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          {/* Glass morphism card effect */}
          <div className="absolute inset-0 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md rounded-xl z-0 border border-white/20 dark:border-slate-700/30 shadow-xl"></div>
          
          {/* Enhanced animated glow effects */}
          {pulseActive && (
            <>
              <motion.div 
                className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500/30 rounded-full blur-xl z-0"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500/30 rounded-full blur-xl z-0"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 10, 0],
                  y: [0, 10, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              <motion.div 
                className="absolute top-1/2 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl z-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -15, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute top-1/2 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-xl z-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, 15, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3
                }}
              />
            </>
          )}
          
          <div className="relative z-10 p-2">
            <EnhancedCurrencyFlow />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

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
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-24">
      {/* Enhanced futuristic background with grid and particle effects */}
      <div className="absolute inset-0 z-0">
        {/* Modern grid pattern with subtle glow */}
        <div className="absolute inset-0 opacity-10 dark:opacity-15">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#grid-gradient)" />
          </svg>
        </div>
        
        {/* Subtle digital circuit lines */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="none">
            <path d="M100,100 L700,100 L700,700 L100,700 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,10" />
            <path d="M150,150 L650,150 L650,650 L150,650 Z" fill="none" stroke="#0ea5e9" strokeWidth="0.5" strokeDasharray="10,15" />
            <path d="M200,200 L600,200 L600,600 L200,600 Z" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="15,20" />
          </svg>
        </div>
      </div>
      
      {/* Futuristic animated holographic orbs with advanced effects */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-500/20 to-violet-500/20 blur-3xl backdrop-blur-sm dark:from-blue-500/20 dark:via-indigo-600/20 dark:to-violet-600/20 z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.2), rgba(79, 70, 229, 0.15), rgba(124, 58, 237, 0.1))",
          boxShadow: "0 0 80px 20px rgba(59, 130, 246, 0.1)"
        }}
        animate={{
          x: [0, 50, -20, 0],
          y: [0, 30, 50, 0],
          scale: pulseActive ? [1, 1.1, 1.05, 1] : 1,
          rotate: [0, 15, 0, -15, 0],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.25, 0.75, 1]
        }}
      />
      
      {/* Secondary futuristic orb with mesh-like effect */}
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-cyan-400/15 via-blue-500/10 to-teal-500/15 blur-3xl backdrop-blur-sm dark:from-cyan-500/15 dark:via-blue-600/10 dark:to-teal-600/15 z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.15), rgba(56, 189, 248, 0.1), rgba(20, 184, 166, 0.05))",
          boxShadow: "0 0 100px 30px rgba(14, 165, 233, 0.07)"
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, -20, -40, 0],
          scale: pulseActive ? [1, 1.15, 1.08, 1] : 1,
          rotate: [0, -10, 0, 10, 0],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.33, 0.67, 1],
          delay: 1
        }}
      />
      
      {/* Accent orb with digital particle effect */}
      <motion.div 
        className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-purple-400/15 via-fuchsia-500/10 to-pink-500/15 blur-2xl backdrop-blur-sm dark:from-purple-500/15 dark:via-fuchsia-600/10 dark:to-pink-600/15 z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.15), rgba(217, 70, 239, 0.1), rgba(236, 72, 153, 0.05))",
          boxShadow: "0 0 60px 15px rgba(168, 85, 247, 0.07)"
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: pulseActive ? [1, 1.2, 0.9, 1] : 1,
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1],
          delay: 0.5
        }}
      />
      
      {/* Small floating tech particles */}
      <motion.div 
        className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-500/30 blur-xl dark:from-blue-500/30 dark:to-cyan-600/30 z-0"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, -100, 0],
          scale: [0.8, 1, 0.8],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-500/30 blur-xl dark:from-indigo-500/30 dark:to-purple-600/30 z-0"
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 60, 120, 0],
          scale: [0.7, 1, 0.7],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div
        ref={containerRef}
        className="container relative z-10 px-4 mx-auto max-w-7xl md:px-6 py-24 md:py-32 flex flex-col items-center"
      >
        {/* Futuristic Logo with enhanced glow effect */}
        <motion.div 
          className="mb-10 text-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block">
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-cyan-500/20 rounded-full blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <FusionPayLogo darkMode={false} size="large" />
          </div>
        </motion.div>
        
        {/* Futuristic main heading with enhanced animations */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.span 
              className="block relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-900 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Send Money Across Borders.
              {/* Futuristic animated underline with enhanced gradient pulse and glow effect */}
              <motion.span 
                className="absolute -bottom-2 left-0 h-[0.35rem] bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30 dark:shadow-blue-500/50"
                initial={{ width: 0, opacity: 0.7 }}
                animate={{
                  width: pulseActive ? "100%" : 0,
                  opacity: pulseActive ? [0.7, 1, 0.7] : 0.7,
                  boxShadow: pulseActive ? ["0 4px 15px rgba(59, 130, 246, 0.4)", "0 4px 25px rgba(59, 130, 246, 0.6)", "0 4px 15px rgba(59, 130, 246, 0.4)"] : "none"
                }}
                transition={{
                  width: { duration: 1.2, delay: 1 },
                  opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-500 dark:via-indigo-400 dark:to-cyan-400"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20, scale: isInView ? 1 : 0.98 }}
              transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
              style={{
                textShadow: "0 0 80px rgba(59, 130, 246, 0.2)"
              }}
            >
              No Banks. Just Stablecoins.
            </motion.span>
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
          >
            FusionPay uses advanced AI algorithms to find the fastest, cheapest route for your international payments.
            Send money globally in <motion.span 
              className="font-medium text-blue-600 dark:text-blue-300 relative inline-block"
              animate={{ 
                color: ["#2563eb", "#0ea5e9", "#6366f1", "#2563eb"] 
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{
                textShadow: "0 0 10px rgba(59, 130, 246, 0.3)"
              }}
            >minutes</motion.span>, not days.
          </motion.p>
          
          {/* Tech badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          >
            {["Blockchain", "AI-Powered", "Secure", "Low Fees"].map((badge, index) => (
              <motion.div 
                key={badge}
                className="px-4 py-1.5 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: index % 2 === 0 ? "rgba(59, 130, 246, 0.1)" : "rgba(14, 165, 233, 0.1)",
                  borderColor: index % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(14, 165, 233, 0.3)"
                }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                {badge}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Futuristic CTA buttons with advanced animations and effects */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.9, delay: 1.4, ease: "easeOut" }}
        >
          <motion.a
            href="#"
            className="relative px-10 py-5 text-base font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 rounded-xl shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden group"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.4)",
              backgroundPosition: "right center"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 15,
              backgroundPosition: { duration: 0.8, ease: "easeOut" }
            }}
            style={{
              backgroundSize: "200% auto"
            }}
          >
            {/* Enhanced futuristic pulse effect on primary button with multiple layers */}
            {pulseActive && (
              <>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 rounded-xl opacity-0"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-xl opacity-0"
                  animate={{ 
                    scale: [1, 1.25, 1],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.span 
                  className="absolute inset-0 rounded-xl opacity-0 mix-blend-overlay"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
                  animate={{ 
                    left: ["-100%", "100%"],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 3
                  }}
                />
              </>
            )}
            <span className="relative z-10 flex items-center">
              <span className="mr-2">Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </motion.a>
          <motion.a
            href="#"
            className="px-10 py-5 text-base font-medium text-blue-600 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-slate-800/80 dark:text-blue-300 dark:border-slate-700/80 dark:hover:bg-slate-800 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(148, 163, 184, 0.25)",
              color: "#3b82f6"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15 
            }}
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-2">How It Works</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
            </span>
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

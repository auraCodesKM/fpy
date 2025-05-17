"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { FusionPayLogo } from "./fusion-pay-logo"
import { EnhancedCurrencyFlow } from "./enhanced-currency-flow"
import { useTheme } from "next-themes"

export function MediaEnhancedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
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
  
  // Play video when component mounts
  useEffect(() => {
    if (!videoRef.current || !mounted) return
    
    videoRef.current.play().catch(e => {
      console.error("Video play error:", e)
    })
  }, [mounted])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-16">
      {/* Video background */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-15 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={isDarkMode ? "/white-video.mp4" : "/black-video.mp4"}
        />
      </div>
      
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
      </div>
      
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
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ rotate: { duration: 0.5, ease: "easeInOut" } }}
            >
              <FusionPayLogo darkMode={isDarkMode} size="large" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Futuristic main heading with enhanced animations */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">
              <span className="inline-block">
                <span className="relative inline-block">
                  Instant
                  <motion.span
                    className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 blur-md rounded-lg"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
              </span>{" "}
              <span className="inline-block">
                <span className="relative inline-block">
                  Cross-Border
                  <motion.span
                    className="absolute -inset-1 bg-gradient-to-r from-indigo-600/30 to-purple-500/30 blur-md rounded-lg"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                </span>
              </span>
            </span>
            <span className="block mt-2">
              <span className="inline-block">
                <span className="relative inline-block">
                  Payments
                  <motion.span
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-md rounded-lg"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </span>
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                Reimagined
              </span>
            </span>
          </motion.h1>
          
          <motion.p
            className="max-w-2xl mx-auto mt-6 text-xl text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Send money globally in seconds, not days. FusionPay leverages blockchain technology to make international transfers instant, secure, and up to 80% cheaper.
          </motion.p>
        </div>
        
        {/* Enhanced currency flow visualization */}
        <motion.div
          className="w-full max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <EnhancedCurrencyFlow />
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FusionPayLogo({ darkMode = false, size = "large" }: { darkMode?: boolean; size?: "small" | "medium" | "large" }) {
  const [isVisible, setIsVisible] = useState(false)
  const [pulseActive, setPulseActive] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Start the pulse animation after a short delay
    const timer = setTimeout(() => {
      setPulseActive(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Size configurations
  const logoSizes = {
    small: {
      container: "w-12 h-12",
      logoText: "text-lg ml-1",
      tagline: "text-[8px] mt-0",
      iconSize: "w-8 h-8",
      orbitSize: "w-16 h-16",
      orbitWidth: "border-[1px]",
      outerOrbitSize: "w-20 h-20"
    },
    medium: {
      container: "w-20 h-20",
      logoText: "text-2xl ml-2",
      tagline: "text-xs mt-1",
      iconSize: "w-14 h-14",
      orbitSize: "w-28 h-28",
      orbitWidth: "border-[1.5px]",
      outerOrbitSize: "w-36 h-36"
    },
    large: {
      container: "w-32 h-32",
      logoText: "text-4xl ml-3",
      tagline: "text-sm mt-2",
      iconSize: "w-20 h-20",
      orbitSize: "w-44 h-44",
      orbitWidth: "border-2",
      outerOrbitSize: "w-56 h-56"
    }
  }

  const sizeConfig = logoSizes[size]
  const textColor = darkMode ? "text-white" : "text-slate-900"
  const accentColor = "text-blue-500"
  const bgColor = darkMode ? "#1a3a54" : "#0ea5e9"
  const orbitColor = darkMode ? "#2563eb" : "#3b82f6"
  const outerOrbitColor = darkMode ? "#1e40af" : "#60a5fa"

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Outer orbit - shifted higher */}
        <motion.div
          className={`absolute rounded-full border-dashed ${sizeConfig.outerOrbitSize} ${sizeConfig.orbitWidth}`}
          style={{ 
            borderColor: outerOrbitColor,
            transform: "translateY(-20px)" 
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.8,
            rotate: 360
          }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 1 },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Inner orbit */}
        <motion.div
          className={`absolute rounded-full border-dotted ${sizeConfig.orbitSize} ${sizeConfig.orbitWidth}`}
          style={{ borderColor: orbitColor }}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.8,
            rotate: -360
          }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 1 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Orbital dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: size === "small" ? 3 : size === "medium" ? 4 : 6,
              height: size === "small" ? 3 : size === "medium" ? 4 : 6,
              transformOrigin: "center center",
              transform: `rotate(${angle}deg) translateX(${size === "small" ? 8 : size === "medium" ? 14 : 22}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? [0.3, 1, 0.3] : 0 }}
            transition={{
              opacity: { 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.2,
                ease: "easeInOut"
              }
            }}
          />
        ))}
        
        {/* Logo icon */}
        <motion.div
          className={`${sizeConfig.iconSize} rounded-full flex items-center justify-center z-10`}
          style={{ backgroundColor: bgColor }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? [1, pulseActive ? 1.05 : 1, 1] : 0.5,
            boxShadow: isVisible ? [
              `0 0 0 rgba(14, 165, 233, 0)`,
              pulseActive ? `0 0 20px rgba(14, 165, 233, 0.7)` : `0 0 0 rgba(14, 165, 233, 0)`,
              `0 0 0 rgba(14, 165, 233, 0)`
            ] : `0 0 0 rgba(14, 165, 233, 0)`
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Stacked layers icon */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-1/2 h-1/2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M2 17L12 22L22 17M2 12L12 17L22 12M2 7L12 12L22 7L12 2L2 7Z" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Logo text */}
      <div className="text-center mt-4">
        <motion.h1
          className={`font-bold ${textColor} flex items-center justify-center`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className={accentColor}>Fusion</span>
          <span className={sizeConfig.logoText}>Pay</span>
        </motion.h1>
        
        <motion.p
          className={`${textColor} opacity-80 ${sizeConfig.tagline}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Global Payments Reimagined
        </motion.p>
      </div>
    </div>
  )
}

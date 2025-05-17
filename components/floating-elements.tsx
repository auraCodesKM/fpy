"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface FloatingElementsProps {
  count?: number;
  opacity?: number;
  className?: string;
}

export function FloatingElements({
  count = 8,
  opacity = 0.2,
  className = ""
}: FloatingElementsProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const isDarkMode = mounted && theme === "dark"
  
  // Generate random elements
  const elements = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 80 + 40
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    const duration = Math.random() * 20 + 20
    const delay = Math.random() * 5
    
    return {
      id: i,
      size,
      posX,
      posY,
      duration,
      delay,
      shape: Math.random() > 0.5 ? "circle" : "square",
      color: isDarkMode 
        ? `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1})` 
        : `rgba(96, 165, 250, ${Math.random() * 0.2 + 0.1})`
    }
  })
  
  if (!mounted) return null
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      {elements.map(element => (
        <motion.div
          key={element.id}
          className={`absolute ${element.shape === "circle" ? "rounded-full" : "rounded-lg"}`}
          style={{
            width: element.size,
            height: element.size,
            left: `${element.posX}%`,
            top: `${element.posY}%`,
            background: element.color,
            filter: "blur(8px)"
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            rotate: [0, 10, -5, 3, 0],
            scale: [1, 1.1, 0.9, 1.05, 1]
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "linear",
            delay: element.delay
          }}
        />
      ))}
    </div>
  )
}

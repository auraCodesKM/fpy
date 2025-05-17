"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SubtleImageShowcaseProps {
  images: string[];
  interval?: number;
  className?: string;
}

export function SubtleImageShowcase({ 
  images, 
  interval = 5000,
  className = ""
}: SubtleImageShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Cycle through images
  useEffect(() => {
    if (!mounted || images.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [mounted, images.length, interval])
  
  if (!mounted || images.length === 0) return null

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt="FusionPay visualization"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

interface EnhancedImageSectionProps {
  imageStyle?: 'Vivid' | 'Neon' | 'Glossy' | 'Metallic' | 'Pastel' | 'Magenta' | 'Black';
  interval?: number;
  className?: string;
  opacity?: number;
}

export function EnhancedImageSection({ 
  imageStyle = 'Vivid',
  interval = 5000,
  className = "",
  opacity = 0.15
}: EnhancedImageSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Define image sources for different styles
  const imageSources = {
    Vivid: ["/PNG/Vivid/vivid_1.png", "/PNG/Vivid/vivid_2.png", "/PNG/Vivid/vivid_3.png"],
    Neon: ["/PNG/Neon/neon_4.png", "/PNG/Neon/neon_5.png", "/PNG/Neon/neon_6.png"],
    Glossy: ["/PNG/Glossy/glossy_7.png", "/PNG/Glossy/glossy_8.png", "/PNG/Glossy/glossy_9.png"],
    Metallic: ["/PNG/Metallic/metallic_10.png", "/PNG/Metallic/metallic_11.png", "/PNG/Metallic/metallic_12.png"],
    Pastel: ["/PNG/Pastel/pastel_13.png", "/PNG/Pastel/pastel_14.png", "/PNG/Pastel/pastel_15.png"],
    Magenta: ["/PNG/Magenta/magenta_16.png", "/PNG/Magenta/magenta_17.png", "/PNG/Magenta/magenta_18.png"],
    Black: ["/PNG/Black/black_19.png", "/PNG/Black/black_20.png", "/PNG/Black/black_1.png"]
  }
  
  // Get images for the selected style
  const images = imageSources[imageStyle] || imageSources.Vivid
  
  // Cycle through images
  useEffect(() => {
    if (!mounted || images.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [mounted, images.length, interval])
  
  const isDarkMode = mounted && theme === "dark"
  
  if (!mounted || images.length === 0) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex]}
              alt="FusionPay visualization"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState, useRef, ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareOpacity?: number;
  tiltAmount?: number;
  glareColor?: string;
}

export function TiltCard({
  children,
  className = "",
  glareOpacity = 0.1,
  tiltAmount = 10,
  glareColor = "white"
}: TiltCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for the tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Smooth spring animations
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  
  // Transform values for rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltAmount, -tiltAmount])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltAmount, tiltAmount])
  
  // Transform values for glare effect
  const glareX = useTransform(springX, [-0.5, 0.5], ["30%", "70%"])
  const glareY = useTransform(springY, [-0.5, 0.5], ["30%", "70%"])
  const glareOpacityValue = useTransform(
    springX,
    [-0.5, 0, 0.5],
    [glareOpacity, glareOpacity * 0.5, glareOpacity]
  )
  
  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Calculate x and y between -0.5 and 0.5
    const xValue = (e.clientX - rect.left) / width - 0.5
    const yValue = (e.clientY - rect.top) / height - 0.5
    
    x.set(xValue)
    y.set(yValue)
  }
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false)
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 70%)`,
          opacity: isHovering ? glareOpacityValue : 0,
          mixBlendMode: "overlay"
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

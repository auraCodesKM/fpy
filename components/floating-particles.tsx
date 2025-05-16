"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export const FloatingParticles = ({ count = 15 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const controls = useAnimation()

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = []
    const colors = ["#3b82f6", "#0ea5e9", "#6366f1", "#2563eb", "#0d9488"]

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Random x position (0-100%)
        y: Math.random() * 100, // Random y position (0-100%)
        size: Math.random() * 6 + 2, // Random size (2-8px)
        color: colors[Math.floor(Math.random() * colors.length)], // Random color from the array
        duration: Math.random() * 20 + 10, // Random duration (10-30s)
        delay: Math.random() * 5, // Random delay (0-5s)
      })
    }

    setParticles(newParticles)
    controls.start("animate")
  }, [count, controls])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.2, 0.15, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

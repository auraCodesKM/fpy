"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DollarSign, Euro, Bitcoin } from "lucide-react"

// Currency symbols and their colors
const currencies = [
  { symbol: "USD", icon: DollarSign, color: "bg-blue-600", textColor: "text-blue-600" },
  { symbol: "EUR", icon: Euro, color: "bg-teal-600", textColor: "text-teal-600" },
  { symbol: "GBP", icon: DollarSign, color: "bg-purple-600", textColor: "text-purple-600" },
  { symbol: "JPY", icon: DollarSign, color: "bg-amber-600", textColor: "text-amber-600" },
  { symbol: "USDC", icon: Bitcoin, color: "bg-blue-500", textColor: "text-blue-500" },
  { symbol: "BASE", icon: Bitcoin, color: "bg-blue-700", textColor: "text-blue-700" },
  { symbol: "INR", icon: DollarSign, color: "bg-teal-700", textColor: "text-teal-700" },
  { symbol: "MXN", icon: DollarSign, color: "bg-purple-700", textColor: "text-purple-700" },
]

// Fixed nodes for the pipeline
const fixedNodes = [
  { symbol: "FIAT", position: 0 },
  { symbol: "CRYPTO", position: 50 },
  { symbol: "FIAT", position: 100 },
]

export const AnimatedMultiCurrencyLine = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePulses, setActivePulses] = useState<Array<{ id: number; currency: (typeof currencies)[0] }>>([])
  const [pulseCounter, setPulseCounter] = useState(0)

  useEffect(() => {
    // Add a new pulse every 2 seconds
    const interval = setInterval(() => {
      const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]
      setActivePulses((prev) => [...prev, { id: pulseCounter, currency: randomCurrency }])
      setPulseCounter((prev) => prev + 1)
    }, 2000)

    // Remove pulses that have completed their animation
    const cleanupInterval = setInterval(() => {
      setActivePulses((prev) => prev.filter((_, index) => index > prev.length - 5))
    }, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(cleanupInterval)
    }
  }, [pulseCounter])

  return (
    <div className="w-full h-32 relative" ref={containerRef}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-3 bg-gradient-to-r from-blue-100 via-teal-100 to-purple-100 rounded-full relative">
          {/* Fixed nodes */}
          {fixedNodes.map((node, index) => (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${node.position}%` }}
            >
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-white">{node.symbol}</span>
              </div>
              <span className="text-sm font-medium text-slate-700">{node.symbol}</span>
            </div>
          ))}

          {/* Animated pulses */}
          <AnimatePresence>
            {activePulses.map((pulse) => (
              <motion.div
                key={pulse.id}
                className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-10`}
                initial={{ left: "0%", opacity: 0, scale: 0.5 }}
                animate={{
                  left: "100%",
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  opacity: { times: [0, 0.1, 0.9, 1] },
                }}
              >
                <div
                  className={`w-6 h-6 ${pulse.currency.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <pulse.currency.icon className="w-3 h-3 text-white" />
                </div>
                <span className={`text-xs font-bold ${pulse.currency.textColor} mt-1`}>{pulse.currency.symbol}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Gradient overlay for the line */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-purple-500/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

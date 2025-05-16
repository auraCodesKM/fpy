"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"

// Currency types with their symbols and colors
const currencies = [
  { code: "USD", symbol: "$", color: "#3b82f6" },
  { code: "EUR", symbol: "€", color: "#0ea5e9" },
  { code: "GBP", symbol: "£", color: "#6366f1" },
  { code: "USDC", symbol: "₮", color: "#2563eb" },
  { code: "BASE", symbol: "◆", color: "#1d4ed8" },
  { code: "INR", symbol: "₹", color: "#0d9488" },
  { code: "MXN", symbol: "₱", color: "#7c3aed" },
  { code: "NGN", symbol: "₦", color: "#0891b2" },
]

export const AnimatedCurrencyFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const [activePulses, setActivePulses] = useState<Array<{ id: number; currency: (typeof currencies)[0] }>>([])
  const [pulseCounter, setPulseCounter] = useState(0)

  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  // Generate pulses at regular intervals
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      // Select a random source currency (USD, EUR, GBP)
      const sourceCurrencies = currencies.slice(0, 3)
      const randomSource = sourceCurrencies[Math.floor(Math.random() * sourceCurrencies.length)]

      setActivePulses((prev) => [...prev, { id: pulseCounter, currency: randomSource }])
      setPulseCounter((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [isInView, pulseCounter])

  // Clean up old pulses
  useEffect(() => {
    const cleanup = setInterval(() => {
      setActivePulses((prev) => prev.filter((_, index) => index > prev.length - 5))
    }, 15000)

    return () => clearInterval(cleanup)
  }, [])

  // Path for the flow line
  const path = "M50,50 C150,50 150,50 250,50 C350,50 350,50 450,50 C550,50 550,50 650,50"

  return (
    <div ref={containerRef} className="w-full h-48 relative overflow-hidden">
      <svg className="w-full h-full absolute" viewBox="0 0 700 100" preserveAspectRatio="none">
        {/* Main path */}
        <motion.path
          d={path}
          fill="none"
          strokeWidth="4"
          className="stroke-slate-200"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 1.5, ease: "easeInOut" },
            },
          }}
        />

        {/* Gradient overlay */}
        <motion.path
          d={path}
          fill="none"
          strokeWidth="4"
          stroke="url(#currencyGradient)"
          strokeOpacity="0.6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
            },
          }}
        />

        {/* Define gradient */}
        <defs>
          <linearGradient id="currencyGradient" x1="0%" y1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
      </svg>

      {/* Currency nodes */}
      <div className="absolute inset-0 flex items-center justify-between px-12">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 shadow-md">
            <span className="text-blue-600 font-bold text-lg">$€£</span>
          </div>
          <span className="text-sm font-medium text-slate-700">FIAT</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            },
          }}
        >
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 shadow-md">
            <span className="text-white font-bold text-lg">₮</span>
          </div>
          <span className="text-sm font-medium text-slate-700">USDC</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
            },
          }}
        >
          <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mb-2 shadow-md">
            <span className="text-white font-bold text-lg">◆</span>
          </div>
          <span className="text-sm font-medium text-slate-700">BASE</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.6 },
            },
          }}
        >
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-2 shadow-md">
            <span className="text-white font-bold text-lg">₹₱₦</span>
          </div>
          <span className="text-sm font-medium text-slate-700">FIAT</span>
        </motion.div>
      </div>

      {/* Animated pulses */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {activePulses.map((pulse) => (
            <motion.div
              key={pulse.id}
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ left: "7%", opacity: 0, scale: 0.5 }}
              animate={[
                { left: "7%", opacity: 1, scale: 1, transition: { duration: 0.3 } },
                { left: "33%", transition: { duration: 1.5, delay: 0.3 } },
                { left: "66%", transition: { duration: 1.5, delay: 1.8 } },
                { left: "93%", opacity: 1, scale: 1, transition: { duration: 1.5, delay: 3.3 } },
                { left: "93%", opacity: 0, scale: 0.5, transition: { duration: 0.3, delay: 4.8 } },
              ]}
              exit={{ opacity: 0 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: pulse.currency.color }}
              >
                <span className="text-white font-bold">{pulse.currency.symbol}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

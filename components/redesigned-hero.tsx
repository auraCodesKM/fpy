"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefinedLogo } from "./refined-logo"
import { UnifiedCurrencyHub } from "./unified-currency-hub"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Shield, Zap, ChevronRight } from "lucide-react"

export function RedesignedHero({ darkMode = false }) {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "Global Coverage",
      description: "Send money to 190+ countries with competitive rates",
      icon: <Globe className="w-6 h-6 text-white" />,
      color: darkMode ? "from-blue-600 to-blue-800" : "from-blue-500 to-blue-700",
    },
    {
      title: "Lightning Fast",
      description: "Transfers complete in seconds, not days",
      icon: <Zap className="w-6 h-6 text-white" />,
      color: darkMode ? "from-amber-500 to-amber-700" : "from-amber-400 to-amber-600",
    },
    {
      title: "Bank-Level Security",
      description: "Enterprise-grade encryption and compliance",
      icon: <Shield className="w-6 h-6 text-white" />,
      color: darkMode ? "from-emerald-600 to-emerald-800" : "from-emerald-500 to-emerald-700",
    },
  ]

  return (
    <section
      className={`relative overflow-hidden ${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      } transition-colors duration-300`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className={`absolute inset-0 ${darkMode ? "opacity-20" : "opacity-10"} transition-opacity duration-300`}
          style={{
            background: `radial-gradient(circle at 20% 20%, ${darkMode ? "#3b82f6" : "#60a5fa"} 0%, transparent 40%), 
                       radial-gradient(circle at 80% 80%, ${darkMode ? "#0ea5e9" : "#38bdf8"} 0%, transparent 40%)`,
          }}
        />

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: darkMode ? 0.05 : 0.03 }}
          transition={{ duration: 1 }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        {/* Floating currency symbols */}
        {["$", "€", "£", "¥", "₹", "₦"].map((symbol, index) => {
          const size = 20 + Math.random() * 30
          const initialX = Math.random() * 100
          const initialY = Math.random() * 100
          const duration = 60 + Math.random() * 60

          return (
            <motion.div
              key={index}
              className={`absolute text-2xl font-bold ${darkMode ? "text-slate-700" : "text-slate-200"}`}
              initial={{
                x: `${initialX}vw`,
                y: `${initialY}vh`,
                opacity: 0,
              }}
              animate={{
                x: [`${initialX}vw`, `${(initialX + 20) % 100}vw`, `${(initialX - 10 + 100) % 100}vw`],
                y: [`${initialY}vh`, `${(initialY - 30 + 100) % 100}vh`, `${(initialY + 20) % 100}vh`],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                times: [0, 0.5, 1],
              }}
              style={{ fontSize: size }}
            >
              {symbol}
            </motion.div>
          )
        })}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 text-white text-sm font-medium">
                Next-Gen Global Payments
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
                <span className="block">Send Money Globally</span>
                <span className="block">
                  Without{" "}
                  <span className="relative">
                    <span className="relative z-10">Banks</span>
                    <motion.span
                      className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/30 to-sky-500/30 -z-10"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </span>
                </span>
              </h1>
              <p className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-600"} max-w-xl`}>
                FusionPay connects global currencies through stablecoins on Base L2, enabling instant transfers at
                competitive rates with no crypto knowledge required.
              </p>
            </motion.div>

            {/* Feature highlights */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className={`p-4 rounded-xl bg-gradient-to-r ${features[activeFeature].color}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-lg p-2 mt-1">{features[activeFeature].icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{features[activeFeature].title}</h3>
                      <p className="text-white/90">{features[activeFeature].description}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Feature indicators */}
              <div className="flex gap-2 justify-center">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeFeature ? "bg-blue-500" : darkMode ? "bg-slate-700" : "bg-slate-300"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white border-0 relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-sky-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`group ${
                  darkMode
                    ? "border-slate-700 text-white hover:bg-slate-800"
                    : "border-slate-300 text-slate-800 hover:bg-slate-100"
                }`}
              >
                How It Works
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right column - Visual content */}
          <div className="space-y-8">
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <RefinedLogo darkMode={darkMode} />
            </motion.div>

            {/* Currency hub visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="rounded-xl overflow-hidden shadow-xl"
              style={{
                boxShadow: darkMode
                  ? "0 20px 50px -15px rgba(2, 132, 199, 0.15)"
                  : "0 20px 50px -15px rgba(2, 132, 199, 0.2)",
              }}
            >
              <UnifiedCurrencyHub darkMode={darkMode} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

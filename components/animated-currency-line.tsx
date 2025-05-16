"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

export const AnimatedCurrencyLine = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full h-24 relative" ref={containerRef}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-3xl h-2 bg-slate-200 rounded-full relative">
          {/* Currency nodes */}
          <CurrencyNode label="USD" position={0} />
          <CurrencyNode label="USDC" position={33} />
          <CurrencyNode label="BASE" position={66} />
          <CurrencyNode label="INR" position={100} />

          {/* Animated pulse */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  )
}

const CurrencyNode = ({ label, position }: { label: string; position: number }) => {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
      style={{ left: `${position}%` }}
    >
      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mb-2">
        <DollarSign className="w-3 h-3 text-white" />
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  )
}

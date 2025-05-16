"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { 
  Percent, 
  Clock, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Globe 
} from "lucide-react"

type ColorType = "blue" | "purple" | "green" | "amber" | "teal"

interface Feature {
  title: string
  description: string
  icon: ReactNode
  value: number
  unit: string
  color: ColorType
}

interface Partner {
  name: string
  description: string
  logo: string
  color: ColorType
}

interface FeatureStatProps {
  feature: Feature
  index: number
  scrollYProgress: MotionValue<number>
  darkMode: boolean
}

interface PartnerCardProps {
  partner: Partner
  index: number
  scrollYProgress: MotionValue<number>
  darkMode: boolean
}

export function FusionPayFeatures({ darkMode = false }: { darkMode: boolean }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const features: Feature[] = [
    {
      title: "90% Lower Fees vs Banks",
      description: "Save on international transfer fees with our optimized stablecoin routes",
      icon: <Percent className="w-6 h-6" />,
      value: 90,
      unit: "%",
      color: "blue"
    },
    {
      title: "~2 Minute Settlement",
      description: "Transfers complete in minutes instead of days with traditional banks",
      icon: <Clock className="w-6 h-6" />,
      value: 2,
      unit: "min",
      color: "purple"
    },
    {
      title: "$0 Setup / No Wallet Required",
      description: "No crypto wallet or technical knowledge needed to get started",
      icon: <Wallet className="w-6 h-6" />,
      value: 0,
      unit: "$",
      color: "green"
    }
  ]

  const partners: Partner[] = [
    {
      name: "Base",
      description: "Base is a Coinbase-backed Ethereum Layer 2. It powers fast, cheap, and secure transfers.",
      logo: "🔵",
      color: "blue"
    },
    {
      name: "Ethereum",
      description: "The foundation of decentralized finance and secure smart contracts.",
      logo: "💠",
      color: "purple"
    },
    {
      name: "Chainlink",
      description: "Providing reliable, real-time exchange rate data for accurate currency conversions.",
      logo: "⛓️",
      color: "teal"
    },
    {
      name: "Transak / Ramp",
      description: "Seamless on/off-ramp solutions for converting between fiat and crypto.",
      logo: "🔄",
      color: "amber"
    }
  ]

  return (
    <div ref={containerRef} className="py-12">
      <div className="space-y-16">
        {/* Feature Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureStat 
              key={index} 
              feature={feature} 
              index={index} 
              scrollYProgress={scrollYProgress}
              darkMode={darkMode}
            />
          ))}
        </div>
        
        {/* Partner Logos */}
        <div className="mt-16">
          <h3 className={`text-xl font-semibold mb-6 text-center ${darkMode ? "text-white" : "text-slate-800"}`}>
            Powered By Trusted Technology
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <PartnerCard 
                key={index} 
                partner={partner} 
                index={index} 
                scrollYProgress={scrollYProgress}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureStat({ feature, index, scrollYProgress, darkMode }: FeatureStatProps) {
  // Calculate when this item should animate based on scroll position
  const startRange = index * 0.1
  const endRange = startRange + 0.2
  const animationProgress = useTransform(scrollYProgress, [startRange, endRange], [0, 1])
  
  // Get colors based on the feature color and dark mode
  const getBgColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "bg-blue-900/20" : "bg-blue-50",
      purple: darkMode ? "bg-purple-900/20" : "bg-purple-50",
      green: darkMode ? "bg-green-900/20" : "bg-green-50",
      amber: darkMode ? "bg-amber-900/20" : "bg-amber-50",
      teal: darkMode ? "bg-teal-900/20" : "bg-teal-50"
    }
    return colors[color]
  }
  
  const getIconBgColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "bg-blue-800" : "bg-blue-500",
      purple: darkMode ? "bg-purple-800" : "bg-purple-500",
      green: darkMode ? "bg-green-800" : "bg-green-500",
      amber: darkMode ? "bg-amber-800" : "bg-amber-500",
      teal: darkMode ? "bg-teal-800" : "bg-teal-500"
    }
    return colors[color]
  }
  
  const getTextColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "text-blue-300" : "text-blue-700",
      purple: darkMode ? "text-purple-300" : "text-purple-700",
      green: darkMode ? "text-green-300" : "text-green-700",
      amber: darkMode ? "text-amber-300" : "text-amber-700",
      teal: darkMode ? "text-teal-300" : "text-teal-700"
    }
    return colors[color]
  }
  
  return (
    <motion.div 
      className={`p-6 rounded-xl ${getBgColor(feature.color)} relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Icon */}
      <div className={`${getIconBgColor(feature.color)} text-white p-3 rounded-lg inline-flex mb-4`}>
        {feature.icon}
      </div>
      
      {/* Animated Value */}
      <div className="flex items-baseline mb-2">
        <motion.span 
          className={`text-4xl font-bold ${getTextColor(feature.color)}`}
          style={{ 
            opacity: animationProgress,
            scale: useTransform(animationProgress, [0, 1], [0.8, 1])
          }}
        >
          {feature.unit === "$" ? feature.unit : ""}
          <motion.span>
            {feature.value}
          </motion.span>
          {feature.unit !== "$" ? feature.unit : ""}
        </motion.span>
      </div>
      
      <h3 className={`text-xl font-semibold mb-2 ${getTextColor(feature.color)}`}>
        {feature.title}
      </h3>
      
      <p className={darkMode ? "text-slate-300" : "text-slate-600"}>
        {feature.description}
      </p>
      
      {/* Animated progress bar for visual effect */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
        style={{ 
          width: useTransform(animationProgress, [0, 1], ["0%", "100%"]),
          background: feature.color === "blue" 
            ? "linear-gradient(to right, #3b82f6, #60a5fa)" 
            : feature.color === "purple"
              ? "linear-gradient(to right, #8b5cf6, #a78bfa)"
              : "linear-gradient(to right, #10b981, #34d399)"
        }}
      />
    </motion.div>
  )
}

function PartnerCard({ partner, index, scrollYProgress, darkMode }: PartnerCardProps) {
  // Calculate when this item should animate based on scroll position
  const startRange = 0.3 + (index * 0.05)
  const endRange = startRange + 0.1
  const animationProgress = useTransform(scrollYProgress, [startRange, endRange], [0, 1])
  
  // Get colors based on the partner color and dark mode
  const getBgColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "bg-blue-900/20" : "bg-blue-50",
      purple: darkMode ? "bg-purple-900/20" : "bg-purple-50",
      green: darkMode ? "bg-green-900/20" : "bg-green-50",
      amber: darkMode ? "bg-amber-900/20" : "bg-amber-50",
      teal: darkMode ? "bg-teal-900/20" : "bg-teal-50"
    }
    return colors[color]
  }
  
  const getTextColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "text-blue-300" : "text-blue-700",
      purple: darkMode ? "text-purple-300" : "text-purple-700",
      green: darkMode ? "text-green-300" : "text-green-700",
      amber: darkMode ? "text-amber-300" : "text-amber-700",
      teal: darkMode ? "text-teal-300" : "text-teal-700"
    }
    return colors[color]
  }
  
  return (
    <motion.div 
      className={`p-4 rounded-xl ${getBgColor(partner.color)} relative overflow-hidden text-center group`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{ 
        opacity: useTransform(animationProgress, [0, 1], [0.5, 1])
      }}
    >
      {/* Logo */}
      <div className="text-4xl mb-2">{partner.logo}</div>
      
      <h4 className={`font-semibold ${getTextColor(partner.color)}`}>
        {partner.name}
      </h4>
      
      {/* Tooltip */}
      <div className={`absolute inset-0 ${darkMode ? "bg-slate-800/95" : "bg-white/95"} flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <p className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
          {partner.description}
        </p>
      </div>
    </motion.div>
  )
}

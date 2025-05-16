"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { 
  Users, 
  HeartHandshake, 
  Building, 
  Globe 
} from "lucide-react"

type ColorType = "blue" | "purple" | "green" | "teal"

interface UseCase {
  title: string
  description: string
  icon: ReactNode
  impact: string
  color: ColorType
}

interface UseCaseCardProps {
  useCase: UseCase
  index: number
  scrollYProgress: MotionValue<number>
  darkMode: boolean
}

export function FusionPayUseCases({ darkMode = false }: { darkMode: boolean }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const useCases: UseCase[] = [
    {
      title: "Freelancers",
      description: "Remote workers can receive payments from global clients without high fees or delays.",
      icon: <Users className="w-6 h-6" />,
      impact: "Saves up to 5% on each payment",
      color: "blue"
    },
    {
      title: "Migrant Workers",
      description: "Send money to family abroad instantly with significantly lower fees than traditional services.",
      icon: <HeartHandshake className="w-6 h-6" />,
      impact: "Delivers more money to loved ones",
      color: "purple"
    },
    {
      title: "Startups",
      description: "Pay remote teams efficiently across borders without complex banking setups.",
      icon: <Building className="w-6 h-6" />,
      impact: "Reduces payroll processing time by 80%",
      color: "teal"
    },
    {
      title: "NGOs",
      description: "Distribute global aid with full transparency and minimal fees.",
      icon: <Globe className="w-6 h-6" />,
      impact: "More funds reach those in need",
      color: "green"
    }
  ]

  return (
    <div ref={containerRef} className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCases.map((useCase, index) => (
          <UseCaseCard 
            key={index} 
            useCase={useCase} 
            index={index} 
            scrollYProgress={scrollYProgress}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  )
}

function UseCaseCard({ useCase, index, scrollYProgress, darkMode }: UseCaseCardProps) {
  // Calculate when this item should animate based on scroll position
  const startRange = index * 0.1
  const endRange = startRange + 0.2
  const animationProgress = useTransform(scrollYProgress, [startRange, endRange], [0, 1])
  
  // Get colors based on the useCase color and dark mode
  const getBgColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "bg-blue-900/20" : "bg-blue-50",
      purple: darkMode ? "bg-purple-900/20" : "bg-purple-50",
      green: darkMode ? "bg-green-900/20" : "bg-green-50",
      teal: darkMode ? "bg-teal-900/20" : "bg-teal-50"
    }
    return colors[color]
  }
  
  const getIconBgColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "bg-blue-800" : "bg-blue-500",
      purple: darkMode ? "bg-purple-800" : "bg-purple-500",
      green: darkMode ? "bg-green-800" : "bg-green-500",
      teal: darkMode ? "bg-teal-800" : "bg-teal-500"
    }
    return colors[color]
  }
  
  const getTextColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "text-blue-300" : "text-blue-700",
      purple: darkMode ? "text-purple-300" : "text-purple-700",
      green: darkMode ? "text-green-300" : "text-green-700",
      teal: darkMode ? "text-teal-300" : "text-teal-700"
    }
    return colors[color]
  }
  
  const getImpactBgColor = (color: ColorType): string => {
    const colors: Record<ColorType, string> = {
      blue: darkMode ? "bg-blue-800/30" : "bg-blue-100",
      purple: darkMode ? "bg-purple-800/30" : "bg-purple-100",
      green: darkMode ? "bg-green-800/30" : "bg-green-100",
      teal: darkMode ? "bg-teal-800/30" : "bg-teal-100"
    }
    return colors[color]
  }
  
  return (
    <motion.div 
      className={`p-6 rounded-xl ${getBgColor(useCase.color)} relative overflow-hidden`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 },
      }}
      style={{ 
        opacity: useTransform(animationProgress, [0, 1], [0.5, 1]),
        scale: useTransform(animationProgress, [0, 1], [0.95, 1])
      }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`${getIconBgColor(useCase.color)} text-white p-3 rounded-lg`}>
          {useCase.icon}
        </div>
        
        <div className="flex-1">
          <h3 className={`text-xl font-semibold mb-2 ${getTextColor(useCase.color)}`}>
            {useCase.title}
          </h3>
          
          <p className={`mb-4 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
            {useCase.description}
          </p>
          
          {/* Impact tag */}
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getImpactBgColor(useCase.color)} ${getTextColor(useCase.color)}`}>
            {useCase.impact}
          </div>
        </div>
      </div>
      
      {/* Animated progress line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
        style={{ 
          width: useTransform(animationProgress, [0, 1], ["0%", "100%"]),
          background: useCase.color === "blue" 
            ? "linear-gradient(to right, #3b82f6, #60a5fa)" 
            : useCase.color === "purple"
              ? "linear-gradient(to right, #8b5cf6, #a78bfa)"
              : useCase.color === "teal"
                ? "linear-gradient(to right, #14b8a6, #5eead4)"
                : "linear-gradient(to right, #10b981, #34d399)"
        }}
      />
      
      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -z-10"
        initial={{ opacity: 0, x: "-100%" }}
        whileHover={{
          opacity: 0.2,
          x: "100%",
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        }}
      />
    </motion.div>
  )
}

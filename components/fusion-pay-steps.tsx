"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  DollarSign, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight, 
  CheckCircle 
} from "lucide-react"

export function FusionPaySteps({ darkMode = false }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Create individual step progress values
  const step1Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const step2Progress = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const step3Progress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1])
  const step4Progress = useTransform(scrollYProgress, [0.75, 1], [0, 1])

  const steps = [
    {
      title: "User enters amount & selects currencies",
      description: "Simply select your source currency, amount, and destination currency.",
      icon: <DollarSign className="w-6 h-6" />,
      progress: step1Progress,
      color: "blue"
    },
    {
      title: "AI selects optimal stablecoin route",
      description: "Our AI automatically finds the most efficient path for your money.",
      icon: <Zap className="w-6 h-6" />,
      progress: step2Progress,
      color: "purple"
    },
    {
      title: "Sent via Base",
      description: "Transactions are processed securely on Base L2 for speed and low fees.",
      icon: <Shield className="w-6 h-6" />,
      progress: step3Progress,
      color: "teal"
    },
    {
      title: "Recipient receives fiat",
      description: "Money arrives in the recipient's local currency, ready to use.",
      icon: <Globe className="w-6 h-6" />,
      progress: step4Progress,
      color: "green"
    }
  ]

  return (
    <div ref={containerRef} className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <StepItem 
              key={index} 
              step={step} 
              index={index} 
              isLast={index === steps.length - 1}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StepItem({ step, index, isLast, darkMode }) {
  const isEven = index % 2 === 0
  
  // Get background and text colors based on the step color
  const getBgColor = (color) => {
    const colors = {
      blue: darkMode ? "bg-blue-900/20" : "bg-blue-50",
      purple: darkMode ? "bg-purple-900/20" : "bg-purple-50",
      teal: darkMode ? "bg-teal-900/20" : "bg-teal-50",
      green: darkMode ? "bg-green-900/20" : "bg-green-50"
    }
    return colors[color]
  }
  
  const getIconBgColor = (color) => {
    const colors = {
      blue: darkMode ? "bg-blue-800" : "bg-blue-500",
      purple: darkMode ? "bg-purple-800" : "bg-purple-500",
      teal: darkMode ? "bg-teal-800" : "bg-teal-500",
      green: darkMode ? "bg-green-800" : "bg-green-500"
    }
    return colors[color]
  }
  
  const getTextColor = (color) => {
    const colors = {
      blue: darkMode ? "text-blue-300" : "text-blue-700",
      purple: darkMode ? "text-purple-300" : "text-purple-700",
      teal: darkMode ? "text-teal-300" : "text-teal-700",
      green: darkMode ? "text-green-300" : "text-green-700"
    }
    return colors[color]
  }

  return (
    <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8 flex-wrap md:flex-nowrap`}>
      {/* Step number */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'}`}>
          {index + 1}
        </div>
        
        {!isLast && (
          <motion.div 
            className={`absolute top-full left-1/2 w-1 -translate-x-1/2 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}
            style={{ 
              height: 80,
              scaleY: step.progress
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-100px" }}
          />
        )}
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className={`flex-1 p-6 rounded-xl ${getBgColor(step.color)} relative overflow-hidden`}
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{
          opacity: step.progress
        }}
      >
        <div className="flex items-start gap-4">
          <div className={`${getIconBgColor(step.color)} text-white p-3 rounded-lg`}>
            {step.icon}
          </div>
          
          <div>
            <h3 className={`text-xl font-semibold mb-2 ${getTextColor(step.color)}`}>
              {step.title}
            </h3>
            <p className={darkMode ? "text-slate-300" : "text-slate-600"}>
              {step.description}
            </p>
            
            {/* Animation for completed step */}
            {isLast && (
              <motion.div 
                className="mt-4 flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ opacity: step.progress }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className={darkMode ? "text-green-400" : "text-green-600"}>
                  Funds delivered successfully
                </span>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Animated route line */}
        {index < 3 && (
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"
            style={{ 
              width: useTransform(step.progress, [0, 1], ["0%", "100%"])
            }}
          />
        )}
      </motion.div>
    </div>
  )
}

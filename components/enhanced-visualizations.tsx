"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowRight, Clock, CheckCircle, DollarSign, Building } from "lucide-react"
import { AnimatedSectionHeading } from "./animated-section-heading"

export function EnhancedVisualizations() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'fees' | 'speed'>('fees')
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Start animation
  useEffect(() => {
    if (!mounted) return
    
    const timer = setTimeout(() => {
      setIsAnimating(true)
      
      if (activeTab === 'speed') {
        animateSteps()
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [mounted, activeTab])
  
  // Animate through steps
  const animateSteps = () => {
    // Reset to first step
    setActiveStep(0)
    
    // Animate through steps
    for (let i = 1; i < 5; i++) {
      setTimeout(() => {
        setActiveStep(i)
      }, i * 1500)
    }
    
    // Reset animation after all steps
    setTimeout(() => {
      setActiveStep(0)
    }, 5 * 1500 + 2000)
  }
  
  const isDarkMode = mounted && theme === "dark"
  
  // Traditional bank transfer fees (percentage)
  const traditionalFeePercentage = 4.5
  const traditionalFeeAmount = 1000 * (traditionalFeePercentage / 100)
  const traditionalFinalAmount = 1000 - traditionalFeeAmount
  
  // FusionPay fees (percentage)
  const fusionPayFeePercentage = 0.8
  const fusionPayFeeAmount = 1000 * (fusionPayFeePercentage / 100)
  const fusionPayFinalAmount = 1000 - fusionPayFeeAmount
  
  // Calculate savings
  const savingsAmount = traditionalFeeAmount - fusionPayFeeAmount
  const savingsPercentage = ((traditionalFeeAmount - fusionPayFeeAmount) / traditionalFeeAmount) * 100
  
  // Traditional bank transfer steps
  const traditionalSteps = [
    { 
      name: "Initiation", 
      description: "Payment request submitted to bank", 
      duration: "Day 1", 
      icon: Clock 
    },
    { 
      name: "Bank Processing", 
      description: "Your bank processes the payment", 
      duration: "Day 1-2", 
      icon: Building 
    },
    { 
      name: "Correspondent Bank", 
      description: "Payment routed through intermediary", 
      duration: "Day 2-3", 
      icon: Building 
    },
    { 
      name: "Recipient Bank", 
      description: "Recipient's bank processes payment", 
      duration: "Day 3-4", 
      icon: Building 
    },
    { 
      name: "Completion", 
      description: "Funds available to recipient", 
      duration: "Day 4-5", 
      icon: CheckCircle 
    }
  ]
  
  // FusionPay transfer steps
  const fusionPaySteps = [
    { 
      name: "Initiation", 
      description: "Payment request submitted", 
      duration: "0 minutes", 
      icon: Clock 
    },
    { 
      name: "Stablecoin Conversion", 
      description: "Funds converted to stablecoin", 
      duration: "< 1 minute", 
      icon: ArrowRight 
    },
    { 
      name: "Base Network Transfer", 
      description: "Transfer via Base L2 network", 
      duration: "< 2 minutes", 
      icon: ArrowRight 
    },
    { 
      name: "Recipient Currency", 
      description: "Conversion to recipient currency", 
      duration: "< 1 minute", 
      icon: ArrowRight 
    },
    { 
      name: "Completion", 
      description: "Funds available to recipient", 
      duration: "< 5 minutes total", 
      icon: CheckCircle 
    }
  ]
  
  if (!mounted) return null
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedSectionHeading 
            title="Experience Cross-Border Payments" 
            subtitle="See how FusionPay transforms international money transfers with blockchain technology."
          />
        </div>
        
        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'fees' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('fees')}
            >
              Fee Comparison
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'speed' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('speed')}
            >
              Speed Timeline
            </button>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Fee Comparison Visualization */}
          {activeTab === 'fees' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Bank Transfer */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 text-center">
                  Traditional Bank
                </h4>
                
                <div className="relative h-64 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                  {/* Full amount bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-slate-300 dark:bg-slate-600 h-full w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
                        $1000
                      </span>
                    </div>
                  </div>
                  
                  {/* Fee amount (animated) */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 bg-red-500 dark:bg-red-700"
                    initial={{ height: "0%" }}
                    animate={{ 
                      height: isAnimating ? `${(traditionalFeePercentage / 100) * 100}%` : "0%" 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        Fee: ${traditionalFeeAmount}
                        <br />
                        ({traditionalFeePercentage}%)
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Final amount indicator */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 border-t-2 border-dashed border-slate-500 dark:border-slate-300 pointer-events-none"
                    initial={{ bottom: "0%" }}
                    animate={{ 
                      bottom: isAnimating ? `${(traditionalFeePercentage / 100) * 100}%` : "0%" 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  >
                    <div className="absolute -top-7 right-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm">
                        ${traditionalFinalAmount}
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                  <p>Recipient gets</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    ${traditionalFinalAmount}
                  </p>
                </div>
              </div>
              
              {/* FusionPay Transfer */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 text-center">
                  FusionPay
                </h4>
                
                <div className="relative h-64 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                  {/* Full amount bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-slate-300 dark:bg-slate-600 h-full w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
                        $1000
                      </span>
                    </div>
                  </div>
                  
                  {/* Fee amount (animated) */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 bg-blue-500 dark:bg-blue-600"
                    initial={{ height: "0%" }}
                    animate={{ 
                      height: isAnimating ? `${(fusionPayFeePercentage / 100) * 100}%` : "0%" 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        Fee: ${fusionPayFeeAmount}
                        <br />
                        ({fusionPayFeePercentage}%)
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Final amount indicator */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 border-t-2 border-dashed border-slate-500 dark:border-slate-300 pointer-events-none"
                    initial={{ bottom: "0%" }}
                    animate={{ 
                      bottom: isAnimating ? `${(fusionPayFeePercentage / 100) * 100}%` : "0%" 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  >
                    <div className="absolute -top-7 right-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm">
                        ${fusionPayFinalAmount}
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                  <p>Recipient gets</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${fusionPayFinalAmount}
                  </p>
                </div>
              </div>
              
              {/* Savings callout */}
              <motion.div 
                className="md:col-span-2 mt-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-400">
                      You Save
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Compared to traditional banks
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${savingsAmount}
                    </p>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      {savingsPercentage.toFixed(1)}% in fees
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Transaction Speed Timeline */}
          {activeTab === 'speed' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Bank Timeline */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 text-center">
                  Traditional Bank
                </h4>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  
                  {/* Timeline steps */}
                  {traditionalSteps.map((step, index) => {
                    const StepIcon = step.icon
                    
                    return (
                      <div key={index} className="relative flex items-start mb-8 last:mb-0">
                        {/* Step icon */}
                        <motion.div 
                          className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 ${
                            index <= activeStep 
                              ? "bg-red-100 border-red-500 text-red-600 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400" 
                              : "bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-600"
                          }`}
                          animate={{
                            scale: index === activeStep ? [1, 1.1, 1] : 1,
                            borderColor: index <= activeStep ? ["#f87171", "#ef4444", "#f87171"] : undefined
                          }}
                          transition={{
                            duration: index === activeStep ? 1 : 0.3,
                            repeat: index === activeStep ? Infinity : 0,
                            repeatDelay: 1
                          }}
                        >
                          <StepIcon size={24} />
                        </motion.div>
                        
                        {/* Step content */}
                        <div className="ml-4 pt-1">
                          <motion.h5 
                            className={`font-medium ${
                              index <= activeStep 
                                ? "text-slate-900 dark:text-white" 
                                : "text-slate-500 dark:text-slate-400"
                            }`}
                            animate={{
                              color: index <= activeStep ? undefined : "#94a3b8"
                            }}
                          >
                            {step.name}
                          </motion.h5>
                          <motion.p 
                            className={`text-sm ${
                              index <= activeStep 
                                ? "text-slate-700 dark:text-slate-300" 
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {step.description}
                          </motion.p>
                          <motion.span 
                            className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${
                              index <= activeStep 
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {step.duration}
                          </motion.span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Total time indicator */}
                <div className="text-center mt-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                  <p className="text-sm text-red-700 dark:text-red-400">Total Time</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">3-5 Days</p>
                </div>
              </div>
              
              {/* FusionPay Timeline */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 text-center">
                  FusionPay
                </h4>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  
                  {/* Timeline steps */}
                  {fusionPaySteps.map((step, index) => {
                    const StepIcon = step.icon
                    
                    return (
                      <div key={index} className="relative flex items-start mb-8 last:mb-0">
                        {/* Step icon */}
                        <motion.div 
                          className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 ${
                            index <= activeStep 
                              ? "bg-blue-100 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400" 
                              : "bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-600"
                          }`}
                          animate={{
                            scale: index === activeStep ? [1, 1.1, 1] : 1,
                            borderColor: index <= activeStep ? ["#60a5fa", "#3b82f6", "#60a5fa"] : undefined
                          }}
                          transition={{
                            duration: index === activeStep ? 0.5 : 0.3,
                            repeat: index === activeStep ? Infinity : 0,
                            repeatDelay: 0.5
                          }}
                        >
                          <StepIcon size={24} />
                        </motion.div>
                        
                        {/* Step content */}
                        <div className="ml-4 pt-1">
                          <motion.h5 
                            className={`font-medium ${
                              index <= activeStep 
                                ? "text-slate-900 dark:text-white" 
                                : "text-slate-500 dark:text-slate-400"
                            }`}
                            animate={{
                              color: index <= activeStep ? undefined : "#94a3b8"
                            }}
                          >
                            {step.name}
                          </motion.h5>
                          <motion.p 
                            className={`text-sm ${
                              index <= activeStep 
                                ? "text-slate-700 dark:text-slate-300" 
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {step.description}
                          </motion.p>
                          <motion.span 
                            className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${
                              index <= activeStep 
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {step.duration}
                          </motion.span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Total time indicator */}
                <div className="text-center mt-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <p className="text-sm text-blue-700 dark:text-blue-400">Total Time</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Under 5 Minutes</p>
                </div>
              </div>
              
              {/* Animated clock comparison */}
              <motion.div 
                className="md:col-span-2 mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                    <span className="text-red-600 dark:text-red-400 line-through mr-2">3-5 Days</span>
                    →
                    <span className="text-blue-600 dark:text-blue-400 ml-2">5 Minutes</span>
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    That's <span className="font-bold">1,440 times faster</span> than traditional banks
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

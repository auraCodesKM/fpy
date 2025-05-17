"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowRight, Clock, CheckCircle, DollarSign, Building, Globe, Wallet, Zap, PieChart, BarChart4, CreditCard, Percent } from "lucide-react"
import { AnimatedSectionHeading } from "./animated-section-heading"

export function EnhancedVisualizations() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'fees' | 'speed' | 'journey' | 'blockchain'>('fees')
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [hoverInfo, setHoverInfo] = useState<{title: string, content: string} | null>(null)
  
  // Refs for scroll animations
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Start animation when section comes into view
  useEffect(() => {
    if (!mounted || !isInView) return
    
    const timer = setTimeout(() => {
      setIsAnimating(true)
      
      if (activeTab === 'speed' || activeTab === 'journey') {
        animateSteps()
      }
    }, 300)
    
    return () => clearTimeout(timer)
  }, [mounted, activeTab, isInView])
  
  // Reset animation when tab changes
  useEffect(() => {
    setIsAnimating(false)
    setActiveStep(0)
    
    const timer = setTimeout(() => {
      setIsAnimating(true)
      
      if (activeTab === 'speed' || activeTab === 'journey') {
        animateSteps()
      }
    }, 300)
    
    return () => clearTimeout(timer)
  }, [activeTab])
  
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
  
  // Auto-cycle through tabs every 15 seconds
  useEffect(() => {
    if (!mounted || !isInView) return
    
    const tabOrder: Array<'fees' | 'speed' | 'journey' | 'blockchain'> = ['fees', 'speed', 'journey', 'blockchain']
    
    const interval = setInterval(() => {
      const currentIndex = tabOrder.indexOf(activeTab)
      const nextIndex = (currentIndex + 1) % tabOrder.length
      setActiveTab(tabOrder[nextIndex])
    }, 15000)
    
    return () => clearInterval(interval)
  }, [mounted, activeTab, isInView])
  
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedSectionHeading 
            title="Experience Cross-Border Payments" 
            subtitle="See how FusionPay transforms international money transfers with blockchain technology."
          />
        </div>
        
        {/* Tab navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 shadow-md">
            <button
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all flex items-center ${
                activeTab === 'fees' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('fees')}
            >
              <Percent className="mr-2 h-4 w-4" />
              Fee Comparison
            </button>
            <button
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all flex items-center ${
                activeTab === 'speed' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('speed')}
            >
              <Clock className="mr-2 h-4 w-4" />
              Speed Timeline
            </button>
            <button
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all flex items-center ${
                activeTab === 'journey' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('journey')}
            >
              <Wallet className="mr-2 h-4 w-4" />
              User Journey
            </button>
            <button
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all flex items-center ${
                activeTab === 'blockchain' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('blockchain')}
            >
              <Globe className="mr-2 h-4 w-4" />
              Blockchain Tech
            </button>
          </div>
        </div>
        
        {/* Hover information tooltip */}
        <AnimatePresence>
          {hoverInfo && (
            <motion.div 
              className="fixed z-50 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 max-w-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{ 
                left: '50%', 
                bottom: '2rem',
                transform: 'translateX(-50%)'
              }}
            >
              <h4 className="font-medium text-slate-900 dark:text-white mb-1">{hoverInfo.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">{hoverInfo.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="max-w-5xl mx-auto">
          {/* Fee Comparison Visualization */}
          {activeTab === 'fees' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Traditional Bank Transfer */}
              <div className="space-y-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
                <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 text-center flex items-center justify-center">
                  <Building className="mr-2 h-5 w-5 text-red-500 dark:text-red-400" />
                  Traditional Bank
                </h4>
                
                <div 
                  className="relative h-64 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden"
                  onMouseEnter={() => setHoverInfo({
                    title: "Traditional Bank Fees",
                    content: `Banks typically charge ${traditionalFeePercentage}% for international transfers, plus hidden exchange rate markups and correspondent bank fees.`
                  })}
                  onMouseLeave={() => setHoverInfo(null)}
                >
                  {/* Full amount bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-slate-300 dark:bg-slate-600 h-full w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
                        $1000
                      </span>
                    </div>
                  </div>
                  
                  {/* Fee breakdown segments */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 bg-red-500 dark:bg-red-700"
                    initial={{ height: "0%" }}
                    animate={{ 
                      height: isAnimating ? `${(traditionalFeePercentage / 100) * 100}%` : "0%" 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    {/* Wire fee */}
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 bg-red-600 dark:bg-red-800 border-t border-red-400 dark:border-red-600"
                      initial={{ height: "0%" }}
                      animate={{ 
                        height: isAnimating ? "30%" : "0%" 
                      }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          Wire Fee
                        </span>
                      </div>
                    </motion.div>
                    
                    {/* Exchange rate markup */}
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 bg-red-700 dark:bg-red-900 border-t border-red-500 dark:border-red-700"
                      initial={{ height: "0%" }}
                      animate={{ 
                        height: isAnimating ? "15%" : "0%" 
                      }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          FX Markup
                        </span>
                      </div>
                    </motion.div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        Total Fee: ${traditionalFeeAmount}
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
                      <motion.span 
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm"
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 1px 2px rgba(0,0,0,0.1)",
                            "0 4px 8px rgba(0,0,0,0.2)",
                            "0 1px 2px rgba(0,0,0,0.1)"
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          repeatDelay: 1 
                        }}
                      >
                        ${traditionalFinalAmount}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                  <p>Recipient gets</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    ${traditionalFinalAmount}
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                    After 3-5 business days
                  </p>
                </div>
              </div>
              
              {/* FusionPay Transfer */}
              <div className="space-y-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
                <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 text-center flex items-center justify-center">
                  <Zap className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
                  FusionPay
                </h4>
                
                <div 
                  className="relative h-64 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden"
                  onMouseEnter={() => setHoverInfo({
                    title: "FusionPay Fees",
                    content: `FusionPay charges only ${fusionPayFeePercentage}% for international transfers with no hidden fees and real-time exchange rates.`
                  })}
                  onMouseLeave={() => setHoverInfo(null)}
                >
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
                      <motion.span 
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm"
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 1px 2px rgba(0,0,0,0.1)",
                            "0 4px 8px rgba(0,0,0,0.2)",
                            "0 1px 2px rgba(0,0,0,0.1)"
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          repeatDelay: 1 
                        }}
                      >
                        ${fusionPayFinalAmount}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                  <p>Recipient gets</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${fusionPayFinalAmount}
                  </p>
                  <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                    In under 5 minutes
                  </p>
                </div>
              </div>
              
              {/* Savings callout */}
              <motion.div 
                className="md:col-span-2 mt-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                onMouseEnter={() => setHoverInfo({
                  title: "Your Savings",
                  content: `Save ${savingsPercentage.toFixed(1)}% on fees and get your money delivered up to 1,440 times faster with FusionPay.`
                })}
                onMouseLeave={() => setHoverInfo(null)}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-400 text-lg">
                      You Save With FusionPay
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Compared to traditional banks
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-green-700 dark:text-green-300">Fee Savings</p>
                      <motion.p 
                        className="text-xl font-bold text-green-600 dark:text-green-400"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        ${savingsAmount}
                      </motion.p>
                      <p className="text-xs font-medium text-green-700 dark:text-green-300">
                        {savingsPercentage.toFixed(1)}% less
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-700 dark:text-green-300">Time Savings</p>
                      <motion.p 
                        className="text-xl font-bold text-green-600 dark:text-green-400"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
                      >
                        3-5 Days
                      </motion.p>
                      <p className="text-xs font-medium text-green-700 dark:text-green-300">
                        1,440x faster
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Transaction Speed Timeline */}
          {activeTab === 'speed' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Traditional Bank Timeline */}
              <div className="space-y-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
                <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 text-center flex items-center justify-center">
                  <Building className="mr-2 h-5 w-5 text-red-500 dark:text-red-400" />
                  Traditional Bank Transfer
                </h4>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  
                  {/* Timeline steps */}
                  {traditionalSteps.map((step, index) => {
                    const StepIcon = step.icon
                    
                    return (
                      <div 
                        key={index} 
                        className="relative flex items-start mb-8 last:mb-0"
                        onMouseEnter={() => setHoverInfo({
                          title: step.name,
                          content: `${step.description}. Typically takes ${step.duration}.`
                        })}
                        onMouseLeave={() => setHoverInfo(null)}
                      >
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
                  <motion.p 
                    className="text-lg font-bold text-red-600 dark:text-red-400"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    3-5 Days
                  </motion.p>
                </div>
              </div>
              
              {/* FusionPay Timeline */}
              <div className="space-y-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
                <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 text-center flex items-center justify-center">
                  <Zap className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
                  FusionPay Transfer
                </h4>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  
                  {/* Timeline steps */}
                  {fusionPaySteps.map((step, index) => {
                    const StepIcon = step.icon
                    
                    return (
                      <div 
                        key={index} 
                        className="relative flex items-start mb-8 last:mb-0"
                        onMouseEnter={() => setHoverInfo({
                          title: step.name,
                          content: `${step.description}. Only takes ${step.duration}.`
                        })}
                        onMouseLeave={() => setHoverInfo(null)}
                      >
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
                  <motion.p 
                    className="text-lg font-bold text-blue-600 dark:text-blue-400"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                  >
                    Under 5 Minutes
                  </motion.p>
                </div>
              </div>
              
              {/* Animated clock comparison */}
              <motion.div 
                className="md:col-span-2 mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-900/30 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1 }}
                onMouseEnter={() => setHoverInfo({
                  title: "Speed Comparison",
                  content: "FusionPay's blockchain technology reduces transfer times from days to minutes, making it up to 1,440 times faster than traditional banks."
                })}
                onMouseLeave={() => setHoverInfo(null)}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                      <span className="text-red-600 dark:text-red-400 line-through mr-2">3-5 Days</span>
                      →
                      <span className="text-blue-600 dark:text-blue-400 ml-2">5 Minutes</span>
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      That's <span className="font-bold">1,440 times faster</span> than traditional banks
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Traditional bank clock */}
                    <div className="text-center">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-700 flex items-center justify-center text-red-600 dark:text-red-400 relative"
                        animate={{
                          rotate: 360
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock size={24} />
                        <motion.div 
                          className="absolute h-[6px] w-[1px] bg-red-600 dark:bg-red-400 top-1/2 left-1/2 origin-bottom"
                          style={{ transformOrigin: "50% 0%" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                      <p className="text-xs mt-1 text-red-600 dark:text-red-400">Days</p>
                    </div>
                    
                    {/* FusionPay clock */}
                    <div className="text-center">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-700 flex items-center justify-center text-blue-600 dark:text-blue-400 relative"
                        animate={{
                          rotate: 360
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap size={24} />
                        <motion.div 
                          className="absolute h-[6px] w-[1px] bg-blue-600 dark:bg-blue-400 top-1/2 left-1/2 origin-bottom"
                          style={{ transformOrigin: "50% 0%" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                      <p className="text-xs mt-1 text-blue-600 dark:text-blue-400">Minutes</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* User Journey Animation */}
          {activeTab === 'journey' && (
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-medium text-slate-800 dark:text-slate-200 text-center mb-8 flex items-center justify-center">
                <Wallet className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
                User Payment Journey
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1: Account Setup */}
                <motion.div 
                  className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-5 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  onMouseEnter={() => setHoverInfo({
                    title: "Account Setup",
                    content: "Create your FusionPay account in minutes with just an email and phone verification. No lengthy paperwork or waiting periods."
                  })}
                  onMouseLeave={() => setHoverInfo(null)}
                >
                  <motion.div 
                    className="absolute -right-4 -top-4 w-20 h-20 bg-blue-400/20 dark:bg-blue-500/20 rounded-full z-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                      <CreditCard size={24} />
                    </div>
                    
                    <h5 className="text-lg font-medium text-slate-900 dark:text-white mb-2">1. Account Setup</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Create your account and link your preferred payment method in minutes.
                    </p>
                    
                    <motion.div 
                      className="mt-4 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: isAnimating ? '100%' : 0 }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
                
                {/* Step 2: Payment Initiation */}
                <motion.div 
                  className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-5 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  onMouseEnter={() => setHoverInfo({
                    title: "Payment Initiation",
                    content: "Enter recipient details and amount. FusionPay shows you the exact exchange rate and fee upfront with no hidden costs."
                  })}
                  onMouseLeave={() => setHoverInfo(null)}
                >
                  <motion.div 
                    className="absolute -right-4 -top-4 w-20 h-20 bg-blue-400/20 dark:bg-blue-500/20 rounded-full z-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                      <DollarSign size={24} />
                    </div>
                    
                    <h5 className="text-lg font-medium text-slate-900 dark:text-white mb-2">2. Payment Details</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Enter recipient information and payment amount with real-time exchange rates.
                    </p>
                    
                    <motion.div 
                      className="mt-4 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: isAnimating ? '100%' : 0 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </div>
                </motion.div>
                
                {/* Step 3: Instant Transfer */}
                <motion.div 
                  className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-5 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  onMouseEnter={() => setHoverInfo({
                    title: "Instant Transfer",
                    content: "Confirm and watch your payment arrive in minutes, not days. Track the entire process in real-time on the blockchain."
                  })}
                  onMouseLeave={() => setHoverInfo(null)}
                >
                  <motion.div 
                    className="absolute -right-4 -top-4 w-20 h-20 bg-blue-400/20 dark:bg-blue-500/20 rounded-full z-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                      <Zap size={24} />
                    </div>
                    
                    <h5 className="text-lg font-medium text-slate-900 dark:text-white mb-2">3. Instant Transfer</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Confirm and watch your payment arrive in minutes with real-time tracking.
                    </p>
                    
                    <motion.div 
                      className="mt-4 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: isAnimating ? '100%' : 0 }}
                      transition={{ duration: 1.5, delay: 1.4 }}
                    />
                  </div>
                </motion.div>
              </div>
              
              {/* User Journey Animation */}
              <div className="mt-10 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h5 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Experience The Difference</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      FusionPay combines the best of traditional finance and blockchain technology to create a seamless, secure, and affordable cross-border payment experience.
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle size={12} className="mr-1" /> No Hidden Fees
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        <CheckCircle size={12} className="mr-1" /> Real-time Tracking
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        <CheckCircle size={12} className="mr-1" /> Secure Blockchain
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <motion.div 
                      className="w-64 h-64 relative"
                      animate={{
                        rotateY: 360
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Animated payment flow visualization */}
                      <motion.div 
                        className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 bg-white dark:bg-slate-800 rounded-full border-2 border-blue-500 dark:border-blue-700 flex items-center justify-center shadow-lg z-20"
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 4px 6px rgba(0,0,0,0.1)",
                            "0 10px 15px rgba(59,130,246,0.3)",
                            "0 4px 6px rgba(0,0,0,0.1)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Wallet className="text-blue-600 dark:text-blue-400" size={24} />
                      </motion.div>
                      
                      {/* Orbiting elements */}
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <motion.div 
                          key={i}
                          className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center"
                          style={{
                            transform: `rotate(${angle}deg) translateX(100px) rotate(-${angle}deg)`
                          }}
                          animate={{
                            rotate: [angle, angle + 360]
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          {i % 5 === 0 ? <DollarSign size={16} className="text-green-500" /> : 
                           i % 3 === 0 ? <Globe size={16} className="text-blue-500" /> : 
                           i % 2 === 0 ? <Zap size={16} className="text-amber-500" /> : 
                           <CreditCard size={16} className="text-purple-500" />}
                        </motion.div>
                      ))}
                      
                      {/* Connection lines */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 dark:border-slate-700" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Blockchain Technology Visualization */}
          {activeTab === 'blockchain' && (
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-medium text-slate-800 dark:text-slate-200 text-center mb-8 flex items-center justify-center">
                <Globe className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
                Blockchain Technology
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h5 className="text-lg font-medium text-slate-900 dark:text-white">How FusionPay Uses Blockchain</h5>
                  <p className="text-slate-600 dark:text-slate-300">
                    FusionPay leverages Base, a secure Layer 2 blockchain built on Ethereum, to facilitate fast, low-cost cross-border payments while maintaining the highest security standards.
                  </p>
                  
                  <div className="space-y-3 mt-6">
                    <div 
                      className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      onMouseEnter={() => setHoverInfo({
                        title: "Instant Settlement",
                        content: "Transactions are confirmed in seconds on the Base network, compared to days with traditional banking systems."
                      })}
                      onMouseLeave={() => setHoverInfo(null)}
                    >
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                        <Zap size={16} />
                      </div>
                      <div>
                        <h6 className="font-medium text-slate-900 dark:text-white">Instant Settlement</h6>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Transactions confirmed in seconds</p>
                      </div>
                    </div>
                    
                    <div 
                      className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      onMouseEnter={() => setHoverInfo({
                        title: "Minimal Fees",
                        content: "Base's Layer 2 technology reduces gas fees to a fraction of traditional blockchain costs, allowing us to offer much lower fees than banks."
                      })}
                      onMouseLeave={() => setHoverInfo(null)}
                    >
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                        <DollarSign size={16} />
                      </div>
                      <div>
                        <h6 className="font-medium text-slate-900 dark:text-white">Minimal Fees</h6>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Layer 2 technology reduces costs</p>
                      </div>
                    </div>
                    
                    <div 
                      className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      onMouseEnter={() => setHoverInfo({
                        title: "Transparent & Secure",
                        content: "Every transaction is recorded on the blockchain, providing complete transparency while maintaining the highest security standards."
                      })}
                      onMouseLeave={() => setHoverInfo(null)}
                    >
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <h6 className="font-medium text-slate-900 dark:text-white">Transparent & Secure</h6>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Immutable record of all transactions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Blockchain Visualization */}
                <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
                  {/* Blockchain nodes and connections */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-md">
                      {/* Central node */}
                      <motion.div 
                        className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-lg flex items-center justify-center z-20"
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 4px 6px rgba(0,0,0,0.1)",
                            "0 10px 15px rgba(59,130,246,0.3)",
                            "0 4px 6px rgba(0,0,0,0.1)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <span className="text-white font-bold">Base</span>
                      </motion.div>
                      
                      {/* Blockchain nodes */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                        const distance = 120
                        const x = Math.cos(angle * Math.PI / 180) * distance
                        const y = Math.sin(angle * Math.PI / 180) * distance
                        
                        return (
                          <motion.div 
                            key={i}
                            className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 bg-white dark:bg-slate-800 rounded-md shadow-md flex items-center justify-center z-10"
                            style={{
                              transform: `translate(${x}px, ${y}px)`
                            }}
                            animate={{
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                "0 2px 4px rgba(0,0,0,0.1)",
                                "0 4px 8px rgba(0,0,0,0.2)",
                                "0 2px 4px rgba(0,0,0,0.1)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          >
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Block {i+1}</span>
                          </motion.div>
                        )
                      })}
                      
                      {/* Animated transactions */}
                      {[30, 75, 120, 165, 210, 255, 300, 345].map((angle, i) => {
                        const startDistance = 60
                        const endDistance = 120
                        
                        const startX = Math.cos(angle * Math.PI / 180) * startDistance
                        const startY = Math.sin(angle * Math.PI / 180) * startDistance
                        
                        const endX = Math.cos(angle * Math.PI / 180) * endDistance
                        const endY = Math.sin(angle * Math.PI / 180) * endDistance
                        
                        return (
                          <motion.div 
                            key={`tx-${i}`}
                            className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-green-500 dark:bg-green-400 rounded-full z-30"
                            initial={{
                              x: startX,
                              y: startY,
                              opacity: 0
                            }}
                            animate={{
                              x: [startX, endX],
                              y: [startY, endY],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: i * 0.5,
                              ease: "easeInOut"
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Overlay text */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-100/80 to-transparent dark:from-slate-800/80 p-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
                      Transactions are verified and processed in real-time on the Base network
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Comparison with traditional systems */}
              <div className="mt-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md">
                <h5 className="text-lg font-medium text-slate-900 dark:text-white mb-4 text-center">Blockchain vs Traditional Banking</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <h6 className="font-medium text-slate-900 dark:text-white mb-2">Security</h6>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">FusionPay: Cryptographic security</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-600 dark:text-red-400">Banks: Centralized security</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h6 className="font-medium text-slate-900 dark:text-white mb-2">Transparency</h6>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">FusionPay: 100% transparent</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-600 dark:text-red-400">Banks: Limited visibility</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h6 className="font-medium text-slate-900 dark:text-white mb-2">Accessibility</h6>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">FusionPay: 24/7 global access</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-600 dark:text-red-400">Banks: Limited by business hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  CheckCircle, 
  Loader2, 
  ArrowRight, 
  Brain, 
  Zap, 
  Shield, 
  Globe, 
  Info
} from "lucide-react"

export function FusionPaySimulator({ darkMode = false }) {
  const [amount, setAmount] = useState("500")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [sourceCurrency, setSourceCurrency] = useState("gbp")
  const [targetCurrency, setTargetCurrency] = useState("inr")
  const [showRateInfo, setShowRateInfo] = useState(false)

  const steps = [
    { 
      title: "AI Selecting Optimal Route", 
      icon: <Brain className="w-5 h-5" />,
      detail: "Finding the most efficient stablecoin path"
    },
    { 
      title: "Converting to USDC", 
      icon: <Zap className="w-5 h-5" />,
      detail: "Swapping source currency to stablecoin"
    },
    { 
      title: "Sending via Base L2", 
      icon: <Shield className="w-5 h-5" />,
      detail: "Fast, secure transaction on Base network"
    },
    { 
      title: "Converting to Local Currency", 
      icon: <Globe className="w-5 h-5" />,
      detail: "Swapping USDC to destination currency"
    }
  ]

  // Exchange rates for different currency pairs
  const exchangeRates = {
    usd: {
      inr: 83.25,
      php: 56.78,
      mxn: 16.92,
      brl: 5.04,
      ngn: 1450.5,
      zar: 18.15,
    },
    eur: {
      inr: 90.45,
      php: 61.72,
      mxn: 18.4,
      brl: 5.48,
      ngn: 1578.25,
      zar: 19.75,
    },
    gbp: {
      inr: 105.3,
      php: 71.85,
      mxn: 21.42,
      brl: 6.38,
      ngn: 1837.2,
      zar: 22.98,
    },
    cad: {
      inr: 61.8,
      php: 42.15,
      mxn: 12.58,
      brl: 3.74,
      ngn: 1078.5,
      zar: 13.48,
    }
  }

  const fee = Number.parseFloat(amount) * 0.005 // 0.5% fee
  const rate =
    exchangeRates[sourceCurrency as keyof typeof exchangeRates]?.[targetCurrency as keyof (typeof exchangeRates)["usd"]] || 1
  const recipientGets = (Number.parseFloat(amount) - fee) * rate

  // Currency symbols and flags
  const currencyInfo = {
    usd: { symbol: "$", flag: "🇺🇸", name: "US Dollar" },
    eur: { symbol: "€", flag: "🇪🇺", name: "Euro" },
    gbp: { symbol: "£", flag: "🇬🇧", name: "British Pound" },
    cad: { symbol: "C$", flag: "🇨🇦", name: "Canadian Dollar" },
    inr: { symbol: "₹", flag: "🇮🇳", name: "Indian Rupee" },
    php: { symbol: "₱", flag: "🇵🇭", name: "Philippine Peso" },
    mxn: { symbol: "MX$", flag: "🇲🇽", name: "Mexican Peso" },
    brl: { symbol: "R$", flag: "🇧🇷", name: "Brazilian Real" },
    ngn: { symbol: "₦", flag: "🇳🇬", name: "Nigerian Naira" },
    zar: { symbol: "R", flag: "🇿🇦", name: "South African Rand" },
  }

  const getInfo = (code) => {
    return currencyInfo[code as keyof typeof currencyInfo] || { symbol: code.toUpperCase(), flag: "🌐", name: code.toUpperCase() }
  }

  const handleSendPayment = () => {
    setIsProcessing(true)
    setCurrentStep(0)
    setIsComplete(false)
    
    // First simulate AI thinking
    setIsAiThinking(true)
    
    setTimeout(() => {
      setIsAiThinking(false)
      
      // Then simulate the steps with delays
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval)
            setTimeout(() => {
              setIsComplete(true)
              setIsProcessing(false)
            }, 1000)
            return prev
          }
          return prev + 1
        })
      }, 1500)
    }, 2000)
  }

  const cardBg = darkMode ? "bg-slate-800" : "bg-white"
  const textColor = darkMode ? "text-white" : "text-slate-900"
  const mutedTextColor = darkMode ? "text-slate-400" : "text-slate-500"
  const borderColor = darkMode ? "border-slate-700" : "border-slate-200"
  const inputBg = darkMode ? "bg-slate-700" : "bg-white"
  const inputBorder = darkMode ? "border-slate-600" : "border-slate-300"
  const stepBg = darkMode ? "bg-slate-700" : "bg-slate-50"
  const activeStepBg = darkMode ? "bg-blue-900/30" : "bg-blue-50"
  const completedStepBg = darkMode ? "bg-green-900/30" : "bg-green-50"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className={`p-6 shadow-md ${cardBg} ${borderColor} border`}>
        <h3 className={`text-xl font-semibold mb-6 ${textColor}`}>Send Payment</h3>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColor}`}>You Send</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`flex-1 ${inputBg} ${inputBorder} ${textColor}`}
                disabled={isProcessing}
              />
              <Select 
                defaultValue={sourceCurrency} 
                disabled={isProcessing} 
                onValueChange={(value) => setSourceCurrency(value)}
              >
                <SelectTrigger className={`w-32 ${inputBg} ${inputBorder} ${textColor}`}>
                  <SelectValue placeholder="GBP" />
                </SelectTrigger>
                <SelectContent className={darkMode ? "bg-slate-800 border-slate-700" : ""}>
                  <SelectItem value="gbp">{getInfo("gbp").flag} GBP</SelectItem>
                  <SelectItem value="usd">{getInfo("usd").flag} USD</SelectItem>
                  <SelectItem value="eur">{getInfo("eur").flag} EUR</SelectItem>
                  <SelectItem value="cad">{getInfo("cad").flag} CAD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${textColor}`}>Recipient Gets</label>
            <div className="flex gap-2">
              <Input 
                type="text" 
                value={recipientGets.toFixed(2)} 
                readOnly 
                className={`flex-1 ${inputBg} ${inputBorder} ${textColor}`} 
              />
              <Select 
                defaultValue={targetCurrency} 
                disabled={isProcessing} 
                onValueChange={(value) => setTargetCurrency(value)}
              >
                <SelectTrigger className={`w-32 ${inputBg} ${inputBorder} ${textColor}`}>
                  <SelectValue placeholder="INR" />
                </SelectTrigger>
                <SelectContent className={darkMode ? "bg-slate-800 border-slate-700" : ""}>
                  <SelectItem value="inr">{getInfo("inr").flag} INR</SelectItem>
                  <SelectItem value="php">{getInfo("php").flag} PHP</SelectItem>
                  <SelectItem value="mxn">{getInfo("mxn").flag} MXN</SelectItem>
                  <SelectItem value="brl">{getInfo("brl").flag} BRL</SelectItem>
                  <SelectItem value="ngn">{getInfo("ngn").flag} NGN</SelectItem>
                  <SelectItem value="zar">{getInfo("zar").flag} ZAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-slate-700" : "bg-blue-50"} relative`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">AI-Optimized Route:</span>
                <div className="flex items-center">
                  <span className="mx-1">{getInfo(sourceCurrency).flag}</span>
                  <ArrowRight className="w-3 h-3 mx-1" />
                  <span className="mx-1">💠</span>
                  <ArrowRight className="w-3 h-3 mx-1" />
                  <span className="mx-1">🔵</span>
                  <ArrowRight className="w-3 h-3 mx-1" />
                  <span className="mx-1">{getInfo(targetCurrency).flag}</span>
                </div>
              </div>
              <button 
                className="text-blue-500 hover:text-blue-600"
                onClick={() => setShowRateInfo(!showRateInfo)}
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
            
            <AnimatePresence>
              {showRateInfo && (
                <motion.div 
                  className="mt-3 pt-3 border-t border-blue-200 text-sm"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between mb-1">
                    <span className={mutedTextColor}>Fee (0.5%)</span>
                    <span className="font-medium">
                      {getInfo(sourceCurrency).symbol}
                      {fee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={mutedTextColor}>Exchange Rate</span>
                    <span className="font-medium">
                      1 {sourceCurrency.toUpperCase()} = {rate.toFixed(2)} {targetCurrency.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className={mutedTextColor}>
                      Powered by Chainlink Oracle (simulated)
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: isProcessing ? 1 : 1.03 }} whileTap={{ scale: isProcessing ? 1 : 0.97 }}>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 mt-2 relative overflow-hidden"
              onClick={handleSendPayment}
              disabled={isProcessing}
            >
              {/* Shine effect */}
              {!isProcessing && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
                  animate={{
                    opacity: [0, 0.15, 0],
                    left: ["-100%", "100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                />
              )}
              {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Send Payment
            </Button>
          </motion.div>
        </div>
      </Card>

      <Card className={`p-6 shadow-md ${cardBg} ${borderColor} border h-full`}>
        <h3 className={`text-xl font-semibold mb-6 ${textColor}`}>Transaction Progress</h3>

        {!isProcessing && !isComplete ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div
              className={`w-16 h-16 rounded-full ${darkMode ? "bg-slate-700" : "bg-slate-100"} flex items-center justify-center mb-4`}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
            </motion.div>
            <motion.p
              className={`text-center ${mutedTextColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Enter an amount and click "Send Payment" to see the transaction flow.
            </motion.p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* AI thinking animation */}
            <AnimatePresence>
              {isAiThinking && (
                <motion.div
                  className={`p-4 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-50"} border ${darkMode ? "border-purple-800/30" : "border-purple-100"} flex items-center gap-3`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Brain className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-500"}`} />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          `0 0 0 2px ${darkMode ? "rgba(192, 132, 252, 0)" : "rgba(192, 132, 252, 0)"}`,
                          `0 0 0 6px ${darkMode ? "rgba(192, 132, 252, 0.2)" : "rgba(192, 132, 252, 0.2)"}`,
                          `0 0 0 2px ${darkMode ? "rgba(192, 132, 252, 0)" : "rgba(192, 132, 252, 0)"}`,
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                      AI Optimizing Route
                    </div>
                    <div className={`text-sm ${darkMode ? "text-purple-300/70" : "text-purple-600"}`}>
                      Finding the most efficient path for your money...
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
                  index < currentStep
                    ? `${completedStepBg} border ${darkMode ? "border-green-800/30" : "border-green-100"}`
                    : index === currentStep && !isAiThinking
                      ? `${activeStepBg} border ${darkMode ? "border-blue-800/30" : "border-blue-100"}`
                      : `${stepBg} border ${darkMode ? "border-slate-600" : "border-slate-200"}`
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isAiThinking && index === 0 ? 0.5 : 1, 
                  x: 0,
                  height: "auto"
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {index < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                ) : index === currentStep && !isAiThinking ? (
                  <motion.div
                    className={`w-5 h-5 rounded-full ${darkMode ? "bg-blue-500" : "bg-blue-500"}`}
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                ) : (
                  <div className={`w-5 h-5 rounded-full ${darkMode ? "bg-slate-600" : "bg-slate-300"}`} />
                )}
                
                <div>
                  <div className={index <= currentStep && !isAiThinking ? textColor : mutedTextColor}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${index <= currentStep && !isAiThinking ? mutedTextColor : (darkMode ? "text-slate-500" : "text-slate-400")}`}>
                    {step.detail}
                  </div>
                </div>

                {index === currentStep && !isAiThinking && (
                  <motion.div
                    className="ml-auto"
                    animate={{
                      x: [0, 5, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Completion message */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  className={`mt-6 p-4 ${darkMode ? "bg-green-900/20 border-green-800/30" : "bg-green-50 border-green-100"} border rounded-lg text-center`}
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  </motion.div>
                  <motion.p
                    className={`font-medium ${darkMode ? "text-green-400" : "text-green-800"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    Transaction Complete!
                  </motion.p>
                  <motion.p
                    className={`text-sm ${darkMode ? "text-green-400/80" : "text-green-600"} mt-1`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    {getInfo(sourceCurrency).symbol}{amount} has been sent as {getInfo(targetCurrency).symbol}{recipientGets.toFixed(2)}
                  </motion.p>
                  <motion.div
                    className="mt-3 pt-3 border-t border-green-200 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <div className="flex items-center text-xs">
                      <span className={darkMode ? "text-green-400/70" : "text-green-600"}>
                        Delivered via Base L2 in 1.8 seconds
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Card>
    </div>
  )
}

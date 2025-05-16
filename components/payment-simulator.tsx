"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const PaymentSimulator = () => {
  const [amount, setAmount] = useState("100")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [currency, setCurrency] = useState("usd")
  const [targetCurrency, setTargetCurrency] = useState("inr")

  const steps = ["Converting to USDC", "Routing via Base L2", "Converting to local currency", "Delivering to recipient"]

  const handleSendPayment = () => {
    setIsProcessing(true)
    setCurrentStep(0)
    setIsComplete(false)

    // Simulate the steps with delays
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
  }

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
  }

  const fee = Number.parseFloat(amount) * 0.005 // 0.5% fee
  const rate =
    exchangeRates[currency as keyof typeof exchangeRates]?.[targetCurrency as keyof (typeof exchangeRates)["usd"]] || 1
  const recipientGets = (Number.parseFloat(amount) - fee) * rate

  // Currency symbols
  const currencySymbols = {
    usd: "$",
    eur: "€",
    gbp: "£",
    inr: "₹",
    php: "₱",
    mxn: "MX$",
    brl: "R$",
    ngn: "₦",
    zar: "R",
  }

  const getSymbol = (code: string) => {
    return currencySymbols[code as keyof typeof currencySymbols] || code.toUpperCase()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <Card className="p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-6">Send Payment</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">You Send</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
                disabled={isProcessing}
              />
              <Select defaultValue="usd" disabled={isProcessing} onValueChange={(value) => setCurrency(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Route</label>
            <div className="p-3 bg-slate-50 rounded-md flex items-center justify-between">
              <span>USDC via Base</span>
              <span className="text-sm text-slate-500">AI-optimized</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Gets</label>
            <div className="flex gap-2">
              <Input type="text" value={recipientGets.toFixed(2)} readOnly className="flex-1" />
              <Select defaultValue="inr" disabled={isProcessing} onValueChange={(value) => setTargetCurrency(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="INR" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                  <SelectItem value="mxn">MXN</SelectItem>
                  <SelectItem value="brl">BRL</SelectItem>
                  <SelectItem value="ngn">NGN</SelectItem>
                  <SelectItem value="zar">ZAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">Fee (0.5%)</span>
              <span className="font-medium">
                {getSymbol(currency)}
                {fee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Exchange Rate</span>
              <span className="font-medium">
                1 {currency.toUpperCase()} = {rate} {targetCurrency.toUpperCase()}
              </span>
            </div>
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

      <div className="bg-slate-50 p-6 rounded-xl h-full">
        <h3 className="text-xl font-semibold mb-6">Transaction Progress</h3>

        {!isProcessing && !isComplete ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.p
              className="text-slate-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Enter an amount and click "Send Payment" to see the transaction flow.
            </motion.p>
          </div>
        ) : (
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
                  index <= currentStep ? "bg-blue-50 border border-blue-100" : "bg-slate-100 border border-slate-200"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {index < currentStep || isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                ) : index === currentStep ? (
                  <motion.div
                    className="w-5 h-5 rounded-full bg-blue-500"
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
                  <div className="w-5 h-5 rounded-full bg-slate-300" />
                )}
                <span className={index <= currentStep ? "text-slate-900" : "text-slate-500"}>
                  {index === 0
                    ? `Converting ${currency.toUpperCase()} to USDC`
                    : index === 2
                      ? `Converting to ${targetCurrency.toUpperCase()}`
                      : step}
                </span>

                {index === currentStep && (
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

            <AnimatePresence>
              {isComplete && (
                <motion.div
                  className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-center"
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
                    className="font-medium text-green-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    Transaction Complete!
                  </motion.p>
                  <motion.p
                    className="text-sm text-green-600 mt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    {amount} {currency.toUpperCase()} has been sent to the recipient as {recipientGets.toFixed(2)}{" "}
                    {targetCurrency.toUpperCase()}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

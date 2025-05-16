"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Globe, ArrowRight } from "lucide-react"

// Sample transaction data
const transactions = [
  { from: "New York", to: "Mumbai", amount: 1000, fromCurrency: "USD", toCurrency: "INR", rate: 83.12 },
  { from: "London", to: "Mexico City", amount: 2000, fromCurrency: "EUR", toCurrency: "MXN", rate: 16.72 },
  { from: "Tokyo", to: "Lagos", amount: 1500, fromCurrency: "GBP", toCurrency: "NGN", rate: 1450.25 },
  { from: "Sydney", to: "Manila", amount: 3000, fromCurrency: "USD", toCurrency: "PHP", rate: 56.78 },
  { from: "Berlin", to: "Johannesburg", amount: 2500, fromCurrency: "EUR", toCurrency: "ZAR", rate: 18.15 },
]

export function FallbackGlobe({ darkMode = false }) {
  const [activeTransaction, setActiveTransaction] = useState(0)

  // Change active transaction every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTransaction((prev) => (prev + 1) % transactions.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const transaction = transactions[activeTransaction]

  return (
    <div
      className={`w-full rounded-xl overflow-hidden p-6 ${
        darkMode ? "bg-slate-800 text-slate-200" : "bg-white text-slate-700"
      } shadow-sm border ${darkMode ? "border-slate-700" : "border-slate-100"}`}
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Global Transactions</h3>
          <p className={`mb-6 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Watch real-time transactions flow across the globe as FusionPay connects people and businesses worldwide.
          </p>

          <div
            className={`p-4 rounded-lg mb-4 ${
              darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-100"
            } border`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium">Active Transaction</div>
              <div
                className={`px-2 py-1 text-xs rounded-full ${
                  darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"
                }`}
              >
                Live
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>From:</span>
                <span className="font-medium">
                  {transaction.from} ({transaction.fromCurrency})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>To:</span>
                <span className="font-medium">
                  {transaction.to} ({transaction.toCurrency})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span className="font-medium">
                  {transaction.amount.toLocaleString()} {transaction.fromCurrency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Converted:</span>
                <span className="font-medium">
                  {(transaction.amount * transaction.rate).toLocaleString()} {transaction.toCurrency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Exchange Rate:</span>
                <span className="font-medium">
                  1 {transaction.fromCurrency} = {transaction.rate} {transaction.toCurrency}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div>
              Transaction {activeTransaction + 1} of {transactions.length}
            </div>
            <div className="flex gap-1">
              {transactions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === activeTransaction
                      ? darkMode
                        ? "bg-blue-400"
                        : "bg-blue-600"
                      : darkMode
                        ? "bg-slate-600"
                        : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div
            className={`aspect-square rounded-full border-4 ${
              darkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-slate-50"
            } relative overflow-hidden`}
          >
            {/* Simplified globe visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe
                className={`w-24 h-24 ${darkMode ? "text-slate-600" : "text-slate-400"} opacity-20`}
                strokeWidth={1}
              />
            </div>

            {/* Transaction animation */}
            <motion.div
              className={`absolute h-3 w-3 rounded-full ${darkMode ? "bg-blue-400" : "bg-blue-600"} shadow-lg`}
              initial={{ x: "20%", y: "30%" }}
              animate={{
                x: ["20%", "50%", "80%"],
                y: ["30%", "50%", "70%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />

            {/* Origin and destination markers */}
            <div className="absolute left-[20%] top-[30%] flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full ${
                  darkMode ? "bg-green-400 border-green-600" : "bg-green-500 border-green-700"
                } border-2 mb-1`}
              />
              <div className={`text-xs font-medium ${darkMode ? "text-green-400" : "text-green-700"}`}>
                {transaction.from}
              </div>
            </div>

            <div className="absolute right-[20%] bottom-[30%] flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full ${
                  darkMode ? "bg-purple-400 border-purple-600" : "bg-purple-500 border-purple-700"
                } border-2 mb-1`}
              />
              <div className={`text-xs font-medium ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
                {transaction.to}
              </div>
            </div>

            {/* Transaction path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M 20 30 Q 50 10, 80 70"
                fill="none"
                stroke={darkMode ? "#60a5fa" : "#2563eb"}
                strokeWidth="1"
                strokeDasharray="3,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
            </svg>

            {/* Currency symbols */}
            <motion.div
              className={`absolute text-sm font-bold ${
                darkMode ? "text-blue-300" : "text-blue-700"
              } flex items-center justify-center`}
              initial={{ x: "30%", y: "40%", opacity: 0 }}
              animate={{ x: "50%", y: "50%", opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            >
              {transaction.fromCurrency} <ArrowRight className="mx-1 w-3 h-3" /> {transaction.toCurrency}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

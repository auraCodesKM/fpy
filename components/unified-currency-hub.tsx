"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, RefreshCw, TrendingUp, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

// Expanded currency list with detailed information
const currencies = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    color: "#2563eb",
    iconBg: "#dbeafe",
    region: "North America",
    popularity: 1,
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    color: "#7c3aed",
    iconBg: "#ede9fe",
    region: "Europe",
    popularity: 2,
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    color: "#0891b2",
    iconBg: "#cffafe",
    region: "Europe",
    popularity: 3,
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    color: "#059669",
    iconBg: "#d1fae5",
    region: "Asia",
    popularity: 4,
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    color: "#dc2626",
    iconBg: "#fee2e2",
    region: "Asia",
    popularity: 5,
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    color: "#ea580c",
    iconBg: "#ffedd5",
    region: "Asia",
    popularity: 6,
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    color: "#16a34a",
    iconBg: "#dcfce7",
    region: "South America",
    popularity: 7,
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    color: "#db2777",
    iconBg: "#fce7f3",
    region: "North America",
    popularity: 8,
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    color: "#9333ea",
    iconBg: "#f3e8ff",
    region: "Oceania",
    popularity: 9,
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "Mex$",
    color: "#ca8a04",
    iconBg: "#fef9c3",
    region: "North America",
    popularity: 10,
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    color: "#be123c",
    iconBg: "#ffe4e6",
    region: "Asia",
    popularity: 11,
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    color: "#4f46e5",
    iconBg: "#e0e7ff",
    region: "Africa",
    popularity: 12,
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    color: "#0d9488",
    iconBg: "#ccfbf1",
    region: "Africa",
    popularity: 13,
  },
  {
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    color: "#0369a1",
    iconBg: "#e0f2fe",
    region: "Europe/Asia",
    popularity: 14,
  },
  {
    code: "USDC",
    name: "USD Coin",
    symbol: "₵",
    color: "#2563eb",
    iconBg: "#dbeafe",
    region: "Global",
    isStablecoin: true,
    popularity: 0,
  },
]

// Exchange rates for all currency pairs (via USDC)
const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.76,
  CNY: 7.23,
  INR: 83.12,
  BRL: 5.34,
  CAD: 1.37,
  AUD: 1.52,
  MXN: 16.92,
  SGD: 1.35,
  ZAR: 18.15,
  NGN: 1450.5,
  RUB: 91.25,
  USDC: 1,
}

export function UnifiedCurrencyHub({ darkMode = false }) {
  const [selectedSource, setSelectedSource] = useState("USD")
  const [selectedTarget, setSelectedTarget] = useState("EUR")
  const [amount, setAmount] = useState(1000)
  const [activeTransfer, setActiveTransfer] = useState(false)
  const [showAllCurrencies, setShowAllCurrencies] = useState(false)
  const [hoveredCurrency, setHoveredCurrency] = useState(null)
  const containerRef = useRef(null)

  // Get currency by code
  const getCurrency = (code) => currencies.find((c) => c.code === code) || currencies[0]

  // Calculate converted amount
  const calculateConversion = (from, to, amt) => {
    const fromRate = exchangeRates[from]
    const toRate = exchangeRates[to]
    return ((amt / fromRate) * toRate).toFixed(2)
  }

  // Start a new transfer animation
  const startTransfer = () => {
    if (activeTransfer) return
    setActiveTransfer(true)
    setTimeout(() => {
      setActiveTransfer(false)
    }, 3000)
  }

  // Filter currencies for display
  const displayCurrencies = showAllCurrencies
    ? currencies.filter((c) => !c.isStablecoin)
    : currencies.filter((c) => !c.isStablecoin).slice(0, 6)

  // Get USDC currency
  const usdcCurrency = getCurrency("USDC")

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
      } border shadow-sm`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b ${
          darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
        } flex justify-between items-center`}
      >
        <div>
          <h3 className={`font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>Global Currency Hub</h3>
          <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Instant transfers via USDC on Base L2
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={darkMode ? "border-slate-700 bg-slate-700" : ""}
            onClick={() => setShowAllCurrencies(!showAllCurrencies)}
          >
            <Globe className="w-4 h-4 mr-1" />
            {showAllCurrencies ? "Show Less" : "Show All"}
          </Button>
        </div>
      </div>

      {/* Main conversion hub */}
      <div className="p-4 md:p-6">
        {/* Conversion controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              From Currency
            </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className={`w-full rounded-md border ${
                darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-300 text-slate-900"
              } px-3 py-2`}
            >
              {currencies
                .filter((c) => !c.isStablecoin && c.code !== selectedTarget)
                .map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className={`w-full rounded-md border ${
                  darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-300 text-slate-900"
                } px-3 py-2`}
              />
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {getCurrency(selectedSource).symbol}
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              To Currency
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className={`w-full rounded-md border ${
                darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-300 text-slate-900"
              } px-3 py-2`}
            >
              {currencies
                .filter((c) => !c.isStablecoin && c.code !== selectedSource)
                .map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Conversion summary */}
        <div
          className={`mb-6 p-4 rounded-lg ${
            darkMode ? "bg-slate-700 border-slate-600" : "bg-blue-50 border-blue-100"
          } border`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  backgroundColor: getCurrency(selectedSource).iconBg,
                  color: getCurrency(selectedSource).color,
                }}
              >
                {getCurrency(selectedSource).symbol}
              </div>
              <ArrowRight className={`w-5 h-5 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ backgroundColor: usdcCurrency.iconBg, color: usdcCurrency.color }}
              >
                {usdcCurrency.symbol}
              </div>
              <ArrowRight className={`w-5 h-5 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  backgroundColor: getCurrency(selectedTarget).iconBg,
                  color: getCurrency(selectedTarget).color,
                }}
              >
                {getCurrency(selectedTarget).symbol}
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {amount} {selectedSource} = {calculateConversion(selectedSource, selectedTarget, amount)}{" "}
                {selectedTarget}
              </div>
              <div className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                Rate: 1 {selectedSource} = {calculateConversion(selectedSource, selectedTarget, 1)} {selectedTarget}
              </div>
            </div>

            <Button
              onClick={startTransfer}
              disabled={activeTransfer}
              className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
            >
              {activeTransfer ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" /> Convert Now
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Visual currency hub */}
        <div className="relative h-[400px] mb-4">
          {/* Central USDC node */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0.9 }}
            animate={{
              scale: [0.9, 1, 0.9],
              boxShadow: [
                `0 0 0 rgba(37, 99, 235, 0.4)`,
                `0 0 30px rgba(37, 99, 235, 0.6)`,
                `0 0 0 rgba(37, 99, 235, 0.4)`,
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${
                darkMode ? "border-blue-500" : "border-blue-300"
              }`}
              style={{ backgroundColor: usdcCurrency.iconBg, color: usdcCurrency.color }}
              onMouseEnter={() => setHoveredCurrency("USDC")}
              onMouseLeave={() => setHoveredCurrency(null)}
            >
              {usdcCurrency.symbol}
              <AnimatePresence>
                {hoveredCurrency === "USDC" && (
                  <motion.div
                    className={`absolute bottom-full mb-2 w-48 p-3 rounded-lg shadow-lg z-30 ${
                      darkMode ? "bg-slate-700 text-white" : "bg-white text-slate-800"
                    } border ${darkMode ? "border-slate-600" : "border-slate-200"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: usdcCurrency.iconBg, color: usdcCurrency.color }}
                      >
                        {usdcCurrency.symbol}
                      </div>
                      <div className="font-medium">USD Coin (USDC)</div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Type:</span>
                        <span className="font-medium">Stablecoin</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Network:</span>
                        <span className="font-medium">Base L2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Fee:</span>
                        <span className="font-medium">0.5%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Surrounding currency nodes */}
          {displayCurrencies.map((currency, index) => {
            // Calculate position in a circle around the center
            const angle = (index * (2 * Math.PI)) / displayCurrencies.length
            const radius = 150 // Distance from center
            const x = Math.cos(angle) * radius + 50 // +50% from left
            const y = Math.sin(angle) * radius + 50 // +50% from top

            const isSource = currency.code === selectedSource
            const isTarget = currency.code === selectedTarget

            return (
              <motion.div
                key={currency.code}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isSource || isTarget ? 15 : 10,
                }}
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{
                  scale: isSource || isTarget ? 1.1 : 0.9,
                  opacity: isSource || isTarget ? 1 : 0.7,
                  boxShadow: isSource || isTarget ? `0 0 20px ${currency.color}80` : "none",
                }}
                whileHover={{ scale: 1.1, opacity: 1, zIndex: 15 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredCurrency(currency.code)}
                onMouseLeave={() => setHoveredCurrency(null)}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
                    darkMode ? "border-slate-600" : "border-slate-200"
                  } ${isSource || isTarget ? "border-opacity-100" : "border-opacity-50"}`}
                  style={{ backgroundColor: currency.iconBg, color: currency.color }}
                >
                  {currency.symbol}
                </div>
                <div
                  className={`absolute top-full mt-1 text-center w-full text-xs font-medium ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {currency.code}
                </div>

                {/* Connection line to USDC */}
                <svg
                  className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -z-10"
                  style={{
                    transform: "translate(-50%, -50%) rotate(0deg)",
                  }}
                >
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2="50%"
                    y2="0%"
                    stroke={currency.color}
                    strokeWidth={isSource || isTarget ? 2 : 1}
                    strokeOpacity={isSource || isTarget ? 0.7 : 0.3}
                    strokeDasharray={isSource || isTarget ? "none" : "5,5"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredCurrency === currency.code && (
                    <motion.div
                      className={`absolute bottom-full mb-2 w-48 p-3 rounded-lg shadow-lg z-30 ${
                        darkMode ? "bg-slate-700 text-white" : "bg-white text-slate-800"
                      } border ${darkMode ? "border-slate-600" : "border-slate-200"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: currency.iconBg, color: currency.color }}
                        >
                          {currency.symbol}
                        </div>
                        <div className="font-medium">
                          {currency.name} ({currency.code})
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Region:</span>
                          <span className="font-medium">{currency.region}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Rate vs USD:</span>
                          <span className="font-medium">
                            1 USD = {exchangeRates[currency.code]} {currency.code}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* Animated transfer effect */}
          <AnimatePresence>
            {activeTransfer && (
              <>
                {/* Source to USDC */}
                <motion.div
                  className="absolute z-30"
                  initial={{
                    left: `${Math.cos((displayCurrencies.findIndex((c) => c.code === selectedSource) * (2 * Math.PI)) / displayCurrencies.length) * 150 + 50}%`,
                    top: `${Math.sin((displayCurrencies.findIndex((c) => c.code === selectedSource) * (2 * Math.PI)) / displayCurrencies.length) * 150 + 50}%`,
                    scale: 1,
                  }}
                  animate={{
                    left: "50%",
                    top: "50%",
                    scale: [1, 1.2, 0.8],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                    style={{
                      backgroundColor: getCurrency(selectedSource).iconBg,
                      color: getCurrency(selectedSource).color,
                      boxShadow: `0 0 15px ${getCurrency(selectedSource).color}`,
                    }}
                  >
                    {getCurrency(selectedSource).symbol}
                  </div>
                </motion.div>

                {/* USDC to Target */}
                <motion.div
                  className="absolute z-30"
                  initial={{
                    left: "50%",
                    top: "50%",
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    left: `${Math.cos((displayCurrencies.findIndex((c) => c.code === selectedTarget) * (2 * Math.PI)) / displayCurrencies.length) * 150 + 50}%`,
                    top: `${Math.sin((displayCurrencies.findIndex((c) => c.code === selectedTarget) * (2 * Math.PI)) / displayCurrencies.length) * 150 + 50}%`,
                    opacity: 1,
                    scale: [0.8, 1.2, 1],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                    style={{
                      backgroundColor: getCurrency(selectedTarget).iconBg,
                      color: getCurrency(selectedTarget).color,
                      boxShadow: `0 0 15px ${getCurrency(selectedTarget).color}`,
                    }}
                  >
                    {getCurrency(selectedTarget).symbol}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-slate-700" : "bg-slate-50"
            } flex flex-col items-center text-center`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                darkMode ? "bg-blue-900" : "bg-blue-100"
              }`}
            >
              <TrendingUp className={`w-5 h-5 ${darkMode ? "text-blue-300" : "text-blue-600"}`} />
            </div>
            <h4 className={`font-medium mb-1 ${darkMode ? "text-white" : "text-slate-800"}`}>Best Rates</h4>
            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              AI-optimized routes for the best exchange rates across 14+ currencies
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-slate-700" : "bg-slate-50"
            } flex flex-col items-center text-center`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                darkMode ? "bg-green-900" : "bg-green-100"
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${darkMode ? "text-green-300" : "text-green-600"}`} />
            </div>
            <h4 className={`font-medium mb-1 ${darkMode ? "text-white" : "text-slate-800"}`}>Instant Transfers</h4>
            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Settlements in seconds via Base L2 network with minimal fees
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-slate-700" : "bg-slate-50"
            } flex flex-col items-center text-center`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                darkMode ? "bg-purple-900" : "bg-purple-100"
              }`}
            >
              <Shield className={`w-5 h-5 ${darkMode ? "text-purple-300" : "text-purple-600"}`} />
            </div>
            <h4 className={`font-medium mb-1 ${darkMode ? "text-white" : "text-slate-800"}`}>Secure & Reliable</h4>
            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Enterprise-grade security with full regulatory compliance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

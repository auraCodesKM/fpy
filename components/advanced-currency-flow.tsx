"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Info } from "lucide-react"

// Currency data with icons and colors
const currencies = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    color: "#2563eb", // blue-600
    iconBg: "#dbeafe", // blue-100
  },
  {
    code: "USDC",
    name: "USD Coin",
    symbol: "₵",
    color: "#2563eb", // blue-600
    iconBg: "#dbeafe", // blue-100
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    color: "#7c3aed", // violet-600
    iconBg: "#ede9fe", // violet-100
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    color: "#0891b2", // cyan-600
    iconBg: "#cffafe", // cyan-100
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    color: "#059669", // emerald-600
    iconBg: "#d1fae5", // emerald-100
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    color: "#ea580c", // orange-600
    iconBg: "#ffedd5", // orange-100
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    color: "#dc2626", // red-600
    iconBg: "#fee2e2", // red-100
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    color: "#16a34a", // green-600
    iconBg: "#dcfce7", // green-100
  },
]

// Routes to cycle through
const routes = [
  { from: "USD", via: "USDC", to: "INR", rate: 83.12, fee: 0.5 },
  { from: "EUR", via: "USDC", to: "BRL", rate: 5.34, fee: 0.5 },
  { from: "GBP", via: "USDC", to: "JPY", rate: 187.25, fee: 0.5 },
  { from: "USD", via: "USDC", to: "CNY", rate: 7.23, fee: 0.5 },
]

export function AdvancedCurrencyFlow({ darkMode = false }) {
  const [activeRoute, setActiveRoute] = useState(0)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef(null)

  // Change route every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveRoute((prev) => (prev + 1) % routes.length)
        setIsAnimating(false)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const route = routes[activeRoute]
  const fromCurrency = currencies.find((c) => c.code === route.from)
  const viaCurrency = currencies.find((c) => c.code === route.via)
  const toCurrency = currencies.find((c) => c.code === route.to)

  // Get currency details by code
  const getCurrency = (code) => currencies.find((c) => c.code === code)

  // Tooltip content based on node
  const getTooltipContent = (nodeType) => {
    if (nodeType === "from") {
      return {
        title: `From: ${fromCurrency.name}`,
        details: [
          { label: "Currency", value: fromCurrency.code },
          { label: "Amount", value: `${fromCurrency.symbol}1,000.00` },
        ],
      }
    } else if (nodeType === "via") {
      return {
        title: `Via: ${viaCurrency.name}`,
        details: [
          { label: "Stablecoin", value: viaCurrency.code },
          { label: "Network", value: "Base L2" },
          { label: "Fee", value: `${route.fee}%` },
        ],
      }
    } else if (nodeType === "to") {
      return {
        title: `To: ${toCurrency.name}`,
        details: [
          { label: "Currency", value: toCurrency.code },
          { label: "Converted Amount", value: `${toCurrency.symbol}${(1000 * route.rate).toLocaleString()}` },
          { label: "Rate", value: `1 ${route.from} = ${route.rate} ${route.to}` },
        ],
      }
    }
    return null
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-lg ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
      } border p-4 md:p-6`}
      style={{ minHeight: "280px" }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Route {activeRoute + 1} of {routes.length}
        </div>
        <div className="flex gap-1">
          {routes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeRoute
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

      <div className="relative h-40 md:h-48">
        {/* SVG Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
          {/* Main Path */}
          <motion.path
            d="M 100 100 C 250 50, 350 150, 500 100 C 650 50, 750 150, 900 100"
            fill="none"
            stroke={darkMode ? "#60a5fa" : "#3b82f6"}
            strokeWidth="2"
            strokeDasharray="6,6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{
              pathLength: isAnimating ? 0 : 1,
              opacity: isAnimating ? 0.3 : 0.7,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Glow Effect */}
          <motion.path
            d="M 100 100 C 250 50, 350 150, 500 100 C 650 50, 750 150, 900 100"
            fill="none"
            stroke={darkMode ? "#93c5fd" : "#60a5fa"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="6,150"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isAnimating ? 0 : 1,
              opacity: isAnimating ? 0 : 0.3,
            }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            filter="blur(4px)"
          />
        </svg>

        {/* Currency Nodes */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
          {/* From Currency */}
          <motion.div
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isAnimating ? 0 : 1,
              y: isAnimating ? 20 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onMouseEnter={() => setHoveredNode("from")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-2 relative z-10 border-2 ${
                darkMode ? "border-blue-500" : "border-blue-200"
              }`}
              style={{ backgroundColor: fromCurrency.iconBg, color: fromCurrency.color }}
            >
              {fromCurrency.symbol}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" }}
                animate={{ boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)" }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            <div className={`text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
              {fromCurrency.code}
            </div>
            <div className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Source</div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredNode === "from" && (
                <motion.div
                  className={`absolute bottom-full mb-2 w-48 p-3 rounded-lg shadow-lg z-20 ${
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
                      style={{ backgroundColor: fromCurrency.iconBg, color: fromCurrency.color }}
                    >
                      {fromCurrency.symbol}
                    </div>
                    <div className="font-medium">{getTooltipContent("from").title}</div>
                  </div>
                  <div className="space-y-1">
                    {getTooltipContent("from").details.map((detail, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>{detail.label}:</span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Via Currency */}
          <motion.div
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isAnimating ? 0 : 1,
              y: isAnimating ? -20 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            onMouseEnter={() => setHoveredNode("via")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-2 relative z-10 border-2 ${
                darkMode ? "border-blue-500" : "border-blue-200"
              }`}
              style={{ backgroundColor: viaCurrency.iconBg, color: viaCurrency.color }}
            >
              {viaCurrency.symbol}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" }}
                animate={{ boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)" }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.7 }}
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            <div className={`text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
              {viaCurrency.code}
            </div>
            <div className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Stablecoin</div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredNode === "via" && (
                <motion.div
                  className={`absolute bottom-full mb-2 w-48 p-3 rounded-lg shadow-lg z-20 ${
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
                      style={{ backgroundColor: viaCurrency.iconBg, color: viaCurrency.color }}
                    >
                      {viaCurrency.symbol}
                    </div>
                    <div className="font-medium">{getTooltipContent("via").title}</div>
                  </div>
                  <div className="space-y-1">
                    {getTooltipContent("via").details.map((detail, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>{detail.label}:</span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* To Currency */}
          <motion.div
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isAnimating ? 0 : 1,
              y: isAnimating ? 20 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            onMouseEnter={() => setHoveredNode("to")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-2 relative z-10 border-2 ${
                darkMode ? "border-blue-500" : "border-blue-200"
              }`}
              style={{ backgroundColor: toCurrency.iconBg, color: toCurrency.color }}
            >
              {toCurrency.symbol}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" }}
                animate={{ boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)" }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.4 }}
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            <div className={`text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
              {toCurrency.code}
            </div>
            <div className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Destination</div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredNode === "to" && (
                <motion.div
                  className={`absolute bottom-full mb-2 w-48 p-3 rounded-lg shadow-lg z-20 ${
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
                      style={{ backgroundColor: toCurrency.iconBg, color: toCurrency.color }}
                    >
                      {toCurrency.symbol}
                    </div>
                    <div className="font-medium">{getTooltipContent("to").title}</div>
                  </div>
                  <div className="space-y-1">
                    {getTooltipContent("to").details.map((detail, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>{detail.label}:</span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Animated Currency Bubbles */}
        <AnimatePresence>
          {!isAnimating && (
            <>
              <motion.div
                className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                  darkMode ? "shadow-glow-blue-dark" : "shadow-glow-blue"
                }`}
                style={{ backgroundColor: fromCurrency.iconBg, color: fromCurrency.color }}
                initial={{ left: "10%", opacity: 0, scale: 0.5 }}
                animate={{
                  left: ["10%", "50%", "90%"],
                  top: ["50%", "30%", "50%"],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeInOut", times: [0, 0.5, 1] }}
              >
                {fromCurrency.symbol}
              </motion.div>

              <motion.div
                className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                  darkMode ? "shadow-glow-blue-dark" : "shadow-glow-blue"
                }`}
                style={{ backgroundColor: viaCurrency.iconBg, color: viaCurrency.color }}
                initial={{ left: "10%", opacity: 0, scale: 0.5 }}
                animate={{
                  left: ["10%", "50%", "90%"],
                  top: ["50%", "30%", "50%"],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 1, times: [0, 0.5, 1] }}
              >
                {viaCurrency.symbol}
              </motion.div>

              <motion.div
                className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                  darkMode ? "shadow-glow-blue-dark" : "shadow-glow-blue"
                }`}
                style={{ backgroundColor: toCurrency.iconBg, color: toCurrency.color }}
                initial={{ left: "10%", opacity: 0, scale: 0.5 }}
                animate={{
                  left: ["10%", "50%", "90%"],
                  top: ["50%", "30%", "50%"],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 2, times: [0, 0.5, 1] }}
              >
                {toCurrency.symbol}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Route Info */}
      <div className="mt-4">
        <div
          className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-50"}`}
        >
          <div className="flex items-center gap-2">
            <Info className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <span className={`text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
              Route Details
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: fromCurrency.iconBg, color: fromCurrency.color }}
              >
                {fromCurrency.symbol}
              </div>
              <ArrowRight className={`w-3 h-3 mx-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: viaCurrency.iconBg, color: viaCurrency.color }}
              >
                {viaCurrency.symbol}
              </div>
              <ArrowRight className={`w-3 h-3 mx-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: toCurrency.iconBg, color: toCurrency.color }}
              >
                {toCurrency.symbol}
              </div>
            </div>
            <div
              className={`text-xs px-2 py-1 rounded ${
                darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
              }`}
            >
              Fee: {route.fee}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

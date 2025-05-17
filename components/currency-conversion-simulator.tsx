"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowRight, RefreshCw, DollarSign, Percent, Building, Zap } from "lucide-react"

// Currency data type
type Currency = {
  code: string
  name: string
  symbol: string
  flag: string
}

// Exchange rate data
type ExchangeRate = {
  fromCurrency: string
  toCurrency: string
  bankRate: number
  fusionPayRate: number
}

// Sample currencies
const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$", flag: "🇸🇬" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
]

// Sample exchange rates with bank markup
const exchangeRates: ExchangeRate[] = [
  { fromCurrency: "USD", toCurrency: "EUR", bankRate: 0.92, fusionPayRate: 0.94 },
  { fromCurrency: "USD", toCurrency: "GBP", bankRate: 0.78, fusionPayRate: 0.80 },
  { fromCurrency: "USD", toCurrency: "JPY", bankRate: 147.5, fusionPayRate: 151.2 },
  { fromCurrency: "USD", toCurrency: "INR", bankRate: 81.2, fusionPayRate: 83.5 },
  { fromCurrency: "USD", toCurrency: "CNY", bankRate: 6.92, fusionPayRate: 7.12 },
  { fromCurrency: "USD", toCurrency: "CAD", bankRate: 1.32, fusionPayRate: 1.36 },
  { fromCurrency: "USD", toCurrency: "AUD", bankRate: 1.47, fusionPayRate: 1.51 },
  { fromCurrency: "USD", toCurrency: "SGD", bankRate: 1.33, fusionPayRate: 1.37 },
  { fromCurrency: "USD", toCurrency: "MXN", bankRate: 19.8, fusionPayRate: 20.4 },
  { fromCurrency: "USD", toCurrency: "BRL", bankRate: 5.15, fusionPayRate: 5.30 },
  { fromCurrency: "USD", toCurrency: "NGN", bankRate: 450.2, fusionPayRate: 463.5 },
  { fromCurrency: "EUR", toCurrency: "USD", bankRate: 1.05, fusionPayRate: 1.08 },
  { fromCurrency: "GBP", toCurrency: "USD", bankRate: 1.24, fusionPayRate: 1.27 },
  { fromCurrency: "JPY", toCurrency: "USD", bankRate: 0.0065, fusionPayRate: 0.0067 },
  { fromCurrency: "INR", toCurrency: "USD", bankRate: 0.0119, fusionPayRate: 0.0122 },
  { fromCurrency: "CNY", toCurrency: "USD", bankRate: 0.14, fusionPayRate: 0.144 },
  { fromCurrency: "CAD", toCurrency: "USD", bankRate: 0.73, fusionPayRate: 0.75 },
  { fromCurrency: "AUD", toCurrency: "USD", bankRate: 0.66, fusionPayRate: 0.68 },
  { fromCurrency: "SGD", toCurrency: "USD", bankRate: 0.73, fusionPayRate: 0.75 },
  { fromCurrency: "MXN", toCurrency: "USD", bankRate: 0.049, fusionPayRate: 0.050 },
  { fromCurrency: "BRL", toCurrency: "USD", bankRate: 0.188, fusionPayRate: 0.193 },
  { fromCurrency: "NGN", toCurrency: "USD", bankRate: 0.0021, fusionPayRate: 0.0022 },
]

export function CurrencyConversionSimulator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [amount, setAmount] = useState(1000)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [isAnimating, setIsAnimating] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Get exchange rate for selected currencies
  const getExchangeRate = (from: string, to: string): ExchangeRate | undefined => {
    return exchangeRates.find(rate => 
      rate.fromCurrency === from && rate.toCurrency === to
    )
  }
  
  // Calculate converted amounts
  const exchangeRate = getExchangeRate(fromCurrency, toCurrency)
  const bankConvertedAmount = exchangeRate ? amount * exchangeRate.bankRate : 0
  const fusionPayConvertedAmount = exchangeRate ? amount * exchangeRate.fusionPayRate : 0
  const difference = fusionPayConvertedAmount - bankConvertedAmount
  const percentageDifference = bankConvertedAmount > 0 
    ? (difference / bankConvertedAmount) * 100 
    : 0
  
  // Handle currency swap
  const handleSwapCurrencies = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const temp = fromCurrency
      setFromCurrency(toCurrency)
      setToCurrency(temp)
      setIsAnimating(false)
    }, 500)
  }
  
  // Handle conversion simulation
  const handleSimulate = () => {
    setShowComparison(true)
  }
  
  // Get currency details
  const getFromCurrency = currencies.find(c => c.code === fromCurrency) || currencies[0]
  const getToCurrency = currencies.find(c => c.code === toCurrency) || currencies[1]
  
  const isDarkMode = mounted && theme === "dark"
  
  if (!mounted) return null
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
      <h3 className="text-xl font-medium text-slate-900 dark:text-white text-center mb-6">
        Multi-Currency Conversion Simulator
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Amount to Convert
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="block w-full pl-10 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                step="100"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 items-center">
            <div className="col-span-2 space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                From Currency
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="block w-full py-3 px-4 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-center">
              <motion.button
                className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSwapCurrencies}
                animate={{ rotate: isAnimating ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-5 w-5" />
              </motion.button>
            </div>
            
            <div className="col-span-2 space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                To Currency
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="block w-full py-3 px-4 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleSimulate}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Simulate Conversion
          </button>
          
          {/* Current exchange rate info */}
          {exchangeRate && (
            <div className="text-center text-sm text-slate-600 dark:text-slate-400 pt-2">
              <p>Current Market Exchange Rate</p>
              <p className="font-medium text-slate-900 dark:text-white">
                1 {fromCurrency} ≈ {exchangeRate.fusionPayRate.toFixed(4)} {toCurrency}
              </p>
              <p className="text-xs mt-1">
                Updated {new Date().toLocaleString()}
              </p>
            </div>
          )}
        </div>
        
        {/* Results section */}
        <div className="space-y-4">
          {showComparison ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">You send</span>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {getFromCurrency.symbol}{amount.toLocaleString()} {fromCurrency}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
                <div className="text-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Recipient gets</span>
                  <motion.p 
                    className="text-lg font-bold text-blue-600 dark:text-blue-400"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getToCurrency.symbol}{fusionPayConvertedAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} {toCurrency}
                  </motion.p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                <h4 className="text-base font-medium text-slate-900 dark:text-white mb-4">
                  FusionPay vs Traditional Bank
                </h4>
                
                <div className="space-y-4">
                  {/* Bank conversion */}
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-slate-500 dark:text-slate-400 mr-3" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Traditional Bank
                        </span>
                        <span className="text-sm text-slate-900 dark:text-white">
                          {getToCurrency.symbol}{bankConvertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mt-2">
                        <motion.div 
                          className="bg-slate-400 dark:bg-slate-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* FusionPay conversion */}
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          FusionPay
                        </span>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {getToCurrency.symbol}{fusionPayConvertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </div>
                      <div className="w-full bg-blue-100 dark:bg-blue-900 rounded-full h-2 mt-2">
                        <motion.div 
                          className="bg-blue-500 dark:bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 + percentageDifference}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Savings callout */}
                <motion.div 
                  className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="flex items-start">
                    <Percent className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-400">
                        You save {getToCurrency.symbol}{difference.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })} {toCurrency} ({percentageDifference.toFixed(1)}%)
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                        FusionPay uses real market rates with minimal fees
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
                <p>
                  Banks typically add hidden markups to exchange rates and charge additional fees.
                  FusionPay gives you the real rate with transparent, low fees.
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <RefreshCw className="h-8 w-8" />
                </motion.div>
                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  Currency Converter
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Select currencies and amount, then click "Simulate Conversion" to see how much you could save with FusionPay.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, DollarSign, ArrowRight } from "lucide-react"

// Sample transaction data
const transaction = {
  id: "TX-12345-67890",
  amount: 1000,
  fromCurrency: "USD",
  toCurrency: "INR",
  rate: 83.12,
  fee: 5.0,
  status: "completed",
  date: "2025-05-16T12:30:00Z",
  steps: [
    {
      id: 1,
      title: "Transaction Initiated",
      description: "Payment of $1,000.00 USD initiated to INR",
      time: "12:30:00",
      status: "completed",
      details: [
        { label: "Transaction ID", value: "TX-12345-67890" },
        { label: "Payment Method", value: "Credit Card" },
        { label: "Source Currency", value: "USD" },
        { label: "Destination Currency", value: "INR" },
      ],
    },
    {
      id: 2,
      title: "USD to USDC Conversion",
      description: "Converted $1,000.00 USD to 999.50 USDC",
      time: "12:30:15",
      status: "completed",
      details: [
        { label: "Exchange Rate", value: "1 USD = 0.9995 USDC" },
        { label: "Fee", value: "$0.50 USD" },
        { label: "Network", value: "Base L2" },
        { label: "Transaction Hash", value: "0x1a2b...3c4d" },
      ],
    },
    {
      id: 3,
      title: "USDC Transfer on Base",
      description: "Transferred 999.50 USDC on Base L2 network",
      time: "12:30:45",
      status: "completed",
      details: [
        { label: "Gas Fee", value: "0.0001 ETH" },
        { label: "Confirmation Blocks", value: "3" },
        { label: "Transaction Hash", value: "0x5e6f...7g8h" },
        { label: "Base Explorer", value: "View on Explorer" },
      ],
    },
    {
      id: 4,
      title: "USDC to INR Conversion",
      description: "Converted 999.50 USDC to ₹83,078.46 INR",
      time: "12:31:30",
      status: "completed",
      details: [
        { label: "Exchange Rate", value: "1 USDC = 83.12 INR" },
        { label: "Fee", value: "₹0.00 INR" },
        { label: "Partner", value: "Local Exchange" },
        { label: "Reference ID", value: "REF-9876-54321" },
      ],
    },
    {
      id: 5,
      title: "Local Bank Transfer",
      description: "Transferred ₹83,078.46 INR to recipient bank account",
      time: "12:32:15",
      status: "completed",
      details: [
        { label: "Bank", value: "HDFC Bank" },
        { label: "Account", value: "XXXX-XXXX-1234" },
        { label: "Transfer Method", value: "UPI" },
        { label: "Reference", value: "FusionPay-12345" },
      ],
    },
  ],
}

export function TransactionTimeline({ darkMode = false }) {
  const [expandedStep, setExpandedStep] = useState(null)

  const toggleStep = (stepId) => {
    if (expandedStep === stepId) {
      setExpandedStep(null)
    } else {
      setExpandedStep(stepId)
    }
  }

  const getStatusIcon = (status) => {
    if (status === "completed") {
      return (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-600"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
        </div>
      )
    } else if (status === "in-progress") {
      return (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-600"
          }`}
        >
          <Clock className="w-5 h-5" />
        </div>
      )
    } else {
      return (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-600"
          }`}
        >
          <AlertCircle className="w-5 h-5" />
        </div>
      )
    }
  }

  return (
    <div
      className={`w-full rounded-xl overflow-hidden ${
        darkMode ? "bg-slate-800 text-slate-200 border-slate-700" : "bg-white text-slate-800 border-slate-100"
      } border shadow-sm`}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold">Transaction Timeline</h3>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Track the progress of your transaction in real-time
            </p>
          </div>
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-50"}`}>
            <div className="flex items-center gap-2">
              <DollarSign className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className="text-sm font-medium">
                {transaction.fromCurrency} <ArrowRight className="inline w-3 h-3 mx-1" /> {transaction.toCurrency}
              </span>
            </div>
            <div
              className={`text-xs px-2 py-1 rounded ${
                transaction.status === "completed"
                  ? darkMode
                    ? "bg-green-900 text-green-200"
                    : "bg-green-100 text-green-800"
                  : transaction.status === "in-progress"
                    ? darkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                    : darkMode
                      ? "bg-red-900 text-red-200"
                      : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {transaction.steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative ${
                darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-white hover:bg-slate-50"
              } rounded-lg border ${
                darkMode ? "border-slate-600" : "border-slate-200"
              } transition-colors duration-200 overflow-hidden`}
            >
              {/* Timeline connector */}
              {index < transaction.steps.length - 1 && (
                <div
                  className={`absolute left-4 top-8 bottom-0 w-0.5 ${darkMode ? "bg-slate-600" : "bg-slate-200"}`}
                  style={{ height: "calc(100% - 2rem)" }}
                />
              )}

              <div className="p-4 flex items-start gap-4 cursor-pointer" onClick={() => toggleStep(step.id)}>
                {getStatusIcon(step.status)}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{step.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{step.time}</span>
                      {expandedStep === step.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedStep === step.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 pt-0 ml-12 border-t ${darkMode ? "border-slate-600" : "border-slate-200"}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex justify-between">
                            <span className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                              {detail.label}:
                            </span>
                            <span className="text-sm font-medium">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

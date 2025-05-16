"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface ComparisonItem {
  name: string
  fusionpay: number | string
  traditional: number | string
  highlight?: boolean
}

const comparisonData: ComparisonItem[] = [
  { name: "Transaction Fee", fusionpay: "0.5%", traditional: "3-6%", highlight: true },
  { name: "Settlement Time", fusionpay: "Minutes", traditional: "2-5 Days", highlight: true },
  { name: "Exchange Rate Markup", fusionpay: "0.1%", traditional: "2-4%" },
  { name: "Minimum Transfer", fusionpay: "$1", traditional: "$15-50" },
  { name: "Maximum Transfer", fusionpay: "$50,000", traditional: "Varies" },
  { name: "Recipient Options", fusionpay: "Multiple", traditional: "Limited" },
]

export const PremiumComparisonChart = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-3 bg-gradient-to-r from-blue-50 to-sky-50 p-4 font-medium text-slate-700">
        <div>Feature</div>
        <div className="text-center text-blue-600 font-semibold">FusionPay</div>
        <div className="text-center">Traditional Services</div>
      </div>

      <div className="divide-y divide-slate-200">
        {comparisonData.map((item, index) => (
          <motion.div
            key={item.name}
            className={`grid grid-cols-3 p-4 ${item.highlight ? "bg-blue-50/50" : ""} relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              backgroundColor: item.highlight ? "rgba(219, 234, 254, 0.7)" : "rgba(241, 245, 249, 0.7)",
              transition: { duration: 0.2 },
            }}
          >
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
              initial={{ opacity: 0, x: "-100%" }}
              whileHover={{
                opacity: 0.3,
                x: "100%",
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              }}
            />

            <div className="font-medium text-slate-700 relative z-10">{item.name}</div>
            <div className="text-center relative z-10">
              <motion.span
                className={`inline-block font-medium ${item.highlight ? "text-blue-600" : "text-slate-700"}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.1 + 0.2,
                }}
              >
                {item.fusionpay}
              </motion.span>
            </div>
            <div className="text-center text-slate-600 relative z-10">{item.traditional}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

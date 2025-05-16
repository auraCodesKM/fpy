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

export const AnimatedComparisonChart = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-3 bg-slate-50 p-4 font-medium text-slate-700">
        <div>Feature</div>
        <div className="text-center text-blue-600">FusionPay</div>
        <div className="text-center">Traditional Services</div>
      </div>

      <div className="divide-y divide-slate-200">
        {comparisonData.map((item, index) => (
          <motion.div
            key={item.name}
            className={`grid grid-cols-3 p-4 ${item.highlight ? "bg-blue-50/50" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="font-medium text-slate-700">{item.name}</div>
            <div className="text-center">
              <motion.span
                className={`inline-block font-medium ${item.highlight ? "text-blue-600" : "text-slate-700"}`}
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : { scale: 0.8 }}
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
            <div className="text-center text-slate-600">{item.traditional}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

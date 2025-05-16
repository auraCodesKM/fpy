"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] duration-300 border border-slate-100 hover:border-blue-100"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
        <div className="text-blue-600">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-1 transition-transform duration-300">
        {title}
      </h3>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  )
}

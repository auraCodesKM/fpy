"use client"

import { motion } from "framer-motion"
import { PremiumStatCard } from "./premium-stat-card"

export const PremiumStatsSection = () => {
  const stats = [
    { value: 180, label: "Countries Supported", prefix: "", suffix: "+", color: "blue" },
    { value: 99, label: "Success Rate", prefix: "", suffix: "%", color: "green" },
    { value: 5, label: "Million Users", prefix: "", suffix: "M+", color: "purple" },
    { value: 10, label: "Billion Processed", prefix: "$", suffix: "B+", color: "teal" },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {stats.map((stat, index) => (
        <PremiumStatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          prefix={stat.prefix}
          suffix={stat.suffix}
          delay={0.2 * index}
          color={stat.color as "blue" | "sky" | "teal" | "purple" | "amber" | "green" | "red"}
          variant="glass"
        />
      ))}
    </motion.div>
  )
}

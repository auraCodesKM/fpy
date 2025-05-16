"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { AnimatedIcon } from "./animated-icon"

interface AnimatedUseCaseCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  color?: "blue" | "teal" | "purple" | "amber" | "green" | "red"
}

export const AnimatedUseCaseCard = ({
  icon,
  title,
  description,
  delay = 0,
  color = "blue",
}: AnimatedUseCaseCardProps) => {
  return (
    <motion.div
      className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.05)",
        borderColor: "rgba(59, 130, 246, 0.3)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      <div className="flex gap-4">
        <AnimatedIcon icon={icon} color={color} size="medium" className="flex-shrink-0" />

        <div>
          <motion.h3
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
            whileHover={{
              x: 5,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-slate-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

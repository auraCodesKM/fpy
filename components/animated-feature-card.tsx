"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { AnimatedIcon } from "./animated-icon"

interface AnimatedFeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  index?: number
  color?: "blue" | "teal" | "purple" | "amber" | "green" | "red"
}

export const AnimatedFeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  index = 0,
  color = "blue",
}: AnimatedFeatureCardProps) => {
  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.05)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      x: -5,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: delay + 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
    >
      <AnimatedIcon icon={icon} color={color} />

      <motion.h3 className="text-xl font-semibold mb-2 mt-4" variants={textVariants}>
        {title}
      </motion.h3>

      <motion.p
        className="text-slate-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

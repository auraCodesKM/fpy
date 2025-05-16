"use client"

import { motion } from "framer-motion"

interface AnimatedSectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  className?: string
}

export const AnimatedSectionHeading = ({
  title,
  subtitle,
  alignment = "center",
  className = "",
}: AnimatedSectionHeadingProps) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  // Split title into words for staggered animation
  const words = title.split(" ")

  return (
    <div className={`mb-12 ${alignmentClasses[alignment]} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 overflow-hidden">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 * i,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          className="text-lg text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button as UIButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export const AnimatedButton = ({
  children,
  variant = "default",
  size = "default",
  className,
  onClick,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) => {
  // Determine the appropriate shadow based on variant
  const getShadowClass = () => {
    if (variant === "default") {
      return "shadow-blue-500/30"
    }
    if (variant === "outline") {
      return "shadow-slate-200/50"
    }
    return ""
  }

  return (
    <motion.div
      whileHover={{
        scale: disabled ? 1 : 1.03,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{
        scale: disabled ? 1 : 0.97,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
    >
      <UIButton
        variant={variant}
        size={size}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          variant === "default" && "bg-blue-600 hover:bg-blue-700",
          variant === "outline" && "border-blue-600 text-blue-600 hover:bg-blue-50",
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {/* Shine effect */}
        {!disabled && variant === "default" && (
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
            animate={{
              opacity: [0, 0.15, 0],
              left: ["-100%", "100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
          />
        )}

        {children}
      </UIButton>
    </motion.div>
  )
}

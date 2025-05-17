"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DirectLinkButtonProps {
  href: string;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "gradient";
  children: React.ReactNode;
}

export function DirectLinkButton({
  href,
  className = "",
  size = "medium",
  variant = "primary",
  children
}: DirectLinkButtonProps) {
  // Size configurations
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  
  // Variant configurations
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-white hover:bg-slate-100 text-blue-600 border border-blue-200",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
  };
  
  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <Link 
        href={href}
        className={`flex items-center justify-center font-medium rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

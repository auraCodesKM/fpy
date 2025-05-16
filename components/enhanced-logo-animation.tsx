"use client"
import { motion } from "framer-motion"

export const EnhancedLogoAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background elements */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-purple-500/10 opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-56 h-56 rounded-full border-2 border-teal-400/30 opacity-60"
        animate={{
          scale: [1.1, 0.9, 1.1],
          rotate: [0, -15, 0],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="absolute w-40 h-40 rounded-full border-2 border-purple-400/30 opacity-50"
        animate={{
          scale: [0.9, 1.1, 0.9],
          rotate: [0, 20, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating currency symbols */}
      <motion.div
        className="absolute w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center"
        animate={{
          x: [30, 50, 30],
          y: [-40, -60, -40],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="text-blue-600 font-bold">$</span>
      </motion.div>

      <motion.div
        className="absolute w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center"
        animate={{
          x: [-50, -30, -50],
          y: [20, 40, 20],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="text-teal-600 font-bold">€</span>
      </motion.div>

      <motion.div
        className="absolute w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center"
        animate={{
          x: [40, 20, 40],
          y: [30, 50, 30],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-purple-600 font-bold">£</span>
      </motion.div>

      <motion.div
        className="absolute w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center"
        animate={{
          x: [-40, -60, -40],
          y: [-30, -50, -30],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
      >
        <span className="text-amber-600 font-bold">¥</span>
      </motion.div>

      {/* Logo */}
      <div className="relative z-10">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-28 h-28 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30 10C18.954 10 10 18.954 10 30C10 41.046 18.954 50 30 50C41.046 50 50 41.046 50 30C50 18.954 41.046 10 30 10ZM30 15C38.284 15 45 21.716 45 30C45 38.284 38.284 45 30 45C21.716 45 15 38.284 15 30C15 21.716 21.716 15 30 15Z"
                fill="white"
              />
              <path d="M30 20L20 30L30 40L40 30L30 20Z" fill="white" />
              <circle cx="30" cy="30" r="5" fill="white" />
            </svg>
          </div>
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            FusionPay
          </motion.h2>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Fast</span>
        <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Secure</span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Global</span>
      </motion.div>
    </div>
  )
}

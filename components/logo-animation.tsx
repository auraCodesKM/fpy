"use client"
import { motion } from "framer-motion"

export const LogoAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute w-64 h-64 rounded-full border-4 border-blue-500 opacity-20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-48 h-48 rounded-full border-4 border-blue-400 opacity-30"
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="absolute w-32 h-32 rounded-full bg-blue-500 opacity-10"
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30 10C18.954 10 10 18.954 10 30C10 41.046 18.954 50 30 50C41.046 50 50 41.046 50 30C50 18.954 41.046 10 30 10ZM30 15C38.284 15 45 21.716 45 30C45 38.284 38.284 45 30 45C21.716 45 15 38.284 15 30C15 21.716 21.716 15 30 15Z"
                fill="white"
              />
              <path d="M30 20L20 30L30 40L40 30L30 20Z" fill="white" />
              <circle cx="30" cy="30" r="5" fill="white" />
            </svg>
          </div>
          <motion.h2
            className="text-3xl font-bold text-blue-600"
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
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Secure</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Global</span>
      </motion.div>
    </div>
  )
}

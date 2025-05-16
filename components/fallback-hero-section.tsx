"use client"

import { motion } from "framer-motion"
import { DynamicLogo } from "./dynamic-logo"
import { AnimatedButton } from "./animated-button"
import { FloatingParticles } from "./floating-particles"
import { AdvancedCurrencyFlow } from "./advanced-currency-flow"

export function FallbackHeroSection({ darkMode = false }) {
  return (
    <section className={`relative py-20 md:py-32 px-4 overflow-hidden ${darkMode ? "bg-slate-900" : "bg-white"}`}>
      <FloatingParticles count={20} />
      <div
        className={`absolute inset-0 bg-gradient-to-b ${darkMode ? "from-slate-900/50 to-slate-900/0" : "from-slate-50/50 to-white/0"} pointer-events-none`}
      />
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4">
              <h1
                className={`text-4xl md:text-6xl font-bold tracking-tight ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Send Money Across
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Borders. No Banks.
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Just Stablecoins.
                </motion.span>
              </h1>
              <motion.p
                className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-600"} max-w-2xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                FusionPay lets you move money globally in minutes — powered by Base and AI routing. No wallets. No
                crypto knowledge needed.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <AnimatedButton size="lg">Try the Demo</AnimatedButton>
              <AnimatedButton size="lg" variant="outline">
                See How It Works
              </AnimatedButton>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1 relative h-64 md:h-96 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <DynamicLogo />
          </motion.div>
        </div>

        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div
            className={`${
              darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
            } rounded-xl shadow-sm border p-4`}
          >
            <h3 className={`text-lg font-medium ${darkMode ? "text-slate-200" : "text-slate-700"} mb-4 text-center`}>
              Global Currency Flow
            </h3>
            <AdvancedCurrencyFlow darkMode={darkMode} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

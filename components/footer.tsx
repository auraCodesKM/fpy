"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { DynamicLogo } from "./dynamic-logo"
import { motion } from "framer-motion"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-4">
      <motion.div
        className="container mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <DynamicLogo size="small" animated={false} />
              <span className="font-bold text-xl">FusionPay</span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Send money globally. Fast. Cheap. No banks. FusionPay lets you move money across borders using stablecoins
              on Base L2.
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Link href="https://github.com" className="text-slate-400 hover:text-white transition-colors">
                  <Github size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              {["How It Works", "Demo", "Benefits", "Use Cases"].map((item, index) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {["GitHub", "Devfolio", "Testnet Faucet", "Documentation"].map((item, index) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div className="mt-12 pt-6 border-t border-slate-700" variants={itemVariants}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">&copy; {currentYear} FusionPay. All rights reserved.</p>
            <div className="text-sm text-slate-500">
              <p>Disclaimer: This is a simulation. No real money or crypto involved.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { FusionPayLogo } from "./fusion-pay-logo"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && theme === "dark"

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Demo", href: "#demo" },
    { name: "Benefits", href: "#benefits" },
    { name: "Visualizations", href: "#visualizations" },
    { name: "Use Cases", href: "#use-cases" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div 
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled 
            ? "py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md" 
            : "py-4 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <FusionPayLogo darkMode={isDarkMode} size="small" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-300 ${
                  scrolled 
                    ? "text-slate-800 dark:text-white" 
                    : "text-slate-700 dark:text-slate-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle with enhanced animations */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors relative overflow-hidden ${
                scrolled 
                  ? "bg-slate-200 dark:bg-slate-800" 
                  : "bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm"
              }`}
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </motion.div>
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-400/10 dark:bg-blue-400/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.4 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            {/* CTA Button with enhanced animations */}
            <motion.div
              className="hidden sm:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="#"
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors overflow-hidden ${
                  scrolled
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600/90 text-white backdrop-blur-sm hover:bg-blue-700/90"
                }`}
              >
                <span className="relative z-10">Sign In</span>
                <motion.span 
                  className="absolute inset-0 bg-blue-400/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.4 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </motion.div>
            
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="#"
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors overflow-hidden ${
                  scrolled
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                    : "bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white backdrop-blur-sm hover:from-blue-700/90 hover:to-blue-600/90"
                }`}
              >
                <span className="relative z-10">Get Started</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-slate-700 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-5 h-5">
                <span
                  className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

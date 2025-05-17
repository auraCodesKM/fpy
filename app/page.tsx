"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedSectionHeading } from "@/components/animated-section-heading"
import { FloatingNavbar } from "@/components/floating-navbar"
import { motion } from "framer-motion"
import { MediaEnhancedHero } from "@/components/media-enhanced-hero"
import { EnhancedImageSection } from "@/components/enhanced-image-section"
import { ParticleAnimation } from "@/components/particle-animation"
import { FloatingElements } from "@/components/floating-elements"
import { TiltCard } from "@/components/tilt-card"

// Import our custom FusionPay components
import { FusionPaySteps } from "@/components/fusion-pay-steps"
import { FusionPaySimulator } from "@/components/fusion-pay-simulator"
import { FusionPayFeatures } from "@/components/fusion-pay-features"
import { FusionPayUseCases } from "@/components/fusion-pay-use-cases"
import { FusionPayFooter } from "@/components/fusion-pay-footer"
import { EnhancedVisualizations } from "@/components/enhanced-visualizations"

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && theme === "dark"

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <FloatingNavbar />

      {/* Media Enhanced Hero Section */}
      <div className="relative">
        <ParticleAnimation count={40} opacity={0.2} />
        <MediaEnhancedHero />
      </div>

      {/* How It Works - Scroll-Revealed Steps */}
      <section className="py-20 bg-white dark:bg-slate-900 px-4 relative overflow-hidden" id="how-it-works">
        <EnhancedImageSection imageStyle="Glossy" opacity={0.1} />
        <FloatingElements count={6} opacity={0.15} />
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="How It Works"
            subtitle="FusionPay simplifies cross-border payments with a seamless four-step process."
          />
          <FusionPaySteps darkMode={isDarkMode} />
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800" id="demo">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="Try It Yourself"
            subtitle="See how FusionPay works with our interactive demo."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FusionPaySimulator darkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* Why FusionPay - Features Section with Hover Effects */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800 px-4 relative overflow-hidden" id="features">
        <EnhancedImageSection imageStyle="Metallic" opacity={0.08} />
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="Why FusionPay"
            subtitle="Our platform offers significant advantages over traditional banking and payment systems."
          />
          <TiltCard className="bg-transparent">
            <FusionPayFeatures darkMode={isDarkMode} />
          </TiltCard>
        </div>
      </section>

      {/* Enhanced Visualizations */}
      <section id="visualizations" className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <EnhancedImageSection imageStyle="Vivid" opacity={0.08} />
        </div>
        <EnhancedVisualizations />
      </section>

      {/* Use Cases - Scroll Cards */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden" id="use-cases">
        <EnhancedImageSection imageStyle="Neon" opacity={0.07} />
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading 
            title="Use Cases" 
            subtitle="FusionPay serves a variety of global payment needs." 
          />
          <FusionPayUseCases darkMode={isDarkMode} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Transform Your Global Payments?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Experience the future of cross-border transfers with FusionPay's innovative stablecoin-powered solution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatedButton size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Try FusionPay Demo <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Custom Footer */}
      <FusionPayFooter darkMode={isDarkMode} />
    </main>
  )
}

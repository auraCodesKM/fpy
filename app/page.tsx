"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  CheckCircle,
  Globe,
  Zap,
  Shield,
  DollarSign,
  Clock,
  Percent,
  BarChart3,
  Building,
  Users,
  HeartHandshake,
  School,
  ArrowRight,
} from "lucide-react"
import { PaymentSimulator } from "@/components/payment-simulator"
import { PremiumNavBar } from "@/components/premium-nav-bar"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedSectionHeading } from "@/components/animated-section-heading"
import { PremiumFeatureCard } from "@/components/premium-feature-card"
import { PremiumUseCaseCard } from "@/components/premium-use-case-card"
import { PremiumStep } from "@/components/premium-steps"
import { PremiumComparisonChart } from "@/components/premium-comparison-chart"
import { PremiumStatsSection } from "@/components/premium-stats-section"
import { TransactionTimeline } from "@/components/transaction-timeline"
import { ThemeToggle } from "@/components/theme-toggle"
import { DynamicAnimatedGlobe, RedesignedHero } from "@/components/dynamic-3d-components"
import { motion } from "framer-motion"
import { UnifiedCurrencyHub } from "@/components/unified-currency-hub"

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
      <ThemeToggle />
      <PremiumNavBar />

      {/* Hero Section */}
      <RedesignedHero darkMode={isDarkMode} />

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto max-w-6xl">
          <PremiumStatsSection />
        </div>
      </section>

      {/* Currency Flow Visualization */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="Intelligent Currency Routing"
            subtitle="Watch how FusionPay intelligently routes your money across borders using stablecoins and the Base network."
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-8"
          >
            <UnifiedCurrencyHub darkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-slate-900 px-4" id="how-it-works">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="How It Works"
            subtitle="FusionPay simplifies cross-border payments with a seamless four-step process."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PremiumStep
              icon={<DollarSign className="w-6 h-6" />}
              title="Enter Amount"
              description="Simply enter the amount you want to send and the destination currency."
              stepNumber={1}
              totalSteps={4}
              color="blue"
              variant="glass"
            />

            <PremiumStep
              icon={<Zap className="w-6 h-6" />}
              title="AI Routing"
              description="Our AI selects the optimal stablecoin route for your transaction."
              stepNumber={2}
              totalSteps={4}
              color="purple"
              variant="glass"
            />

            <PremiumStep
              icon={<Shield className="w-6 h-6" />}
              title="Base Transfer"
              description="Crypto is sent securely via Base L2 for fast, low-cost settlement."
              stepNumber={3}
              totalSteps={4}
              color="teal"
              variant="glass"
            />

            <PremiumStep
              icon={<Globe className="w-6 h-6" />}
              title="Local Delivery"
              description="Recipient gets local currency directly to their account or mobile wallet."
              stepNumber={4}
              totalSteps={4}
              color="green"
              variant="glass"
            />
          </div>
        </div>
      </section>

      {/* Transaction Timeline */}
      <section
        className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        id="timeline"
      >
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="Transaction Timeline"
            subtitle="Track every step of your transaction in real-time with our detailed timeline view."
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-8"
          >
            <TransactionTimeline darkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* Product Simulation */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900" id="demo">
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
            <PaymentSimulator />
          </motion.div>
        </div>
      </section>

      {/* Global Visualization */}
      <section
        className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        id="global"
      >
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="Global Money Movement"
            subtitle="Visualize how FusionPay connects the world through seamless currency transfers."
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-8"
          >
            <DynamicAnimatedGlobe darkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* Why FusionPay */}
      <section className="py-20 bg-white dark:bg-slate-900 px-4" id="benefits">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="Why FusionPay"
            subtitle="Our platform offers significant advantages over traditional banking and payment systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PremiumFeatureCard
              icon={<Percent className="w-6 h-6" />}
              title="Lower Fees"
              description="Only 0.5% transaction fee compared to 3-6% with traditional services."
              delay={0.1}
              index={0}
              color="blue"
              variant="glass"
            />

            <PremiumFeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Fast Settlement"
              description="Payments settle in minutes, not days like traditional bank transfers."
              delay={0.2}
              index={1}
              color="purple"
              variant="glass"
            />

            <PremiumFeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Built on Base"
              description="Leveraging Coinbase's L2 for security, speed, and reliability."
              delay={0.3}
              index={2}
              color="teal"
              variant="glass"
            />

            <PremiumFeatureCard
              icon={<CheckCircle className="w-6 h-6" />}
              title="No Crypto Knowledge"
              description="Use familiar currency inputs and outputs with no crypto exposure."
              delay={0.4}
              index={3}
              color="green"
              variant="glass"
            />

            <PremiumFeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="AI Optimization"
              description="Smart routing finds the most efficient path for your money."
              delay={0.5}
              index={4}
              color="sky"
              variant="glass"
            />

            <PremiumFeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Full Transparency"
              description="Track every step of your transaction in real-time."
              delay={0.6}
              index={5}
              color="amber"
              variant="glass"
            />
          </div>
        </div>
      </section>

      {/* Comparison Chart */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading
            title="How We Compare"
            subtitle="See how FusionPay stacks up against traditional money transfer services."
          />

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <PremiumComparisonChart />
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-slate-900 px-4" id="use-cases">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSectionHeading title="Use Cases" subtitle="FusionPay serves a variety of global payment needs." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PremiumUseCaseCard
              icon={<Users className="w-6 h-6" />}
              title="Freelancer Payouts"
              description="Remote workers can receive payments from global clients without high fees or delays."
              delay={0.1}
              color="blue"
              variant="glass"
            />

            <PremiumUseCaseCard
              icon={<HeartHandshake className="w-6 h-6" />}
              title="Family Remittance"
              description="Send money to family abroad instantly with significantly lower fees than traditional services."
              delay={0.2}
              color="teal"
              variant="glass"
            />

            <PremiumUseCaseCard
              icon={<Building className="w-6 h-6" />}
              title="Business Payments"
              description="Companies can make cross-border payments to vendors and partners efficiently."
              delay={0.3}
              color="purple"
              variant="glass"
            />

            <PremiumUseCaseCard
              icon={<School className="w-6 h-6" />}
              title="NGO Fund Transfers"
              description="Non-profits can distribute funds globally with full transparency and minimal fees."
              delay={0.4}
              color="green"
              variant="glass"
            />
          </div>
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
              Join thousands of users who are already saving time and money with FusionPay's innovative payment
              solution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatedButton size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

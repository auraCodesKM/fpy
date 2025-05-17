"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { FusionPayLogo } from "@/components/fusion-pay-logo";
import { useTheme } from "next-themes";
import { ParticleAnimation } from "@/components/particle-animation";
import { FloatingElements } from "@/components/floating-elements";
import { TiltCard } from "@/components/tilt-card";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (mounted && !user) {
      router.push("/auth");
    }
  }, [user, router, mounted]);

  const isDarkMode = mounted && theme === "dark";

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-12 w-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Subtle background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <ParticleAnimation count={30} opacity={0.05} />
        <FloatingElements count={5} opacity={0.03} />
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FusionPayLogo darkMode={isDarkMode} size="small" />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-700 dark:text-slate-300">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Welcome to FusionPay, {user.displayName || user.email?.split("@")[0]}
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Your global payment dashboard is being prepared. Soon you'll be able to send money across borders instantly and at a fraction of the cost.
          </p>
        </motion.div>

        {/* Interactive Visualizations Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Interactive Visualizations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Interactive Global Transaction Map */}
            <TiltCard>
              <div className="p-6 h-full">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Global Transaction Map
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  View real-time transaction flows across the globe with our interactive map.
                </p>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 h-40 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-center">
                    Coming soon: Interactive global transaction visualization
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Comparative Fee Visualization */}
            <TiltCard>
              <div className="p-6 h-full">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Fee Comparison
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Compare traditional bank fees with FusionPay's low-cost alternatives.
                </p>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 h-40 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-center">
                    Coming soon: Comparative fee visualization
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Transaction Speed Timeline */}
            <TiltCard>
              <div className="p-6 h-full">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Speed Comparison
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  See how FusionPay's instant transfers compare to traditional methods.
                </p>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 h-40 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-center">
                    Coming soon: Transaction speed timeline
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Multi-Currency Conversion Simulator */}
            <TiltCard>
              <div className="p-6 h-full">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Currency Converter
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Simulate real-time currency conversions with competitive rates.
                </p>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 h-40 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-center">
                    Coming soon: Multi-currency conversion simulator
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Blockchain Transaction Visualization */}
            <TiltCard>
              <div className="p-6 h-full">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Blockchain Explorer
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Explore the underlying technology that powers FusionPay transfers.
                </p>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 h-40 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-center">
                    Coming soon: Blockchain transaction visualization
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* User Journey Animation */}
            <TiltCard>
              <div className="p-6 h-full">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Payment Journey
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Watch an animated demonstration of the full payment process.
                </p>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 h-40 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-center">
                    Coming soon: User journey animation
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Return to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

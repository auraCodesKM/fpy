"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { FusionPayLogo } from "@/components/fusion-pay-logo";
import { useTheme } from "next-themes";
import { ParticleAnimation } from "@/components/particle-animation";
import { FloatingElements } from "@/components/floating-elements";
import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot-password">("login");
  const router = useRouter();
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Background video */}
      <div className="fixed inset-0 w-full h-full z-0 opacity-30">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={isDarkMode ? "/videos/dark-mode-bg.mp4" : "/videos/light-mode-bg.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-slate-100/70 dark:from-slate-900/50 dark:to-slate-900/90" />
      </div>

      {/* Subtle background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <ParticleAnimation count={30} opacity={0.1} />
        <FloatingElements count={5} opacity={0.05} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        {/* Left side - Branding */}
        <motion.div 
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-8">
            <FusionPayLogo darkMode={isDarkMode} size="large" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Global Payments,{" "}
            <span className="text-blue-600 dark:text-blue-400">Reimagined</span>
          </h1>
          
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-lg">
            Send money across borders in seconds, not days. No banks. Just stablecoins. 
            Powered by blockchain and AI routing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-lg">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">90%</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Lower fees than banks</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10s</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Average transaction time</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">150+</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Countries supported</div>
            </div>
          </div>
        </motion.div>
        
        {/* Right side - Auth form */}
        <motion.div 
          className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full max-w-md">
            <AuthForm initialMode={mode} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

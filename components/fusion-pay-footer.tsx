"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { 
  Github, 
  Twitter, 
  FileText, 
  Globe, 
  ChevronDown, 
  Moon, 
  Sun
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FusionPayFooter({ darkMode = false }) {
  const [language, setLanguage] = useState("EN")
  
  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "HI", name: "हिन्दी" },
    { code: "JP", name: "日本語" }
  ]
  
  return (
    <footer className={`py-12 px-4 ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-blue-500 mr-2">Fusion</span>
              <span>Pay</span>
            </h2>
            <p className={`mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              A decentralized, AI-powered payment app enabling seamless cross-border fiat payments using stablecoins via Base L2.
            </p>
            <div className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-500"} border-t ${darkMode ? "border-slate-800" : "border-slate-200"} pt-4 mt-4`}>
              FusionPay is a demo product built for educational purposes. No real money or crypto is transacted.
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className={`space-y-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              <li>
                <a href="https://github.com" className="hover:underline flex items-center">
                  <Github className="w-4 h-4 mr-2" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://devfolio.co" className="hover:underline flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> Devfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center">
                  <Globe className="w-4 h-4 mr-2" /> Testnet Faucet
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:underline flex items-center">
                  <Twitter className="w-4 h-4 mr-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> Docs
                </a>
              </li>
            </ul>
          </div>
          
          {/* Settings */}
          <div>
            <h3 className="font-semibold mb-4">Settings</h3>
            <div className="space-y-4">
              {/* Language Selector */}
              <div>
                <label className={`block text-sm mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Language
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`w-full justify-between ${darkMode ? "border-slate-700 bg-slate-800" : ""}`}
                    >
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        {language}
                      </span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={darkMode ? "bg-slate-800 border-slate-700" : ""}>
                    {languages.map((lang) => (
                      <DropdownMenuItem 
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`${language === lang.code ? (darkMode ? "bg-slate-700" : "bg-slate-100") : ""} cursor-pointer`}
                      >
                        {lang.name} ({lang.code})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Theme Toggle */}
              <div>
                <label className={`block text-sm mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Theme
                </label>
                <div className="flex">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-12 pt-6 border-t ${darkMode ? "border-slate-800" : "border-slate-200"} flex flex-col md:flex-row justify-between items-center`}>
          <div className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
            © {new Date().getFullYear()} FusionPay. All rights reserved.
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className={`text-sm ${darkMode ? "text-slate-500 hover:text-slate-400" : "text-slate-500 hover:text-slate-700"}`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-sm ${darkMode ? "text-slate-500 hover:text-slate-400" : "text-slate-500 hover:text-slate-700"}`}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

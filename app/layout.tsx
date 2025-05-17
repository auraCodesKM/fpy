import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0f172a' }, { color: '#ffffff' }],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "FusionPay - Send Money Across Borders",
  description:
    "Send money across borders. No banks. Just stablecoins. FusionPay lets you move money globally in minutes — powered by Base and AI routing.",
  generator: 'FusionPay',
  metadataBase: new URL('https://fusionpay.app'),
  icons: {
    icon: '/fusionpay-logo.svg',
    apple: '/fusionpay-logo.svg',
    shortcut: '/fusionpay-logo.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fusionpay.app',
    title: 'FusionPay - Send Money Across Borders',
    description: 'Send money globally in minutes, not days. No banks. Just stablecoins.',
    siteName: 'FusionPay',
    images: [
      {
        url: '/fusionpay-og.png',
        width: 1200,
        height: 630,
        alt: 'FusionPay - Global Payments Reimagined',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FusionPay - Send Money Across Borders',
    description: 'Send money globally in minutes, not days. No banks. Just stablecoins.',
    images: ['/fusionpay-og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

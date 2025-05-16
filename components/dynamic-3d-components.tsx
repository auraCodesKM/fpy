"use client"

import { FallbackHeroSection } from "./fallback-hero-section"
import { FallbackGlobe } from "./fallback-globe"
import { RedesignedHero } from "./redesigned-hero"

export function DynamicHero3D({ darkMode }: { darkMode: boolean }) {
  return <FallbackHeroSection darkMode={darkMode} />
}

export function DynamicAnimatedGlobe({ darkMode }: { darkMode: boolean }) {
  return <FallbackGlobe darkMode={darkMode} />
}

export { RedesignedHero }

"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface MediaBackgroundProps {
  opacity?: number;
  className?: string;
}

export function MediaBackground({ 
  opacity = 0.05, 
  className = ""
}: MediaBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Play video when component mounts
  useEffect(() => {
    if (!videoRef.current || !mounted) return
    
    videoRef.current.play().catch(e => {
      console.error("Video play error:", e)
    })
  }, [mounted])

  const isDarkMode = mounted && theme === "dark"
  
  // Select video source based on theme - using URL-encoded paths
  const videoSrc = isDarkMode 
    ? "/MP4/Infinity%20big%20(white%20on%20black).mp4" 
    : "/MP4/Infinity%20big%20(black%20on%20white).mp4"
  
  if (!mounted) return null

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ opacity }}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src={videoSrc}
      />
    </div>
  )
}

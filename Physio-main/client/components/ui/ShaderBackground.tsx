"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import MistOverlay from "./MistOverlay"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden">
      {/* Main gradient background - subtle green version */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={[
          "#264348", // Original subtle green-teal
          "#2a4e50", // Slightly greener
          "#2e5852", // More green tint
          "#326254", // Balanced green-teal
          "#366c56", // Medium green
          "#3a7658", // Warmer green
          "#3e805a", // Fresh green
          "#428a5c", // Natural green
          "#46945e", // Bright green accent
          "#4a9e60", // Light green
        ]}
        speed={0.25}
        backgroundColor="#264348"
      />

      {/* Mist Overlay with 90% transparency */}
      <MistOverlay />

      {children}
    </div>
  )
}

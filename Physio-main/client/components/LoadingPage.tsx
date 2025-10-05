"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import ShaderBackground from "./ui/ShaderBackground"

interface Props {
  onComplete?: () => void
  fadeOut?: boolean
}

export default function LoadingPage({ onComplete, fadeOut = false }: Props) {
  const [isExiting, setIsExiting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const fogRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Handle fadeOut prop changes
  useEffect(() => {
    if (fadeOut && !isExiting) {
      handleExit()
    }
  }, [fadeOut])

  // Initial logo + text + button animation
  useEffect(() => {
    const timeline = gsap.timeline()

    // Logo animation
    timeline.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
    )

    // Text animation - moves upward
    timeline.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
      },
      "-=0.5" // Overlap with previous animation
    )

    // Button animation - appears at same time as text stabilizes
    timeline.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1.5" // Start button animation during text animation
    )

    return () => {
      timeline.kill()
    }
  }, [])

  // Interactive fog & glare effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!fogRef.current || !glareRef.current || !glowRef.current) return

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    gsap.to(fogRef.current, {
      x: (x - 50) * 4,
      y: (y - 50) * 4,
      duration: 2,
      ease: "power2.out",
    })

    gsap.to(glareRef.current, {
      x: (x - 50) * 6,
      y: (y - 50) * 6,
      duration: 1.5,
      ease: "power2.out",
    })

    gsap.to(glowRef.current, {
      x: (x - 50) * 3,
      y: (y - 50) * 3,
      duration: 2.5,
      ease: "power2.out",
    })
  }

  // Handle dissolve exit transition
  const handleExit = () => {
    if (isExiting) return
    setIsExiting(true)

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // Restore scroll and call onComplete
        document.body.style.overflow = "auto"
        onComplete?.()
      },
    })

    // Animate all elements out
    tl.to(
      [fogRef.current, glareRef.current, glowRef.current],
      {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      },
      0,
    )
    
    tl.to(
      [textRef.current, buttonRef.current],
      {
        opacity: 0,
        y: -50,
        duration: 1,
      },
      0.2,
    )
    
    tl.to(
      logoRef.current,
      {
        opacity: 0,
        scale: 0.5,
        duration: 1,
      },
      0.2,
    )

    // Finally fade out the entire container
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
      },
      0.8,
    )
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen relative z-50 overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      style={{
        willChange: "opacity, transform, filter",
      }}
    >
      {/* Shader Background */}
      <div className="absolute inset-0 w-full h-full">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>

      {/* Glow Layers */}
      <div className="absolute inset-0">
        {/* Fog Layer */}
        <div
          ref={fogRef}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "450px",
            height: "450px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 80%)",
            filter: "blur(100px)",
            opacity: 0.9,
          }}
        />

        {/* Glare Layer */}
        <div
          ref={glareRef}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "300px",
            height: "300px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255, 255, 255,0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
            opacity: 0.8,
          }}
        />

        {/* Extra Glow Layer */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255, 255, 255,0.08) 0%, transparent 85%)",
            filter: "blur(120px)",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Logo */}
      <div className="absolute top-12 left-12">
        <img
          ref={logoRef}
          src="/Logo.png"
          alt="Flexrite World Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={textRef} className="relative text-center mb-12">
          <h1
            className="font-playfair font-bold text-white text-6xl md:text-8xl tracking-wide relative z-10"
            style={{
              textShadow: "0 0 25px rgba(255, 255, 255, 0.4)",
            }}
          >
            FLEXRITE WORLD
          </h1>
        </div>

        {/* Enter Button - Always present but initially hidden */}
        <div className="mt-8">
          <button
            ref={buttonRef}
            onClick={handleExit}
            className="w-28 h-28 rounded-full border-2 border-white/60 bg-transparent hover:bg-white/15 transition-all duration-500 flex items-center justify-center group hover:scale-110 opacity-0"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.3)",
              textShadow: "0 0 15px rgba(255, 255, 255, 0.9)",
            }}
          >
            <span className="text-white text-sm font-source uppercase tracking-widest group-hover:text-white/90 transition-colors duration-0.02">
              Enter
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
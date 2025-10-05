"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newRipple = {
          id: Date.now(),
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          timestamp: Date.now(),
        }
        setRipples((prev) => [...prev, newRipple])

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
        }, 600)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("click", handleClick)
      window.addEventListener("resize", handleResize)
      handleResize() // Initial call
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("click", handleClick)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getResponsiveSize = (baseSize: number) => {
    const minDimension = Math.min(dimensions.width || 1920, dimensions.height || 1080)
    return Math.max(baseSize * (minDimension / 1920), baseSize * 0.5)
  }

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden cursor-none">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="liquid-distortion" x="-100%" y="-100%" width="300%" height="300%">
            <feTurbulence baseFrequency="0.02 0.018" numOctaves="4" result="noise" seed="5">
              <animate
                attributeName="baseFrequency"
                values="0.02 0.018;0.028 0.025;0.02 0.018"
                dur="12s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" result="distort1" />
            <feGaussianBlur in="distort1" stdDeviation="1.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0.12 0.28 0.25 0 0.02
                      0.35 0.75 0.45 0 0.05
                      0.20 0.50 0.35 0 0.08
                      0 0 0 0.85 0"
              result="tint"
            />
          </filter>

          <filter id="shimmer-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0.8 0.1 0.1 0 0.02
                      0.2 1.5 0.3 0 0.06
                      0.1 0.4 1.2 0 0.04
                      0 0 0 0.6 0"
              result="shimmer"
            />
          </filter>

          <filter id="ripple-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="0.15 0.25 0.22 0 0.03  0.30 0.80 0.50 0 0.08  0.25 0.60 0.40 0 0.10  0 0 0 0.75 0"
              result="ripple"
            />
          </filter>

          <filter id="mistyBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="32" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
            </feMerge>
          </filter>

          <linearGradient id="shineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>

          <radialGradient id="shineGradient2" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="whiteEdgeGlowTop" cx="50%" cy="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="40%" stopColor="rgba(255, 255, 255, 0.04)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.02)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="whiteEdgeGlowBottom" cx="50%" cy="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="40%" stopColor="rgba(255, 255, 255, 0.04)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.02)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="whiteEdgeGlowLeft" cx="0%" cy="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.07)" />
            <stop offset="35%" stopColor="rgba(255, 255, 255, 0.035)" />
            <stop offset="65%" stopColor="rgba(255, 255, 255, 0.018)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="whiteEdgeGlowRight" cx="100%" cy="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.07)" />
            <stop offset="35%" stopColor="rgba(255, 255, 255, 0.035)" />
            <stop offset="65%" stopColor="rgba(255, 255, 255, 0.018)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={[
          "#1a4a3a",
          "#225540",
          "#2a6046",
          "#326b4c",
          "#3a7652",
          "#428158",
          "#4a8c5e",
          "#529764",
          "#5aa26a",
          "#62ad70",
        ]}
        speed={0.25}
        backgroundColor="#1a4a3a"
      />

      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#225540", "#326b4c", "#428158", "#529764", "#5aa26a", "#62ad70"]}
        speed={0.18}
        wireframe="true"
        backgroundColor="transparent"
      />

      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-20"
        colors={["#2a6046", "#3a7652", "#4a8c5e", "#5aa26a", "#62ad70"]}
        speed={0.12}
        backgroundColor="transparent"
      />

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full opacity-40"
          style={{
            background: "url(#shineGradient1)",
            mixBlendMode: "soft-light",
          }}
        />

        <div
          className="absolute inset-0 w-full h-full opacity-25"
          style={{
            background: "url(#shineGradient2)",
            mixBlendMode: "overlay",
          }}
        />

        <div
          className="absolute inset-0 w-full h-full opacity-15"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
            animation: "shine-sweep 15s ease-in-out infinite",
          }}
        />

        <div
          className="absolute top-0 left-0 w-full h-1/2"
          style={{
            background: "url(#whiteEdgeGlowTop)",
            filter: "url(#mistyBlur)",
            opacity: 0.7,
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background: "url(#whiteEdgeGlowBottom)",
            filter: "url(#mistyBlur)",
            opacity: 0.7,
          }}
        />

        <div
          className="absolute top-0 left-0 w-1/2 h-full"
          style={{
            background: "url(#whiteEdgeGlowLeft)",
            filter: "url(#mistyBlur)",
            opacity: 0.6,
          }}
        />

        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background: "url(#whiteEdgeGlowRight)",
            filter: "url(#mistyBlur)",
            opacity: 0.6,
          }}
        />

        <div
          className="absolute top-0 left-0 w-1/2 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)",
            filter: "blur(32px)",
            opacity: 0.8,
          }}
        />

        <div
          className="absolute top-0 right-0 w-1/2 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)",
            filter: "blur(32px)",
            opacity: 0.8,
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)",
            filter: "blur(32px)",
            opacity: 0.8,
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)",
            filter: "blur(32px)",
            opacity: 0.8,
          }}
        />
      </div>

      {isActive && (
        <div
          className="absolute pointer-events-none z-50 transition-all duration-75 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
            width: `${Math.max(getResponsiveSize(12), 8)}px`,
            height: `${Math.max(getResponsiveSize(12), 8)}px`,
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "50%",
            boxShadow:
              "0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.3), 0 0 24px rgba(26, 74, 58, 0.2)",
            filter: "url(#shimmer-effect)",
          }}
        />
      )}

      {isActive && (
        <>
          <div
            className="absolute pointer-events-none transition-all duration-200 ease-out"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: "translate(-50%, -50%)",
              width: `${getResponsiveSize(200)}px`,
              height: `${getResponsiveSize(200)}px`,
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(26, 74, 58, 0.25) 20%, rgba(34, 85, 64, 0.15) 50%, rgba(42, 96, 70, 0.08) 80%, transparent 95%)",
              borderRadius: "50%",
              filter: "url(#liquid-distortion) blur(3px)",
            }}
          />

          <div
            className="absolute pointer-events-none transition-all duration-150 ease-out"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: "translate(-50%, -50%)",
              width: `${getResponsiveSize(120)}px`,
              height: `${getResponsiveSize(120)}px`,
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(34, 85, 64, 0.18) 30%, rgba(26, 74, 58, 0.12) 60%, transparent 85%)",
              borderRadius: "50%",
              filter: "blur(1.5px)",
            }}
          />
        </>
      )}

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: "translate(-50%, -50%)",
            width: `${getResponsiveSize(50)}px`,
            height: `${getResponsiveSize(50)}px`,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(34, 85, 64, 0.4) 25%, rgba(26, 74, 58, 0.25) 60%, rgba(42, 96, 70, 0.1) 85%, transparent 100%)",
            borderRadius: "50%",
            filter: "url(#liquid-distortion) url(#ripple-effect) url(#shimmer-effect)",
            animation: "ripple-expand 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.9;
          }
          40% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }

        @keyframes shine-sweep {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          50% {
            transform: translateX(0%) translateY(0%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>

      {children}
    </div>
  )
}

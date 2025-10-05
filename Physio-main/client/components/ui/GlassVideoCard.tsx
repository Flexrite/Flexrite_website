"use client"

import { useRef, useEffect } from "react"

type GlassVideoCardProps = {
  src: string
  poster?: string
  title?: string
  className?: string
  videoClassName?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
}

export default function GlassVideoCard({
  src,
  poster,
  title,
  className = "",
  videoClassName = "",
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
}: GlassVideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const px = x / rect.width - 0.5
      const py = y / rect.height - 0.5

      // subtle 3D tilt
      const rotX = -(py * 8)
      const rotY = px * 8
      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`

      // shine sweep
      if (shineRef.current) {
        shineRef.current.style.opacity = "0.25"
        shineRef.current.style.transform = `translate(-50%,-50%) rotate(45deg) translate(${px * 40}px, ${py * 40}px)`
      }
    }

    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
      if (shineRef.current) {
        shineRef.current.style.opacity = "0"
        shineRef.current.style.transform = `translate(-50%,-50%) rotate(45deg)`
      }
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)] will-change-transform transition-transform duration-200 ease-out ${className}`}
      aria-label={title || "Video"}
    >
      {/* inner vignette */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.12),rgba(0,0,0,0)_50%),radial-gradient(120%_80%_at_50%_120%,rgba(0,0,0,0.35),transparent_60%)]" />

      {/* glossy highlight */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-3xl opacity-0 transition-opacity"
      />

      {/* corner glints */}
      <div className="pointer-events-none absolute right-6 top-6 h-10 w-10 rounded-full border border-white/20 bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.35)] opacity-20" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-24 w-24 bg-gradient-to-tr from-white/10 to-transparent opacity-20" />

      {/* media */}
      <video
        className={`relative z-10 block w-full h-48 sm:h-52 md:h-56 lg:h-52 xl:h-56 object-cover rounded-2xl ${videoClassName}`}
        src={src}
        poster={poster}
        title={title}
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
      />
    </div>
  )
}

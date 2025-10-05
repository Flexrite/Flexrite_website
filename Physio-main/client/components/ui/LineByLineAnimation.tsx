"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface LineByLineAnimationProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
}

const LineByLineAnimation: React.FC<LineByLineAnimationProps> = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into lines (assuming they are separated by \n or periods)
    const lines = children.split(/\n|\./).filter((line) => line.trim() !== "")
    container.innerHTML = ""

    lines.forEach((line, index) => {
      const lineDiv = document.createElement("div")
      lineDiv.textContent = line.trim() + (index < lines.length - 1 ? "." : "")
      lineDiv.style.opacity = "0"
      lineDiv.style.transform = "translateY(30px)"
      lineDiv.style.display = "block"
      lineDiv.style.willChange = "transform, opacity"
      lineDiv.style.backfaceVisibility = "hidden"
      container.appendChild(lineDiv)
    })

    // Animate lines
    const lineElements = container.querySelectorAll("div")

    gsap.fromTo(
      lineElements,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: staggerDelay,
        delay: delay,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [children, delay, staggerDelay])

  return <div ref={containerRef} className={className} />
}

export default LineByLineAnimation

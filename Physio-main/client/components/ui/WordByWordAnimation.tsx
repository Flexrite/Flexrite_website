"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface WordByWordAnimationProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
}

const WordByWordAnimation: React.FC<WordByWordAnimationProps> = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into words
    const words = children.split(" ")
    container.innerHTML = ""

    words.forEach((word, index) => {
      const wordSpan = document.createElement("span")
      wordSpan.textContent = word
      wordSpan.style.opacity = "0"
      wordSpan.style.transform = "translateY(50px)"
      wordSpan.style.display = "inline-block"
      wordSpan.style.marginRight = "0.5rem" // Proper spacing between words
      wordSpan.style.willChange = "transform, opacity"
      wordSpan.style.backfaceVisibility = "hidden"
      container.appendChild(wordSpan)
    })

    // Animate words with smoother settings
    const wordElements = container.querySelectorAll("span")

    gsap.fromTo(
      wordElements,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
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

export default WordByWordAnimation

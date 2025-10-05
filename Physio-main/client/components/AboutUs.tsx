"use client"

import { useState, useEffect } from "react"
import WordByWordAnimation from "./ui/WordByWordAnimation"
import LineByLineAnimation from "./ui/LineByLineAnimation"
import ThankYouCard from "./ThankYouCards"

export default function AboutUs() {
  const slogans = [
    "Driven by Excellence, Fueled by Passion",
    "Navigating Wellness",
    "Connecting Care and Knowledge",
  ]

  const videoCards = [
    {
      id: 101,
      name: "Our Story – Intro",
      title: "WATCH INTRO",
      description: "Learn about our mission, approach, and the care we provide.",
      image: "/images/video2.png",
    },
    {
      id: 102,
      name: "Patient Journey",
      title: "WATCH VIDEO 1",
      description: "Recovery path, guidance, and milestones.",
      image: "/images/video1.png",
    },
    {
      id: 103,
      name: "Move Better Daily",
      title: "WATCH VIDEO 2",
      description: "Daily mobility, posture, and tips.",
      image: "/images/video3.png",
    },
  ]

  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Change slogan every 200px of scroll
      const scrollIndex = Math.floor(scrollY / 200) % slogans.length
      setCurrentSloganIndex(scrollIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [slogans.length])

  return (
    <section className="relative min-h-screen py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-20 z-[20] overflow-x-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      <div className="max-w-7xl mx-auto">
        {/* Content Container - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-12 md:mb-16">
          {/* Left Column - Text Content */}
          <div className="flex flex-col">
            {/* Our Story Title */}
            <div className="mb-6 lg:mb-8 w-full">
              <h2 className="text-left w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-snug text-white">
                OUR STORY.
              </h2>
            </div>

            {/* Main Heading with Word Animation */}
            <div className="mb-6 md:mb-8 w-full">
              <div className="text-left">
                <WordByWordAnimation
                  className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white block"
                  delay={0.1}
                  staggerDelay={0.03}
                >
                  Your health is our mission.
                </WordByWordAnimation>
                <WordByWordAnimation
                  className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white block"
                  delay={0.3}
                  staggerDelay={0.03}
                >
                  Helping you move better, recover faster,
                </WordByWordAnimation>
                <WordByWordAnimation
                  className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white block"
                  delay={0.5}
                  staggerDelay={0.03}
                >
                  and enjoy a vibrant lifestyle.
                </WordByWordAnimation>
              </div>
            </div>

            {/* Subheading */}
            <div className="w-full">
              <WordByWordAnimation
                className="font-light text-lg sm:text-xl lg:text-2xl mb-6 md:mb-8 text-white text-left"
                delay={0.7}
                staggerDelay={0.05}
              >
                Stronger, Healthier, Happier
              </WordByWordAnimation>
            </div>
          </div>

          {/* Right Column - Video Placeholder with Glass 3D */}
          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <div className="w-full max-w-2xl px-4 sm:px-0">
              <ThankYouCard doctor={videoCards[0]} />
            </div>
          </div>
        </div>

        {/* Quotes and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
          {/* Left Half - Animated Slogans/Quotes */}
          <div className="flex flex-col items-start justify-center">
            <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden flex items-center w-full">
              {slogans.map((slogan, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out transform ${
                    index === currentSloganIndex
                      ? "translate-y-0 opacity-100"
                      : index < currentSloganIndex
                        ? "-translate-y-full opacity-0"
                        : "translate-y-full opacity-0"
                  }`}
                >
                  <p
                    className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-tight text-left px-2 sm:px-0"
                    style={{
                      fontStyle: "italic",
                      letterSpacing: "0.5px",
                    }}
                  >
                    "{slogan}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Half - Description Text */}
          <div className="flex items-center mt-4 lg:mt-0">
            <LineByLineAnimation
              className="font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-white/90 text-left px-2 sm:px-0"
              delay={0.8}
              staggerDelay={0.2}
            >
              Flexrite World is a health and wellness center in Mumbai, specializing in physiotherapy. Our mission is to
              help people live active, pain-free lives by providing personalized care for recovery, pain management, and
              improved performance. With expert guidance and tailored programs, we support every step of your wellness
              journey toward strength, vitality,and joy....
            </LineByLineAnimation>
          </div>
        </div>

      </div>
    </section>
  )
}

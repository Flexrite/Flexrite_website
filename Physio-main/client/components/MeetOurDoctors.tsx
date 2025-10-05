"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ElegantShadowTitle from "./ui/ElegantShadowTitle"
import SubtextWithStrip from "./ui/SubtextWithStrip"
import ThankYouCard from "./ui/ThankYouCard"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

interface Doctor {
  id: number
  name: string
  title: string
  description: string
  image: string
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Priyanka Das",
    title: "DIRECTOR (PHYSIOLOGY)",
    description:
      "Paramedic Doc & Professional Therapist\nNational player's Fitness Coach\n(Martial arts & Body Building)",
    image: "/das.jpg",
  },
  {
    id: 2,
    name: "Dr. Dhiraj Gupta",
    title: "SENIOR ORTHO SURGEON / CONSULTANT",
    description:
      "MBBS, MS -DNB - FRCS Ortho\nMRCS Edinburgh,\nEngland NHS\nVisiting Consultant UK, MCH",
    image: "/Gupta.jpg",
  },
  {
    id: 3,
    name: "Dr. Asimayan Nandi",
    title: "SENIOR PEDIATRIC NDT THERAPIST",
    description:
      "PHD Scholar\nNeuro Development Therapy (NDT)\nNDT Therapist ( BOBATH Method)\nNeuro - Disability, Fine Motor,\nGenetic & Syndromic, Toddler & Adults",
    image: "/Nandi.jpg",
  },
]

export default function MeetOurDoctors() {
  const subtitleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure subtitle stays visible by removing any hiding animations
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
    }
  }, [])

  return (
    <section className="relative py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-20 bg-gradient-to-b overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <ElegantShadowTitle>Meet Our Doctors</ElegantShadowTitle>
          <div ref={subtitleRef} className="mt-6 md:mt-8 px-4">
            <SubtextWithStrip
              className="font-light text-white text-base md:text-lg lg:text-xl"
              delay={0.3}
            >
              Compassionate experts dedicated to your recovery and well-being.
            </SubtextWithStrip>
          </div>
        </div>

        {/* Doctor Cards with Zig-Zag Pattern */}
        <div className="relative w-full">
          <div className="space-y-16 md:space-y-24 lg:space-y-32">
            {/* First card - left aligned */}
            <div className="w-full flex justify-center lg:justify-start">
              <div className="w-full max-w-xl lg:max-w-[600px]">
                <ThankYouCard doctor={doctorsData[0]} />
              </div>
            </div>

            {/* Second card - right aligned */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-xl lg:max-w-[600px]">
                <ThankYouCard doctor={doctorsData[1]} />
              </div>
            </div>

            {/* Third card - left aligned */}
            <div className="w-full flex justify-center lg:justify-start">
              <div className="w-full max-w-xl lg:max-w-[600px]">
                <ThankYouCard doctor={doctorsData[2]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

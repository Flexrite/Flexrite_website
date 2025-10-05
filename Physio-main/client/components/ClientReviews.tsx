"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface Review {
  id: string
  name: string
  rating: number
  review: string
  service: string
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    review: "Outstanding physiotherapy service! Dr. Priyanka helped me recover from my sports injury faster than I expected.",
    service: "Sports Injury Recovery"
  },
  {
    id: "2", 
    name: "Rajesh Kumar",
    rating: 5,
    review: "Professional and caring approach. The pain management techniques really worked wonders for my chronic back pain.",
    service: "Pain Management"
  },
  {
    id: "3",
    name: "Anjali Mehta", 
    rating: 5,
    review: "Excellent post-surgery rehabilitation. The team is knowledgeable and supportive throughout the recovery process.",
    service: "Post-Surgery Rehabilitation"
  },
  {
    id: "4",
    name: "Vikram Singh",
    rating: 5,
    review: "Highly recommend Flexrite World. Their personalized treatment approach made all the difference in my recovery.",
    service: "Personalized Treatment"
  },
  {
    id: "5",
    name: "Neha Agarwal",
    rating: 5,
    review: "Amazing results! The therapeutic massage sessions helped relieve my stress and muscle tension completely.",
    service: "Therapeutic Massage"
  },
  {
    id: "6",
    name: "Arjun Patel",
    rating: 5,
    review: "Best physiotherapy center in Mumbai. Professional staff and modern facilities make the experience excellent.",
    service: "General Physiotherapy"
  }
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/15 hover:border-white/30 h-full flex flex-col">
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {Array(5).fill(0).map((_, i) => (
          <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-500'}`}>
            ★
          </span>
        ))}
      </div>
      
      {/* Review Text */}
      <p className="text-white/90 text-sm leading-relaxed mb-4 italic flex-grow">
        "{review.review}"
      </p>
      
      {/* Client Info */}
      <div className="border-t border-white/20 pt-4 mt-auto">
        <h4 className="text-white font-semibold text-base mb-1">
          {review.name}
        </h4>
        <p className="text-white/70 text-sm">
          {review.service}
        </p>
      </div>
    </div>
  )
}

export default function ClientReviews() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for all cards
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 50
      })

      // Create the animation
      animationRef.current = gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0, // No stagger - all animate simultaneously
        ease: "power2.out",
        paused: true, // Start paused, let ScrollTrigger control it
        immediateRender: false
      })

      // Set up ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => animationRef.current?.play(),
        onEnterBack: () => animationRef.current?.play(),
        onLeave: () => animationRef.current?.reverse(),
        onLeaveBack: () => animationRef.current?.reverse(),
        toggleActions: "play reverse play reverse"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Add cards to ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} className="py-8 lg:py-12 px-4 lg:px-16 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div key={review.id} ref={addToRefs} className="h-full">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
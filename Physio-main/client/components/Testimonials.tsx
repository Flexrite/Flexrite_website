"use client"
import React, { useState } from "react"
import ElegantShadowTitle from './ui/ElegantShadowTitle'
import SubtextWithStrip from './ui/SubtextWithStrip'

interface CardData {
  id: string
  imageSrc: string
  quote: string
  author: string
  company: string
}

const cards: CardData[] = [
  {
    id: "1",
    imageSrc: "/BT.avif",
    quote: "Flexrite World has been my top choice for years. Whether it's any time, they are my first call.",
    author: "Bhavna Talwar",
    company: "Phantom Production",
  },
  {
    id: "2", 
    imageSrc: "/JB.aviv",
    quote: "Flexrite World offers the fastest pain relief, and I believe the doctors there have a magical touch. I can vouch.",
    author: "Jaya Bhattacharya",
    company: "Actor",
  },
  {
    id: "3",
    imageSrc: "/CH.avif", 
    quote: "After collaborating with many physiotherapy institutes, I can say Flexrite World offers the best pain relief.",
    author: "Chandrakant Handore",
    company: "Member of Parliament",
  },
  {
    id: "4",
    imageSrc: "/AM.avif",
    quote: "Priyanka excels at her work; bring your loved ones to Flexrite. Health is biggest investment.", 
    author: "Anupam Mittal",
    company: "Investor",
  },
  {
    id: "5",
    imageSrc: "/AB.avif",
    quote: "Experiencing healing at Flexrite World is essential on my agenda, right alongside refreshments and rest.",
    author: "Abhishek Bachchan", 
    company: "Actor",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-16 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ElegantShadowTitle>
            What Our Clients Say
          </ElegantShadowTitle>
          <SubtextWithStrip 
            className="font-source text-white text-lg lg:text-xl"
            delay={0.3}
          >
            Real stories from our valued clients and their recovery journeys.
          </SubtextWithStrip>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Main Testimonial Card */}
          <div 
            className="rounded-3xl p-8 lg:p-12 mx-auto max-w-4xl transition-all duration-500 ease-in-out"
            style={{
              minHeight: '400px'
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Client Image */}
              <div className="flex-shrink-0">
                <img
                  src={cards[currentIndex].imageSrc}
                  alt={cards[currentIndex].author}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/30 shadow-xl"
                />
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Quote */}
                <div className="mb-6">
                  <svg className="w-8 h-8 text-teal-light mb-4 mx-auto lg:mx-0" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8z"/>
                  </svg>
                  <p className="text-white text-xl lg:text-2xl leading-relaxed font-source" style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.3)' }}>
                    "{cards[currentIndex].quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div>
                  <h4 className="text-white font-bold text-lg lg:text-xl font-playfair mb-1" style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.3)' }}>
                    {cards[currentIndex].author}
                  </h4>
                  <p className="text-teal-light text-base lg:text-lg font-source">
                    {cards[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 lg:-left-16 top-1/2 -translate-y-1/2 rounded-full p-3 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-white group-hover:text-teal-light transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 lg:-right-16 top-1/2 -translate-y-1/2 rounded-full p-3 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-white group-hover:text-teal-light transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-teal-light scale-125' 
                  : 'hover:scale-110'
              }`}
              style={index === currentIndex ? {
                boxShadow: '0 0 15px rgba(94, 234, 212, 0.6), 0 0 30px rgba(94, 234, 212, 0.3)'
              } : {}}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Client Logos/Companies (Optional) */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm font-source mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* You can add company logos here if available */}
            <div className="text-white/40 font-source text-sm">Phantom Production</div>
            <div className="text-white/40 font-source text-sm">Bollywood Industry</div>
            <div className="text-white/40 font-source text-sm">Parliament</div>
            <div className="text-white/40 font-source text-sm">Shark Tank India</div>
          </div>
        </div>
      </div>
    </section>
  );
}
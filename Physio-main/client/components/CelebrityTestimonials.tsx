"use client"
import { useState } from "react"
import ElegantShadowTitle from './ui/ElegantShadowTitle'

interface CardData {
  id: string
  imageSrc: string
  tagline: string
  title: string
  excerpt: string
  ctaText: string
  ctaLink: string
}

const cards: CardData[] = [
  {
    id: "1",
    imageSrc: "/BT.avif",
    tagline: "Flexrite World",
    title: "Bhavna Talwar / Producer",
    excerpt:
      "Flexrite World has been my top choice for years. Whether it's any time, they are my first call for physiotherapy needs.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "2",
    imageSrc: "/JB.avif",
    tagline: "Flexrite World",
    title: "Jaya Bhattacharya / Actor",
    excerpt:
      "Flexrite World offers the fastest pain relief, and I believe the doctors there have a magical touch. I can vouch for their expertise.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "3",
    imageSrc: "/CH.avif",
    tagline: "Flexrite World",
    title: "Chandrakant Handore / MP",
    excerpt:
      "After collaborating with many physiotherapy institutes, I can say Flexrite World offers the best pain relief and treatment.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "4",
    imageSrc: "/AM.avif",
    tagline: "Flexrite World",
    title: "Anupam Mittal / Investor",
    excerpt:
      "Priyanka excels at her work; bring your loved ones to Flexrite. Health is the biggest investment you can make.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "5",
    imageSrc: "/AB.avif",
    tagline: "Flexrite World",
    title: "Abhishek Bachchan / Actor",
    excerpt:
      "Experiencing healing at Flexrite World is essential on my agenda, right alongside refreshments and rest. Truly transformative.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
]

export default function CelebrityTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)

    const nextIndex = (newIndex + cards.length) % cards.length
    setCurrentIndex(nextIndex)

    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  const goToNext = () => {
    updateCarousel(currentIndex + 1)
  }

  const goToPrevious = () => {
    updateCarousel(currentIndex - 1)
  }

  const getCardPositionClass = (index: number) => {
    const offset = (index - currentIndex + cards.length) % cards.length

    if (offset === 0) return "center"
    if (offset === 1) return "right-1"
    if (offset === 2) return "right-2"
    if (offset === cards.length - 1) return "left-1"
    if (offset === cards.length - 2) return "left-2"
    return "hidden"
  }

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .testimonials-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          overflow: hidden;
        }

        .header-container {
          text-align: center;
          margin-bottom: 2rem;
        }

        @media (min-width: 1024px) {
          .header-container {
            margin-bottom: 3rem;
          }
        }

        .carousel-container {
          width: 100%;
          max-width: 1200px;
          height: 450px;
          position: relative;
          perspective: 1000px;
          margin: 0 auto;
        }

        .carousel-track {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform-style: preserve-3d;
        }

        .card {
          position: absolute;
          width: 280px;
          height: 380px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 20px;
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }

        .card-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
          text-align: center;
          width: 100%;
        }

        .card-role {
          font-size: 1rem;
          opacity: 0.9;
          color: white;
          text-align: center;
          width: 100%;
        }

        .card.center {
          z-index: 10;
          transform: scale(1.1) translateZ(0);
        }

        .card.center img {
          filter: none;
        }

        .card.left-2 {
          z-index: 1;
          transform: translateX(-220px) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .card.left-2 img {
          filter: grayscale(100%);
        }

        .card.left-1 {
          z-index: 5;
          transform: translateX(-110px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .card.left-1 img {
          filter: grayscale(100%);
        }

        .card.right-1 {
          z-index: 5;
          transform: translateX(110px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .card.right-1 img {
          filter: grayscale(100%);
        }

        .card.right-2 {
          z-index: 1;
          transform: translateX(220px) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .card.right-2 img {
          filter: grayscale(100%);
        }

        .card.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .testimonial-excerpt {
          color: white;
          font-size: 1.3rem;
          line-height: 1.6;
          max-width: 800px;
          text-align: center;
          margin: 40px auto 0;
          padding: 0 20px;
          opacity: ${isAnimating ? 0 : 1};
          transition: opacity 0.3s ease;
          font-weight: 300;
        }

        .dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 60px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: white;
          transform: scale(1.2);
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          font-size: 1.5rem;
          border: none;
          outline: none;
          padding-bottom: 4px;
        }

        .nav-arrow:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-arrow:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nav-arrow.left {
          left: 20px;
          padding-right: 3px;
        }

        .nav-arrow.right {
          right: 20px;
          padding-left: 3px;
        }

        @media (max-width: 768px) {
          .header-container {
            margin-bottom: 1.5rem;
          }

          .carousel-container {
            height: 400px;
          }

          .card {
            width: 200px;
            height: 280px;
          }

          .card-overlay {
            padding: 15px;
          }

          .card-name {
            font-size: 1.2rem;
          }

          .card-role {
            font-size: 0.9rem;
          }

          .card.left-2 {
            transform: translateX(-140px) scale(0.8) translateZ(-300px);
          }

          .card.left-1 {
            transform: translateX(-70px) scale(0.9) translateZ(-100px);
          }

          .card.right-1 {
            transform: translateX(70px) scale(0.9) translateZ(-100px);
          }

          .card.right-2 {
            transform: translateX(140px) scale(0.8) translateZ(-300px);
          }

          .testimonial-excerpt {
            font-size: 1.1rem;
            margin-top: 30px;
          }

          .nav-arrow {
            width: 35px;
            height: 35px;
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            margin-bottom: 1rem;
          }

          .carousel-container {
            height: 350px;
          }

          .card {
            width: 180px;
            height: 260px;
          }

          .card-overlay {
            padding: 12px;
          }

          .card-name {
            font-size: 1rem;
          }

          .card-role {
            font-size: 0.8rem;
          }

          .card.left-2,
          .card.right-2 {
            opacity: 0;
          }

          .card.left-1 {
            transform: translateX(-60px) scale(0.85) translateZ(-100px);
          }

          .card.right-1 {
            transform: translateX(60px) scale(0.85) translateZ(-100px);
          }

          .testimonial-excerpt {
            font-size: 1rem;
            margin-top: 25px;
          }

          .nav-arrow {
            width: 30px;
            height: 30px;
            font-size: 1.2rem;
          }

          .nav-arrow.left {
            left: 10px;
          }

          .nav-arrow.right {
            right: 10px;
          }
        }
      `}</style>

      <div className="testimonials-section">
        <div className="header-container">
          <div style={{ color: "#ffffff" }}>
            <ElegantShadowTitle>What Clients Are Saying ?</ElegantShadowTitle>
          </div>
        </div>

        <div className="carousel-container">
          <button 
            className="nav-arrow left" 
            onClick={goToPrevious} 
            disabled={isAnimating}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          
          <div className="carousel-track">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${getCardPositionClass(index)}`}
                onClick={() => updateCarousel(index)}
              >
                <img src={card.imageSrc} alt={card.title.split('/')[0].trim()} />
                <div className="card-overlay">
                  <div className="card-name">{card.title.split('/')[0].trim()}</div>
                  <div className="card-role">{card.title.split('/')[1].trim()}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="nav-arrow right" 
            onClick={goToNext} 
            disabled={isAnimating}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div className="testimonial-excerpt">
          "{cards[currentIndex].excerpt}"
        </div>

        <div className="dots">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => updateCarousel(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

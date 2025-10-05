"use client"
import { type FC, useRef, useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import { gsap } from "gsap"
import AboutUs from "./AboutUs"

const Hero: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutUsRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInAboutUs, setIsInAboutUs] = useState(false)
  const [initialAnimationDone, setInitialAnimationDone] = useState(false)
  const [linesAnimated, setLinesAnimated] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const checkAboutUsPosition = () => {
      if (!aboutUsRef.current) return

      const aboutUsRect = aboutUsRef.current.getBoundingClientRect()
      setIsInAboutUs(aboutUsRect.top < window.innerHeight / 2)
    }

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest)
      checkAboutUsPosition()
    })

    checkAboutUsPosition()
    window.addEventListener("resize", checkAboutUsPosition)

    return () => {
      unsubscribe()
      window.removeEventListener("resize", checkAboutUsPosition)
    }
  }, [scrollYProgress])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    // GSAP Animation for the hero text
    if (heroTextRef.current) {
      const tl = gsap.timeline()
      
      // Animate the main text
      tl.fromTo(".hero-heading-1", 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out"
        }
      )
      
      // Animate the outline layers with a slight delay
      tl.fromTo([".hero-heading-2", ".hero-heading-3"], 
        { 
          opacity: 0,
          scale: 0.9
        },
        { 
          opacity: 0.1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        },
        "-=1" // Start this animation 1 second before the previous one ends
      )
      
      // Add a subtle continuous animation
      tl.to(".hero-heading-1", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }
    
    setInitialAnimationDone(true)
    setLinesAnimated(true)
  }, [])

  // Removed scroll parallax effect for hero headings

  useEffect(() => {
    // Remove the 4-second delay
    setAnimationCompleted(true)
  }, [])

  const getLineAnimationStyles = () => {
    if (!linesAnimated) {
      return {
        topLine: {
          transform: "translateX(-100%)",
          opacity: 0,
        },
        bottomLine: {
          transform: "translateX(100%)",
          opacity: 0,
        },
      }
    } else {
      // As user scrolls down, lines move back to their original positions
      const reverseProgress = Math.min(scrollProgress * 2, 1) // Multiply by 2 for faster animation

      return {
        topLine: {
          transform: `translateX(${-100 * reverseProgress}%)`,
          opacity: Math.max(1 - reverseProgress, 0),
        },
        bottomLine: {
          transform: `translateX(${100 * reverseProgress}%)`,
          opacity: Math.max(1 - reverseProgress, 0),
        },
      }
    }
  }

  const lineStyles = getLineAnimationStyles()

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] bg-transparent"
      data-debug="HERO-SECTION"
      onClick={(e) => {
        e.stopPropagation()
        console.log("🐛 DEBUG - Hero Section:", {
          element: "Hero Section Container",
          className: "relative h-[300vh] overflow-x-hidden bg-transparent",
          dimensions: e.currentTarget.getBoundingClientRect(),
          scrollHeight: e.currentTarget.scrollHeight,
        })
      }}
    >
      <style jsx global>{`
        .pixel-text {
          position: relative;
          overflow: hidden;
        }

        .pixel-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at 40% 70%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 60% 20%, rgba(255,255,255,0.04) 1px, transparent 1px),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 30% 80%, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at 70% 40%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 10% 50%, rgba(255,255,255,0.04) 1px, transparent 1px),
            radial-gradient(circle at 90% 30%, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size:
            15px 15px,
            20px 20px,
            18px 18px,
            22px 22px,
            16px 16px,
            19px 19px,
            17px 17px,
            21px 21px;
          animation: pixelShimmer 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: screen;
        }

        @keyframes pixelShimmer {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          25% {
            transform: translate(2px, -1px);
            opacity: 0.8;
          }
          50% {
            transform: translate(-1px, 2px);
            opacity: 0.4;
          }
          75% {
            transform: translate(1px, 1px);
            opacity: 0.7;
          }
        }

        .animated-line {
          position: absolute;
          z-index: 5;
          display: flex;
          align-items: center;
          white-space: nowrap;
          transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .line-part {
          height: 2px;
          background: rgba(255,255,255,1);
          transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .top-line-container {
          top: calc(50% - 80px);
          left: 0;
          width: 50%;
        }

        .bottom-line-container {
          top: calc(50% + 80px);
          right: 0;
          width: 50%;
        }

        .hero-text-container {
          opacity: 1;
          transform: translateY(0);
        }

      `}</style>

      <div
        className="relative z-10 h-screen w-full"
        data-debug="HERO-VIEWPORT"
        onClick={(e) => {
          e.stopPropagation()
          console.log("🐛 DEBUG - Hero Viewport:", {
            element: "Hero Viewport Container",
            className: "relative z-10 h-screen w-full overflow-x-hidden",
            dimensions: e.currentTarget.getBoundingClientRect(),
          })
        }}
      >
        <>
          <div className="animated-line top-line-container" style={lineStyles.topLine}>
            <div className="line-part" style={{ width: "100%" }}></div>
          </div>

          <div
            className="animated-line bottom-line-container"
            style={{
              ...lineStyles.bottomLine,
              justifyContent: "flex-end",
            }}
          >
            <div className="line-part" style={{ width: "100%" }}></div>
          </div>
        </>

        <div
          className="relative w-full h-full debug-container flex flex-col items-center justify-center py-20"
          data-debug="HERO-CONTENT"
          style={{ zIndex: 2, paddingTop: "100px" }}
          onClick={(e) => {
            e.stopPropagation()
            console.log("🐛 DEBUG - Hero Content:", {
              element: "Hero Content Container",
              className: "relative w-full h-full",
              dimensions: e.currentTarget.getBoundingClientRect(),
              zIndex: 2,
            })
          }}
        >
          <div
            ref={heroTextRef}
            className="text-center z-[10001] w-full hero-text-container"
            data-debug="HERO-TEXT-CONTAINER"
            style={{ transform: "translateY(70px)" }}
            onClick={(e) => {
              e.stopPropagation()
              console.log("🐛 DEBUG - Hero Text Container:", {
                element: "Hero Text Container",
                className: "text-center z-[10001] w-full",
                dimensions: e.currentTarget.getBoundingClientRect(),
                zIndex: 10001,
              })
            }}
          >
            <div className="relative">
              <h1
                className="hero-heading hero-heading-1 pixel-text debug-text"
                data-debug="HERO-TEXT-1"
                style={{
                  fontSize: "clamp(32px, 8vw, 160px)",
                  lineHeight: "1.1",
                  fontFamily: "Playfair Display, serif",
                  color: "white",
                  margin: 0,
                  padding: "0 10px",
                  position: "relative",
                  letterSpacing: "clamp(1px, 0.5vw, 10.5px)",
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("🐛 DEBUG - Hero Text 1:", {
                    element: "Main Hero Text",
                    text: "FLEXRITE WORLD",
                    className: "hero-heading hero-heading-1 pixel-text",
                    dimensions: e.currentTarget.getBoundingClientRect(),
                  })
                }}
              >
                FLEXRITE W<span style={{ letterSpacing: "clamp(0px, 0.3vw, 6px)" }}>O</span>RLD
              </h1>
              <h1
                className="hero-heading hero-heading-2 debug-text"
                data-debug="HERO-TEXT-2"
                aria-hidden="true"
                style={{
                  fontSize: "clamp(32px, 8vw, 160px)",
                  lineHeight: "1.1",
                  fontFamily: "Playfair Display, serif",
                  color: "rgba(255, 255, 255, 0.1)",
                  WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)",
                  margin: 0,
                  padding: "0 10px",
                  position: "absolute",
                  top: "4px",
                  left: 0,
                  width: "100%",
                  transition: "transform 0.3s, opacity 0.3s",
                  letterSpacing: "clamp(1px, 0.5vw, 10.5px)",
                  opacity: 0.1,
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("🐛 DEBUG - Hero Text 2:", {
                    element: "Hero Text Outline 1",
                    text: "FLEXRITE WORLD",
                    className: "hero-heading hero-heading-2",
                    dimensions: e.currentTarget.getBoundingClientRect(),
                  })
                }}
              >
                FLEXRITE W<span style={{ letterSpacing: "clamp(0px, 0.3vw, 6px)" }}>O</span>RLD
              </h1>
              <h1
                className="hero-heading hero-heading-3 debug-text"
                data-debug="HERO-TEXT-3"
                aria-hidden="true"
                style={{
                  fontSize: "clamp(32px, 8vw, 160px)",
                  lineHeight: "1.1",
                  fontFamily: "Playfair Display, serif",
                  color: "rgba(255, 255, 255, 0.05)",
                  WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
                  margin: 0,
                  padding: "0 10px",
                  position: "absolute",
                  top: "8px",
                  left: 0,
                  width: "100%",
                  transition: "transform 0.3s, opacity 0.3s",
                  letterSpacing: "clamp(1px, 0.5vw, 10.5px)",
                  opacity: 0.05,
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("🐛 DEBUG - Hero Text 3:", {
                    element: "Hero Text Outline 2",
                    text: "FLEXRITE WORLD",
                    className: "hero-heading hero-heading-3",
                    dimensions: e.currentTarget.getBoundingClientRect(),
                  })
                }}
              >
                FLEXRITE W<span style={{ letterSpacing: "clamp(0px, 0.3vw, 6px)" }}>O</span>RLD
              </h1>
            </div>
          </div>

          <p
            className="hero-subtext"
            style={{
              fontSize: "clamp(14px, 3vw, 24px)",
              lineHeight: "1.4",
              fontFamily: "Playfair Display, serif",
              color: "rgba(255, 255, 255, 0.9)",
              marginTop: "clamp(60px, 15vw, 120px)",
              padding: "0 20px",
              position: "relative",
              letterSpacing: "clamp(1px, 0.25vw, 2px)",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
              opacity: 0,
              animation: "fadeInUp 1s ease-out 0.8s forwards",
              zIndex: 10001,
              textAlign: "center",
            }}
          >
            Move faster, quicker and better with Flexrite
          </p>
        </div>
      </div>

      <div ref={aboutUsRef} className="relative z-30">
        <AboutUs />
      </div>
    </div>
  )
}

export default Hero  

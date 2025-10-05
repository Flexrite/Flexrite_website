"use client"
import type React from "react"
import { useEffect, useRef } from "react"

interface Doctor {
  name: string
  title: string
  description: string
  image: string
}

interface ThankYouCardProps {
  doctor: Doctor
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ doctor }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const smallCircleRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const orangeShineRef = useRef<HTMLDivElement>(null)
  const cometRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generateTranslate = (el: HTMLElement | null, e: MouseEvent, value: number) => {
      if (el) {
        el.style.transform = `translate(${e.clientX * value}px, ${e.clientY * value}px)`
      }
    }

    // http://stackoverflow.com/a/1480137
    const cumulativeOffset = (element: HTMLElement) => {
      let top = 0,
        left = 0
      let el: HTMLElement | null = element
      do {
        top += el.offsetTop || 0
        left += el.offsetLeft || 0
        el = el.offsetParent as HTMLElement
      } while (el)

      return {
        top: top,
        left: left,
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const e = event
      if (!cardRef.current) return

      const cardOffset = cumulativeOffset(cardRef.current)
      const cardTop = cardOffset.top
      const cardBottom = cardOffset.top + 410 // card height (342 * 1.2)
      const cardLeft = cardOffset.left
      const cardRight = cardOffset.left + 600 // card width

      // Check if cursor is within restricted boundaries (60px vertical, 80px horizontal)
      const reactZoneTop = cardTop - 60
      const reactZoneBottom = cardBottom + 60
      const reactZoneLeft = cardLeft - 80 // Reduced horizontal range
      const reactZoneRight = cardRight + 80 // Reduced horizontal range

      if (e.pageY < reactZoneTop || e.pageY > reactZoneBottom || e.pageX < reactZoneLeft || e.pageX > reactZoneRight) {
        // Reset transform when outside reaction zone with smooth transition
        if (cardRef.current) {
          cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          cardRef.current.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
        }
        // Reset all element positions with smooth transitions
        if (smallCircleRef.current) {
          smallCircleRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          smallCircleRef.current.style.transform = "translate(0px, 0px)"
        }
        if (orangeShineRef.current) {
          orangeShineRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          orangeShineRef.current.style.transform = "translate(0px, 0px)"
        }
        if (yearRef.current) {
          yearRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          yearRef.current.style.transform = "translate(0px, 0px)"
        }
        if (cometRef.current) {
          cometRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          cometRef.current.style.transform = "translate(0px, 0px)"
        }
        if (imageRef.current) {
          imageRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          imageRef.current.style.transform = "translate(0px, 0px)"
        }
        if (shineRef.current) {
          shineRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          shineRef.current.style.transform = "translateX(-50%) translateY(-50%) rotate(45deg)"
        }
        return
      }

      // Clear transitions when mouse is within reaction zone for smooth real-time movement
      if (cardRef.current) cardRef.current.style.transition = ""
      if (smallCircleRef.current) smallCircleRef.current.style.transition = ""
      if (orangeShineRef.current) orangeShineRef.current.style.transition = ""
      if (yearRef.current) yearRef.current.style.transition = ""
      if (cometRef.current) cometRef.current.style.transition = ""
      if (imageRef.current) imageRef.current.style.transition = ""
      if (shineRef.current) shineRef.current.style.transition = ""

      const x = ((e.pageX - cardOffset.left - 300 / 2) * -1) / 100 // 600 / 2
      const y = ((e.pageY - cardOffset.top - 410 / 2) * -1) / 100 // 342 * 1.2

      const matrix = [
        [1, 0, 0, -x * 0.00004], // Reduced by 20% from 0.00005
        [0, 1, 0, -y * 0.00004], // Reduced by 20% from 0.00005
        [0, 0, 1, 1],
        [0, 0, 0, 1],
      ]

      generateTranslate(smallCircleRef.current, e, 0.024) // Reduced by 20% from 0.03
      generateTranslate(orangeShineRef.current, e, 0.072) // Reduced by 20% from 0.09
      generateTranslate(yearRef.current, e, 0.024) // Reduced by 20% from 0.03
      generateTranslate(cometRef.current, e, 0.04) // Reduced by 20% from 0.05
      generateTranslate(imageRef.current, e, 0.012) // Reduced by 20% from 0.015

      // Realistic Pokemon shine reflection based on mouse position
      if (shineRef.current) {
        const shineX = (e.clientX - cardOffset.left - 300) * 0.24 // Reduced by 20% from 0.3
        const shineY = (e.clientY - cardOffset.top - 205) * 0.24 // Reduced by 20% from 0.3
        shineRef.current.style.transform = `translateX(${shineX}px) translateY(${shineY}px) rotate(45deg)`
      }

      if (cardRef.current) {
        cardRef.current.style.transform = `matrix3d(${matrix.toString()})`
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="thank-you-wrapper">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .thank-you-wrapper {
          position: relative;
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          aspect-ratio: 600 / 410;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
        }

        .thank-you-card {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          position: absolute;
          box-shadow: -20px 30px 116px 0 rgba(255, 255, 255, 0.1);
          overflow: hidden;
          z-index: 4;
          transition: box-shadow 0.4s ease;
        }

        .thank-you-card:hover {
          box-shadow: 
            -20px 30px 116px 0 rgba(255, 255, 255, 0.1),
            0 0 40px rgba(255, 255, 255, 0.15);
        }

        .card__backgroundGlassmorphism {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          z-index: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .card__backgroundGlassmorphism::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 20%,
            rgba(255, 255, 255, 0.03) 35%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.25) 52%,
            rgba(255, 255, 255, 0.08) 65%,
            transparent 80%
          );
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
          transition: transform 0.1s ease-out;
          opacity: 0;
          will-change: transform;
        }

        .thank-you-card:hover .card__backgroundGlassmorphism::before {
          opacity: 1;
        }

        .thank-you-card:hover .card__backgroundGlassmorphism {
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .thank-you-card:hover .card__backgroundGlassmorphism div {
          opacity: 1 !important;
        }

        .card__circularGlassmorphism {
          position: absolute;
          right: 10.3%;
          bottom: 10%;
          width: 46%;
          aspect-ratio: 1;
          background: transparent;
          backdrop-filter: blur(10px) saturate(1.3);
          -webkit-backdrop-filter: blur(10px) saturate(1.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          z-index: 2;
          pointer-events: none;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .card__circularGlassmorphism::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 255, 255, 0.1) 60deg,
            rgba(255, 255, 255, 0.3) 120deg,
            rgba(255, 255, 255, 0.15) 180deg,
            transparent 240deg,
            rgba(255, 255, 255, 0.08) 300deg,
            transparent 360deg
          );
          border-radius: 50%;
          transform: rotate(0deg);
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
        }

        .thank-you-card:hover .card__circularGlassmorphism::before {
          transform: rotate(360deg);
          opacity: 1;
        }

        .thank-you-card:hover .card__circularGlassmorphism {
          backdrop-filter: blur(15px) saturate(1.6);
          -webkit-backdrop-filter: blur(15px) saturate(1.6);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
        }


        .card__orangeShine,
        .card__greenShine {
          position: absolute;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .card__orangeShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%);
          right: -30%;
          top: -26.3%;
          bottom: 14.6%;
          z-index: 2;
          width: 114%;
          height: 146.3%;
        }

        .card__greenShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 30%, transparent 60%);
          left: 20%;
          top: 0;
          bottom: 0;
          z-index: 1;
          width: 80%;
        }

        .card__doctorInfo {
          position: absolute;
          left: 5%;
          top: 15%;
          width: 40%;
          z-index: 10;
          color: #fff;
          font-family: 'Oswald', sans-serif;
        }

        .card__doctorName {
          font-size: clamp(20px, 5.3vw, 32px);
          font-weight: 600;
          margin-bottom: 2.9%;
          line-height: 1.2;
          color: #fff !important;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2) !important;
        }

        .card__doctorTitle {
          font-size: clamp(12px, 2.7vw, 16px);
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.85) !important;
          margin-bottom: 3.9%;
          line-height: 1.3;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25) !important;
        }

        .card__doctorDescription {
          font-size: clamp(11px, 2.5vw, 15px);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.75) !important;
          line-height: 1.4;
          margin-bottom: 4.9%;
          white-space: pre-line;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2) !important;
        }

        .card__consultButton {
          padding: 2% 4%;
          background: rgba(255, 255, 255, 0.15) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 20px;
          font-size: clamp(10px, 2.3vw, 14px);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card__consultButton:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
          transform: translateY(-1px);
        }

        .card__smallCircle {
          position: absolute;
          border-radius: 100%;
          background: transparent !important;
          box-shadow: -10px -15px 90px 0 rgba(255, 255, 255, 0.05) !important;
          z-index: 2;
          backdrop-filter: blur(8px) saturate(1.2);
          -webkit-backdrop-filter: blur(8px) saturate(1.2);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .card__doctorImage {
          position: absolute;
          right: 16.7%;
          bottom: 19.3%;
          width: 33.3%;
          aspect-ratio: 1;
          border-radius: 50%;
          object-fit: cover;
          z-index: 3;
          border: 2px solid rgba(0, 0, 0, 0.3);
          box-shadow:
            0 0 20px rgba(255, 255, 255, 0.15),
            0 0 40px rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .thank-you-card:hover .card__doctorImage {
          box-shadow: 
            0 0 25px rgba(255, 255, 255, 0.2),
            0 0 50px rgba(255, 255, 255, 0.12);
        }

        .card__smallCircle {
          right: 40%;
          top: -7%;
          width: 10%;
          aspect-ratio: 1;
        }

        .card__outer-year {
          font-family: 'Orbitron', monospace;
        }

        .card__outer-year span {
          position: absolute;
          color: #fff;
          font-size: clamp(12px, 2.7vw, 16px);
          z-index: 4;
        }

        .card__outer-year span:nth-child(1),
        .card__outer-year span:nth-child(4) {
          position: relative;
        }

        .card__outer-year span:nth-child(1):after,
        .card__outer-year span:nth-child(4):after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          border-bottom: 2px solid #fff;
        }

        .card__outer-year span:nth-child(1) {
          top: 10.2%;
          left: 7%;
        }

        .card__outer-year span:nth-child(2) {
          top: 10.2%;
          right: 7%;
        }

        .card__outer-year span:nth-child(3) {
          bottom: 10.2%;
          left: 7%;
        }

        .card__outer-year span:nth-child(4) {
          right: 7%;
          bottom: 10.2%;
        }

        .card__comet {
          position: relative;
          width: 8px;
          height: 8px;
          background-color: #fff;
          border-radius: 100%;
          transition: all 0.3s ease;
        }

        .thank-you-card:hover .card__comet {
          background-color: #ffffff;
          box-shadow: 
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(255, 255, 255, 0.6),
            0 0 30px rgba(255, 255, 255, 0.4);
        }

        .card__cometOuter {
          position: absolute;
          top: 30%;
          left: 25%;
        }

        .card__comet--second {
          right: -30px;
          top: -15px;
          transform: scale(0.6);
        }

        .card__comet:before,
        .card__comet:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 27%, rgba(255, 255, 255, 0) 100%);
          border-radius: 20px;
          transform: rotate(-45deg);
        }

        .card__comet:before {
          width: 18px;
          height: 70px;
          transform-origin: -2px 13px;
        }

        .card__comet:after {
          width: 12px;
          height: 80px;
          transform-origin: 0px 8px;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .thank-you-wrapper {
            padding: 0 10px;
          }

          .thank-you-card {
            border-radius: 16px;
          }

          .card__backgroundGlassmorphism {
            border-radius: 16px;
          }

          .card__doctorName {
            font-size: clamp(18px, 6vw, 28px);
            margin-bottom: 8px;
          }

          .card__doctorTitle {
            font-size: clamp(10px, 3.5vw, 14px);
            margin-bottom: 10px;
          }

          .card__doctorDescription {
            font-size: clamp(9px, 3vw, 13px);
            margin-bottom: 12px;
            line-height: 1.3;
          }

          .card__consultButton {
            padding: 6px 12px;
            font-size: clamp(9px, 2.8vw, 12px);
            border-radius: 16px;
          }

          .card__doctorImage {
            width: 35%;
            right: 15%;
            bottom: 18%;
          }

          .card__circularGlassmorphism {
            width: 48%;
            right: 8%;
            bottom: 8%;
          }

          .card__smallCircle {
            width: 12%;
            right: 38%;
          }

          .card__outer-year span {
            font-size: clamp(10px, 3.5vw, 14px);
          }

          .card__comet {
            width: 6px;
            height: 6px;
          }

          .card__comet:before {
            width: 14px;
            height: 55px;
          }

          .card__comet:after {
            width: 10px;
            height: 65px;
          }
        }

        @media (max-width: 480px) {
          .thank-you-wrapper {
            padding: 0 5px;
          }

          .card__doctorInfo {
            left: 4%;
            top: 12%;
            width: 48%;
          }

          .card__doctorName {
            font-size: clamp(16px, 7vw, 24px);
            margin-bottom: 6px;
          }

          .card__doctorTitle {
            font-size: clamp(9px, 4vw, 12px);
            margin-bottom: 8px;
            letter-spacing: 0.5px;
          }

          .card__doctorDescription {
            font-size: clamp(8px, 3.5vw, 11px);
            margin-bottom: 10px;
          }

          .card__consultButton {
            padding: 5px 10px;
            font-size: clamp(8px, 3vw, 11px);
          }

          .card__doctorImage {
            width: 38%;
            right: 12%;
            bottom: 16%;
          }

          .card__circularGlassmorphism {
            width: 50%;
            right: 6%;
            bottom: 6%;
          }

          .card__smallCircle {
            width: 14%;
            right: 35%;
            top: -5%;
          }

          .card__outer-year span {
            font-size: clamp(9px, 4vw, 12px);
          }

          .card__outer-year span:nth-child(1),
          .card__outer-year span:nth-child(2) {
            top: 8%;
          }

          .card__outer-year span:nth-child(3),
          .card__outer-year span:nth-child(4) {
            bottom: 8%;
          }

          .card__outer-year span:nth-child(1),
          .card__outer-year span:nth-child(3) {
            left: 5%;
          }

          .card__outer-year span:nth-child(2),
          .card__outer-year span:nth-child(4) {
            right: 5%;
          }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@100;300;400&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      <div ref={cardRef} className="thank-you-card">
        <div className="card__backgroundGlassmorphism">
          <div
            ref={shineRef}
            className="card__backgroundGlassmorphism::before"
            style={{
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(45deg, transparent 20%, rgba(255, 255, 255, 0.03) 35%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.25) 52%, rgba(255, 255, 255, 0.08) 65%, transparent 80%)",
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
              transition: "transform 0.1s ease-out",
              opacity: 0,
              willChange: "transform",
              pointerEvents: "none",
            }}
          ></div>
        </div>
        <div ref={yearRef} className="card__doctorInfo">
          <div className="card__doctorName">{doctor.name}</div>
          <div className="card__doctorTitle">{doctor.title}</div>
          <div className="card__doctorDescription">{doctor.description}</div>
          <button className="card__consultButton">Book Consultation</button>
        </div>
        <div ref={cometRef} className="card__cometOuter">
          <div className="card__comet"></div>
          <div className="card__comet card__comet--second"></div>
        </div>
        <div className="card__circularGlassmorphism"></div>
        <img ref={imageRef} src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="card__doctorImage" />
        <div ref={smallCircleRef} className="card__smallCircle"></div>
        <div ref={orangeShineRef} className="card__orangeShine"></div>
        <div className="card__greenShine"></div>
      </div>
    </div>
  )
}

export default ThankYouCard

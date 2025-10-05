"use client"

export default function Carousel3D() {
  return (
    <div className="carousel-container">
      <style jsx>{`
        .carousel-container {
          margin: 8% auto;
          width: 100%;
          max-width: 320px;
          height: 224px;
          position: relative;
          perspective: 1000px;
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .carousel-container {
            max-width: 280px;
            height: 196px;
            perspective: 800px;
            margin: 12% auto;
          }
        }

        /* Tablet styles */
        @media (min-width: 768px) {
          .carousel-container {
            max-width: 400px;
            height: 280px;
            perspective: 1200px;
          }
        }

        /* Laptop styles - Reduced size for better fit */
        @media (min-width: 1024px) {
          .carousel-container {
            max-width: 450px;
            height: 315px;
            perspective: 1300px;
          }
        }

        /* Large desktop styles */
        @media (min-width: 1280px) {
          .carousel-container {
            max-width: 500px;
            height: 350px;
            perspective: 1400px;
          }
        }

        /* Extra large screens */
        @media (min-width: 1536px) {
          .carousel-container {
            max-width: 550px;
            height: 385px;
            perspective: 1500px;
          }
        }

        .carousel {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: rotation 20s infinite linear;
        }

        .carousel:hover {
          animation-play-state: paused;
        }

        .carousel figure {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 90%;
          height: 85.7%;
          left: 5%;
          top: 7.14%;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        /* Positioning of each figure in 3D space */
        .carousel figure:nth-child(1) {
          transform: rotateY(0deg) translateZ(280px);
        }
        .carousel figure:nth-child(2) {
          transform: rotateY(72deg) translateZ(280px);
        }
        .carousel figure:nth-child(3) {
          transform: rotateY(144deg) translateZ(280px);
        }
        .carousel figure:nth-child(4) {
          transform: rotateY(216deg) translateZ(280px);
        }
        .carousel figure:nth-child(5) {
          transform: rotateY(288deg) translateZ(280px);
        }

        /* Responsive translateZ values */
        @media (max-width: 480px) {
          .carousel figure:nth-child(1),
          .carousel figure:nth-child(2),
          .carousel figure:nth-child(3),
          .carousel figure:nth-child(4),
          .carousel figure:nth-child(5) {
            transform: rotateY(calc(72deg * var(--i))) translateZ(220px);
          }
        }

        @media (min-width: 768px) {
          .carousel figure:nth-child(1),
          .carousel figure:nth-child(2),
          .carousel figure:nth-child(3),
          .carousel figure:nth-child(4),
          .carousel figure:nth-child(5) {
            transform: rotateY(calc(72deg * var(--i))) translateZ(320px);
          }
        }

        @media (min-width: 1024px) {
          .carousel figure:nth-child(1),
          .carousel figure:nth-child(2),
          .carousel figure:nth-child(3),
          .carousel figure:nth-child(4),
          .carousel figure:nth-child(5) {
            transform: rotateY(calc(72deg * var(--i))) translateZ(340px);
          }
        }

        @media (min-width: 1280px) {
          .carousel figure:nth-child(1),
          .carousel figure:nth-child(2),
          .carousel figure:nth-child(3),
          .carousel figure:nth-child(4),
          .carousel figure:nth-child(5) {
            transform: rotateY(calc(72deg * var(--i))) translateZ(380px);
          }
        }

        @media (min-width: 1536px) {
          .carousel figure:nth-child(1),
          .carousel figure:nth-child(2),
          .carousel figure:nth-child(3),
          .carousel figure:nth-child(4),
          .carousel figure:nth-child(5) {
            transform: rotateY(calc(72deg * var(--i))) translateZ(420px);
          }
        }

        .carousel img {
          width: 90%;
          height: 90%;
          border-radius: 12px;
          object-fit: cover;
          filter: grayscale(1);
          cursor: pointer;
          transition: all 0.5s ease;
        }

        .carousel img:hover {
          filter: grayscale(0);
          transform: scale(1.05);
        }

        @keyframes rotation {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        /* Reduce animation speed on mobile for better performance */
        @media (max-width: 768px) {
          .carousel {
            animation: rotation 25s infinite linear;
          }
        }

        /* Very small devices */
        @media (max-width: 360px) {
          .carousel-container {
            max-width: 240px;
            height: 168px;
          }
          
          .carousel figure {
            border-radius: 12px;
          }
          
          .carousel img {
            border-radius: 10px;
          }
        }
      `}</style>

      <div className="carousel">
        <figure style={{ '--i': 0 } as React.CSSProperties}>
          <img src="/Port1.avif" alt="Portfolio 1" />
        </figure>
        <figure style={{ '--i': 1 } as React.CSSProperties}>
          <img src="/Port2.avif" alt="Portfolio 2" />
        </figure>
        <figure style={{ '--i': 2 } as React.CSSProperties}>
          <img src="/Port3.avif" alt="Portfolio 3" />
        </figure>
        <figure style={{ '--i': 3 } as React.CSSProperties}>
          <img src="/Port4.avif" alt="Portfolio 4" />
        </figure>
        <figure style={{ '--i': 4 } as React.CSSProperties}>
          <img src="/Port5.avif" alt="Portfolio 5" />
        </figure>
      </div>
    </div>
  )
}

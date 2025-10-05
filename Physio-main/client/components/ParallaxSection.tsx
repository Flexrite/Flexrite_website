import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import LiquidHoverOverlay from './ui/LiquidHoverOverlay';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const ParallaxSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Text with parallax movement and entrance animations
    const textElements = container.querySelectorAll('.parallax-text');
    const textSpeedMultipliers = [0.3, -0.2, 0.5, -0.3, 0.4, -0.1, 0.6, -0.4, 0.2]; // Different speeds for text
    
    textElements.forEach((textEl, index) => {
      const parallaxValue = parseFloat(textEl.getAttribute('data-parallax') || '0');
      const speed = textSpeedMultipliers[index % textSpeedMultipliers.length];
      
      // Subtle fade-up entrance without aggressive 3D effects
      gsap.fromTo(textEl, 
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          filter: "blur(8px)"
        },          
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power2.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: textEl,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add parallax movement to text as well
      gsap.fromTo(textEl, 
        {
          y: parallaxValue * -30 * speed // Start position
        },
        {
          y: parallaxValue * 30 * speed,  // End position
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );

     
      const text = textEl.textContent;
      if (text) {
        textEl.innerHTML = '';
        const chars = text.split('').map(char => 
          `<span style="display: inline-block; opacity: 0; transform: translateY(20px); filter: blur(2px);">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        textEl.innerHTML = chars;
        
        const charElements = textEl.querySelectorAll('span');
        gsap.to(charElements, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.015,
          ease: "power1.out",
          delay: index * 0.08 + 0.2,
          scrollTrigger: {
            trigger: textEl,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    const images = container.querySelectorAll('.parallax-img');
    
    // Increased depth effect speeds for faster movement
    const gridSpeeds = [0.4, 0.6, 0.8, 1.0, 1.5, 1.8];  // Increased speeds

    images.forEach((img, index) => {
      const speed = gridSpeeds[index % gridSpeeds.length]; // assign different speed

      gsap.fromTo(img, 
        { y: -80 * speed },   // start further above for more movement
        { 
          y: 80 * speed,      // move further downward on scroll
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    });

    const animateConnectedImages = () => {
      const positions = [
        { x: -40, y: -30, rotate: -3 }, // cloud (top-left)
        { x: -40, y: 30, rotate: -2 },  // device-2 (bottom-left)
        
        { x: 0, y: -40, rotate: 1 },    // logo (top-middle)
        { x: 0, y: 0, rotate: 0 },      // device (middle-middle)
        { x: 0, y: 40, rotate: 1 },     // ai-gen (bottom-middle)
        
        { x: 40, y: 0, rotate: 2 },     // inbox (middle-right)
        { x: 40, y: -40, rotate: 3 },   // ai-gen (top-right)
      ];
      
      imageRefs.current.forEach((imgContainer, index) => {
        if (!imgContainer || index >= positions.length) return;
        
        const img = imgContainer.querySelector('.parallax-img');
        if (!img) return;
        
        gsap.set(img, {
          x: positions[index].x,
          y: positions[index].y,
          rotation: positions[index].rotate,
          opacity: 0.7
        });
      });
      
      const masterTl = gsap.timeline({ delay: 1.5 });
      
      imageRefs.current.forEach((imgContainer, index) => {
        if (!imgContainer || index >= positions.length) return;
        
        const img = imgContainer.querySelector('.parallax-img');
        if (!img) return;
        
        masterTl.to(img, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 8, 
          ease: "power2.out"
        }, 0); 
      });
      

      masterTl.call(() => {

        const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
        
        floatTl.to('.parallax-img', {
          y: -10, 
          x: 6,  
          rotation: 1,
          duration: 6, 
          ease: "sine.inOut",
          stagger: {
            amount: 0.5,
            from: "random"
          }
        }).to('.parallax-img', {
          y: 10,  // Increased movement range
          x: -6,  // Increased movement range
          rotation: -1, // Increased rotation
          duration: 6, // Reduced duration for faster movement
          ease: "sine.inOut",
          stagger: {
            amount: 0.5,
            from: "random"
          }
        });
      });
    };

    // Start the connected animation
    animateConnectedImages();

    // NEW: Animation to move images closer together on scroll using parallax
    const gridContainer = gridContainerRef.current;
    if (gridContainer) {
      // Define movement directions for each image to reduce gaps
      const imageMovements = [
        // First column (cloud and device-2)
        { x: 15, y: -10 },  // cloud (move right and up)
        { x: 15, y: 10 },   // device-2 (move right and down)
        
        { x: 0, y: -15 },   // logo (move up)
        { x: 0, y: 0 },     // device (stay centered)
        { x: 0, y: 15 },    // ai-gen (move down)
        { x: -15, y: 0 },   // inbox (move left)
        { x: -15, y: -10 }, // ai-gen (move left and up)
      ];
      
      const gapTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 30%", 
          end: "bottom 50%", 
          scrub: true,
          markers: false,
        }
      });

      // Animate each image to move closer to the center
      imageRefs.current.forEach((imgContainer, index) => {
        if (!imgContainer || index >= imageMovements.length) return;
        
        const img = imgContainer.querySelector('.parallax-img');
        if (!img) return;
        
        const movement = imageMovements[index];
        
        gapTimeline.to(img, {
          x: movement.x,
          y: movement.y,
          duration: 1,
          ease: "power2.inOut"
        }, 0); // Start all animations at the same time
      });
    }

    // Globe word glow effect system - triggers when globe passes through each word
    const wordTriggers = [
      { id: 'word-1', scrollStart: 0.42, scrollEnd: 0.45 }, // "True"
      { id: 'word-2', scrollStart: 0.49, scrollEnd: 0.52 }, // "freedom"
      { id: 'word-3', scrollStart: 0.56, scrollEnd: 0.59 }, // "begins"
      { id: 'word-4', scrollStart: 0.63, scrollEnd: 0.66 }, // "with"
      { id: 'word-5', scrollStart: 0.70, scrollEnd: 0.73 }, // "movement"
    ];

    // Create scroll-triggered glow effects for each word
    wordTriggers.forEach(({ id, scrollStart, scrollEnd }) => {
      const wordElement = container.querySelector(`#${id}`);
      if (!wordElement) return;

      ScrollTrigger.create({
        trigger: document.body, // Use body as trigger for full scroll range
        start: `${scrollStart * 100}% top`,
        end: `${scrollEnd * 100}% top`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const glowIntensity = Math.sin(progress * Math.PI); // Creates a smooth glow curve
          
          // Apply glow effect
          gsap.to(wordElement, {
            duration: 0.1,
            textShadow: `
              0 0 ${20 * glowIntensity}px rgba(255, 255, 255, ${0.8 * glowIntensity}),
              0 0 ${40 * glowIntensity}px rgba(255, 255, 255, ${0.6 * glowIntensity}),
              0 0 ${60 * glowIntensity}px rgba(255, 255, 255, ${0.4 * glowIntensity})
            `,
            color: `rgba(255, 255, 255, ${1 + glowIntensity * 0.5})`,
            scale: 1 + glowIntensity * 0.05,
          });
        },
        onLeave: () => {
          // Reset glow when leaving trigger area
          gsap.to(wordElement, {
            duration: 0.3,
            textShadow: '0 0 0px rgba(255, 255, 255, 0)',
            color: 'rgba(255, 255, 255, 1)',
            scale: 1,
          });
        },
        onLeaveBack: () => {
          // Reset glow when scrolling back
          gsap.to(wordElement, {
            duration: 0.3,
            textShadow: '0 0 0px rgba(255, 255, 255, 0)',
            color: 'rgba(255, 255, 255, 1)',
            scale: 1,
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Text positioned for "True freedom begins with movement"
  // Adjusted positions to stay within container boundaries and reduce top space
  const textElements = [
    { 
      text: 'True', 
      parallax: -0.4,
      position: { top: '15%', right: '20%' },
      type: 'h1',
      id: 'word-1'
    },
    { 
      text: 'freedom', 
      parallax: 0.3,
      position: { top: '30%', left: '8%' },
      type: 'h2',
      id: 'word-2'
    },
    { 
      text: 'begins', 
      parallax: -0.2,
      position: { top: '45%', right: '25%' },
      type: 'h2',
      id: 'word-3'
    },
    { 
      text: 'with', 
      parallax: 0.4,
      position: { top: '60%', left: '12%' },
      type: 'h2',
      id: 'word-4'
    },
    { 
      text: 'movement', 
      parallax: -0.3,
      position: { top: '75%', right: '18%' },
      type: 'h1',
      id: 'word-5'
    },
  ];

  // Images arranged in a neat 3x2 grid layout
  const images = [
    { src: '/images/placeholder1.jpg', parallax: -0.5, className: 'grid-item cloud' },
    { src: '/images/placeholder2.jpg', parallax: 0.3, className: 'grid-item logo' },
    { src: '/images/placeholder3.jpg', parallax: 0.6, className: 'grid-item device' },
    { src: '/images/placeholder4.jpg', parallax: -0.4, className: 'grid-item inbox' },
    { src: '/images/placeholder5.jpg', parallax: -0.6, className: 'grid-item device-2' },
    { src: '/images/placeholder6.jpg', parallax: 0.5, className: 'grid-item ai-gen' },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ 
        fontFamily: 'Playfair Display, serif',
        marginTop: '-100px', // Reduced top margin to show previous section
      }}
    >
      <style jsx>{`
        .parallax-container {
          perspective: 1px;
          transform-style: preserve-3d;
        }
        
        .parallax-container * {
          transform-style: preserve-3d;
        }
        
        .parallax-text {
          position: absolute;
          font-weight: 100;
          margin: 0;
          z-index: 100;
          white-space: nowrap;
        }
        
        .parallax-h1 {
          font-size: clamp(calc(4rem - 4px), 12vw, calc(10rem - 4px));
          color: white;
          font-weight: 300;
          letter-spacing: -0.02em;
        }
        
        .parallax-h2 {
          font-size: clamp(calc(3rem - 4px), 9vw, calc(7rem - 4px));
          color: white;
          font-weight: 200;
          letter-spacing: -0.01em;
        }
        
        .parallax-img {
          position: absolute;
          border-radius: 8px;
          object-fit: cover;
          z-index: 50;
          pointer-events: none;
          user-select: none;
          transition: transform 0.3s ease;
        }

        .parallax-img:hover {
          transform: translateY(-5px) scale(1.02);
          z-index: 60;
        }

        /* Grid Container for Images - Moved up with reduced spacing */
        .grid-container {
          position: absolute;
          top: 15%; /* Reduced from 25% */
          left: 8%;
          width: 84%;
          height: 70%; /* Adjusted height */
          display: grid;
          grid-template-columns: 4fr 3fr 3fr;
          grid-template-rows: repeat(4, 1fr);
          gap: 40px; /* Initial gap size */
          z-index: 40;
        }

        .grid-item {
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease;
          position: relative;
        }

        .grid-item:hover {
          transform: translateY(-5px);
          z-index: 70;
        }

        /* Connect lines between images */
        .grid-item::before {
          content: '';
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          z-index: 35;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .grid-item.cloud::before {
          top: 50%;
          right: -20px;
          width: 20px;
          height: 2px;
        }

        .grid-item.logo::before {
          bottom: -20px;
          left: 50%;
          width: 2px;
          height: 20px;
        }

        .grid-item.device::before {
          right: -20px;
          top: 50%;
          width: 20px;
          height: 2px;
        }

        .grid-item:hover::before {
          opacity: 1;
        }

        /* Bento positions */
        .grid-item.cloud { grid-area: 1 / 1 / 3 / 2; }
        .grid-item.logo { grid-area: 1 / 2 / 2 / 4; }
        .grid-item.device { grid-area: 2 / 2 / 3 / 3; }
        .grid-item.inbox { grid-area: 2 / 3 / 3 / 4; }
        .grid-item.device-2 { grid-area: 3 / 1 / 5 / 2; }
        .grid-item.ai-gen { grid-area: 3 / 2 / 5 / 4; }

        @media (max-width: 768px) {
          .grid-container {
            top: 15%;
            left: 5%;
            width: 90%;
            height: auto;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 30px; /* Reduced spacing for mobile */
          }
          .grid-item {
            grid-area: auto !important;
            min-height: 200px; /* Reduced height for mobile */
          }
          
          .grid-item::before {
            display: none;
          }
        }

      `}</style>

      <div className="parallax-container relative w-full overflow-hidden" style={{ 
        minHeight: 'calc(100vh + 300px)', // Reduced height
        paddingLeft: '1%',
        paddingRight: '1%',
        paddingTop: 'calc(3% + 150px)', // Reduced padding
        paddingBottom: 'calc(3% + 150px)', // Reduced padding
        margin: '0',
      }}>
        {/* Polished Dotted Line Connection Animation */}
        <svg 
          className="dotted-connection-lines" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 120,
            pointerEvents: 'none'
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#00ffff', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#00ffff', stopOpacity: 0.8 }} />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Individual path segments for each word connection */}
          {Array.from({ length: 4 }, (_, i) => (
            <path 
              key={i}
              id={`connection-line-${i}`}
              d=""
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#lineGlow)"
              strokeDasharray="6 10"
              strokeDashoffset="0"
              opacity="0"
            />
          ))}
        </svg>

        {/* Text Elements */}
        {textElements.map((textEl, index) => (
          textEl.type === 'h1' ? (
            <h1 
              key={`text-${index}`}
              id={textEl.id}
              className="parallax-text parallax-h1"
              data-parallax={textEl.parallax}
              style={{
                ...textEl.position,
                zIndex: 100 + index,
                transition: 'text-shadow 0.5s ease, color 0.5s ease',
              }}
            >
              {textEl.text}
            </h1>
          ) : (
            <h2 
              key={`text-${index}`}
              id={textEl.id}
              className="parallax-text parallax-h2"
              data-parallax={textEl.parallax}
              style={{
                ...textEl.position,
                zIndex: 100 + index,
                transition: 'text-shadow 0.5s ease, color 0.5s ease',
              }}
            >
              {textEl.text}
            </h2>
          )
        ))}

        {/* Grid Container for Images - Moved up */}
        <div 
          className="grid-container"
          ref={gridContainerRef}
        >
          {images.map((img, index) => (
            <div 
              key={`grid-${index}`} 
              className={img.className}
              ref={el => imageRefs.current[index] = el}
            >
              <LiquidHoverOverlay 
                intensity={0.15}
                className="parallax-img w-full h-full"
                style={{
                  position: 'relative',
                  zIndex: 50 + index,
                }}
              >
                <img
                  src={img.src}
                  alt={`Parallax image ${index + 1}`}
                  className="w-full h-full object-cover"
                  data-parallax={img.parallax}
                  loading="lazy"
                />
              </LiquidHoverOverlay>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
 
export default ParallaxSection;
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ElegantShadowTitleProps {
  children: string;
  className?: string;
  delay?: number;
  darkBackground?: boolean;
  fullWidth?: boolean;
}

const ElegantShadowTitle: React.FC<ElegantShadowTitleProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  darkBackground = false,
  fullWidth = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Set initial states
    gsap.set(text, { 
      opacity: 0, 
      y: 20 
    });

    // Create timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      delay: delay
    });

    // Animate text only
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
    >
      {/* Text with elegant shadow */}
      <h1
        ref={textRef}
        className="elegant-shadow-text"
        style={{
          position: 'relative',
          fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif',
          fontSize: 'clamp(2rem, 6vw, 5.75rem)',
          padding: 'clamp(1rem, 3vw, 2.5rem) clamp(1rem, 4vw, 3.125rem)',
          textAlign: 'center',
          textTransform: 'uppercase',
          textRendering: 'optimizeLegibility',
          color: 'white',
          letterSpacing: 'clamp(0.05em, 0.1vw, 0.15em)',
          margin: 0,
          lineHeight: 1.2,
          textShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)'
        }}
      >
        {children}
      </h1>
    </div>
  );
};

export default ElegantShadowTitle;

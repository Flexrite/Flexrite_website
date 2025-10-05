import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SubtextWithStripProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SubtextWithStrip: React.FC<SubtextWithStripProps> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Set initial states
    gsap.set(text, { 
      opacity: 0, 
      y: 10 
    });

    // Create timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: delay
    });

    // Animate text only
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.6,
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
      style={{ marginTop: '5px' }} // 5px distance from heading
    >
      {/* Subtext */}
      <p
        ref={textRef}
        className={`relative ${className}`}
        style={{
          margin: 0,
          padding: '8px 16px',
          color: 'white' // Changed to white for visibility on dark background
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default SubtextWithStrip;
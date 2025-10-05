import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedLineDrawingProps {
  paths?: string[];
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  className?: string;
  trigger?: 'scroll' | 'hover' | 'immediate';
  viewBox?: string;
  width?: number;
  height?: number;
}

const AnimatedLineDrawing: React.FC<AnimatedLineDrawingProps> = ({
  paths = [
    // Default elegant curved paths - you can customize these
    "M50,200 Q200,50 350,200 T650,200",
    "M100,100 L200,150 L350,80 L500,160 L650,90",
    "M50,250 C150,150 250,350 450,250 S650,150 750,250"
  ],
  strokeColor = "#4A90E2", // Professional blue
  strokeWidth = 3,
  duration = 2,
  delay = 0,
  className = "",
  trigger = "scroll",
  viewBox = "0 0 800 300",
  width = 800,
  height = 300
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to get path length and set up dash array
  const setupPath = (path: SVGPathElement) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    return length;
  };

  // Animation function
  const animatePaths = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    pathRefs.current.forEach((path, index) => {
      if (path) {
        const length = setupPath(path);
        
        tl.to(path, {
          strokeDashoffset: 0,
          duration: duration,
          ease: "power2.inOut",
          delay: index * 0.3, // Stagger each path
        }, delay + index * 0.1);

        // Add subtle glow effect during animation
        tl.to(path, {
          filter: "drop-shadow(0 0 8px rgba(74, 144, 226, 0.6))",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        }, delay + index * 0.1 + duration * 0.3);
      }
    });
  };

  // Reset animation
  const resetAnimation = () => {
    pathRefs.current.forEach(path => {
      if (path) {
        setupPath(path);
        gsap.set(path, { filter: "none" });
      }
    });
    setIsAnimating(false);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Initialize paths
    pathRefs.current.forEach(setupPath);

    if (trigger === 'scroll') {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: animatePaths,
        onLeave: resetAnimation,
        onEnterBack: animatePaths,
        onLeaveBack: resetAnimation,
      });
    } else if (trigger === 'immediate') {
      setTimeout(animatePaths, delay * 1000);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === svg) {
          trigger.kill();
        }
      });
    };
  }, [trigger, delay, duration]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      animatePaths();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      resetAnimation();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={viewBox}
        className="w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradient for more sophisticated look */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.8"/>
            <stop offset="50%" stopColor={strokeColor} stopOpacity="1"/>
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.8"/>
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {paths.map((pathData, index) => (
          <path
            key={index}
            ref={el => pathRefs.current[index] = el}
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'url(#glow)',
            }}
          />
        ))}
      </svg>

      {/* Additional decorative elements */}
      <style jsx>{`
        svg path {
          transition: filter 0.3s ease;
        }
        
        svg:hover path {
          filter: url(#glow) drop-shadow(0 0 12px rgba(74, 144, 226, 0.4));
        }
      `}</style>
    </div>
  );
};

export default AnimatedLineDrawing;
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LusionStyleLinesProps {
  variant?: 'geometric' | 'organic' | 'connection' | 'minimal';
  color?: string;
  strokeWidth?: number;
  className?: string;
  autoPlay?: boolean;
  trigger?: 'scroll' | 'hover' | 'immediate';
}

const LusionStyleLines: React.FC<LusionStyleLinesProps> = ({
  variant = 'geometric',
  color = '#4A90E2',
  strokeWidth = 2,
  className = '',
  autoPlay = false,
  trigger = 'scroll'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Different path patterns for different variants
  const getPathData = () => {
    switch (variant) {
      case 'geometric':
        return [
          "M50,150 L200,50 L350,150 L500,50 L650,150 L800,50",
          "M100,200 L250,100 L400,200 L550,100 L700,200",
          "M25,100 L175,200 L325,100 L475,200 L625,100 L775,200"
        ];
      case 'organic':
        return [
          "M50,150 Q200,50 350,150 T650,150 Q750,100 850,150",
          "M25,200 C125,100 225,250 425,150 S625,50 825,150",
          "M100,100 Q250,200 400,100 T700,100 Q800,50 900,100"
        ];
      case 'connection':
        return [
          "M100,100 L200,200 M300,100 L400,200 M500,100 L600,200",
          "M150,150 L250,50 M350,150 L450,50 M550,150 L650,50",
          "M50,175 L750,175",
          "M400,50 L400,250"
        ];
      case 'minimal':
        return [
          "M100,150 L700,150",
          "M200,100 L600,200",
          "M300,200 L500,100"
        ];
      default:
        return ["M50,150 L750,150"];
    }
  };

  const paths = getPathData();

  const setupPath = (path: SVGPathElement) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    return length;
  };

  const animateLines = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    pathRefs.current.forEach((path, index) => {
      if (path) {
        setupPath(path);
        
        // Staggered animation with different easings
        const delay = index * 0.2;
        const duration = variant === 'minimal' ? 1.5 : 2.5;
        
        tl.to(path, {
          strokeDashoffset: 0,
          duration: duration,
          ease: "power3.out",
          delay: delay,
        }, 0);

        // Add pulsing glow effect
        tl.to(path, {
          filter: `drop-shadow(0 0 10px ${color}80) drop-shadow(0 0 20px ${color}40)`,
          duration: 0.8,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
        }, delay + duration * 0.7);

        // Subtle scale effect for connection variant
        if (variant === 'connection') {
          tl.to(path, {
            transformOrigin: "center",
            scale: 1.02,
            duration: 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
          }, delay + duration * 0.5);
        }
      }
    });

    // Auto-replay for continuous effect
    if (autoPlay) {
      tl.delay(2).repeat(-1).repeatDelay(3);
    }
  };

  const resetAnimation = () => {
    pathRefs.current.forEach(path => {
      if (path) {
        setupPath(path);
        gsap.set(path, { 
          filter: "none",
          scale: 1
        });
      }
    });
    setIsAnimating(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize all paths
    pathRefs.current.forEach(setupPath);

    if (trigger === 'scroll') {
      ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: animateLines,
        onLeave: resetAnimation,
        onEnterBack: animateLines,
        onLeaveBack: resetAnimation,
      });
    } else if (trigger === 'immediate' || autoPlay) {
      setTimeout(animateLines, 500);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [trigger, autoPlay, variant]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      animateLines();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      resetAnimation();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width="100%"
        height="300"
        viewBox="0 0 800 300"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Advanced gradient */}
          <linearGradient id={`lineGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6"/>
            <stop offset="30%" stopColor={color} stopOpacity="1"/>
            <stop offset="70%" stopColor={color} stopOpacity="1"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.6"/>
          </linearGradient>

          {/* Enhanced glow filter */}
          <filter id={`advancedGlow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="8" result="bigBlur"/>
            <feMerge> 
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Subtle texture */}
          <filter id={`texture-${variant}`}>
            <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feBlend mode="soft-light" in2="SourceGraphic"/>
          </filter>
        </defs>

        {paths.map((pathData, index) => (
          <path
            key={index}
            ref={el => pathRefs.current[index] = el}
            d={pathData}
            fill="none"
            stroke={`url(#lineGradient-${variant})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: `url(#advancedGlow-${variant})`,
              transformOrigin: 'center',
            }}
          />
        ))}

        {/* Decorative elements for geometric variant */}
        {variant === 'geometric' && (
          <>
            <circle cx="50" cy="150" r="3" fill={color} opacity="0.8">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="800" cy="50" r="3" fill={color} opacity="0.8">
              <animate attributeName="r" values="3;5;3" dur="2s" begin="1s" repeatCount="indefinite"/>
            </circle>
          </>
        )}

        {/* Connection nodes for connection variant */}
        {variant === 'connection' && (
          <>
            <circle cx="100" cy="100" r="4" fill={color} opacity="0.9"/>
            <circle cx="200" cy="200" r="4" fill={color} opacity="0.9"/>
            <circle cx="300" cy="100" r="4" fill={color} opacity="0.9"/>
            <circle cx="400" cy="200" r="4" fill={color} opacity="0.9"/>
            <circle cx="500" cy="100" r="4" fill={color} opacity="0.9"/>
            <circle cx="600" cy="200" r="4" fill={color} opacity="0.9"/>
          </>
        )}
      </svg>

      <style jsx>{`
        svg {
          filter: url(#texture-${variant});
        }
        
        svg path {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .container:hover svg path {
          filter: url(#advancedGlow-${variant}) drop-shadow(0 0 15px ${color}60);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          svg {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default LusionStyleLines;
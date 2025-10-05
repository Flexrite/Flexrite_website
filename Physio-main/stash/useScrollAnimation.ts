import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationOptions {
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
}

export const useScrollAnimation = (options: ScrollAnimationOptions) => {
  const animationRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const {
      trigger,
      start = "top 80%",
      end = "bottom 20%",
      scrub = 1,
      markers = false,
      onUpdate,
      onComplete
    } = options;

    // Create ScrollTrigger instance
    animationRef.current = ScrollTrigger.create({
      trigger,
      start,
      end,
      scrub,
      markers,
      onUpdate: (self) => {
        if (onUpdate) {
          onUpdate(self.progress);
        }
      },
      onComplete: () => {
        if (onComplete) {
          onComplete();
        }
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [options.trigger]);

  return animationRef;
};

export const usePathAnimation = (pathElement: SVGPathElement | null, progress: number) => {
  useEffect(() => {
    if (!pathElement) return;

    const length = pathElement.getTotalLength();
    
    // Set initial state
    pathElement.style.strokeDasharray = `${length}`;
    pathElement.style.strokeDashoffset = `${length}`;
    
    // Animate based on progress
    gsap.to(pathElement, {
      strokeDashoffset: length * (1 - progress),
      duration: 0.1,
      ease: "none"
    });

  }, [pathElement, progress]);
};
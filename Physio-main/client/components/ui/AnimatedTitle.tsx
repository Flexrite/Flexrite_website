import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animationType?: 'slideUp' | 'fadeIn' | 'splitChars' | 'scaleIn';
}

export default function AnimatedTitle({ 
  children, 
  className = '', 
  delay = 0,
  animationType = 'slideUp'
}: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = titleRef.current;
    if (!element) return;

    // Split text into characters for more advanced animations
    const text = element.textContent || '';
    if (animationType === 'splitChars') {
      element.innerHTML = text
        .split('')
        .map(char => `<span class="char" style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
    }

    let animation;

    switch (animationType) {
      case 'slideUp':
        gsap.set(element, { y: 100, opacity: 0 });
        animation = gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
        break;

      case 'fadeIn':
        gsap.set(element, { opacity: 0, scale: 0.8 });
        animation = gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
        break;

      case 'splitChars':
        const chars = element.querySelectorAll('.char');
        gsap.set(chars, { y: 100, opacity: 0 });
        animation = gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
        break;

      case 'scaleIn':
        gsap.set(element, { scale: 0, opacity: 0, rotation: -10 });
        animation = gsap.to(element, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
        break;
    }

    if (delay > 0 && animation) {
      animation.delay(delay);
    }

    return () => {
      if (animation) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animationType, delay]);

  return (
    <h2 ref={titleRef} className={className}>
      {children}
    </h2>
  );
}
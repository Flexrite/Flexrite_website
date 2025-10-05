import { useEffect, useRef } from 'react';

/**
 * useZoomOnScroll
 * Adds a zoom (scale) effect to the target element as the user scrolls.
 * @param minScale Minimum scale value (default: 1)
 * @param maxScale Maximum scale value (default: 1.15)
 */
export function useZoomOnScroll(minScale = 1, maxScale = 1.15) {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      // Calculate scroll progress from top of viewport to bottom of element
      const windowHeight = window.innerHeight;
      // Progress: 0 at top, 1 at bottom
      let progress = 1 - Math.max(0, Math.min(1, top / windowHeight));
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      // Interpolate scale
      const scale = minScale + (maxScale - minScale) * progress;
      ref.current.style.transform = `scale(${scale})`;
      ref.current.style.transition = 'transform 0.2s cubic-bezier(0.4,0,0.2,1)';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [minScale, maxScale]);

  return ref;
}

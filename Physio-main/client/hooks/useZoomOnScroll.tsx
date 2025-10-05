import { useEffect, useRef } from 'react';

/**
 * useZoomOnScroll
 * Attaches a zoom effect to the target element as the user scrolls.
 * Returns a ref to be attached to the element you want to zoom.
 */
export function useZoomOnScroll() {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			// Calculate how much the element is in view
			const visible = Math.max(0, windowHeight - rect.top);
			// Normalize between 0 and 1
			const progress = Math.min(1, visible / windowHeight);
			// Scale from 1 to 1.2 as you scroll
			const scale = 1 + progress * 0.2;
			ref.current.style.transform = `scale(${scale})`;
			ref.current.style.transition = 'transform 0.1s linear';
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return ref;
}

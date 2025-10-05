import { useEffect, useRef, memo } from 'react';

interface Review {
  name: string;
  rating: number;
  review: string;
}

interface HorizontalReviewsProps {
  reviews: Review[];
}

export const HorizontalReviews = memo(({ reviews }: HorizontalReviewsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const animationFrameIdRef = useRef<number>();

  useEffect(() => {
    const container = scrollContainerRef.current;
    const wrap = scrollWrapRef.current;
    
    if (!container || !wrap) return;

    const handleWheel = (e: WheelEvent) => {
      if (!container || !wrap) return;
      
      e.preventDefault();
      
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      
      const maxScroll = wrap.scrollWidth - container.clientWidth;
      const currentTransform = getComputedStyle(wrap).transform;
      let currentX = 0;
      
      if (currentTransform !== 'none') {
        const matrix = new DOMMatrix(currentTransform);
        currentX = matrix.m41;
      }
      
      const newX = Math.max(-maxScroll, Math.min(0, currentX - (e.deltaY * 3)));
      
      wrap.style.transform = `translateX(${newX}px)`;
      wrap.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      setTimeout(() => {
        isScrollingRef.current = false;
        if (wrap) wrap.style.transition = '';
      }, 150);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-400">Hear from people who've experienced our services</p>
        </div>
        
        <div 
          ref={scrollContainerRef} 
          className="relative overflow-hidden"
          aria-label="Client testimonials carousel"
        >
          <div 
            ref={scrollWrapRef} 
            className="flex space-x-6 pb-8 -mx-4 px-4"
            role="list"
          >
            {reviews.map((review, index) => (
              <article 
                key={review.name + index}
                className="flex-shrink-0 w-80 bg-gray-900 bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800 transition-all hover:border-gray-600"
                style={{ minWidth: '320px' }}
                role="listitem"
                tabIndex={0}
              >
                <div className="flex items-center mb-4 space-x-1 text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{review.review}"
                </p>
                
                <p className="font-medium text-white">
                  {review.name}
                </p>
              </article>
            ))}
          </div>
          
          {/* Scroll hint for desktop */}
          <div className="hidden md:flex items-center justify-center mt-8 text-gray-500 text-sm">
            <span className="mr-2">← Scroll →</span>
          </div>
        </div>
      </div>
    </div>
  );
});

HorizontalReviews.displayName = 'HorizontalReviews';

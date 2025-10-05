import React, { useRef, useEffect, useState } from 'react';

interface LiquidHoverOverlayProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

const LiquidHoverOverlay: React.FC<LiquidHoverOverlayProps> = ({
  children,
  intensity = 0.2,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // CSS-based liquid overlay effect (fallback for WebGL complexity)
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
        rgba(64, 224, 208, ${intensity * 0.3}) 0%, 
        rgba(64, 224, 208, ${intensity * 0.15}) 30%, 
        transparent 70%
      )
    `,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    zIndex: 10,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      container.style.setProperty('--x', `${x}%`);
      container.style.setProperty('--y', `${y}%`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div style={overlayStyle} />
    </div>
  );
};

export default LiquidHoverOverlay;
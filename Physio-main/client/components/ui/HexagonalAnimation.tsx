import React from 'react';

interface TriangleProps {
  delay: number;
  color: string;
}

const AnimatedTriangle: React.FC<TriangleProps> = ({ delay, color }) => {
  return (
    <polygon
      points="50 57.5, 50 57.5, 50 57.5"
      fill="none"
      stroke={color}
      strokeWidth="5"
    >
      <animate
        attributeName="points"
        repeatCount="indefinite"
        dur="4s"
        begin={`${delay}s`}
        from="50 57.5, 50 57.5, 50 57.5"
        to="50 -75, 175 126, -75 126"
      />
    </polygon>
  );
};

const HexagonalAnimation: React.FC = () => {
  const cols = 8;
  const rows = 4;
  const cells = cols * rows;
  const shapeHeight = 180;
  const shapeWidth = 160;
  const bgColor = '#890047';

  // Generate color variations based on the base color #890047
  const colors = [
    '#890047', // Base color
    '#a8005a', // Lighter
    '#6b0036', // Darker
    '#c7006d', // Much lighter
  ];

  const getTransform = (index: number) => {
    if (index >= cols * 3) return 'translate(-50%, -75%)';
    if (index >= cols * 2) return 'translate(0%, -50%)';
    if (index >= cols) return 'translate(-50%, -25%)';
    return 'translate(0%, 0%)';
  };

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {/* Radial gradient overlay to fade edges */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle, transparent 0%, ${bgColor}40 100%)`
        }}
      />

      {/* Main container with grid layout - covering whole footer */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${shapeWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${shapeHeight}px)`,
          transform: 'translate(-3%, -4%)',
        }}
      >
        {Array.from({ length: cells }, (_, index) => (
          <div
            key={index}
            className="shape"
            style={{
              width: `${shapeWidth}px`,
              height: `${shapeHeight}px`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              WebkitClipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              transform: getTransform(index),
            }}
          >
            <svg
              viewBox="0 0 100 115"
              preserveAspectRatio="xMidYMin slice"
              className="w-full h-full"
            >
              <AnimatedTriangle delay={0} color={colors[0]} />
              <AnimatedTriangle delay={1} color={colors[1]} />
              <AnimatedTriangle delay={2} color={colors[2]} />
              <AnimatedTriangle delay={3} color={colors[3]} />
            </svg>
          </div>
        ))}
      </div>

      <style jsx>{`
        .shape {
          position: relative;
        }
        
        @media (max-width: 768px) {
          .grid {
            transform: translate(-10%, -10%) scale(0.7);
          }
        }
        
        @media (max-width: 480px) {
          .grid {
            transform: translate(-15%, -15%) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default HexagonalAnimation;
import React from 'react';
import AnimatedSphere from './AnimatedSphere';

interface TextWithSphereProps {
  className?: string;
  style?: React.CSSProperties;
}

const TextWithSphere: React.FC<TextWithSphereProps> = ({ className = '', style = {} }) => {
  // Responsive text sizing
  const fontSize = typeof window !== 'undefined' && window.innerWidth < 768 ? '72px' : '144px';
  const lineHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? '82px' : '154px';
  const sphereSize = typeof window !== 'undefined' && window.innerWidth < 768 ? '60px' : '120px';
  
  const baseStyle = {
    fontSize,
    lineHeight,
    fontFamily: 'Playfair Display, serif',
    color: 'white',
    margin: 0,
    padding: 0,
    height: lineHeight,
    position: 'absolute' as const,
    top: 0,
    whiteSpace: 'nowrap' as const,
    letterSpacing: '8px',
    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    ...style
  };

  return (
    <div className={className} style={baseStyle}>
      {/* Text before 'O' */}
      <span>FLEXRITE W</span>
      
      {/* 3D Sphere replacing 'O' */}
      <div 
        style={{
          width: sphereSize,
          height: sphereSize,
          display: 'inline-block',
          position: 'relative',
          marginLeft: '8px',
          marginRight: '8px',
          top: '-10px' // Slight adjustment to align with text baseline
        }}
      >
        <AnimatedSphere />
      </div>
      
      {/* Text after 'O' */}
      <span>RLD</span>
    </div>
  );
};

// Component for the echo/outline versions
export const TextWithSphereOutline: React.FC<TextWithSphereProps & { strokeColor: string }> = ({ 
  className = '', 
  style = {},
  strokeColor 
}) => {
  // Responsive text sizing
  const fontSize = typeof window !== 'undefined' && window.innerWidth < 768 ? '72px' : '144px';
  const lineHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? '82px' : '154px';
  const sphereSize = typeof window !== 'undefined' && window.innerWidth < 768 ? '60px' : '120px';
  
  const outlineStyle = {
    fontSize,
    lineHeight,
    fontFamily: 'Playfair Display, serif',
    color: 'transparent',
    WebkitTextStroke: `1px ${strokeColor}`,
    margin: 0,
    padding: 0,
    height: lineHeight,
    position: 'absolute' as const,
    top: 0,
    whiteSpace: 'nowrap' as const,
    letterSpacing: '8px',
    display: 'flex',
    alignItems: 'center',
    opacity: 0,
    transition: 'transform 0.3s, opacity 0.3s',
    ...style
  };

  return (
    <div className={className} style={outlineStyle}>
      {/* Text before 'O' */}
      <span>FLEXRITE W</span>
      
      {/* Invisible placeholder for sphere (to maintain spacing) */}
      <div 
        style={{
          width: sphereSize,
          height: sphereSize,
          display: 'inline-block',
          marginLeft: '8px',
          marginRight: '8px',
          opacity: 0
        }}
      />
      
      {/* Text after 'O' */}
      <span>RLD</span>
    </div>
  );
};

export default TextWithSphere;
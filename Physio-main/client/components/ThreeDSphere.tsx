import React from 'react';

const ThreeDSphere: React.FC = () => {
  return (
    <div className="sphere-stage" style={{
      width: '150px',
      height: '150px',
      display: 'inline-block',
      margin: '20px',
      perspective: '1200px',
      perspectiveOrigin: '50% 50%',
      position: 'relative'
    }}>
      <div className="sphere-ball" style={{
        display: 'inline-block',
        borderRadius: '50%',
        height: '100%',
        width: '100%',
        position: 'relative',
        margin: 0,
        // Glassmorphism effect for the orb
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        // Adding subtle rim glow
        boxShadow: `
          0 0 30px rgba(255, 255, 255, 0.3),
          0 0 60px rgba(255, 255, 255, 0.2),
          inset 0 0 20px rgba(255, 255, 255, 0.1)
        `
      }}>
        {/* First animated highlight */}
        <div style={{
          content: '""',
          position: 'absolute',
          top: '1%',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 0px, #fff, rgba(255,255,255,0) 58%)',
          filter: 'blur(15px)',
          zIndex: 2,
          animation: 'sphereSpin 2s linear infinite',
          transformOrigin: '0 0'
        }} />
        
        {/* Second animated highlight */}
        <div style={{
          content: '""',
          position: 'absolute',
          top: '1%',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 90% 0px, #fff, rgba(255,255,255,0) 58%)',
          filter: 'blur(15px)',
          zIndex: 2,
          animation: 'sphereSpin2 5s linear infinite',
          transformOrigin: '0 0'
        }} />
        
        {/* Shadow */}
        <span style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 50%)',
          transform: 'rotateX(90deg) translateZ(-150px)',
          zIndex: -1
        }} />
      </div>

      <style jsx>{`
        @keyframes sphereSpin {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -300px 0;
          }
        }
        
        @keyframes sphereSpin2 {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 -300px;
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeDSphere;
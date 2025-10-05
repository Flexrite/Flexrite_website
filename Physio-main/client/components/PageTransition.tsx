import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit');
      
      // After exit transition completes, update the location and start enter transition
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, 600); // Match the exit transition duration

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div 
      className={`page-transition-${transitionStage === 'enter' ? 'enter' : 'exit'} page-transition-${transitionStage === 'enter' ? 'enter' : 'exit'}-active`}
      key={displayLocation.pathname}
    >
      {children}
    </div>
  );
};

export default PageTransition;
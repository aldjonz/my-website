import { useState, useEffect } from 'react';

interface ScreenDetails {
  width: number;
  height: number;
  isPortrait: boolean;
  isMobile: boolean;
}

export const useScreenDetails = (): ScreenDetails => {
  const [screenDetails, setScreenDetails] = useState<ScreenDetails>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isPortrait: typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : false,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 769 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setScreenDetails({
          width: window.innerWidth,
          height: window.innerHeight,
          isPortrait: window.innerHeight > window.innerWidth,
          isMobile: window.innerWidth < 768,
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      }
    };
  }, []);

  return screenDetails;
}; 
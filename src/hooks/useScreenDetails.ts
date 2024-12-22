import { useState, useEffect } from 'react';

interface ScreenDetails {
  width: number;
  height: number;
  isPortrait: boolean;
  isMobile: boolean;
}

export const useScreenDetails = (): ScreenDetails => {
  const [screenDetails, setScreenDetails] = useState<ScreenDetails>({
    width: window.innerWidth,
    height: window.innerHeight,
    isPortrait: window.innerHeight > window.innerWidth,
    isMobile: window.innerWidth < 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenDetails({
        width: window.innerWidth,
        height: window.innerHeight,
        isPortrait: window.innerHeight > window.innerWidth,
        isMobile: window.innerWidth < 768,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return screenDetails;
}; 
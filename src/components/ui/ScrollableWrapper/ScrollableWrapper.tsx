import React, { forwardRef, useState, useEffect } from 'react';
import styles from './ScrollableWrapper.module.css';

const ScrollableWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode, pointerEvents: boolean, opacity: boolean, onScroll: () => void }>(
  ({ children, pointerEvents, opacity, onScroll }, ref) => {
    const [showScroll, setShowScroll] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      onScroll();
      setShowScroll(false);
      
      if (ref && 'current' in ref && ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        setIsAtBottom(Math.ceil(scrollTop + clientHeight) >= scrollHeight - clientHeight);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowScroll(true);
      }, 5000);
    };

    useEffect(() => {
      handleScroll()
      return () => {
        clearTimeout(scrollTimeout);
      };
    }, [opacity]);

    const scrollToNextSection = () => {
      if (ref && 'current' in ref && ref.current) {
        const currentScroll = ref.current.scrollTop;
        const viewportHeight = window.innerHeight;
        const nextSectionPosition = currentScroll + viewportHeight;
        
        ref.current.scrollTo({
          top: nextSectionPosition,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div 
        ref={ref}
        onScroll={handleScroll}
        style={{ 
            overflowY: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh', 
            width: '100vw', 
            scrollSnapType: 'y mandatory', 
            pointerEvents: pointerEvents ? 'auto' : 'none', 
            opacity: opacity ? 1 : 0, 
            transition: 'opacity 0.5s ease-in-out',
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
            scrollbarColor: 'rgba(255,255,255,0.7) rgba(0,0,0,0.7)',
        }}
      >
          {children}
          {!isAtBottom && (
            <button 
              onClick={scrollToNextSection}
              className={styles.scrollArrowContainer}
              style={{
                opacity: showScroll ? 0.8 : 0,
              }}
            >
             <svg 
                className={styles.scrollArrow}
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </button>
          )}
          {/* This div is a hack to hide x scroll bar. Without the x scroll bar the y scroll messes up. */}
          <div style={{ height: 8, position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'black', width: '100vw' }} />
      </div>
    );
  }
);

export default ScrollableWrapper;
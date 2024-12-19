import React, { forwardRef } from 'react';

const ScrollableWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode, pointerEvents: boolean, opacity: boolean, onScroll: () => void }>(
  ({ children, pointerEvents, opacity, onScroll }, ref) => {
    return (
      <div 
          ref={ref}
          onScroll={onScroll}
          style={{ 
              overflowY: 'auto',
              overflowX: 'hidden', 
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
              scrollbarColor: 'rgba(255,255,255,0.7) rgba(0,0,0,0.7)',
          }}
      >
          {children}
      </div>
    );
  }
);

export default ScrollableWrapper;
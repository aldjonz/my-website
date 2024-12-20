import React, { useState, useEffect } from 'react'
import TopographySvg from './TopographySvg'

type Props = {}

const TopographyBg = (props: Props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const smoothFactor = 0.08
    
    const animatePosition = () => {
      setSmoothPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothFactor,
        y: prev.y + (mousePosition.y - prev.y) * smoothFactor
      }))
      requestAnimationFrame(animatePosition)
    }

    const animationFrame = requestAnimationFrame(animatePosition)
    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition])

  const pathColour = 'rgba(17,44,245,'
  return (
    <div>
      <svg style={{ 
        position: 'absolute', 
        width: 0, 
        height: 0, 
        overflow: 'hidden', 
        pointerEvents: 'none'
      }}>
        <defs>
          <filter id="wavy">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.01" 
              numOctaves="3" 
              seed="200"
            >
              <animate 
                attributeName="baseFrequency" 
                dur="120s" 
                values="0.01;0.015;0.01" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="60" />
          </filter>
          <mask id="gradientMask">
            <radialGradient id="maskGradient">
              <stop offset="0%" stopColor="white" />
              <stop offset="12%" stopColor="white" />
              <stop offset="13%" stopColor="black" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <circle 
              cx={mousePosition.x} 
              cy={mousePosition.y} 
              r="100%" 
              fill="url(#maskGradient)" 
            />
          </mask>
        </defs>
      </svg>
      <div style={{ backgroundColor: '#000', width: '100vw', height: '100vh' }} />
      
      <svg 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          height: '100vh', 
          width: '100vw',
          pointerEvents: 'none'
        }}
      >
        <circle
          cx={mousePosition.x}
          cy={mousePosition.y}
          r={window.innerWidth / 16}
          fill="red"
          filter="url(#wavy)"
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <TopographySvg />
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <TopographySvg />
      </div>

      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#000', 
        mixBlendMode: 'multiply',
        opacity: 0.4,
        pointerEvents: 'none',
      }}>
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              ${pathColour}1) 0%, 
              ${pathColour}1) 9%, 
              ${pathColour}0) 10%
            )`,
          }}
        />
      </div>
    </div>
  )
}

const styles = `

`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TopographyBg
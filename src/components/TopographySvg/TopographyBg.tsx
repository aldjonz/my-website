"use client";

import React, { useState, useEffect, useRef } from 'react'
import TopographySvg from './TopographySvg'
import styles from './TopographySvg.module.css'

type Props = {}

const TopographyBg = (props: Props) => {
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  let inactivityTimer: NodeJS.Timeout

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
      const dx = mousePositionRef.current.x - smoothPosition.x
      const dy = mousePositionRef.current.y - smoothPosition.y
      if (!isActive) {
        setIsActive(true)
      }
      
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        setIsActive(false)
      }, 1000) 
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(inactivityTimer)
    }
  }, [])

  useEffect(() => {
    const smoothFactor = 0.1
    let animationFrameId: number

    const animatePosition = () => {
      setSmoothPosition(prev => {
        const dx = mousePositionRef.current.x - prev.x
        const dy = mousePositionRef.current.y - prev.y
        
        if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
          return {
            x: prev.x + dx * smoothFactor,
            y: prev.y + dy * smoothFactor
          }
        }
        return prev
      })
      
      animationFrameId = requestAnimationFrame(animatePosition)
    }

    animationFrameId = requestAnimationFrame(animatePosition)
    return () => cancelAnimationFrame(animationFrameId)
  }, [mousePositionRef])

  const pathColour = 'rgba(0, 0, 255,'

  const spotlightTransition = {
    transform: isActive ? 'scale(1)' : 'scale(0)',
    transformOrigin: `${smoothPosition.x}px ${smoothPosition.y}px`,
    transition: 'transform 0.6s ease-in-out',
    transitionDelay: '1s'
  }
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
                dur="20"
                values="0.01;0.015;0.01" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="30" />
          </filter>
          <mask id="gradientMask">
            <radialGradient id="maskGradient">
              <stop offset="0%" stopColor="white" />
              <stop offset="12%" stopColor="white" />
              <stop offset="13%" stopColor="black" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <circle 
              cx={smoothPosition.x} 
              cy={smoothPosition.y} 
              r="100%" 
              fill="url(#maskGradient)" 
            />
          </mask>
        </defs>
      </svg>
      <div style={{ backgroundColor: '#000', width: '100vw', height: '100vh' }} />
      
      <svg 
        className={styles.breath}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          height: '100vh', 
          width: '100vw',
          pointerEvents: 'none',
          ...spotlightTransition

        }}
      >
        <circle
          cx={smoothPosition.x}
          cy={smoothPosition.y}
          r={ typeof window !== 'undefined' ? window.innerWidth / 13 : 80}
          fill="#631814"
          filter="url(#wavy)"
        />
      </svg>

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
        opacity: 0.2,
        pointerEvents: 'none',
      }}>
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            ...spotlightTransition,
            background: `radial-gradient(circle at ${smoothPosition.x}px ${smoothPosition.y}px, 
              ${pathColour}1) 0%, 
              ${pathColour}1) 6.5%, 
              ${pathColour}0) 7.5%
            )`,
          }}
        />
      </div>
    </div>
  )
}

export default TopographyBg
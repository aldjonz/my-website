import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedGroups from './AnimatedGroups'
import AboutHTML from '../About/AboutHTML'
import ExpertiseHTML from '../Expertise/ExpertiseHTML'
import PortfolioHTML from '../Portfolio/PortfolioHTML'
import HoverText from '../ui/HoverText'
import { Vector3 } from 'three'
import ScrollableWrapper from '../ui/ScrollableWrapper'

const NavCanvas = () => {
    const [itemActive, setItemActive] = useState(null)

    const [textIndex, setTextIndex] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    const handleScroll = () => {
        const scrollPosition = scrollContainerRef.current?.scrollTop
        const fraction = scrollPosition / scrollContainerRef.current?.clientHeight;
        setTextIndex(Math.floor(fraction))
        setIsScrolling(true);
        
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 300) as any;
    }

    useEffect(() => {
        return () => {
          clearTimeout(scrollTimeoutRef.current)
        }
      }, [])

  return (
    <>
        <div style={{ position: 'fixed', height: '100vh', top: 0, left: 0, width: '100vw'}}>
            <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} >
                <ambientLight intensity={4} />
                <directionalLight position={[5, 1, 5]} intensity={2} />
                <directionalLight position={[-5, -1, 5]} intensity={2} />
                <AnimatedGroups 
                    itemActive={itemActive}
                    setItemActive={setItemActive}
                    textIndex={textIndex}
                />
            </Canvas>
        </div>
        <ScrollableWrapper ref={scrollContainerRef} opacity={itemActive !== null} pointerEvents={itemActive === 'about' || itemActive === 'expertise'} onScroll={handleScroll}>
            {itemActive === 'expertise' && (
                <ExpertiseHTML 
                    textIndex={textIndex}
                />
            )}
            {itemActive === 'about' && (
                <AboutHTML 
                    textIndex={textIndex} 
                    isScrolling={isScrolling}
                />
            )}
        </ScrollableWrapper>
        <PortfolioHTML />
        {itemActive && (
            <div onClick={() => setItemActive(null)} style={{ position: 'fixed', top: 0, left: 10, zIndex: 10000, }}>
                <HoverText title={"Home"} />
            </div>
        )}
    </>

  )
}

export default NavCanvas
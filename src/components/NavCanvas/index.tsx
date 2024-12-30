'use client'

import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedGroups from './AnimatedGroups'
import AboutHTML from '../About/AboutHTML'
import ExpertiseHTML from '../Expertise/ExpertiseHTML'
import PortfolioHTML from '../Portfolio/PortfolioHTML'
import HoverText from '../ui/HoverText'
import ScrollableWrapper from '../ui/ScrollableWrapper/ScrollableWrapper'
import styles from './NavCanvas.module.css'
import { usePathname, useRouter } from 'next/navigation'

const NavCanvas = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [itemActive, setItemActive] = useState<string | null>(null)
    const [textIndex, setTextIndex] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    const handleScroll = () => {
        if (!scrollContainerRef.current) return
        const scrollPosition = scrollContainerRef.current?.scrollTop
        const fraction = scrollPosition / scrollContainerRef.current?.clientHeight;
        setTextIndex(Math.floor(fraction))
        setIsScrolling(true);
        
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 300) as any;
    }

    const goBack = () => {
        window.location.hash = ''
    }

    useEffect(() => {
        const hash = window.location.hash.slice(1); 
        if (hash) {
            setItemActive(hash);
        } 

        const handleHashChange = () => {
            const newHash = window.location.hash.slice(1);
            setItemActive(newHash || null);
        };

        window.addEventListener('hashchange', handleHashChange);
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname, router]);

    useEffect(() => {
        return () => {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
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
        <PortfolioHTML  
            isActive={itemActive === 'portfolio'}
        />
        {itemActive && (
            <div onClick={goBack} className={styles.backButton} >
                <HoverText title={"back"} />
            </div>
        )}
    </>

  )
}

export default NavCanvas
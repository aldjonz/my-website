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
import { useLoading } from '@/context/loadingContext'

const NavCanvas = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { isLoading, setLoading } = useLoading()
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
        if (typeof window !== 'undefined') {
            window.location.hash = ''
        }
    }

    const handleCanvasCreated = () => {
        setLoading(false)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.slice(1);
            const [mainSection] = hash.split('/');
            if (mainSection) {
                setItemActive(mainSection);
            } else {
                if (pathname === '/') {
                    router.push('/#');
                }
            }
        }
        

        const handleHashChange = () => {
            if (typeof window !== 'undefined') {
                const newHash = window.location.hash.slice(1);
                const [mainSection] = newHash.split('/');
                setItemActive(mainSection || null);
            }
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
            <Canvas onCreated={handleCanvasCreated} gl={{ antialias: true }} dpr={[1, 1.5]} >
                <directionalLight position={[0, 0, 20]} intensity={4} />
                {/* <AnimatedGroups 
                    itemActive={itemActive}
                    setItemActive={setItemActive}
                    textIndex={textIndex}
                /> */}
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
"use client"

import React, { useEffect, TouchEvent, useRef } from 'react'
import styles from './Portfolio.module.css'
import { Children } from 'react'
import { motion } from 'framer-motion'
import ModelWithImageTexture from './ModelWithImageTexture'
import ThreeCanvas from '../ui/ThreeCanvas'
import MobilePhoneModel from './MobilePhoneModel'
import PointerTrackerGroup from '../ui/PointerTrackerGroup'
import { contentArray } from '@/constants/constants'
import { usePortfolio } from '@/context/portfolioContext'
import { Center } from '@react-three/drei'
import TextScramble from '../ui/TextScramble'
import { useScreenDetails } from '@/hooks/useScreenDetails'

const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: 'auto',
    transition: { when: 'beforeChildren', staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: 0 }
}

const List = React.memo(({ children, open }: { children: React.ReactNode, open: boolean }) => {
  return (
    <motion.ul variants={container} initial="hidden" animate={open ? 'show' : 'hidden'}>
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  )
})

type Props = {
  selectedProjectIndex: number | null
  setSelectedProjectIndex: (index: number | null) => void
}

const PortfolioHTML = ({ isActive }: { isActive: boolean }) => {
  const { isMobile } = useScreenDetails()
  const { selectedProjectIndex, setSelectedProjectIndex } = usePortfolio()
  const currentItem = selectedProjectIndex !== null ? contentArray[selectedProjectIndex] : null

  const touchStart = useRef<number>(0);
  const SWIPE_THRESHOLD = 50; // minimum distance for a swipe

  const handleTouchStart = (e: TouchEvent) => {
    if (isMobile) {
      touchStart.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isMobile) {
      const touchEnd = e.changedTouches[0].clientX;
      const distance = touchStart.current - touchEnd;

      if (Math.abs(distance) > SWIPE_THRESHOLD && selectedProjectIndex !== null) {
        if (distance > 0) {
          if (selectedProjectIndex === contentArray.length - 1) {
            navigateToProject(0);
          } else {
            navigateToProject(selectedProjectIndex + 1);
          }
        } else if (distance < 0) {
          if (selectedProjectIndex === 0) {
            navigateToProject(contentArray.length - 1);
          } else {
            navigateToProject(selectedProjectIndex - 1);
          }
        }
      }
    }
  };

  const close = () => {
    setSelectedProjectIndex(null)
    if (typeof window !== 'undefined') {
        window.location.hash = 'portfolio'
    }
  }

  const navigateToProject = (index: number) => {
    setSelectedProjectIndex(index)
    if (typeof window !== 'undefined') {
        window.location.hash = `portfolio/${index}`
    }
  }

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const [section, projectId] = hash.split('/');
        
        if (section === 'portfolio' && projectId !== undefined) {
            const index = parseInt(projectId);
            if (!isNaN(index)) {
                setSelectedProjectIndex(index);
            }
        } else {
          setSelectedProjectIndex(null)
        }
    };

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
        window.removeEventListener('hashchange', handleHashChange);
    };
  } , [setSelectedProjectIndex]);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, pointerEvents: Boolean(currentItem) ? 'auto' : 'none' }}>
        <div className={styles.blurBg} style={{ opacity: Boolean(currentItem) ? 1 : 0, pointerEvents: Boolean(currentItem) ? 'auto' : 'none', transitionDuration: '0.4s'  }} />
      
        {currentItem && (
          <>
            <div 
              className={styles.scrollContainer} 
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.container} style={{ pointerEvents: Boolean(currentItem) ? 'auto' : 'none' }}>
                <div className={styles.innerContainer}>
                  <div className={styles.textScrambleContainer} style={{ position: 'absolute', top: '-10%', left: '5vw', color: 'white' }}>
                    <TextScramble baseText="Swipe to see my other projects" />
                  </div>
                  <div className={styles.projectDisplay}>
                    <div className={styles.info}>
                      <List open={Boolean(currentItem)}>
                        <h3 style={{ fontSize: '2em', letterSpacing: '0.01px' }}>
                          <span className="accent">{currentItem.type}</span>
                        </h3>
                        <h3 className={styles.title}>{currentItem.title}</h3>
                        <div className={styles.paragraphContainer}>
                          {currentItem.description.map((paragraph: string, index: number) => {
                            return (
                              <p key={index}>
                                {paragraph}
                              </p>
                            )
                          })}
                        </div>
                        <div className={styles.techStack}>
                          {currentItem.techStack.map((tech: string, index: number) => (
                            <p key={index}>{tech}</p>
                          ))}
                        </div>
                      </List>
                    </div>
                    <a href={currentItem.link} target="_blank" rel="noreferrer" className={styles.link}>
                      View Project
                    </a>
                    <div style={{ position: 'absolute', top: 0, right: 0,  cursor: 'pointer', padding: 16, }} onClick={close}>
                      <img src="/close.png" alt="Close" height={30} width={30} />
                    </div>
                  </div>
                </div>
                <div className={styles.innerContainer} > 
                  <div className={styles.threeCanvasContainer}>
                    <ThreeCanvas>
                      <Center visible={currentItem?.mediaType === 'mobile'}  >
                        <PointerTrackerGroup visible={currentItem?.mediaType === 'mobile'}>
                          <MobilePhoneModel 
                            images={currentItem?.media?.[0] ? [currentItem.media[0]] : []} 
                            position={[3, 4, 0]}
                            rotation={[-0.5, -0.5, -0.4]}
                          />
                          <MobilePhoneModel 
                            isSlideshow={true}
                            images={currentItem?.media ? [currentItem.media[1]] : []}
                            position={[1.4, 2, -0.5]}
                            rotation={[-0.3, 0.5, 0.4]}
                          />
                        </PointerTrackerGroup>
                      </Center>
                      <Center visible={currentItem?.mediaType !== 'mobile'} position={[0,0,0]}>

                        <ModelWithImageTexture
                          visible={currentItem?.mediaType !== 'mobile'}
                          texturePath={currentItem?.media?.[0] ? `/portfolio/projects/${currentItem.media[0]}` : ''} 
                          transparent={true}
                          shouldUnmount={!open}
                        />
                      </Center>
                    </ThreeCanvas>
                  </div>
                </div>
              </div>
            </div>
              <div className={styles.projectNavigator}>
                  {Array.from({ length: 7 }, (_, index) => (
                    <div key={index} className={styles.projectNavigatorItem} style={{ backgroundColor: selectedProjectIndex === index ? '#631814' : 'rgba(255,255,255,0.7)' }} onClick={() => navigateToProject(index)} />
                  ))}
              </div>
          </>
        )}
      </div>
    </>
  )
}

export default PortfolioHTML
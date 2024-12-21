"use client"

import React, { useEffect } from 'react'
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
  const { selectedProjectIndex, setSelectedProjectIndex } = usePortfolio()
  const currentItem = contentArray[selectedProjectIndex]

  useEffect(() => {
    if (!isActive) {
      setSelectedProjectIndex(null)
    }
  }, [isActive])
  return (
    <>
      {isActive && <div 
        style={{ 
          position: 'fixed',
          bottom: '16vh',
          left: '2vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          color: 'white',
          fontSize: '1.2em',
          fontWeight: '200',
          fontFamily: 'Major Mono Display',
          letterSpacing: '0.01px',
        }}
      >
        <TextScramble baseText="Click the pyramids to" wrongText="unlock ancient secrets" correctText="view my projects" />
      </div>}
      <div className={styles.blurBg} style={{ opacity: Boolean(currentItem) ? 1 : 0, pointerEvents: Boolean(currentItem) ? 'auto' : 'none', transitionDuration: '0.4s'  }} />
      {currentItem && (
          <>
            <div className={styles.container} style={{ pointerEvents: Boolean(currentItem) ? 'auto' : 'none' }}>
              <div className={styles.innerContainer}>
                <div className={styles.projectDisplay}>
                  <div className={styles.info}>
                    <List open={Boolean(currentItem)}>
                      <h3 style={{ fontSize: '2em', letterSpacing: '0.01px' }}>
                        <span className="accent">{currentItem.type}</span>
                      </h3>
                      <h3 className={styles.title}>{currentItem.title}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', padding: '15px 0', borderTop: '1px solid black' }}>
                        {currentItem.description.map((paragraph, index) => {
                          return (
                            <p key={index}>
                              {paragraph}
                            </p>
                          )
                        })}
                      </div>
                      <div className={styles.techStack}>
                        {currentItem.techStack.map((tech, index) => (
                          <p key={index}>{tech}</p>
                        ))}
                      </div>
                    </List>
                  </div>
                  <a href={currentItem.link} target="_blank" rel="noreferrer" className={styles.link}>
                    View Project
                  </a>
                  <div style={{ position: 'absolute', top: 0, right: 0,  cursor: 'pointer', padding: 16, }} onClick={() => setSelectedProjectIndex(null)}>
                    <img src="/close.png" alt="Close" height={30} width={30} />
                  </div>
                </div>
              </div>
              <div className={styles.innerContainer} > 
                <div style={{ position: 'absolute', width: '70%', height: '100%', pointerEvents: 'none' }}>
                  <ThreeCanvas>
                    <Center visible={currentItem?.mediaType === 'mobile'}>
                      <PointerTrackerGroup visible={currentItem?.mediaType === 'mobile'}>
                        <MobilePhoneModel 
                          images={currentItem?.media?.[0] ? [currentItem.media[0]] : []} 
                          position={[3, 4, 0]}
                          rotation={[-0.5, -0.5, -0.4]}
                        />
                        <MobilePhoneModel 
                          isSlideshow={true}
                          images={currentItem?.media ? currentItem.media.slice(1) : []}
                          position={[1.4, 2, -0.5]}
                          rotation={[-0.3, 0.5, 0.4]}
                        />
                      </PointerTrackerGroup>
                    </Center>
                    <Center visible={currentItem?.mediaType !== 'mobile'}>

                      <ModelWithImageTexture
                        visible={currentItem?.mediaType !== 'mobile'}
                        texturePath={currentItem?.media?.[0] ? `/portfolio/projects/${currentItem.media[0]}` : ''} 
                        transparent={true}
                      />
                    </Center>
                  </ThreeCanvas>
                </div>
              </div>
            </div>
            <div className={styles.projectNavigator}>
                {Array.from({ length: 7 }, (_, index) => (
                  <div key={index} className={styles.projectNavigatorItem} style={{ backgroundColor: selectedProjectIndex === index ? '#631814' : 'rgba(255,255,255,0.7)' }} onClick={() => setSelectedProjectIndex(index)} />
                ))}
            </div>
        </>
      )}
    </>
  )
}

export default PortfolioHTML
"use client"

import React from 'react'
import styles from './Portfolio.module.css'
import { Children } from 'react'
import { motion } from 'framer-motion'
import { useProjectDisplay } from '@/hooks/useProjectDisplay'
import Image from 'next/image'
import ModelWithImageTexture from './ModelWithImageTexture'
import ThreeCanvas from '../ui/ThreeCanvas'
import MobilePhoneModel from './MobilePhoneModel'
import PointerTrackerGroup from '../ui/PointerTrackerGroup'
import { contentArray } from '@/constants/constants'

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

function List({ children, open }: { children: React.ReactNode, open: boolean }) {
  return (
    <motion.ul variants={container} initial="hidden" animate={open ? 'show' : 'hidden'}>
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  )
}

type Props = {
  selectedProjectIndex: number | null
  setSelectedProjectIndex: (index: number | null) => void
}

const PortfolioHTML = ({ selectedProjectIndex, setSelectedProjectIndex }: Props) => {
  const currentItem = contentArray[selectedProjectIndex]
  return (
    <>
        <div className={styles.blurBg} style={{ opacity: Boolean(currentItem) ? 1 : 0, pointerEvents: Boolean(currentItem) ? 'auto' : 'none', transitionDuration: '0.4s'  }} />
        <div className={styles.container} style={{ pointerEvents: Boolean(currentItem) ? 'auto' : 'none' }}>
          {currentItem && (
            <>
                  <div className={styles.innerContainer}>
                    <div className={styles.projectDisplay}>
                    <div className={styles.info}>
                      <List open={Boolean(currentItem)}>
                        <h3 style={{ fontSize: '2em', letterSpacing: '0.01px' }}>
                          <span className="accent">{currentItem.type}</span>
                        </h3>
                        <h3 className={styles.title}>{currentItem.title}</h3>
                        <p style={{ borderTop: '1px solid black', padding: '20px 0' }}>
                          {currentItem.description}
                        </p>
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
                    <div style={{ position: 'absolute', top: 0, right: 0,  cursor: 'pointer', padding: 16 }} onClick={() => setSelectedProjectIndex(null)}>
                      <img src="/close.png" alt="Close" height={30} width={30} />
                    </div>
                  </div>
              </div>
              <div className={styles.innerContainer} > 
                <div style={{ position: 'absolute', width: '70%', height: '100%', pointerEvents: 'none' }}>
                  <ThreeCanvas>
                    {currentItem.mediaType === 'mobile' ? (
                      <PointerTrackerGroup>
                        <MobilePhoneModel 
                            images={[currentItem.media[0]]} 
                            position={[3, 4, 0]}
                            rotation={[-0.5, -0.5, -0.4]}
                          />
                        <MobilePhoneModel 
                          isSlideshow={true}
                          images={currentItem.media.slice(1)}
                          position={[1.4, 2, -0.5]}
                          rotation={[-0.3, 0.5, 0.4]}
                        />
                      </PointerTrackerGroup>
                    )  : (
                      <ModelWithImageTexture
                        texturePath={`/portfolio/projects/${currentItem.media[0]}`} 
                        transparent={currentItem.title === 'XRD Domains' ? true : true}
                      />
                    )}
                  </ThreeCanvas>
                </div>
 
              </div>
            </>
          )}
        </div>
        <div className={styles.projectNavigator}>
          {Array.from({ length: 7 }, (_, index) => (
            <div key={index} className={styles.projectNavigatorItem} style={{ backgroundColor: selectedProjectIndex === index ? '#631814' : 'rgba(255,255,255,0.7)' }} onClick={() => setSelectedProjectIndex(index)} />
            ))}
        </div>
    </>
  )
}

export default PortfolioHTML
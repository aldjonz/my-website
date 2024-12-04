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

type Props = {}

const PortfolioHTML = (props: Props) => {
  const { currentItem } = useProjectDisplay()
  if (!currentItem) return null
  console.log(currentItem.mediaType)
  let modelType
  return (
    <>
        <div className={styles.blurBg} />
        <div className={styles.container}>
          <div className={styles.innerContainer}> 
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
                  modelType={currentItem.title === 'XRD Domains' ? 'circle' : 'plane'}
                  texturePath={`/portfolio/projects/${currentItem.media[0]}`} 
                  transparent={currentItem.title === 'XRD Domains' ? false : true}
                />
              )}
            </ThreeCanvas>
          </div>
          <div className={styles.innerContainer}>
              <div className={styles.projectDisplay}>
                <div className={styles.info}>
                  <List open={true}>
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
              </div>
          </div>
        </div>
    </>
  )
}

export default PortfolioHTML
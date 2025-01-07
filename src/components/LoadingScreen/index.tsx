import React, { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'
import { useLoading } from '@/context/loadingContext'
import {motion} from 'framer-motion' 

const anim = {
    initial: {
        opacity: 1
    },
    open: (i:number) => ({
        opacity: 1,
        transition: { duration: 0, delay: 0.08 * i}
    }),
    closed: (i:number) => ({
        opacity: 0,
        transition: { duration:0, delay: 0.08 * i }
    })
}

type Props = {}

const LoadingScreen = (props: Props) => {
    const { isLoading } = useLoading()
    const [hideLoading, setHideLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setHideLoading(true)
        }, 3000)
    }, [isLoading])

    const shuffle = (array: any[]) => {
        var j, x, i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    }

    const getBlocks = (columnIndex: number) => {
        if (window) {
            const { innerWidth, innerHeight } = window
            const blockSize = innerWidth * 0.05
            const amountOfBlocks = Math.ceil(innerHeight / blockSize)
            const delays = shuffle([...Array(amountOfBlocks)].map((_, i) => i));
            return delays.map((randomDelay, index) => (
                <motion.div  
                    key={index} 
                    className={styles.block}
                    variants={anim}
                    initial="initial"
                    animate={!hideLoading ? "open" : "closed"}
                    custom={randomDelay + columnIndex}
                ></motion.div>
            ))
        }
    }

    return (
        <div className={styles.loadingScreen} style={{ pointerEvents: hideLoading ? 'none' : 'auto' }}>
            <div className={styles.pixelBackground}>
                {
                    [...Array(20)].map((_, index) => (
                        <div key={index} className={styles.column}>
                            {
                                getBlocks(index)
                            }
                        </div>
                    ))
                }
                    
            </div>
            <div className={styles.loader} style={{ opacity: hideLoading ? 0 : 1, transitionDuration: '0.6s' }}>
                <p className="accent">CROESO</p>
            </div>
        </div>
  )
}

export default LoadingScreen
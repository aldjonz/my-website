import React, { useEffect, useState } from 'react'
import styles from './AnimatedPixelBg.module.css'
import { motion } from 'framer-motion';

const duration = 1;
const delay = 0.8;

const anim = {
    initial: {
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(255,255,255,0)',
    },
    open: (i: number) => ({
        backdropFilter: 'blur(6px)',
        backgroundColor: `rgba(255,255,255,0.1)`,
        transition: {duration: duration, delay: delay * i}
    }),
    closed: (i: number) => ({
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(255,255,255,0)',
        transition: {duration: duration, delay: (delay / 2) * i}
    }),
    hover: {
        backdropFilter: 'blur(6px)',
        transition: { duration: 0.8 }
    }
}

const AnimatedPixelBg = ({ height, width, shouldAnimate }: { height: number, width: number, shouldAnimate: boolean }) => {
    const blockSize = width / 30;
    const [activeBlocks, setActiveBlocks] = useState<number[]>([]);

    function shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    const getBlocks = () => {
        const blockCount = Math.ceil(height / blockSize);
        const delays = shuffle([...Array(blockCount)].map((_, i) => i));
        return delays.map((randomDelay) => {
            return (
                <motion.div
                    className={styles.block}
                    style={{ 
                        height: `${blockSize}px`, 
                        width: `${blockSize}px`,
                    }}
                    variants={anim}
                    initial="initial"
                    animate={activeBlocks.includes(randomDelay) ? "open" : "closed"}
                    whileHover="hover"
                    custom={randomDelay}
                />
            )
        })
    }

    useEffect(() => {
        if (shouldAnimate) {
            const interval = setInterval(() => {
                const blockCount = Math.ceil(height / blockSize) * Math.ceil(width / blockSize);
                const randomBlocks = shuffle([...Array(blockCount)].map((_, i) => i)).slice(0, Math.floor(blockCount / 8));
                setActiveBlocks(randomBlocks);
            }, 300);

            return () => clearInterval(interval);
        }
    }, [height, width, shouldAnimate]);

    return (
        <div className={styles.pixelBackground}>
            {
                [...Array(Math.ceil(width / blockSize))].map((_, index) => {
                    return (
                        <div className={styles.column} style={{ width: `${blockSize}px` }}>
                            {
                                getBlocks()
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AnimatedPixelBg

import React from 'react'
import styles from './LoadingScreen.module.css'
import { useLoading } from '@/context/loadingContext'

type Props = {}

const LoadingScreen = (props: Props) => {
    const { isLoading } = useLoading()

    return (
        <div className={`${styles.loadingScreen} ${!isLoading ? styles.fadeBackground : ''}`}>
            <div style={{ position: "relative" }}>

            <svg width="0" height="0">
                <filter id="gooey-plasma">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"/>
                    <feColorMatrix 
                        in="blur" 
                        mode="matrix" 
                        values="1 0 0 0 0  
                                0 1 0 0 0  
                                0 0 1 0 0  
                                0 0 0 50 -16" 
                        result="goo" 
                    />
                </filter>
            </svg>
            <div className={styles.plasma}>
                <div className={styles.gooeyContainer}>
                    <span className={styles.bubble}></span>
                    <span className={styles.bubble}></span>
                    <span className={styles.bubble}></span>
                    <span className={styles.bubble}></span>
                    <span className={styles.bubble}></span>
                    <span className={styles.bubble}></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoadingScreen
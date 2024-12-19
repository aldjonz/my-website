import React from 'react'
import styles from './HoverText.module.css'
import { email } from '@/constants/constants'

const HoverText = ({title}: {title: string}) => {
  return (
        <div className={styles.Title}>
            <h1>{title}
                <div className={styles.titleHighlight}></div>
            </h1>
            <div className={styles.titleUnderline}></div>
            <div aria-hidden className={styles.titleFilled}>{title}</div>
        </div>
  )
}

export default HoverText
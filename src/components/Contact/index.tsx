import React from 'react'
import styles from './Contact.module.css'
import { email } from '../../constants/constants'
const Contact = () => {
    const title = "drop me a line"
  return (
    <div className={styles.contactContainer}>
        <a href={`mailto:${email}`}>
            <div className={styles.Title}>
                <h1>{title}
                    <div className={styles.titleHighlight}></div>
                </h1>
                <div className={styles.titleUnderline}></div>
                <div aria-hidden className={styles.titleFilled}>{title}</div>
            </div>
        </a>
    </div>
  )
}

export default Contact
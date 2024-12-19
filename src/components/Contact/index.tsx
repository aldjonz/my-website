import React from 'react'
import styles from './Contact.module.css'
import { email } from '../../constants/constants'
import HoverText from '../ui/HoverText'

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
        <a href={`mailto:${email}`}>
            <HoverText title={"Drop me a line"} />
        </a>
    </div>
  )
}

export default Contact
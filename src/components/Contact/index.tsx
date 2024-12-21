import React from 'react'
import styles from './Contact.module.css'
import { email } from '../../constants/constants'
import HoverText from '../ui/HoverText'

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
        <a href={`mailto:${email}`}>
            <HoverText title={"Talk to me"} />
        </a>
    </div>
  )
}

export default Contact
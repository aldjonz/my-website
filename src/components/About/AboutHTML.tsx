import React from 'react'
import styles from './About.module.css'

const aboutText = [
    ["I'm Aled, web and mobile app developer and designer"],
    ["During the COVID-19 lockdown, I seized the opportunity to teach myself programming. In just 9 months, I transformed from a complete beginner to a professional developer, driven by curiosity and perseverance."],
    [
        "I specialize in full-stack development with a creative edge, building apps that seamlessly blend functionality and aesthetics. Leveraging React and Django (or any stack necessary), I craft scalable, engaging experiences for both web and mobile.",
        "I have collaborated with diverse teams to deliver impactful projects."
    ],
    [
        "I believe technology should empower and inspire, transforming ideas into tools that improve lives. This philosophy drives every project I undertake.",
        "For me, success means creating solutions that make a real difference for others."
    ],
    [
        "Have a vision for something amazing?",
        "Let's talk."
    ]
]

const AboutHTML = ({ isExploded, textIndex = 0 }: { isExploded: boolean, textIndex: number }) => {

  return (
    <div className={styles.aboutContainer} style={{ pointerEvents: isExploded ? 'auto' : 'none', opacity: isExploded ? 1 : 0 }}>
        {aboutText.map((text, index) => (
            <div key={index} className={styles.textContainer}>
                {text.map((line, index) => (
                    <p key={index} className={styles.text}>{line}</p>
                ))}
            </div>
        ))}
    </div>
  )
}

export default AboutHTML
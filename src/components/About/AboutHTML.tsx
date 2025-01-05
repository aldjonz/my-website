import React from 'react'
import styles from './About.module.css'
import { email } from '@/constants/constants';

const aboutText = [
    [
        "During the COVID-19 lockdown, I seized the opportunity to teach myself programming.",
        "In just 9 months, I transformed from a complete beginner to a professional developer, driven by curiosity and perseverance."
    ],
    [
        "I specialize in full-stack development with a creative edge, building apps that seamlessly blend functionality and aesthetics. I craft scalable, engaging experiences for both web and mobile.",
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

const AboutHTML = ({ textIndex, isScrolling }: { textIndex: number, isScrolling: boolean }) => {

    return (
        <div 
            className={`${styles.aboutContainer} ${isScrolling ? styles.scrolling : ''}`} 
            style={{ height: `${(aboutText.length + 1) * 100}vh` }}
        >
            <div className={styles.textContainer}>
                <p 
                    className={styles.text + ' ' + styles.introText + ' ' + (textIndex === 0 ? styles.visible : '')}
                >
                    <span>I'm Aled</span><span  className={styles.secondHalf}>, web and mobile app developer and designer</span>
                </p>
            </div>
            {aboutText.map((text, index) => (
                <div key={index} className={styles.textContainer}>
                    {text.map((line, idx) => (
                        <p 
                            key={idx} 
                            onClick={() => {
                                if (line === "Let's talk.") {
                                    window.location.href = `mailto:${email}`;
                                }
                            }}
                            className={styles.text + ' ' + (index + 1 === textIndex ? styles.visible + ' ' + (line === "Let's talk." ? styles.slideIn : '') : '')}
                            style={{ transitionDelay: `${idx * 0.7}s`, textAlign: line.includes("Have a vision") ? 'center' : 'inherit' }}
                        >
                            {line}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default AboutHTML
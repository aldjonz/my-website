import React, { useEffect, useRef, useState } from 'react'
import styles from './About.module.css'

const aboutText = [
    [
        "During the COVID-19 lockdown, I seized the opportunity to teach myself programming.",
        "In just 9 months, I transformed from a complete beginner to a professional developer, driven by curiosity and perseverance."
    ],
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

const AboutHTML = ({ isExploded, }: { isExploded: boolean }) => {
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [textIndex, setTextIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const fraction = scrollPosition / window.innerHeight;
    setTextIndex(Math.floor(fraction))
    
    // Set scrolling state
    setIsScrolling(true);
    
    // Reset after animation duration
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 300) as any;
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(window.scrollTimeout)
    }
  }, [])

  return (
    <div 
      className={`${styles.aboutContainer} ${isScrolling ? styles.scrolling : ''}`} 
      style={{ pointerEvents: isExploded ? 'auto' : 'none', opacity: isExploded ? 1 : 0 }}
    >
        {isExploded && (
            <>
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
                                className={styles.text + ' ' + (index + 1 === textIndex ? styles.visible + ' ' + (line === "Let's talk." ? styles.slideIn : '') : '')}
                                style={{ transitionDelay: `${idx * 0.7}s` }}
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                ))}
            </>
        )}
    </div>
  )
}

export default AboutHTML
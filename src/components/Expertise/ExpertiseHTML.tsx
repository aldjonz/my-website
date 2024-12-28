import React from 'react'
import styles from './Expertise.module.css'
import AnimatedPixelBg from '../ui/AnimatedPixelBg/AnimatedPixelBg';
import { useScreenDetails } from '@/hooks/useScreenDetails';

const expertiseText = [
    {
        title: 'Frontend Development',
        skills: ['HTML', 'CSS', 'TypeScript', 'React', 'React Native', 'Next JS', 'Redux', 'MUI', 'Tailwind', 'Jest', 'Figma', 'Blender', 'Three JS']
    },
    {
        title: 'Backend Development',
        skills: ['Node JS', 'Express', 'Python', 'Django', 'PostgreSQL', 'SQLite', 'Docker', 'AWS']
    },
    {
        title: 'Infrastructure & Delivery',
        skills: ['Git', 'GitHub', 'Vercel', 'AWS', 'App Store Connect Deployment', 'Google Play Console Deployment']
    },
    {
        title: 'AI & ML',
        skills: ['Python',  'OpenCV', 'Pandas', 'Numpy', 'PyTorch', 'TensorFlow', 'Computer Vision', 'ChatGPT Integration']
    },
    {
        title: 'Non-Computer (human) Languages',
        skills: ['English', 'Spanish', 'French', 'Welsh']
    },
]

const Section = ({ textIndex, isLeft, position }: {textIndex: number, isLeft: boolean, position: string}) => { 
    const { isMobile } = useScreenDetails()
    let opacity:number = 0;
    let shouldShow:boolean = false;
    let titleStyles = {}
    let border = {}
    if (position === 'left') {
        opacity = !isLeft ? 1 : 0;
        shouldShow = textIndex > -1 && textIndex % 2 !== 0;
        if (!isMobile) {
            titleStyles = {
                marginLeft: 'auto',
            }
            border = { borderRight: '1px solid white' }
        }
    } else {
        opacity = isLeft ? 1 : 0;
        shouldShow = Boolean(textIndex) && textIndex % 2 === 0 || textIndex === 0;
        if (!isMobile) {
            titleStyles = {
                marginRight: 'auto',
            }
            border = { borderLeft: '1px solid white' }
        }
    }
    
    
    return (
        <div className={styles.sectionContainer} style={{ opacity: opacity, right: position === 'left' || isMobile ? 'auto' : 0 }}>
            <div className={styles.section}>
                {shouldShow ? (
                    <div className={styles.textContainer} style={{ ...border  }}>
                        <h1 className={`accent ${styles.title}`} style={{ ...titleStyles, }}>{expertiseText[textIndex].title}</h1>
                        <div className={styles.skillsContainer} style={{ justifyContent: isMobile ? 'center' : position === 'left' ? 'right' : 'left' }}>
                            {expertiseText[textIndex].skills.map((skill, index) => (
                                <>
                                    <h2 key={index} className={styles.skill}>{skill}</h2>
                                    {index !== expertiseText[textIndex].skills.length - 1 && <h2 className={styles.skillSeparator}>|</h2>}
                                </>
                            ))}
                        </div>
                    </div>
                ) :<></>}
            </div>  
        </div>
)}

const ExpertiseHTML = ({ textIndex }: { textIndex: number }) => {
    return (
        <>
            {/* <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}>
                <AnimatedPixelBg height={window.innerHeight} width={window.innerWidth} shouldAnimate={true} />
            </div> */}
            <div>
                {Array.from({ length: expertiseText.length }, (_, index) => {
                    return (
                        <div style={{ height: '100vh', width: '100vw', scrollSnapAlign: 'start', }} />
                    )
                })}


                <Section textIndex={textIndex} isLeft={textIndex % 2 === 0} position='left'/>
                <Section textIndex={textIndex} isLeft={textIndex % 2 === 0} position='right'/>
            </div>
        </>
    );  
};

export default ExpertiseHTML
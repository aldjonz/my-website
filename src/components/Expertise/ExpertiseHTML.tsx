import React from 'react'
import styles from './Expertise.module.css'
import AnimatedPixelBg from '../ui/AnimatedPixelBg/AnimatedPixelBg';

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
        skills: ['Git', 'GitHub', 'Vercel', 'App Store Connect Deployment', 'Google Play Console Deployment', 'AWS']
    },
    {
        title: 'AI & ML',
        skills: ['Python', 'TensorFlow', 'TensorFlow Lite', 'PyTorch',  'ChatGPT Integration', 'OpenCV', 'Pandas', 'Numpy', 'Computer Vision (Depth-Anything-V2, YOLO)']
    },
    {
        title: 'Non-Computer (human) Languages',
        skills: ['English', 'Spanish', 'French', 'Welsh']
    },
]

const Section = ({ textIndex, isLeft, position }: {textIndex: number, isLeft: boolean, position: string}) => {  
    let opacity:number = 0;
    let shouldShow:boolean = false;
    let titleStyles = {}
    let border = {}
    if (position === 'left') {
        opacity = !isLeft ? 1 : 0;
        shouldShow = textIndex > -1 && textIndex % 2 !== 0;
        titleStyles = {
            marginLeft: 'auto',
        }
        border = { borderRight: '1px solid white' }
    } else {
        opacity = isLeft ? 1 : 0;
        shouldShow = Boolean(textIndex) && textIndex % 2 === 0 || textIndex === 0;
        titleStyles = {
            marginRight: 'auto',
        }
        border = { borderLeft: '1px solid white' }
    }
    
    return (
        <div className={styles.sectionContainer} style={{ opacity: opacity, right: position === 'left' ? 'auto' : 0 }}>
            <div className={styles.section}>
                {shouldShow ? (
                    <div className={styles.textContainer} style={{ ...border  }}>
                        <h1 className={`accent ${styles.title}`} style={{ ...titleStyles, }}>{expertiseText[textIndex].title}</h1>
                        <div className={styles.skillsContainer} style={{ justifyContent: position === 'left' ? 'right' : 'left' }}>
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
            <div style={{ height: `${expertiseText.length * 100}vh` }}>
                <Section textIndex={textIndex} isLeft={textIndex % 2 === 0} position='left'/>
                <Section textIndex={textIndex} isLeft={textIndex % 2 === 0} position='right'/>
            </div>
        </>
    );  
};

export default ExpertiseHTML
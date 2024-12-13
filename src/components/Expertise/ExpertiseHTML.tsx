import React, { useState, useEffect } from 'react'

const expertiseText = [
    {
        title: 'Frontend Development',
        skills: ['TypeScript', 'React', 'React Native', 'Next JS', 'Redux', 'MUI', 'Tailwind', 'Jest']
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
        skills: ['Python', 'TensorFlow', 'TensorFlow Lite', 'PyTorch', 'OpenCV', 'Pandas', 'Numpy', 'Computer Vision (Depth-Anything-V2, YOLO)', 'ChatGPT Integration']
    },
    {
        title: 'Non-Computer (human) Languages',
        skills: ['English', 'Spanish', 'French', 'Welsh']
    },
]

const ExpertiseHTML = ({ isLeft, isExploded }: { isLeft: boolean, isExploded: boolean }) => {

    console.log(isLeft)
  return (
    <>
      <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0,
          width: '50vw', 
          height: `${expertiseText.length * 100}vh`, 
          opacity: !isLeft ? 1 : 0,
          pointerEvents: isExploded ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out',
          
      }}>
          {expertiseText.map((item, index) => (
            <div key={index} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid green', padding: 60 }}>   
                {index % 2 !== 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1>{item.title}</h1>
                        {item.skills.map((skill, index) => (
                            <h2 key={index}>{skill}</h2>
                        ))}
                    </div>
                ) :<></>}
            </div>
          ))}
      </div>
      <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: '50vw',
          width: '50vw', 
          height: `${expertiseText.length * 100}vh`, 
          opacity: isLeft ? 1 : 0,
          pointerEvents: isExploded ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out', 
      }}>
          {expertiseText.map((item, index) => (
            <div key={index} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid green', padding: 60 }}>
                {index % 2 === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1>{item.title}</h1>
                        {item.skills.map((skill, index) => (
                            <h2 key={index}>{skill}</h2>
                        ))}
                    </div>
                ) :<></>}
            </div>  
          ))}
      </div>
    </>
  )
}

export default ExpertiseHTML
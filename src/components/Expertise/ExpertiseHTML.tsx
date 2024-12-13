import React, { useState, useEffect } from 'react'

const expertiseText = [
    {
        title: 'Frontend Development',
    },
    {
        title: 'Backend Development',
    },
    {
        title: 'Infrastructure & Delivery',
    },
    {
        title: 'AI & ML',
    },
    {
        title: 'Non-Computer (human) Languages',
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
          opacity: isLeft ? 0 : 1, 
          pointerEvents: !isExploded || isLeft ? 'none' : 'auto',
          transition: 'opacity 0.5s ease-in-out',
          
      }}>
          {isLeft && expertiseText.map((item, index) => (
            <div key={index} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
                <p>{item.title}</p>
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
          pointerEvents: !isExploded || !isLeft ? 'none' : 'auto',
          transition: 'opacity 0.5s ease-in-out', 
      }}>
          {!isLeft && expertiseText.map((item, index) => (
            <div key={index} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>{item.title}</p>
            </div>  
          ))}
      </div>
    </>
  )
}

export default ExpertiseHTML
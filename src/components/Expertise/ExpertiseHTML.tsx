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

const ExpertiseHTML = ({ isLeft }: { isLeft: boolean }) => {

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
          pointerEvents: isLeft ? 'none' : 'auto',
          transition: 'opacity 0.5s ease-in-out',
          backgroundColor: 'red',
          
      }}>
          {isLeft && expertiseText.map((item, index) => (
            <div key={index} style={{ height: '100vh' }}>   
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
          pointerEvents: isLeft ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out', 
          backgroundColor: 'blue',
      }}>
          {!isLeft && expertiseText.map((item, index) => (
            <div key={index} style={{ height: '100vh' }}>
                <p>{item.title}</p>
            </div>  
          ))}
      </div>
    </>
  )
}

export default ExpertiseHTML
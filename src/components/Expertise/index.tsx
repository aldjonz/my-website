import React, { Suspense, useState, useEffect, useRef } from 'react'
import Title from './Title'

const Expertise = ({ setItemActive, isActive }: { setItemActive: (value: string) => void, isActive: boolean }) => {
  const [textIndex, setTextIndex] = useState(0)
  const handleScroll = () => {
      const scrollPosition = window.scrollY
      const fraction = scrollPosition / window.innerHeight;
      setTextIndex(Math.floor(fraction))
    }
    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])

  return (
    <Suspense fallback={null}>
        <Title 
            isExploded={isActive} 
            isLeft={textIndex % 2 === 0}
            setItemActive={setItemActive}
            shapeIndex={textIndex}
        />
    </Suspense>
  )
}

export default Expertise
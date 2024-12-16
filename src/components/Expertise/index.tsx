import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Title from './Title'
import ExpertiseHTML from './ExpertiseHTML'

const Expertise = ({ setItemActive }: { setItemActive: (value: string) => void }) => {
  const [isExploded, setIsExploded] = useState(false)
  const [isLeft, setIsLeft] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
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
    <>
        {/* <div ref={containerRef} style={{ position: 'relative', overflowY: 'auto', overflowX: 'hidden', height: '100vh', scrollbarWidth: 'none' }}>
            <div style={{ height: '200vh' }}>
                <div style={{ position: 'fixed', height: '100vh', top: 0, left: 0, width: '100vw' }}>
                    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} style={{ position: 'absolute', top: 0, left: 0 }}>
                        <ambientLight intensity={4} />
                        <directionalLight position={[0, 0, 5]} intensity={4} />
                        <directionalLight position={[-5, 0, 0]} intensity={4} /> */}
                        <Suspense fallback={null}>
                            {/* <Center> */}
                                <Title 
                                    isExploded={isExploded} 
                                    setIsExploded={setIsExploded} 
                                    isLeft={textIndex % 2 === 0}
                                    setItemActive={setItemActive}
                                    shapeIndex={textIndex}
                                />
                            {/* </Center> */}
                        </Suspense>
                    {/* </Canvas>
                </div> */}
                {/* <ExpertiseHTML 
                    isLeft={isLeft} 
                    isExploded={isExploded} 
                    textIndex={Math.floor(containerRef.current?.scrollTop / window.innerHeight)}
                /> */}
            {/* </div>
        </div> */}
    </>
  )
}

export default Expertise
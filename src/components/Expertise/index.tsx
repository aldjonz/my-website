import React, { Suspense, useState, useEffect, useRef } from 'react'
import ScrollableScene from './ScrollableScene'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Title from './Title'
import ExpertiseHTML from './ExpertiseHTML'

const Expertise = () => {
  const [isExploded, setIsExploded] = useState(false)
  const [isLeft, setIsLeft] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    // if (scrollY % 300 === 0)
    console.log(containerRef.current?.scrollTop)
    setIsLeft(containerRef.current?.scrollTop % window.innerHeight * 2 < window.innerHeight)
  }

  useEffect(() => {
    containerRef.current?.addEventListener('scroll', handleScroll)
    return () => containerRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
        <div ref={containerRef} style={{ position: 'relative', overflowY: 'auto', overflowX: 'hidden', height: '100vh' }}>
            <div style={{ position: 'fixed', height: '100vh', top: 0, left: 0 }}>
                <div style={{ position: 'relative', height: '100vh', width: '100vw', }}>

                    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} style={{ position: 'absolute', top: 0, left: 0, }}>
                        <ambientLight intensity={4} />
                        <directionalLight position={[0, 0, 5]} intensity={4} />
                        <directionalLight position={[-5, 0, 0]} intensity={4} />
                        {/* <OrbitControls 
                            enablePan={true}
                            enableZoom={true}
                            enableRotate={true}
                            panSpeed={0.5}
                            rotateSpeed={0.5}
                        /> */}
                        <Suspense fallback={null}>
                            <Center>
                                <Title isExploded={isExploded} setIsExploded={setIsExploded} isLeft={isLeft} />
                            </Center>
                        </Suspense>
                    </Canvas>
                </div>

            </div>
            <ExpertiseHTML isLeft={isLeft} />
        </div>
    </>
  )
}

export default Expertise
"use client"

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Center, OrbitControls, Plane } from '@react-three/drei'
import dynamic from 'next/dynamic'
import PortfolioHTML from './PortfolioHTML'

const Title = dynamic(() => import('./Title'), { ssr: false })
const CentralSphere = dynamic(() => import('./CentralSphere'), { ssr: false })
const Projects = dynamic(() => import('./Projects'), { ssr: false })

export default function Portfolio() {
    const [isExploded, setIsExploded] = useState(false)
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<null | number>(null)

    return (
        <>
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', marginTop: '0', backgroundColor: '#000000' }}>
                <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} style={{ position: 'absolute', top: 0, left: 0, }}>
                    <ambientLight intensity={4} />
                    <directionalLight position={[0, 0, 5]} intensity={4} />
                    <directionalLight position={[-5, 0, 0]} intensity={4} />
                    <OrbitControls 
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        panSpeed={0.5}
                        rotateSpeed={0.5}
                    />
                    <Suspense fallback={null}>
                        <Center>
                            <Title 
                                isExploded={isExploded}
                                setIsExploded={setIsExploded}
                            />
                            <CentralSphere />
                            <Projects 
                                isExploded={isExploded}
                                setSelectedProjectIndex={setSelectedProjectIndex}
                            />
                        </Center>
                    </Suspense>
                </Canvas>
            </div>
            <PortfolioHTML 
                selectedProjectIndex={selectedProjectIndex}
                setSelectedProjectIndex={setSelectedProjectIndex}
            />
        </>
    )
}

"use client"

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Center, OrbitControls, Plane } from '@react-three/drei'
import dynamic from 'next/dynamic'
import AboutHTML from './AboutHTML'

const Title = dynamic(() => import('./Title'), { ssr: false })

export default function About({ setItemActive }: { setItemActive: (value: string) => void }) {
    const [isExploded, setIsExploded] = useState(false)

    return (
        <>
            {/* <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', marginTop: '0', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
                <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} style={{ position: 'absolute', top: 0, left: 0, }}>
                    <ambientLight intensity={4} />
                    <directionalLight position={[0, 0, 5]} intensity={4} />
                    <directionalLight position={[-5, 0, 0]} intensity={4} /> */}
                    <Suspense fallback={null}>
                        {/* <Center> */}
                            <Title 
                                isExploded={isExploded}
                                setIsExploded={setIsExploded}
                                setItemActive={setItemActive}
                            />
                        {/* </Center> */}
                    </Suspense>
                {/* </Canvas>
            </div> */}
            {/* <AboutHTML isExploded={isExploded} /> */}
        </>
    )
}

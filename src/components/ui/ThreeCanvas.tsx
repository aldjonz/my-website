"use client"

import { Center, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function ThreeCanvas({ children }: { children: React.ReactNode }) {
    return (
        <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} >
            {/* <ambientLight intensity={0.2} /> */}
            <directionalLight position={[0, 0, 1]} intensity={1}  />
            {/* <directionalLight position={[0, 0, -5]} intensity={1} /> */}
            <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                panSpeed={0.5}
                rotateSpeed={0.5}
            />
            <Suspense fallback={null}>
                <Center>
                    {children}
                </Center>
            </Suspense>
        </Canvas>
    )
}
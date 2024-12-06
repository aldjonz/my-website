"use client"

import { Center, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function ThreeCanvas({ style, children }: { style?: React.CSSProperties, children: React.ReactNode }) {
    return (
        <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} style={style} >
            <ambientLight intensity={4} />
            <OrbitControls 
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                panSpeed={0.5}
                rotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
                maxAzimuthAngle={-0.3}
                minAzimuthAngle={-Math.PI / 6}
            />
            <Suspense fallback={null}>
                <Center>
                    {children}
                </Center>
            </Suspense>
        </Canvas>
    )
}
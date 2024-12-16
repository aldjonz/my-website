import React, { useRef, useState } from 'react'
import Portfolio from '../Portfolio'
import About from '../About'
import Expertise from '../Expertise'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

const AnimatedGroups = () => {
    const topGroupRef = useRef<Group>(null)
    const middleGroupRef = useRef<Group>(null)
    const bottomGroupRef = useRef<Group>(null)
    const [timer, setTimer] = useState(0)

    const topPosition = [0, 1.6, 0]
    const middlePosition = [0.3, -1, 0]
    const bottomPosition = [-0.2, -2.2, 0]

    const startX = 15

    useFrame((state, delta) => {
        setTimer(prev => prev + delta)

        // Top group starts immediately
        if (topGroupRef.current && timer > 0.8) {
            topGroupRef.current.position.x += ((topPosition[0] - topGroupRef.current.position.x) * 0.3)
            topGroupRef.current.position.y += ((topPosition[1] - topGroupRef.current.position.y) * 0.3)
        }

        // Middle group starts after 0.5 seconds
        if (middleGroupRef.current && timer > 1.1) {
            middleGroupRef.current.position.x += ((middlePosition[0] - middleGroupRef.current.position.x) * 0.3)
            middleGroupRef.current.position.y += ((middlePosition[1] - middleGroupRef.current.position.y) * 0.3)
        }

        // Bottom group starts after 1 second
        if (bottomGroupRef.current && timer > 1.4) {
            bottomGroupRef.current.position.x += ((bottomPosition[0] - bottomGroupRef.current.position.x) * 0.3)
            bottomGroupRef.current.position.y += ((bottomPosition[1] - bottomGroupRef.current.position.y) * 0.3)
        }
    })

    return (
        <>
            <group 
                ref={topGroupRef}
                position={[-startX,  topPosition[1] - 2, 0]} 
                rotation={[0, 0.15, 0.1]}
            >
                <About />
            </group>

            <group 
                ref={middleGroupRef}
                position={[startX, middlePosition[1] - 2, 0]} 
                rotation={[0, -0.15, -0.1]}
            >
                <Portfolio />
            </group>

            <group 
                ref={bottomGroupRef}
                position={[-startX, bottomPosition[1] - 2, 0]} 
                rotation={[0, 0.15, 0.01]}
            >
                <Expertise />
            </group>
        </>
    )
}

export default AnimatedGroups
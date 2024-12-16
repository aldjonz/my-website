import React, { useRef, useState } from 'react'
import Portfolio from '../Portfolio'
import About from '../About'
import Expertise from '../Expertise'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

const AnimatedGroups = ({ itemActive, setItemActive }: { itemActive: string | null, setItemActive: (value: string | null) => void }) => {
    const topGroupRef = useRef<Group>(null)
    const middleGroupRef = useRef<Group>(null)
    const bottomGroupRef = useRef<Group>(null)
    const [timer, setTimer] = useState(0)

    const topPosition = [0, 1.6, 0]
    const middlePosition = [0.3, 0, 0]
    const bottomPosition = [-0.2, -2.2, 0]

    const startX = 15

    const animateActiveItem = (group: Group, group1: Group, group2: Group, group1Y: number, group2Y: number) => {
        group.current.position.x += (0 - group.current.position.x) * 0.1;
        group.current.position.y += (0 - group.current.position.y) * 0.1;
        group.current.rotation.x += (0 - group.current.rotation.x) * 0.1;
        group.current.rotation.y += (0 - group.current.rotation.y) * 0.1;
        group.current.rotation.z += (0 - group.current.rotation.z) * 0.1;

        // Animate others out of view
        group1.current.position.y += (group1Y - group1.current.position.y) * 0.1;
        group2.current.position.y += (group2Y - group2.current.position.y) * 0.1;
    }

    useFrame((state, delta) => {
        setTimer(prev => prev + delta)

        if (!itemActive) {
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
        } else {
            if (itemActive === 'about') {
                // Animate top group to center
                animateActiveItem(topGroupRef, middleGroupRef, bottomGroupRef, -15, -15)
            } else if (itemActive === 'portfolio') {
                // Animate middle group to center
                animateActiveItem(middleGroupRef, topGroupRef, bottomGroupRef, 15, -15)
            } else if (itemActive === 'expertise') {
                // Animate bottom group to center
                animateActiveItem(bottomGroupRef, topGroupRef, middleGroupRef, 15, 15)
            }
        }


    })

    return (
        <>
            <group 
                ref={topGroupRef}
                position={[-startX,  topPosition[1] - 2, 0]} 
                rotation={[0, 0.15, 0.1]}
            >
                <About setItemActive={setItemActive} />
            </group>

            <group 
                ref={middleGroupRef}
                position={[startX, middlePosition[1] - 2, 0]} 
                rotation={[0, -0.15, -0.1]}
            >
                <Portfolio setItemActive={setItemActive} />
            </group>

            <group 
                ref={bottomGroupRef}
                position={[-startX, bottomPosition[1] - 2, 0]} 
                rotation={[0, 0.15, 0.01]}
            >
                <Expertise setItemActive={setItemActive} />
            </group>
        </>
    )
}

export default AnimatedGroups
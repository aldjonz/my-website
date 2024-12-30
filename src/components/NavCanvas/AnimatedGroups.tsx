import React, { useRef, useState } from 'react'
import Portfolio from '../Portfolio'
import About from '../About'
import Expertise from '../Expertise'
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'
import { useScreenDetails } from '@/hooks/useScreenDetails'

const AnimatedGroups = ({ itemActive, setItemActive, textIndex }: { itemActive: string | null, setItemActive: (value: string | null) => void, textIndex: number  }) => {
    const topGroupRef = useRef<Group | null>(null)
    const middleGroupRef = useRef<Group | null>(null)
    const bottomGroupRef = useRef<Group | null>(null)
    const [timer, setTimer] = useState(0)
    const { isMobile } = useScreenDetails()
    const scaleFactor = isMobile ? 2 : -2
    const yFactor = isMobile ? 1.8 : 1
    const mobileRotation = [0,0,0]
    const topPosition = [0, (1.6 / yFactor), 0]
    const middlePosition = [isMobile ? 0 : 0.3, 0, 0]
    const bottomPosition = [isMobile ? 0 : -0.2, (-2.2 / yFactor), 0]

    const startX = 15

    const { viewport } = useThree()
    const scale = Math.min(1, viewport.width / 16)

    const animateActiveItem = (group: Group | null, group1: Group | null, group2: Group | null, group1Y: number, group2Y: number) => {
        if (group && group1 && group2) {
            group.position.x += (0 - group.position.x) * 0.1;
            group.position.y += (0 - group.position.y) * 0.1;
            group.rotation.x += (0 - group.rotation.x) * 0.1;
            group.rotation.y += (0 - group.rotation.y) * 0.1;
            group.rotation.z += (0 - group.rotation.z) * 0.1;

            // Animate others out of view
            group1.position.y += (group1Y - group1.position.y) * 0.1;
            group2.position.y += (group2Y - group2.position.y) * 0.1;
        }
    }

    useFrame((state, delta) => {
        if (timer < 1.4) {
            setTimer(prev => prev + delta)
        }

        if (!itemActive) {
            state.camera.position.lerp(new Vector3(0, 0, 5), 0.1)
            state.camera.lookAt(0, 0, 0)

            if (topGroupRef.current && timer > 0.8) {
                topGroupRef.current.position.x += ((topPosition[0] - topGroupRef.current.position.x) * 0.3)
                topGroupRef.current.position.y += ((topPosition[1] - topGroupRef.current.position.y) * 0.3)
                topGroupRef.current.scale.x += (scale - topGroupRef.current.scale.x) * 0.1;
                topGroupRef.current.scale.y += (scale - topGroupRef.current.scale.y) * 0.1;
                topGroupRef.current.scale.z += (scale - topGroupRef.current.scale.z) * 0.1;
                const rotation = isMobile ? mobileRotation : [0, 0.15, 0.01]
                topGroupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
            }

            if (middleGroupRef.current && timer > 1.1) {
                middleGroupRef.current.position.x += ((middlePosition[0] - middleGroupRef.current.position.x) * 0.3)
                middleGroupRef.current.position.y += ((middlePosition[1] - middleGroupRef.current.position.y) * 0.3)
                middleGroupRef.current.position.z += ((middlePosition[2] - middleGroupRef.current.position.z) * 0.3)
                const rotation = isMobile ? mobileRotation : [0, -0.15, 0.01]
                middleGroupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
                middleGroupRef.current.scale.x += (scale - middleGroupRef.current.scale.x) * 0.1;
                middleGroupRef.current.scale.y += (scale - middleGroupRef.current.scale.y) * 0.1;
                middleGroupRef.current.scale.z += (scale - middleGroupRef.current.scale.z) * 0.1;   
            }

            if (bottomGroupRef.current && timer > 1.4) {
                bottomGroupRef.current.position.x += ((bottomPosition[0] - bottomGroupRef.current.position.x) * 0.3)
                bottomGroupRef.current.position.y += ((bottomPosition[1] - bottomGroupRef.current.position.y) * 0.3)
                bottomGroupRef.current.position.z += ((bottomPosition[2] - bottomGroupRef.current.position.z) * 0.3)
                bottomGroupRef.current.scale.x += (scale - bottomGroupRef.current.scale.x) * 0.1;
                bottomGroupRef.current.scale.y += (scale - bottomGroupRef.current.scale.y) * 0.1;
                bottomGroupRef.current.scale.z += (scale - bottomGroupRef.current.scale.z) * 0.1;
                const rotation = isMobile ? mobileRotation : [0, 0.15, 0.01]
                bottomGroupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
            }
        } else {
            if (itemActive === 'about') {
                animateActiveItem(topGroupRef.current, middleGroupRef.current, bottomGroupRef.current, -15, -15)
                if (topGroupRef.current) {
                    topGroupRef.current.scale.x += (scale - topGroupRef.current.scale.x) * 0.1;
                    topGroupRef.current.scale.y += (scale - topGroupRef.current.scale.y) * 0.1;
                    topGroupRef.current.scale.z += (scale - topGroupRef.current.scale.z) * 0.1;
                }
            } else if (itemActive === 'portfolio') {
                animateActiveItem(middleGroupRef.current, topGroupRef.current, bottomGroupRef.current, 15, -15)
                if (middleGroupRef.current && middleGroupRef.current.position.z > -4) {
                    middleGroupRef.current.position.z += (scaleFactor - middleGroupRef.current.position.z) * 0.1;
                    if (topGroupRef.current) {
                        topGroupRef.current.scale.x += (0.001 - topGroupRef.current.scale.x) * 0.1;
                        topGroupRef.current.scale.y += (0.001 - topGroupRef.current.scale.y) * 0.1;
                        topGroupRef.current.scale.z += (0.001 - topGroupRef.current.scale.z) * 0.1;
                    }
                    if (bottomGroupRef.current) {
                        bottomGroupRef.current.scale.x += (0.001 - bottomGroupRef.current.scale.x) * 0.1;
                        bottomGroupRef.current.scale.y += (0.001 - bottomGroupRef.current.scale.y) * 0.1;
                        bottomGroupRef.current.scale.z += (0.001 - bottomGroupRef.current.scale.z) * 0.1;
                    }
                }
            } else if (itemActive === 'expertise') {
                animateActiveItem(bottomGroupRef.current, topGroupRef.current, middleGroupRef.current, 15, 15)
                if (bottomGroupRef.current) {
                    bottomGroupRef.current.scale.x += (scale - bottomGroupRef.current.scale.x) * 0.1;
                    bottomGroupRef.current.scale.y += (scale - bottomGroupRef.current.scale.y) * 0.1;
                    bottomGroupRef.current.scale.z += (scale - bottomGroupRef.current.scale.z) * 0.1;
                }
            }
        }
    })

    const handlePointerOver = (group: Group | null) => {
        if (group && itemActive === null) {
            document.body.style.cursor = 'pointer';
        }
    }

    const handlePointerOut = (group: Group | null) => {
        if (group) {
            document.body.style.cursor = 'default';
        }
    }

    const handleClick = (event: ThreeEvent<MouseEvent>, group: string) => {
        event.stopPropagation()
        window.location.hash = group
    }

    return (
        <>
            <group 
                ref={topGroupRef}
                position={[-startX,  topPosition[1] - 2, 0]} 
                rotation={[0, 0.15, 0.1]}
                onPointerOver={() => handlePointerOver(topGroupRef.current)}
                onPointerOut={() => handlePointerOut(topGroupRef.current)}
                onClick={(e) => handleClick(e, 'about')}
            >
                <About setItemActive={setItemActive} isActive={itemActive === 'about'} textIndex={textIndex}  />
            </group>

            <group 
                ref={middleGroupRef}
                position={[startX, middlePosition[1] - 2, 0]} 
                rotation={[0, -0.15, -0.1]}
                onPointerOver={() => handlePointerOver(middleGroupRef.current)}
                onPointerOut={() => handlePointerOut(middleGroupRef.current)}
                onClick={(e) => handleClick(e, 'portfolio')}
            >
                <Portfolio setItemActive={setItemActive} isActive={itemActive === 'portfolio'} scaleFactor={scaleFactor} />
            </group>

            <group 
                ref={bottomGroupRef}
                position={[-startX, bottomPosition[1] - 2, 0]} 
                rotation={[0, 0.15, 0.01]}
                onPointerOver={() => handlePointerOver(bottomGroupRef.current)}
                onPointerOut={() => handlePointerOut(bottomGroupRef.current)}
                onClick={(e) => handleClick(e, 'expertise')}
            >
                <Expertise setItemActive={setItemActive} isActive={itemActive === 'expertise'} textIndex={textIndex} />
            </group>
        </>
    )
}

export default AnimatedGroups
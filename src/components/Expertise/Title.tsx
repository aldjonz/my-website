"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useSpring, animated } from '@react-spring/three'

export default function Title({ isExploded, setIsExploded, isLeft, shapeIndex }: { isExploded: boolean, setIsExploded: (value: boolean) => void, isLeft: boolean, shapeIndex: number }) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/Expertise/expertise.glb')
    const [scrollPosition, setScrollPosition] = useState(0)


    const allCells = scene.children
        .filter(child => child.name.includes('Text_cell'))
        .map((cell) => {
            const mesh = cell as Mesh;
            return mesh;
        });

    // Update scroll position
    const handleScroll = () => {
        setScrollPosition(window.scrollY)
    }

    // Use react-spring to animate the camera position
    const { cameraX } = useSpring({
        cameraX: isLeft ? 4 : -4,
        config: { mass: 1, tension: 170, friction: 100 },
    })

    // Update shape index on isLeft change
    useEffect(() => {
        if (group.current) {
            group.current.rotation.y = 0
        }
    }, [isLeft]);

    console.log(shapeIndex)
    useFrame((state) => {
        if (isExploded) {

            const time = state.clock.getElapsedTime();
    
            // Apply slow rotation to the entire group
            if (group.current && shapeIndex !== 2) {
                group.current.rotation.y += 0.0003; // Adjust rotation speed as needed
            }
    
                const camera = state.camera
                camera.position.x = cameraX.get()
                camera.updateProjectionMatrix()
        
                allCells.forEach((cell, index) => {
                    if (isExploded) {
                        const offset = scrollPosition * 0.001;
                        let targetPos;
        
                        switch (shapeIndex) {
                            case 0: // Square
                                const side = Math.ceil(Math.sqrt(allCells.length));
                                const x = (index % side) - side / 2;
                                const y = Math.floor(index / side) - side / 2;
                                targetPos = new Vector3(x, y, 0);
                                break;
                            case 1: // Spiral
                                const spiralAngle = index * 0.1;
                                const spiralRadius = 0.5 + index * 0.05;
                                targetPos = new Vector3(
                                    Math.cos(spiralAngle) * spiralRadius,
                                    Math.sin(spiralAngle) * spiralRadius,
                                    -index * 0.1
                                );
                                break;
                            case 2: // Cube
                                const cubeSide = Math.cbrt(allCells.length);
                                const cx = (index % cubeSide) - cubeSide / 2;
                                const cy = (Math.floor(index / cubeSide) % cubeSide) - cubeSide / 2;
                                const cz = (Math.floor(index / (cubeSide * cubeSide)) - cubeSide / 2) - 3;
                                targetPos = new Vector3(cx, cy, cz);
                                break;
         
                            case 3: // Cylinder
                                const angle = (index / allCells.length) * Math.PI * 2;
                                const radius = 2;
                                targetPos = new Vector3(
                                    Math.cos(angle) * radius,
                                    (index % 10) - 5, // Adjust height as needed
                                    (Math.sin(angle) * radius) - 3
                                );
                                break;
                            case 4: // Zigzag Cone
                                const coneHeight = 5;
                                const coneRadius = (coneHeight - (index % coneHeight)) * 0.5;
                                const coneAngle = (index / allCells.length) * Math.PI * 2;
                                const zigzagFactor = Math.sin(index * 0.5) * 0.5; // Adjust zigzag frequency and amplitude
                                targetPos = new Vector3(
                                    Math.cos(coneAngle) * (coneRadius + zigzagFactor),
                                    (index % coneHeight) - coneHeight / 2,
                                    (Math.sin(coneAngle) * (coneRadius + zigzagFactor) - 3)
                                );
                                break;
                            default:
                                targetPos = new Vector3(0, 0, 0);
                        }
        
                        // Add floating effect
                        const floatOffset = Math.sin(time + index) * 0.1; // Adjust amplitude as needed
                        targetPos.y += floatOffset;
        
                    cell.position.lerp(targetPos, 0.03);
                }
            }); 
        }
    })

    // Add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!scene) return null

    return (
        <group 
            ref={group}
            onClick={(e) => {
                e.stopPropagation()
                setIsExploded(!isExploded) // Toggle the exploded state
            }}
        >
            <AnimatedTextWrapper scene={scene}>
                <primitive object={scene} />
            </AnimatedTextWrapper>
        </group>
    )
}

useGLTF.preload('/Expertise/expertise.glb')
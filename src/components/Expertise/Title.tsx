"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useSpring, animated } from '@react-spring/three'

export default function Title({ isExploded, setIsExploded, isLeft }: { isExploded: boolean, setIsExploded: (value: boolean) => void, isLeft: boolean }) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/Expertise/expertise.glb')
    const [scrollPosition, setScrollPosition] = useState(0)
    const [shapeIndex, setShapeIndex] = useState(-1);

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
        setShapeIndex((prevIndex) => (prevIndex + 1) % 4);
    }, [isLeft]);

    console.log(shapeIndex)
    useFrame((state) => {
        if (isExploded) {

            const time = state.clock.getElapsedTime();
    
            // Apply slow rotation to the entire group
            if (group.current && shapeIndex !== 2) {
                group.current.rotation.y += 0.001; // Adjust rotation speed as needed
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
                            case 1: // Cube
                                const cubeSide = Math.cbrt(allCells.length);
                                const cx = (index % cubeSide) - cubeSide / 2;
                                const cy = (Math.floor(index / cubeSide) % cubeSide) - cubeSide / 2;
                                const cz = Math.floor(index / (cubeSide * cubeSide)) - cubeSide / 2;
                                targetPos = new Vector3(cx, cy, cz);
                                break;
                            case 2: // Spiral
                                const spiralAngle = index * 0.1;
                                const spiralRadius = 0.5 + index * 0.05;
                                targetPos = new Vector3(
                                    Math.cos(spiralAngle) * spiralRadius,
                                    Math.sin(spiralAngle) * spiralRadius,
                                    -index * 0.1
                                );
                                break;
                            case 3: // Pyramid
                                const pyramidHeight = Math.floor(Math.sqrt(index));
                                const pyramidX = (index % (pyramidHeight + 1)) - pyramidHeight / 2;
                                const pyramidY = pyramidHeight - index / (pyramidHeight + 1);
                                targetPos = new Vector3(pyramidX, pyramidY, pyramidHeight / 2);
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
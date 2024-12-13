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

    useFrame((state) => {
        const camera = state.camera
        camera.position.x = cameraX.get()
        camera.updateProjectionMatrix()

        allCells.forEach((cell, index) => {
            if (isExploded) {
                // Example transformation based on scroll position
                const offset = scrollPosition * 0.01
                const x = Math.sin(offset + index) * 2
                const y = Math.cos(offset + index) * 2
                const targetPos = new Vector3(x, y, 0)
                cell.position.lerp(targetPos, 0.03)

            } 
        })
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
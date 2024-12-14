"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Group, Mesh, Vector3 } from 'three'

export default function Title({ isExploded, setIsExploded, isLeft }: { isExploded: boolean, setIsExploded: (value: boolean) => void, isLeft: boolean }) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/about/about.glb')
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
    // const cameraX = useSpring(isLeft ? 4 : -4, {
    //     mass: 1,
    //     stiffness: 170,
    //     damping: 100
    // })

    useFrame((state) => {
        const camera = state.camera
        // camera.position.x = cameraX.get()
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


useGLTF.preload('/about/about.glb')
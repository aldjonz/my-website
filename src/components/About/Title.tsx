"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState, useMemo } from 'react'
import { Group, Mesh, Vector3 } from 'three'

const ANIMATION_CONSTANTS = {
    SCROLL_VELOCITY_MULTIPLIER: 0.001,
    OFFSET_MULTIPLIER: 0.01,
    BASE_LERP_SPEED: 0.03,
    MAX_LERP_SPEED: 0.1,
    ROTATION_SPEED: 0.002,
    POSITION_MULTIPLIER: 2
}

export default function Title({ isExploded, setItemActive }: { isExploded: boolean, setItemActive: (value: string) => void }) {
    const group = useRef<Group>(null)
    const originalGroupRotation = useRef(new Vector3(0, 0, 0))
    const { scene } = useGLTF('/about/about.glb')
    const scrollRef = useRef(0)
    const lastScrollRef = useRef(0)
    const targetPositions = useRef<Vector3[]>([])

    const allCells = useMemo(() => 
        scene.children
            .filter(child => child.name.includes('Text_cell'))
            .map((cell) => {
                const mesh = cell as Mesh;
                mesh.userData.originalPosition = cell.position.clone()
                mesh.userData.originalRotation = cell.rotation.clone()
                return mesh;
            }),
        [scene]
    )

    useEffect(() => {
        let ticking = false
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    lastScrollRef.current = scrollRef.current
                    scrollRef.current = window.scrollY
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        targetPositions.current = allCells.map(() => new Vector3())
    }, [allCells])

    useEffect(() => {
        if (group.current) {
            originalGroupRotation.current.copy(group.current.rotation)
        }
    }, [])

    useFrame((state, delta) => {
        if (isExploded) {
            const calculatedScrollVelocity = (scrollRef.current - lastScrollRef.current) * ANIMATION_CONSTANTS.SCROLL_VELOCITY_MULTIPLIER
            let scrollVelocity = 0.02
            if (calculatedScrollVelocity < 0.02 && calculatedScrollVelocity > -0.02) {
                scrollVelocity = calculatedScrollVelocity
            }
            const offset = scrollRef.current * ANIMATION_CONSTANTS.OFFSET_MULTIPLIER
            const lerpSpeed = Math.min(
                ANIMATION_CONSTANTS.BASE_LERP_SPEED + Math.abs(scrollVelocity) * ANIMATION_CONSTANTS.SCROLL_VELOCITY_MULTIPLIER,
                ANIMATION_CONSTANTS.MAX_LERP_SPEED
            )
    
            allCells.forEach((cell, index) => {
                const angle = offset + index
                const x = Math.sin(angle) * ANIMATION_CONSTANTS.POSITION_MULTIPLIER
                const y = Math.cos(angle) * ANIMATION_CONSTANTS.POSITION_MULTIPLIER
                
                targetPositions.current[index].set(x, y, 0)
                cell.position.lerp(targetPositions.current[index], lerpSpeed)
            })
    
            if (group.current) {
                group.current.rotation.z += ANIMATION_CONSTANTS.ROTATION_SPEED
            }
        } else {
            allCells.forEach((cell, index) => {
                const x = cell.userData.originalPosition.x
                const y = cell.userData.originalPosition.y
                const z = cell.userData.originalPosition.z
                
                const targetPos = new Vector3(x, y, z)
                cell.position.lerp(targetPos, 0.08)
                cell.rotation.set(cell.userData.originalRotation.x, cell.userData.originalRotation.y, cell.userData.originalRotation.z)
            })
            if (group.current) {
                group.current.rotation.set(originalGroupRotation.current.x, originalGroupRotation.current.y, originalGroupRotation.current.z)
            }
        }

    })

    if (!scene) return null

    return (
        <group 
            ref={group}
            onClick={(e) => {
                e.stopPropagation()
                setItemActive('about')
            }}
        >
            <AnimatedTextWrapper scene={scene}>
                <primitive object={scene} />
            </AnimatedTextWrapper>
        </group>
    )
}

useGLTF.preload('/about/about.glb')
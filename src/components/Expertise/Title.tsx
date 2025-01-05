"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Group, Mesh, Vector3, MathUtils } from 'three'
import { useSpring, animated } from '@react-spring/three'
import { useScreenDetails } from '@/hooks/useScreenDetails'

export default function Title({ isExploded, isLeft, shapeIndex, setItemActive }: { isExploded: boolean, isLeft: boolean, shapeIndex: number, setItemActive: (value: string) => void }) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/Expertise/expertise.glb')
    const { isMobile } = useScreenDetails()

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

    const { rotation } = useSpring({
        rotation: isLeft ? Math.PI : 0,
        config: { mass: 1, tension: 60, friction: 16 }
    })

    useEffect(() => {
        if (group.current) {
            group.current.rotation.y = 0
        }
    }, [isLeft]);

    useFrame((state) => {
        if (isExploded) {
            const time = state.clock.getElapsedTime();
            const { width: viewportWidth, height: viewportHeight } = state.viewport
            
            const totalCells = allCells.length
            const aspectRatio = viewportWidth / viewportHeight
            
            let cols, rows
            if (aspectRatio > 1) {
                rows = Math.floor(Math.sqrt(totalCells / aspectRatio))
                cols = Math.ceil(totalCells / rows)
            } else {
                cols = Math.floor(Math.sqrt(totalCells * aspectRatio))
                rows = Math.ceil(totalCells / cols)
            }

            while (rows * cols < totalCells) {
                if (aspectRatio > 1) {
                    cols++
                } else {
                    rows++
                }
            }

            allCells.forEach((cell, index) => {
                const col = index % cols
                const row = Math.floor(index / cols)
                
                const targetPos = new Vector3(
                    (col - (cols - 1) / 2) / ((viewportWidth * 1.2) / (cols)),
                    (-row + (rows - 1) / 2) / ((viewportHeight * 1.4) / (rows)),
                    0
                )

                const floatOffset = Math.sin(time + index) * 0.1
                targetPos.y += floatOffset

                cell.position.lerp(targetPos, 0.03)
                cell.rotation.y = rotation.get()
            })
        } else {
            allCells.forEach((cell, index) => {
                const x = cell.userData.originalPosition.x
                const y = cell.userData.originalPosition.y
                const z = cell.userData.originalPosition.z
                
                const targetPos = new Vector3(x, y, z)
                cell.position.lerp(targetPos, 0.08)
            })
            
        }
    })
    
    if (!scene) return null

    return (
        <group ref={group}>
            <AnimatedTextWrapper scene={scene}>
                <primitive object={scene} />
            </AnimatedTextWrapper>
        </group>
    )
}

useGLTF.preload('/Expertise/expertise.glb')
"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { Group, Mesh, Vector3 } from 'three'

export default function Title({ isExploded, setItemActive }: { isExploded: boolean, setItemActive: (value: string) => void }) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/portfolio/portfolio.glb')
    const orbitRadius = 3

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

    allCells.forEach((cell, index) => {
        const phi = Math.acos(-1 + (2 * index) / allCells.length)
        const theta = Math.PI * (1 + Math.sqrt(5)) * index
        
        cell.userData.orbitPhi = phi
        cell.userData.orbitTheta = theta
        cell.userData.orbitSpeed = 0.05 + Math.random() * 0.3
    })

    useFrame((state) => {
        if (isExploded) {
            allCells.forEach((cell, index) => {
                cell.userData.orbitTheta += cell.userData.orbitSpeed * 0.01
                
                const x = orbitRadius * Math.sin(cell.userData.orbitPhi) * Math.cos(cell.userData.orbitTheta)
                const y = orbitRadius * Math.sin(cell.userData.orbitPhi) * Math.sin(cell.userData.orbitTheta)
                const z = orbitRadius * Math.cos(cell.userData.orbitPhi)
                
                const targetPos = new Vector3(x, y, z)
                cell.position.lerp(targetPos, 0.03)
                
                cell.lookAt(0, 0, 0)
                cell.rotateY(Math.PI)
            })
        } else {
            allCells.forEach((cell, index) => {
                const x = cell.userData.originalPosition.x
                const y = cell.userData.originalPosition.y
                const z = cell.userData.originalPosition.z
                
                const targetPos = new Vector3(x, y, z)
                cell.position.lerp(targetPos, 0.08)
                
                cell.rotation.set(
                    cell.userData.originalRotation.x, 
                    cell.userData.originalRotation.y, 
                    cell.userData.originalRotation.z
                )
            })
            
            // state.camera.position.lerp(new Vector3(0, 0, 5), 0.1)
            state.camera.lookAt(0, 0, 0)
        }
    })

    if (!scene) return null

    return (
        <group 
            ref={group}
            onClick={(e) => {
                e.stopPropagation()
                setItemActive('portfolio')
            }}
        >
            <AnimatedTextWrapper scene={scene}>
                <primitive object={scene} />
            </AnimatedTextWrapper>
        </group>
    )
}

useGLTF.preload('/portfolio/portfolio.glb')
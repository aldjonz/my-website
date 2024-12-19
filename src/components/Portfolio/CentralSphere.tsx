"use client"

import { useGLTF } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { Group, Mesh, MeshPhysicalMaterial, TextureLoader } from 'three'

export default function CentralSphere({ imgPath }: { imgPath: string }) {
    const { scene } = useGLTF('/portfolio/glass-sphere.glb')

    const clonedScene = useMemo(() => {
        const clonedScene = scene.clone()
        const textureLoader = new TextureLoader()
        const texture = textureLoader.load(imgPath)
        
        clonedScene.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = new MeshPhysicalMaterial({
                    roughness: 0,
                    transmission: 1, 
                    thickness: 1.5, 
                    ior: 1.5, 
                    clearcoat: 1,
                    clearcoatRoughness: 0,
                    transparent: true,
                    opacity: 0.8,
                    map: texture
                })
            }
        })
        return clonedScene
    }, [scene, imgPath])

    if (!scene) return null

    return (
        <mesh>
            <primitive object={clonedScene} />
        </mesh>
    )
}

useGLTF.preload('/portfolio/glass-sphere.glb')
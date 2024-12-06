"use client"

import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Group, Mesh, MeshPhysicalMaterial, TextureLoader } from 'three'

export default function CentralSphere({ imgPath }: { imgPath: string }) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/portfolio/glass-sphere.glb')

    const clonedScene = scene.clone()
    clonedScene.traverse((child) => {
         if (child instanceof Mesh) {
            const textureLoader = new TextureLoader()
            const texture = textureLoader.load(imgPath)
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

    if (!scene) return null

    return (
        <mesh ref={group}>
            <primitive object={clonedScene} />
        </mesh>
    )
}

useGLTF.preload('/glass-sphere.glb')
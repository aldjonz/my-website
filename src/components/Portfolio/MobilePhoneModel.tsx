import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Bloom } from '@react-three/postprocessing'
import { useMotionValue } from 'framer-motion'
import React, { useRef, useEffect, useState } from 'react'
import { AnimationAction, FrontSide, MeshPhysicalMaterial, PlaneGeometry, Vector2 } from 'three'
import { Mesh, TextureLoader } from 'three'
import { Group } from 'three'

type Props = {}

const MobilePhoneModel = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  isSlideshow = false,
  images = []
}: { 
  position?: [number, number, number],
  rotation?: [number, number, number],
  isSlideshow?: boolean,
  images?: string[]
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    
    const motionVal = useMotionValue(0)
    const { scene, animations } = useGLTF('/portfolio/phone.glb')
    const { actions } = useAnimations(animations, scene)

    const clonedScene = scene.clone()
    // clonedScene.scale.set(2,2,2) // Adjust these values to make it bigger or smaller
    const phoneMesh = clonedScene.children[0].children[0].children[0]
    const screen = phoneMesh.children.filter((child) => child.name === 'Screen_+back_14')[0].children[1] as Mesh

    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(`/portfolio/projects/${isSlideshow ? images[currentImageIndex] || images[1] : images[0]}`)
    texture.repeat.set(1.2, 1)
    texture.offset.set(-0.11, 0)


    const screenMaterial = new MeshPhysicalMaterial({
        map: texture,
        emissive: '#FFFFFF',
        emissiveIntensity: 0.2,
        emissiveMap: texture

    })
    screen.material = screenMaterial
    screen.translateZ(-0.0015)

    useFrame(() => {
        Object.keys(actions).forEach((key) => {
            const action = actions[key] as AnimationAction
            action.play()
        })
    })
    


    useEffect(() => {
        if (!isSlideshow || images.length > 2) return

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 6000) 

        return () => clearInterval(interval)
    }, [isSlideshow, images])

    useEffect(() => {
        return () => {
            // Dispose of the entire cloned scene
            clonedScene.traverse((object) => {
                if (object instanceof Mesh) {
                    object.geometry.dispose()
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose())
                    } else {
                        object.material.dispose()
                    }
                }
            })
            clonedScene.clear() // Removes all objects from the scene
            
            // Dispose of texture separately since it's not part of the scene
            texture?.dispose()
        }
    }, [])

    if (!clonedScene) return null
    return (
        <mesh
            onPointerOver={() => motionVal.set(1)}
            onPointerOut={() => motionVal.set(0)}
            position={position}
            rotation={rotation}
            scale={2}
        >
            <primitive object={clonedScene} />
        </mesh> 
    )
}

export default MobilePhoneModel
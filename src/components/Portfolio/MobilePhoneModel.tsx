import { useGLTF } from '@react-three/drei'
import { Bloom } from '@react-three/postprocessing'
import React, { useRef } from 'react'
import { FrontSide, MeshPhysicalMaterial, PlaneGeometry } from 'three'
import { Mesh, TextureLoader } from 'three'
import { Group } from 'three'

type Props = {}

const MobilePhoneModel = ({ image, position }: { image: string, position?: [number, number, number] }) => {
    console.log('phone')
    const { scene } = useGLTF('/portfolio/phone.glb')

    const clonedScene = scene.clone()
    clonedScene.scale.set(2,2,2) // Adjust these values to make it bigger or smaller
    const phoneMesh = clonedScene.children[0].children[0].children[0]
    const screen = phoneMesh.children.filter((child) => child.name === 'Screen_+back_14')[0].children[1] as Mesh

    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(`/portfolio/projects/${image}`)
    texture.repeat.set(1.2, 1)
    texture.offset.set(-0.11, 0) 


    const screenMaterial = new MeshPhysicalMaterial({
        map: texture,
        emissive: '#FFFFFF',
        emissiveIntensity: 0.2,
        emissiveMap: texture

    })
    screen.material = screenMaterial

    if (!clonedScene) return null
    return (
        <mesh position={position}>
            <primitive object={clonedScene} />
        </mesh> 
    )
}

export default MobilePhoneModel
import { useProjectDisplay } from '@/hooks/useProjectDisplay'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Group, Mesh, MeshStandardMaterial, Object3DEventMap, OctahedronGeometry, Vector3 } from 'three'

const Projects = ({ isExploded, setSelectedProjectIndex }: { isExploded: boolean, setSelectedProjectIndex: (index: number | null) => void }) => {
    const group = useRef<Group>(null)
    const scene = new Group()

    const { selectIndex } = useProjectDisplay()
    const orbitRadiusCubes = 4
    const cubes = Array.from({ length: 7 }, (_, index) => {
        const cube = new Mesh(new OctahedronGeometry(0.5), new MeshStandardMaterial({ 
            color: 0x008080,
            transparent: true,
            opacity: 0.8
        }))
        cube.visible = false
        cube.userData.index = index
        scene.add(cube)

        const phi = Math.acos(-1 + (2 * index) / 7)
        const theta = Math.PI * (1 + Math.sqrt(5)) * index

        cube.userData.orbitPhi = phi
        cube.userData.orbitTheta = theta
        cube.userData.orbitSpeed = 0.05 + Math.random() * 0.3

        return cube
    })


    useFrame((state) => {
        cubes.forEach((cube) => {
            if (isExploded) {
                cube.visible = true
                cube.userData.orbitTheta += cube.userData.orbitSpeed * 0.01

                const x = orbitRadiusCubes * Math.sin(cube.userData.orbitPhi) * Math.cos(cube.userData.orbitTheta)
                const y = orbitRadiusCubes * Math.sin(cube.userData.orbitPhi) * Math.sin(cube.userData.orbitTheta)
                const z = orbitRadiusCubes * Math.cos(cube.userData.orbitPhi)

                const targetPos = new Vector3(x, y, z)
                cube.position.lerp(targetPos, 0.03)

                cube.lookAt(0, 0, 0)
                cube.rotateY(Math.PI)
            }
        })
    })

  return (
    <group 
        ref={group} 
        onClick={(e) => {
            e.stopPropagation()
            setSelectedProjectIndex(e.object.userData.index)
    }}>
        <primitive object={scene} />
    </group>
  )
}

export default Projects
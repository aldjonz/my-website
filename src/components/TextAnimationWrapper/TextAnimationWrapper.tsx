"use client"

import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Raycaster, Vector3, MathUtils, Group, Object3DEventMap, Quaternion } from 'three'

export default function TextAnimationWrapper({ scene, children }: { scene: Group<Object3DEventMap>, children: React.ReactNode }) {
    if (!scene) return null
    const { pointer, camera } = useThree()
    const raycaster = new Raycaster()
    const cube = scene.getObjectByName('Cube') as Mesh
    cube.visible = false

    const allCells = scene.children
        .filter(child => child.name.includes('Text_cell'))
        .map((cell) => {
            const mesh = cell as Mesh;
            return mesh;
        });

    useFrame((state) => {
        raycaster.setFromCamera(pointer, camera)
        
        const worldPosition = cube.getWorldPosition(new Vector3())
        const worldScale = cube.getWorldScale(new Vector3())
        const worldRotation = cube.getWorldQuaternion(new Quaternion())
        
        const worldCube = cube.clone()
        worldCube.position.copy(worldPosition)
        worldCube.scale.copy(worldScale)
        worldCube.quaternion.copy(worldRotation)
        
        const allIntersections = raycaster.intersectObject(worldCube)
        const hitPoint = allIntersections[0]?.point

        allCells.forEach((cell, index) => {
            if (hitPoint) {
                const localHitPoint = cell.parent?.worldToLocal(hitPoint.clone()) || hitPoint
                const distance = cell.position.distanceTo(localHitPoint)
                const influence = 1
                
                if (distance < influence) {
                    const scaleFactor = MathUtils.lerp(
                        0.6,
                        0.6,
                        MathUtils.smoothstep(distance, influence, 0)
                    )
                    
                    const floatSpeed = state.clock.elapsedTime * 0.5
                    cell.rotation.x = Math.sin(floatSpeed + index * 0.2) * 0.3
                    cell.rotation.y = Math.cos(floatSpeed + index * 0.2) * 0.3
                    cell.rotation.z = Math.cos(floatSpeed + index * 0.2) * 0.3
                    
                    cell.scale.lerp(new Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1)
                    
                } else {
                    cell.scale.lerp(new Vector3(1, 1, 1), 0.1)
                    cell.rotation.set(0, 0, 0)
                }
            } else {
                cell.scale.lerp(new Vector3(1, 1, 1), 0.1)
                cell.rotation.set(0, 0, 0)
            }
        })
    })

    if (!scene) return null

    return children
}
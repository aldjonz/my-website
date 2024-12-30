"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Group, Mesh, Vector3 } from 'three'
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

    const { cameraX } = useSpring({
        cameraX: isLeft ? 4 : -4,
        config: { mass: 1, tension: 170, friction: 100 },
    })

    useEffect(() => {
        if (group.current) {
            group.current.rotation.y = 0
        }
    }, [isLeft]);

    useFrame((state) => {
        if (isExploded) {

            const time = state.clock.getElapsedTime();
    
            // if (group.current && shapeIndex !== 2) {
            //     group.current.rotation.y += 0.0003; 
            // }
    
            if (!isMobile) {
                const camera = state.camera
                camera.position.x = cameraX.get()
                camera.updateProjectionMatrix()
            }
    
            allCells.forEach((cell, index) => {
                if (isExploded) {
                    let targetPos;
    
                    switch (shapeIndex) {
                        case 0: 
                            const side = Math.ceil(Math.sqrt(allCells.length));
                            const x = (index % side) - side / 2;
                            const y = Math.floor(index / side) - side / 2;
                            targetPos = new Vector3(x, y, 0);
                            break;
                        case 1: // Helix
                            const angle = index * 0.3;
                            targetPos = new Vector3(
                                Math.cos(angle) * 3 * (isMobile ? 1 : 2),
                                index * 0.15 - 4,
                                Math.sin(angle) * 2
                            );
                            break; 
                        case 2: // Sine wave
                            targetPos = new Vector3(
                                (index * 0.3) - 5,
                                Math.sin(index * 0.3) * 3,
                                -1
                            );
                            break;
                        case 3: // Figure-eight (infinity symbol)
                            const t = (index * 0.2);
                            targetPos = new Vector3(
                                4 * Math.sin(t),
                                2 * Math.sin(t * 2),
                                -1
                            );
                            break;    
                        case 4: 
                            const spiralAngle = index * 0.1;
                            const spiralRadius = 0.5 + index * 0.05;
                            targetPos = new Vector3(
                                Math.cos(spiralAngle) * spiralRadius - 2,
                                Math.sin(spiralAngle) * spiralRadius,
                                -index * 0.1
                            );
                            break;
                        default:
                            const targetPos = new Vector3(
                                cell.userData.originalPosition.x, 
                                cell.userData.originalPosition.y, 
                                cell.userData.originalPosition.z
                            )
                    }
    
                    const floatOffset = Math.sin(time + index) * 0.1; 
                    targetPos.y += floatOffset;
    
                    cell.position.lerp(targetPos, 0.03);
                }
            }); 
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
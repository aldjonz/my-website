"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useSpring, animated } from '@react-spring/three'

export default function Title({ isExploded, isLeft, shapeIndex, setItemActive }: { isExploded: boolean, isLeft: boolean, shapeIndex: number, setItemActive: (value: string) => void }) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/Expertise/expertise.glb')
    const [scrollPosition, setScrollPosition] = useState(0)


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

    const handleScroll = () => {
        setScrollPosition(window.scrollY)
    }

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
    
            if (group.current && shapeIndex !== 2) {
                group.current.rotation.y += 0.0003; 
            }
    
            const camera = state.camera
            console.log(camera)
            camera.position.x = cameraX.get()
            camera.updateProjectionMatrix()
    
            allCells.forEach((cell, index) => {
                if (isExploded) {
                    const offset = scrollPosition * 0.01;
                    let targetPos;
    
                    switch (shapeIndex) {
                        case 0: 
                            const side = Math.ceil(Math.sqrt(allCells.length));
                            const x = (index % side) - side / 2;
                            const y = Math.floor(index / side) - side / 2;
                            targetPos = new Vector3(x, y, 0);
                            break;
                        case 1:
                            const cubeSide = Math.cbrt(allCells.length);
                            const cx = (index % cubeSide) - cubeSide / 2;
                            const cy = (Math.floor(index / cubeSide) % cubeSide) - cubeSide / 2;
                            const cz = (Math.floor(index / (cubeSide * cubeSide)) - cubeSide / 2) - 3;
                            targetPos = new Vector3(cx, cy, cz);
                            break;    
                        case 2: 
                            const torusRadius = 4;
                            const tubeRadius = 1;
                            const torusAngle = (index / allCells.length) * Math.PI * 2;
                            const tubeAngle = (index % 10) * Math.PI * 2 / 20;
                            targetPos = new Vector3(
                                tubeRadius * Math.cos(tubeAngle),
                                (torusRadius + tubeRadius * Math.cos(tubeAngle)) * Math.sin(torusAngle),
                                (torusRadius + tubeRadius * Math.cos(tubeAngle)) * Math.cos(torusAngle) - 4
                            );
                            break;    
                        case 3: 
                            const sphereRadius = 2;
                            const phi = Math.acos(-1 + (2 * index) / allCells.length);
                            const theta = Math.sqrt(allCells.length * Math.PI) * phi;
                            targetPos = new Vector3(
                                sphereRadius * Math.sin(phi) * Math.cos(theta),
                                sphereRadius * Math.sin(phi) * Math.sin(theta),
                                sphereRadius * Math.cos(phi)
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!scene) return null

    return (
        <group 
            ref={group}
            onClick={(e) => {
                e.stopPropagation()
                setItemActive('expertise')
            }}
        >
            <AnimatedTextWrapper scene={scene}>
                <primitive object={scene} />
            </AnimatedTextWrapper>
        </group>
    )
}

useGLTF.preload('/Expertise/expertise.glb')
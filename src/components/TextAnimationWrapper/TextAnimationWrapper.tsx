"use client"

import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Raycaster, Vector3, MathUtils, Group, Object3DEventMap, Quaternion } from 'three'
import { useEffect, useRef } from 'react';

// Define a type for the state parameter
type RaycastState = {
    clock: {
        elapsedTime: number;
    };
};

export default function TextAnimationWrapper({ scene, children }: { scene: Group<Object3DEventMap>, children: React.ReactNode }) {
    if (!scene) return null
    const { pointer, camera } = useThree()
    const raycaster = new Raycaster()
    const cube = scene.getObjectByName('Cube') as Mesh
    cube.visible = false
    const throttleAmount = 50

    const allCells = scene.children
        .filter(child => child.name.includes('Text_cell'))
        .map((cell) => {
            const mesh = cell as Mesh;
            return mesh;
        });

    const throttle = (func: Function, limit: number) => {
        let lastFunc: NodeJS.Timeout;
        let lastRan: number;
        return function(...args: any[]) {
            if (!lastRan) {
                func(...args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if ((Date.now() - lastRan) >= limit) {
                        func(...args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
        // Update pointer position or any other necessary state
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }, throttleAmount); // Throttle limit in milliseconds

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const throttledRaycast = throttle((state: RaycastState) => {
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

        if (hitPoint) {
            const localHitPoints = allCells.map(cell => cell.parent?.worldToLocal(hitPoint.clone()) || hitPoint)
            allCells.forEach((cell, index) => {
                const localHitPoint = localHitPoints[index]
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
            })
        } else {
            allCells.forEach(cell => {
                cell.scale.lerp(new Vector3(1, 1, 1), 0.1)
                cell.rotation.set(0, 0, 0)
            })
        }
    }, throttleAmount); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            requestAnimationFrame(() => {
                throttledRaycast({ clock: { elapsedTime: performance.now() / 1000 } });
            })
        }, throttleAmount);

        return () => clearInterval(intervalId);
    }, []);

    if (!scene) return null

    return children
}
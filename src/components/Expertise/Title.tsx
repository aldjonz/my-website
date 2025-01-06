"use client"

import AnimatedTextWrapper from '@/components/TextAnimationWrapper/TextAnimationWrapper'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useSprings, animated } from '@react-spring/three'
import { useScreenDetails } from '@/hooks/useScreenDetails'

export default function Title({
    isExploded,
    isLeft,
    shapeIndex,
    setItemActive
}: {
    isExploded: boolean,
    isLeft: boolean,
    shapeIndex: number,
    setItemActive: (value: string) => void
}) {
    const group = useRef<Group>(null)
    const { scene } = useGLTF('/expertise/expertise.glb')
    const { isMobile } = useScreenDetails()
    const { viewport } = useThree()
    const { width, height } = viewport
    const viewportWidth = width
    const viewportHeight = height

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

    const { cols, rows } = useMemo(() => {
        const totalCells = allCells.length
        const aspectRatio = viewportWidth / viewportHeight

        let colsCalc, rowsCalc
        if (aspectRatio > 1) {
            rowsCalc = Math.floor(Math.sqrt(totalCells / aspectRatio))
            colsCalc = Math.ceil(totalCells / rowsCalc)
        } else {
            colsCalc = Math.floor(Math.sqrt(totalCells * aspectRatio))
            rowsCalc = Math.ceil(totalCells / colsCalc)
        }

        while (rowsCalc * colsCalc < totalCells) {
            if (aspectRatio > 1) {
                colsCalc++
            } else {
                rowsCalc++
            }
        }

        return { cols: colsCalc, rows: rowsCalc }
    }, [allCells.length, viewportWidth, viewportHeight])

    const cellsWithPosition = useMemo(() => {
        return allCells.map((cell, index) => {
            const col = index % cols
            const row = Math.floor(index / cols)
            return { cell, row, col }
        })
    }, [allCells, cols])

    const maxDiagonal = useMemo(() => rows + cols - 2, [rows, cols])

    const [springs, api] = useSprings(allCells.length, index => {
        const { row, col } = cellsWithPosition[index]
        const diagonalIndex = row + (cols - 1 - col)
        return {
            rotation: isLeft ? Math.PI : 0,
            config: { mass: 1, tension: 60, friction: 16 },
            delay: (diagonalIndex / maxDiagonal) * 1000 
        }
    }, [isLeft, cellsWithPosition, cols, maxDiagonal])

    useEffect(() => {
        api.start(index => {
            const { row, col } = cellsWithPosition[index]
            const diagonalIndex = row + (cols - 1 - col)
            return {
                rotation: isLeft ? Math.PI : 0,
                delay: (diagonalIndex / maxDiagonal) * 1000
            }
        })
    }, [isLeft, api, cellsWithPosition, cols, maxDiagonal])

    useEffect(() => {
        if (group.current) {
            group.current.rotation.y = 0
        }
    }, [isLeft])

    useFrame((state) => {
        if (isExploded) {
            const time = state.clock.getElapsedTime()

            allCells.forEach((cell, index) => {
                const { row, col } = cellsWithPosition[index]

                const targetPos = new Vector3(
                    (col - (cols - 1) / 2) / ((viewportWidth * 1.2) / cols),
                    (-row + (rows - 1) / 2) / ((viewportHeight * 1.4) / rows),
                    0
                )

                const floatOffset = Math.sin(time + index) * 0.1
                targetPos.y += floatOffset

                cell.position.lerp(targetPos, 0.03)

                cell.rotation.y = springs[index].rotation.get()
            })
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

useGLTF.preload('/expertise/expertise.glb')
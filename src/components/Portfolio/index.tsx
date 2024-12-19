"use client"

import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { Center, OrbitControls, Plane } from '@react-three/drei'
import dynamic from 'next/dynamic'
import PortfolioHTML from './PortfolioHTML'
import { usePortfolio } from '@/context/portfolioContext'

const Title = dynamic(() => import('./Title'), { ssr: false })
const CentralSphere = dynamic(() => import('./CentralSphere'), { ssr: false })
const Projects = dynamic(() => import('./Projects'), { ssr: false })

export default function Portfolio({ setItemActive, isActive }: { setItemActive: (value: string) => void, isActive: boolean }) {
    const { isExploded, setIsExploded, selectedProjectIndex, setSelectedProjectIndex } = usePortfolio()

    return (
        <>
            <OrbitControls 
                makeDefault
                target={[0, 0, -2]}
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                panSpeed={0.5}
                rotateSpeed={0.5}
            />
            <Suspense fallback={null}>
                <Title 
                    isExploded={isActive}
                    setIsExploded={setIsExploded}
                    setItemActive={setItemActive}
                />
                <CentralSphere imgPath='/portfolio/red-marble.jpg' />
                {isActive &&  <Projects 
                    isExploded={isActive}
                    setSelectedProjectIndex={setSelectedProjectIndex}
                />}
            </Suspense>
            {/* <PortfolioHTML 
                selectedProjectIndex={selectedProjectIndex}
                setSelectedProjectIndex={setSelectedProjectIndex}
            /> */}
        </>
    )
}

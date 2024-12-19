"use client"

import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { usePortfolio } from '@/context/portfolioContext'

const Title = dynamic(() => import('./Title'), { ssr: false })
const CentralSphere = dynamic(() => import('./CentralSphere'), { ssr: false })
const Projects = dynamic(() => import('./Projects'), { ssr: false })

export default function Portfolio({ setItemActive, isActive }: { setItemActive: (value: string) => void, isActive: boolean }) {
    const { setSelectedProjectIndex } = usePortfolio()

    return (
        <>
            <OrbitControls 
                makeDefault
                enabled={isActive}
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
                    setItemActive={setItemActive}
                />
                {isActive &&  
                    <>
                        <CentralSphere imgPath='/portfolio/red-marble.jpg' />
                        <Projects 
                            isExploded={isActive}
                            setSelectedProjectIndex={setSelectedProjectIndex}
                        />
                    </>
                }
            </Suspense>
        </>
    )
}

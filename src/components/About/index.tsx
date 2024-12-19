"use client"

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'

const Title = dynamic(() => import('./Title'), { ssr: false })

export default function About({ setItemActive, isActive }: { setItemActive: (value: string) => void, isActive: boolean }) {

    return (
        <Suspense fallback={null}>
            <Title 
                isExploded={isActive}
                setItemActive={setItemActive}
            />
        </Suspense>
    )
}

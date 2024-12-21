"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type PortfolioContextType = {
    selectedProjectIndex: number | null
    setSelectedProjectIndex: (index: number | null) => void
    isExploded: boolean
    setIsExploded: (value: boolean) => void
    viewedProjects: Set<number>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
    const [isExploded, setIsExploded] = useState(false)
    const [viewedProjects, setViewedProjects] = useState<Set<number>>(new Set())

    useEffect(() => {
        if (selectedProjectIndex !== null) {
            setViewedProjects(prev => prev.add(selectedProjectIndex))
        }
    }, [selectedProjectIndex])
    
    return (
        <PortfolioContext.Provider 
            value={{
                selectedProjectIndex,
                setSelectedProjectIndex,
                isExploded,
                setIsExploded,
                viewedProjects,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    )
}

export function usePortfolio() {
    const context = useContext(PortfolioContext)
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider')
    }
    return context
}
"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type PortfolioContextType = {
    selectedProjectIndex: number | null
    setSelectedProjectIndex: (index: number | null) => void
    isExploded: boolean
    setIsExploded: (value: boolean) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
    const [isExploded, setIsExploded] = useState(false)

    return (
        <PortfolioContext.Provider 
            value={{
                selectedProjectIndex,
                setSelectedProjectIndex,
                isExploded,
                setIsExploded
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
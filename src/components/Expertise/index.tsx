import React, { Suspense, useState, useEffect, useRef } from 'react'
import Title from './Title'

const Expertise = ({ setItemActive, isActive, textIndex }: { setItemActive: (value: string) => void, isActive: boolean, textIndex: number }) => {
  return (
    <Suspense fallback={null}>
        <Title 
            isExploded={isActive} 
            isLeft={textIndex % 2 === 0}
            setItemActive={setItemActive}
            shapeIndex={textIndex}
        />
    </Suspense>
  )
}

export default Expertise
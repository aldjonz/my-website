import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Portfolio from '../Portfolio'
import About from '../About'
import Expertise from '../Expertise'
import AnimatedGroups from './AnimatedGroups'

const NavCanvas = () => {
  return (
    <div style={{ position: 'fixed', height: '100vh', top: 0, left: 0, width: '100vw'}}>
        <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} >
            <ambientLight intensity={4} />
            <directionalLight position={[0, 0, 5]} intensity={4} />
            <directionalLight position={[-5, 0, 0]} intensity={4} />
            
            <AnimatedGroups/>
        </Canvas>
    </div>
  )
}

export default NavCanvas
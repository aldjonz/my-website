import { Canvas } from '@react-three/fiber'
import React from 'react'
import AnimatedGroups from './AnimatedGroups'

const NavCanvas = () => {
  return (
    <div style={{ position: 'fixed', height: '100vh', top: 0, left: 0, width: '100vw'}}>
        <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} >
            <ambientLight intensity={4} />
            <directionalLight position={[5, 1, 5]} intensity={2} />
            <directionalLight position={[-5, -1, 5]} intensity={2} />
            <AnimatedGroups/>
        </Canvas>
    </div>
  )
}

export default NavCanvas
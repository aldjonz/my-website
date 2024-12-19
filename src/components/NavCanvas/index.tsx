import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import AnimatedGroups from './AnimatedGroups'
import AboutHTML from '../About/AboutHTML'
import ExpertiseHTML from '../Expertise/ExpertiseHTML'
import PortfolioHTML from '../Portfolio/PortfolioHTML'
import HoverText from '../ui/HoverText'

const NavCanvas = () => {
    const [itemActive, setItemActive] = useState(null)

  return (
    <>
        <div style={{ position: 'fixed', height: '100vh', top: 0, left: 0, width: '100vw'}}>
            <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} >
                <ambientLight intensity={4} />
                <directionalLight position={[5, 1, 5]} intensity={2} />
                <directionalLight position={[-5, -1, 5]} intensity={2} />
                <AnimatedGroups 
                    itemActive={itemActive}
                    setItemActive={setItemActive}
                />
            </Canvas>
        </div>
        <AboutHTML isExploded={itemActive === 'about'} />
        <ExpertiseHTML 
            isExploded={itemActive === 'expertise'} 
        />
        <PortfolioHTML />
        {itemActive && (
            <div onClick={() => setItemActive(null)} style={{ position: 'fixed', top: 0, left: 10, zIndex: 10000, }}>
                <HoverText title={"Home"} />
            </div>
        )}
    </>

  )
}

export default NavCanvas
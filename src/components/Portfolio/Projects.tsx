import { usePortfolio } from '@/context/portfolioContext'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useMemo } from 'react'
import { Group, Mesh, MeshBasicMaterial, Vector3, Color, IcosahedronGeometry } from 'three'

const Projects = ({ isExploded, setSelectedProjectIndex }: { isExploded: boolean, setSelectedProjectIndex: (index: number | null) => void }) => {
    const group = useRef<Group>(null)
    const { viewedProjects } = usePortfolio()
    const orbitRadius = 4

    const projectNodes = useMemo(() => 
        Array.from({ length: 7 }, (_, index) => {
            const nodeGroup = new Group()
            
            const particleCount = 5
            for (let i = 0; i < particleCount; i++) {
                const particle = new Mesh(
                    new IcosahedronGeometry(0.05 + Math.random() * 0.1),
                    new MeshBasicMaterial({ 
                        color: 0x00ffff,
                        transparent: true,
                        opacity: 0.8
                    })
                )
                
                particle.position.set(
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4
                )
                
                nodeGroup.add(particle)
            }

            nodeGroup.visible = false
            nodeGroup.userData = {
                index,
                orbitPhi: Math.acos(-1 + (2 * index) / 7),
                orbitTheta: Math.PI * (1 + Math.sqrt(5)) * index,
                orbitSpeed: 0.05 + Math.random() * 0.3,
                originalScale: nodeGroup.scale.clone()
            }

            return nodeGroup
        }), []
    )

    useFrame((state) => {
        projectNodes.forEach((node) => {
            if (isExploded) {
                node.userData.orbitTheta += node.userData.orbitSpeed * 0.01

                const x = orbitRadius * Math.sin(node.userData.orbitPhi) * Math.cos(node.userData.orbitTheta)
                const y = orbitRadius * Math.sin(node.userData.orbitPhi) * Math.sin(node.userData.orbitTheta)
                const z = orbitRadius * Math.cos(node.userData.orbitPhi)

                const targetPos = new Vector3(x, y, z)
                node.position.lerp(targetPos, 0.03)
                node.lookAt(0, 0, 0)
                node.visible = true
                
            }
            
            node.children.forEach(particle => {
                if (particle instanceof Mesh) {

                    const material = particle.material as MeshBasicMaterial
                    
                    const targetScale = node.userData.isHovered ? 1.3 : 1
                    node.scale.lerp(node.userData.originalScale.clone().multiplyScalar(targetScale), 0.1)

                    let targetColor = 0x00ffff
                    if (viewedProjects.has(node.userData.index) || node.userData.isHovered) {
                        targetColor = 0x631814
                    }
                    material.color.lerp(new Color(targetColor), 0.3)

                }
            })
        })
    })

    const onPointerEnter = (e: PointerEvent) => {
        const parent = e.object.parent
        parent.userData.isHovered = true
        document.body.style.cursor =  'pointer'

    }

    const onPointerLeave = (e: PointerEvent) => {
        const parent = e.object.parent
        parent.userData.isHovered = false
        document.body.style.cursor =  'default'
    }

  return (
    <group 
        ref={group} 
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={(e) => {
            e.stopPropagation()
            setSelectedProjectIndex(e.object.parent.userData.index)
        }}
        style={{ cursor: 'pointer' }}
    >
        {projectNodes.map((node) => (
            <primitive key={node.uuid} object={node} />
        ))}
    </group>
  )
}

export default Projects
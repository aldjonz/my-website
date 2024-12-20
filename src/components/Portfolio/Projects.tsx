import { usePortfolio } from '@/context/portfolioContext'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useMemo } from 'react'
import { Group, Mesh, MeshBasicMaterial, Vector3, Color, IcosahedronGeometry, SphereGeometry, TorusGeometry, ConeGeometry } from 'three'

const Projects = ({ isExploded, setSelectedProjectIndex }: { isExploded: boolean, setSelectedProjectIndex: (index: number | null) => void }) => {
    const group = useRef<Group>(null)
    const { viewedProjects } = usePortfolio()
    const orbitRadius = 4

    const projectNodes = useMemo(() => 
        Array.from({ length: 7 }, (_, index) => {
            const nodeGroup = new Group()
            
            // Glass pyramid (using cone geometry)
            const pyramid = new Mesh(
                new ConeGeometry(0.4, 0.8, 4),  // radius, height, radialSegments
                new MeshBasicMaterial({ 
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.3,
                    wireframe: false
                })
            )
            // Rotate pyramid to point inward
            pyramid.rotation.x = Math.PI
            nodeGroup.add(pyramid)
            
            // Wireframe outline
            const wireframePyramid = new Mesh(
                new ConeGeometry(0.4, 0.8, 4),
                new MeshBasicMaterial({ 
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.5,
                    wireframe: true
                })
            )
            wireframePyramid.rotation.x = Math.PI
            nodeGroup.add(wireframePyramid)

            // Add orbiting particles
            const particleCount = 3
            const particles = Array.from({ length: particleCount }, () => {
                const particle = new Mesh(
                    new SphereGeometry(0.03),  // tiny sphere
                    new MeshBasicMaterial({ 
                        color: 0xffff00,
                        transparent: true,
                        opacity: 0.8
                    })
                )
                
                // Random initial positions on a sphere
                const theta = Math.random() * Math.PI * 2
                const phi = Math.random() * Math.PI
                particle.position.set(
                    0.6 * Math.sin(phi) * Math.cos(theta),
                    0.6 * Math.sin(phi) * Math.sin(theta),
                    0.6 * Math.cos(phi)
                )
                
                // Store orbital animation parameters
                particle.userData = {
                    orbitSpeed: 0.5 + Math.random() * 0.5,
                    orbitRadius: 0.4 + Math.random() * 0.2,
                    orbitOffset: Math.random() * Math.PI * 2,
                    verticalOffset: Math.random() * Math.PI * 2
                }
                
                nodeGroup.add(particle)
                return particle
            })

            nodeGroup.userData = {
                index,
                orbitPhi: Math.acos(-1 + (2 * index) / 7),
                orbitTheta: Math.PI * (1 + Math.sqrt(5)) * index,
                orbitSpeed: 0.05 + Math.random() * 0.3,
                originalScale: nodeGroup.scale.clone(),
                baseRotation: Math.random() * Math.PI * 2,
                particles
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
            
            const pyramid = node.children[0] as Mesh
            const wireframe = node.children[1] as Mesh
            const pyramidMaterial = pyramid.material as MeshBasicMaterial
            const wireframeMaterial = wireframe.material as MeshBasicMaterial
            const time = state.clock.elapsedTime
            
            if (node.userData.isHovered) {
                // Hover effects
                const pulseScale = 1.2 + Math.sin(time * 3) * 0.1
                node.scale.lerp(node.userData.originalScale.clone().multiplyScalar(pulseScale), 0.2)
                
                const glowColor = new Color(0xffffff)
                const wireframeColor = new Color(0x0000FF)
                pyramidMaterial.color.lerp(glowColor, 0.2)
                wireframeMaterial.color.lerp(wireframeColor, 0.2)
                pyramidMaterial.opacity = 0.5
                wireframeMaterial.opacity = 1
            } else {
                // Idle state
                node.scale.lerp(node.userData.originalScale, 0.2)
                
                const targetColor = viewedProjects.has(node.userData.index) 
                ? new Color(0x631814) 
                : new Color(0xffffff)

                const wireframeColor = viewedProjects.has(node.userData.index) 
                ? new Color(0xffffff) 
                : new Color(0x000000)
                
                pyramidMaterial.color.lerp(targetColor, 0.2)
                wireframeMaterial.color.lerp(wireframeColor, 0.2)
                pyramidMaterial.opacity = 0.7
                wireframeMaterial.opacity = 0.6
            }

            // Update particles
            const isViewed = viewedProjects.has(node.userData.index)
            
            // Get particles (starting from index 2, after pyramid and wireframe)
            const particles = node.children.slice(2) as Mesh[]
            
            particles.forEach((particle, i) => {
                const material = particle.material as MeshBasicMaterial
                
                if (!isViewed && !node.userData.isHovered) {
                    // Only show and animate particles for unviewed, unhovered projects
                    particle.visible = true
                    
                    // Orbital motion
                    const { orbitSpeed, orbitRadius, orbitOffset, verticalOffset } = particle.userData
                    const particleTime = time * orbitSpeed + orbitOffset
                    
                    particle.position.x = orbitRadius * Math.cos(particleTime)
                    particle.position.z = orbitRadius * Math.sin(particleTime)
                    particle.position.y = Math.sin(time * orbitSpeed + verticalOffset) * 0.3
                    
                    // Fade in/out effect
                    material.opacity = 0.8 + Math.sin(time * 2 + i) * 0.2
                } else {
                    // Hide particles when project is viewed or hovered
                    particle.visible = false
                }
            })
        })
    })

    const onPointerEnter = (e: PointerEvent) => {
        const parent = e.object.parent
        if (parent) {
            parent.userData.isHovered = true
            document.body.style.cursor =  'pointer'
        }
    }

    const onPointerLeave = (e: PointerEvent) => {
        const parent = e.object.parent
        if (parent) {
            parent.userData.isHovered = false
            document.body.style.cursor =  'default'
        }
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
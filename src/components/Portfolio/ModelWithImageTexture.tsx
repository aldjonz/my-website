import { useRef, useEffect } from 'react'
import { FrontSide, Mesh, TextureLoader, Vector3, Vector2 } from 'three'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Center } from '@react-three/drei'

const ModelWithImageTexture = ({ 
  texturePath, 
  transparent,
  visible = true,
  shouldUnmount = true
}: { 
  texturePath: string, 
  transparent?: boolean,
  visible?: boolean,
  shouldUnmount?: boolean 
}) => {
    const meshRef = useRef<Mesh>(null)
    const texture = useLoader(TextureLoader, texturePath)
    const { viewport } = useThree()
    const mouse = useRef(new Vector2())
    const target = useRef(new Vector3())
    
    useEffect(() => {
        const updateMouse = (event: MouseEvent) => {
            // Convert mouse position to normalized device coordinates (-1 to +1)
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', updateMouse)
        return () => window.removeEventListener('mousemove', updateMouse)
    }, [])

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // Calculate target position in 3D space
        target.current.set(
            mouse.current.x * viewport.width / 11,
            mouse.current.y * viewport.height / 11,
            2 // Distance from the camera
        )

        // Calculate rotation angles
        const currentRotation = meshRef.current.rotation
        
        const targetX = -Math.atan2(
            target.current.y - meshRef.current.position.y,
            target.current.z - meshRef.current.position.z
        )
        
        const targetY = Math.atan2(
            target.current.x - meshRef.current.position.x,
            target.current.z - meshRef.current.position.z
        )

        const rotationSpeed = 2
        currentRotation.x += (targetX - currentRotation.x) * delta * rotationSpeed
        currentRotation.y += (targetY - currentRotation.y) * delta * rotationSpeed

        const maxRotation = Math.PI / 5 
        currentRotation.x = Math.max(Math.min(currentRotation.x, maxRotation), -maxRotation)
        currentRotation.y = Math.max(Math.min(currentRotation.y, maxRotation), -maxRotation)
    })

    useEffect(() => {
        if (shouldUnmount) {
            return () => {
                texture?.dispose()
                if (meshRef.current) {
                    meshRef.current.parent?.clear() // This will handle the mesh and its children
                }
            }
        }
    }, [texture])

    let textureMaterial = {
        map: texture,
        roughness: 1,
        thickness: 1.5,
        ior: 1.5,
        clearcoat: 1,
        
    }
    
    if (transparent) {
        textureMaterial = {
            ...textureMaterial,
            transparent: true,
            alphaTest: 0.5,
            color: "white"
        }
    }
    
    return (
        <Center>
            <mesh ref={meshRef} visible={visible && Boolean(texturePath)}>
                <planeGeometry args={[3,3]} />
                <meshPhysicalMaterial {...textureMaterial} />
            </mesh>
        </Center>
    )
}

export default ModelWithImageTexture
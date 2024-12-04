import { useRef, useEffect } from 'react'
import { FrontSide, Mesh, TextureLoader, Vector3, Vector2 } from 'three'
import { useLoader, useFrame, useThree } from '@react-three/fiber'

const ModelWithImageTexture = ({ texturePath, modelType, transparent }: { texturePath: string, modelType: string, transparent?: boolean }) => {
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

    let geometry
    switch(modelType) {
        case 'circle': geometry = <circleGeometry args={[2, 32, 32]} />
            break;
        case 'square': geometry = <boxGeometry args={[2, 2, 2]} />
            break;
        case 'plane': geometry = <planeGeometry args={[3,3]} />
            break;
    }

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
    
    console.log(modelType)
    return (
        <mesh ref={meshRef}>
            {geometry}
            <meshPhysicalMaterial {...textureMaterial} />
        </mesh>
    )
}

export default ModelWithImageTexture
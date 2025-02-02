import { useRef, useEffect } from 'react'
import { Group, Vector2, Vector3 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useScreenDetails } from '@/hooks/useScreenDetails'

const PointerTrackerGroup = ({ 
  children, 
  visible = true 
}: { 
  children: React.ReactNode,
  visible?: boolean
}) => {
    const meshRef = useRef<Group>(null)
    const { viewport, camera } = useThree()
    const mouse = useRef(new Vector2())
    const target = useRef(new Vector3())
    const { width, height } = useScreenDetails()
    const scale = Math.min(1, viewport.width / 12)

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
        let posY = mouse.current.y * viewport.width / 24
        if (posY < -0.2) posY = -0.2
        
        target.current.set(
            mouse.current.x * viewport.width / 24,
            posY,
            4      
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

        const maxRotation = Math.PI * 5 
        currentRotation.x = Math.max(Math.min(currentRotation.x, maxRotation), -maxRotation)
        currentRotation.y = Math.max(Math.min(currentRotation.y, maxRotation), -maxRotation)
    })
    return (
        <group ref={meshRef} visible={visible} scale={scale} >
            {children}
        </group>
    )
}

export default PointerTrackerGroup
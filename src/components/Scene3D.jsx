import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'

function FloatingShape() {
    const ref = useRef()
    useFrame((state) => {
        if (!ref.current) return
        ref.current.rotation.x = state.clock.elapsedTime * 0.18
        ref.current.rotation.y = state.clock.elapsedTime * 0.22
    })
    return (
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
            <mesh ref={ref} scale={1.5}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color="#0a0a0c"
                    distort={0.32}
                    speed={1.4}
                    roughness={0.2}
                    metalness={0.6}
                />
            </mesh>
        </Float>
    )
}

function Orbit() {
    const ref = useRef()
    useFrame((state) => {
        if (!ref.current) return
        ref.current.rotation.z = state.clock.elapsedTime * 0.3
    })
    return (
        <mesh ref={ref} position={[0, 0, -0.5]}>
            <torusGeometry args={[2.2, 0.012, 16, 200]} />
            <meshBasicMaterial color="#ff5b2e" transparent opacity={0.5} />
        </mesh>
    )
}

export default function Scene3D() {
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4.4], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 4, 5]} intensity={1.1} />
            <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#ff5b2e" />
            <FloatingShape />
            <Orbit />
        </Canvas>
    )
}

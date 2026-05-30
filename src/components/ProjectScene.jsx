import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function LinkScene() {
    // URL Shortener — connected nodes
    const a = useRef()
    const b = useRef()
    useFrame((s) => {
        const t = s.clock.elapsedTime
        if (a.current) a.current.position.y = Math.sin(t * 1.2) * 0.15
        if (b.current) b.current.position.y = Math.cos(t * 1.2) * 0.15
    })
    return (
        <group>
            <mesh ref={a} position={[-1.1, 0, 0]}>
                <torusGeometry args={[0.45, 0.13, 24, 80]} />
                <meshStandardMaterial color="#0a0a0c" roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh ref={b} position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.45, 0.13, 24, 80]} />
                <meshStandardMaterial color="#ff5b2e" roughness={0.3} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.0, 0.05, 0.05]} />
                <meshStandardMaterial color="#9a9aa3" />
            </mesh>
        </group>
    )
}

function SearchScene() {
    // Job Portal — magnifier-ish ring orbiting cubes
    const ring = useRef()
    const cubes = useMemo(
        () => Array.from({ length: 6 }, (_, i) => i),
        []
    )
    useFrame((s) => {
        const t = s.clock.elapsedTime
        if (ring.current) ring.current.rotation.z = t * 0.6
    })
    return (
        <group>
            <mesh ref={ring}>
                <torusGeometry args={[1.1, 0.04, 16, 100]} />
                <meshStandardMaterial color="#0a0a0c" />
            </mesh>
            {cubes.map((i) => {
                const angle = (i / cubes.length) * Math.PI * 2
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, 0]}
                    >
                        <boxGeometry args={[0.18, 0.18, 0.18]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? '#ff5b2e' : '#1d1d22'}
                            roughness={0.4}
                            metalness={0.3}
                        />
                    </mesh>
                )
            })}
        </group>
    )
}

function HotelScene() {
    // Hotel API — stacked plates
    const grp = useRef()
    useFrame((s) => {
        if (grp.current) {
            grp.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.6) * 0.4
            grp.current.rotation.x = -0.35
        }
    })
    return (
        <group ref={grp}>
            {[0, 1, 2].map((i) => (
                <mesh key={i} position={[0, i * 0.22 - 0.22, 0]}>
                    <boxGeometry args={[1.6 - i * 0.15, 0.08, 1.0 - i * 0.1]} />
                    <meshStandardMaterial
                        color={i === 1 ? '#ff5b2e' : '#0a0a0c'}
                        roughness={0.35}
                        metalness={0.4}
                    />
                </mesh>
            ))}
        </group>
    )
}

const SCENES = {
    link: LinkScene,
    search: SearchScene,
    hotel: HotelScene,
}

export default function ProjectScene({ variant = 'link' }) {
    const Scene = SCENES[variant] || LinkScene
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
        >
            <color attach="background" args={['#f4f4f6']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 3, 4]} intensity={1.2} />
            <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#ff5b2e" />
            <Scene />
        </Canvas>
    )
}

// Avoid warning when three is imported but not directly used
void THREE

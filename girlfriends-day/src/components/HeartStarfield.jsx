import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════
//  DYNAMICAL CANVAS TEXTURE GENERATOR FOR HEART-SHAPED STAR SPRITES
// ═══════════════════════════════════════════════════════════════════════
function createHeartTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')

  // Smooth transparent background
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.fillRect(0, 0, 64, 64)

  // Glowing heart path
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(32, 18)
  ctx.bezierCurveTo(32, 18, 27, 4, 14, 4)
  ctx.bezierCurveTo(3, 4, 3, 24, 3, 24)
  ctx.bezierCurveTo(3, 38, 18, 52, 32, 60)
  ctx.bezierCurveTo(46, 52, 61, 38, 61, 24)
  ctx.bezierCurveTo(61, 24, 61, 4, 50, 4)
  ctx.bezierCurveTo(37, 4, 32, 18, 32, 18)
  ctx.closePath()
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// ═══════════════════════════════════════════════════════════════════════
//  HEART STARFIELD (POINTS)
// ═══════════════════════════════════════════════════════════════════════
function PointsStarfield({ count = 1500, isMobile }) {
  const ref = useRef()
  const texture = useMemo(() => createHeartTexture(), [])

  // Position, Color, and Custom Twinkle Phase attributes
  const { positions, colors, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const phs = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Scatter in a sphere/ellipsoid depth layer
      const radius = 12 + Math.random() * 48
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.65 // flatter height
      pos[i * 3 + 2] = radius * Math.cos(phi)

      // Varied colors matching the moodboard (whites, warm pinks, orchids, gold tints)
      const choice = Math.random()
      if (choice < 0.4) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 0.93 // Soft pink-white
      } else if (choice < 0.7) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.75; col[i * 3 + 2] = 0.85 // Blush pink
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 0.92; col[i * 3 + 2] = 0.75 // Soft gold
      }

      phs[i] = Math.random() * Math.PI * 2 // twinkle phase offset
    }

    return { positions: pos, colors: col, phases: phs }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  useFrame((state, delta) => {
    if (!ref.current) return
    // Gentle rotation
    ref.current.rotation.y += delta * 0.005
    ref.current.rotation.x += delta * 0.002

    // Apply twinkle to shader material via mapping or simple overall pulsing
    // To keep it simple and performant, we can animate points size or material opacity
    const t = state.clock.getElapsedTime()
    ref.current.material.opacity = 0.75 + Math.sin(t * 1.5) * 0.15
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={isMobile ? 0.35 : 0.48}
        map={texture}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ═══════════════════════════════════════════════════════════════════════
//  LARGER HERO GLASS HEARTS
// ═══════════════════════════════════════════════════════════════════════
function GlassHeartMesh({ position, scale = 1, speed = 0.3, color = '#ff69b4' }) {
  const ref = useRef()
  const time = useRef(Math.random() * 100)

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0.4)
    shape.bezierCurveTo(0.1, 0.7, 0.6, 0.7, 0.6, 0.3)
    shape.bezierCurveTo(0.6, -0.1, 0.2, -0.4, 0, -0.7)
    shape.bezierCurveTo(-0.2, -0.4, -0.6, -0.1, -0.6, 0.3)
    shape.bezierCurveTo(-0.6, 0.7, -0.1, 0.7, 0, 0.4)
    return shape
  }, [])

  const extrudeSettings = useMemo(() => ({
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03
  }), [])

  useFrame((_, delta) => {
    if (!ref.current) return
    time.current += delta * speed
    ref.current.position.y = position[1] + Math.sin(time.current) * 0.35
    ref.current.rotation.x += delta * 0.08
    ref.current.rotation.y += delta * 0.12
    ref.current.rotation.z += delta * 0.04
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.12}
        metalness={0.1}
        transmission={0.85}
        thickness={0.6}
        clearcoat={1.0}
        transparent
        opacity={0.88}
      />
    </mesh>
  )
}

// ═══════════════════════════════════════════════════════════════════════
//  HEART-SHAPED SHOOTING STARS
// ═══════════════════════════════════════════════════════════════════════
function ShootingHeart() {
  const ref = useRef()
  const progress = useRef(Math.random())

  const startPos = useMemo(() => {
    const angle = Math.random() * Math.PI * 2
    const radius = 18 + Math.random() * 12
    return new THREE.Vector3(
      radius * Math.cos(angle),
      8 + Math.random() * 8,
      -10 - Math.random() * 10
    )
  }, [])

  const dir = useMemo(() => {
    return new THREE.Vector3(-0.8, -0.5, 0.2).normalize()
  }, [])

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0.4)
    shape.bezierCurveTo(0.1, 0.7, 0.6, 0.7, 0.6, 0.3)
    shape.bezierCurveTo(0.6, -0.1, 0.2, -0.4, 0, -0.7)
    shape.bezierCurveTo(-0.2, -0.4, -0.6, -0.1, -0.6, 0.3)
    shape.bezierCurveTo(-0.6, 0.7, -0.1, 0.7, 0, 0.4)
    return shape
  }, [])

  const extrudeSettings = useMemo(() => ({
    depth: 0.02,
    bevelEnabled: false
  }), [])

  useFrame((_, delta) => {
    progress.current += delta * 0.15
    if (progress.current > 1.2) {
      progress.current = 0
    }

    if (ref.current) {
      const p = Math.min(progress.current, 1)
      const dist = p * 40
      const pos = startPos.clone().add(dir.clone().multiplyScalar(dist))
      ref.current.position.copy(pos)

      // Fade-in / Fade-out scale/opacity
      const opacity = p < 0.1 ? p / 0.1 : p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1
      ref.current.material.opacity = opacity * 0.75
    }
  })

  return (
    <mesh ref={ref} scale={0.4}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshBasicMaterial color="#ffb6c1" transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

// ═══════════════════════════════════════════════════════════════════════
//  CAMERA CONTROL (PARALLAX EFFECT)
// ═══════════════════════════════════════════════════════════════════════
function CameraParallax({ isMobile }) {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (isMobile) return
    const mx = state.pointer.x
    const my = state.pointer.y
    target.current.x += (mx * 2.2 - target.current.x) * 0.035
    target.current.y += (my * 1.5 - target.current.y) * 0.035
    camera.position.x = target.current.x
    camera.position.y = target.current.y
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN STARFIELD CONTAINER
// ═══════════════════════════════════════════════════════════════════════
export default function HeartStarfield() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Floating glassy hero heart configurations
  const heroHearts = useMemo(() => {
    if (isMobile) {
      return [
        { position: [-2, 1.5, -2], scale: 1.1, speed: 0.4, color: '#ff69b4' },
        { position: [2, -1.8, -3], scale: 1.4, speed: 0.3, color: '#da70d6' }
      ]
    } else {
      return [
        { position: [-3.5, 2.2, -1.5], scale: 1.2, speed: 0.4, color: '#ff69b4' },
        { position: [3, -2.5, -2.5], scale: 1.5, speed: 0.3, color: '#da70d6' },
        { position: [-2.2, -2.8, -3], scale: 1.0, speed: 0.5, color: '#ffb6c1' },
        { position: [3.8, 2.5, -2], scale: 1.1, speed: 0.35, color: '#ff1493' }
      ]
    }
  }, [isMobile])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-radial-gradient">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 80 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1] : [1, Math.min(window.devicePixelRatio, 2)]}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.4} color="#da70d6" />
        <hemisphereLight args={['#ffb6c1', '#1a0933', 0.5]} />
        <directionalLight position={[3, 5, 2]} intensity={0.65} color="#ffffff" />
        <pointLight position={[-3, -3, 2]} intensity={0.4} color="#ff69b4" />

        {/* 1. Heart-shaped Particle Starfield */}
        <PointsStarfield count={isMobile ? 500 : 2000} isMobile={isMobile} />

        {/* 2. Floating Glass Hero Hearts */}
        {heroHearts.map((h, i) => (
          <GlassHeartMesh
            key={`hero-${i}`}
            position={h.position}
            scale={h.scale}
            speed={h.speed}
            color={h.color}
          />
        ))}

        {/* 3. Periodic Shooting Hearts (Disabled on Mobile for FPS) */}
        {!isMobile && (
          <>
            <ShootingHeart />
            <ShootingHeart />
          </>
        )}

        <CameraParallax isMobile={isMobile} />
      </Canvas>
    </div>
  )
}

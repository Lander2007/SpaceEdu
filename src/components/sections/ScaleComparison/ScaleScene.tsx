import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ScaleMesh from './ScaleMesh'
import * as THREE from 'three'

interface CelestialData {
  id:          string
  name:        string
  color:       string
  texturePath: string
  ratio:       number
  autoSpeed:   number
}

interface Props {
  bodyA:     CelestialData
  bodyB:     CelestialData
  scaleMode: 'realistic' | 'visual'
}

interface CameraControllerProps {
  xOffset: number
  outerA:  number
  outerB:  number
}

// Dynamically adjusts camera zoom (Z position) to frame both celestial bodies perfectly on all screen sizes
function CameraController({ xOffset, outerA, outerB }: CameraControllerProps) {
  const { camera, size } = useThree()

  useEffect(() => {
    if (!camera) return

    // Calculate total horizontal span of the objects
    const totalWidth = xOffset * 2 + outerA + outerB
    const totalHeight = Math.max(outerA, outerB) * 2

    // Get the viewport aspect ratio
    const aspect = size.width / size.height

    // Frame the objects with appropriate padding
    const horizontalPadding = 1.6
    const verticalPadding = 1.2
    
    const targetW = totalWidth + horizontalPadding
    const targetH = totalHeight + verticalPadding

    const persCam = camera as THREE.PerspectiveCamera
    const fovRad = (persCam.fov * Math.PI) / 180

    // Distance Z needed to fit target width and height
    const zForWidth = targetW / (2 * Math.tan(fovRad / 2) * aspect)
    const zForHeight = targetH / (2 * Math.tan(fovRad / 2))

    // Select the maximum Z to fit both width and height, with a baseline minimum
    const desiredZ = Math.max(zForWidth, zForHeight, 6.2)

    persCam.position.set(0, 0, desiredZ)
    persCam.lookAt(0, 0, 0)
    persCam.updateProjectionMatrix()
  }, [xOffset, outerA, outerB, camera, size])

  return null
}

export default function ScaleScene({ bodyA, bodyB, scaleMode }: Props) {
  // Compute scales based on mode
  let scaleA = 1.0
  let scaleB = 1.0

  if (scaleMode === 'realistic') {
    // Proportional radii (normalized so larger doesn't exceed 2.2 units for camera framing)
    const maxRatio = Math.max(bodyA.ratio, bodyB.ratio)
    scaleA = (bodyA.ratio / maxRatio) * 2.2
    scaleB = (bodyB.ratio / maxRatio) * 2.2
  } else {
    // Clamped visual comparison sizes
    scaleA = 1.3
    scaleB = 1.3
  }

  // Calculate outer boundaries (taking Saturn's rings into account)
  const outerA = bodyA.id === 'saturn' ? scaleA * 1.8 : scaleA
  const outerB = bodyB.id === 'saturn' ? scaleB * 1.8 : scaleB

  // Dynamic spacing: centers are placed at -xOffset and +xOffset
  // The distance between the outermost boundary edges will be exactly the margin
  const margin = 0.6
  const xOffset = (outerA + outerB + margin) / 2

  return (
    <Canvas
      gl={{
        antialias:       true,
        alpha:           true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      style={{
        position: 'relative',
        width:    '100%',
        height:   '100%',
      }}
    >
      <ambientLight intensity={0.2} color="#050512" />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#0d244c" />

      <Suspense fallback={null}>
        {/* Render Body A (left) */}
        <ScaleMesh
          texturePath={bodyA.texturePath}
          radiusScale={scaleA}
          position={[-xOffset, 0, 0]}
          autoSpeed={bodyA.autoSpeed}
          color={bodyA.color}
          hasSaturnRings={bodyA.id === 'saturn'}
        />

        {/* Render Body B (right) */}
        <ScaleMesh
          texturePath={bodyB.texturePath}
          radiusScale={scaleB}
          position={[xOffset, 0, 0]}
          autoSpeed={bodyB.autoSpeed}
          color={bodyB.color}
          hasSaturnRings={bodyB.id === 'saturn'}
        />

        {/* Dynamically adjust camera framing */}
        <CameraController xOffset={xOffset} outerA={outerA} outerB={outerB} />

        {/* Twinkling Space Backdrop */}
        <Stars
          radius={120}
          depth={50}
          count={1000}
          factor={4}
          saturation={0.5}
          fade
          speed={1.2}
        />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}


import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BlackHole } from './BlackHole';
import { Stars } from '@react-three/drei';

interface BlackHoleSceneProps {
  mouseX: any;
  mouseY: any;
}

export function BlackHoleScene({ mouseX, mouseY }: BlackHoleSceneProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = mouseX.on('change', (v: number) => {
      setMousePos(prev => ({ ...prev, x: v }));
    });
    const unsubY = mouseY.on('change', (v: number) => {
      setMousePos(prev => ({ ...prev, y: v }));
    });
    
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      width: '100%', 
      height: '100%',
      zIndex: 1,
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Allow frame rate to drop if needed
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.1} />
          
          {/* Background stars */}
          <Stars 
            radius={100} 
            depth={50} 
            count={3000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5}
          />
          
          {/* The Black Hole */}
          <BlackHole mouseX={mousePos.x} mouseY={mousePos.y} />
        </Suspense>
      </Canvas>
    </div>
  );
}

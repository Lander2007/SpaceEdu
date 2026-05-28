import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { MilkyWay3D } from './MilkyWay3D';

interface MilkyWaySceneProps {
  mouseX: any;
  mouseY: any;
  focusMode?: 'full' | 'core' | 'orion' | 'perseus';
  spectrumMode: number;
  isCinematicMode: boolean;
}

export function MilkyWayScene({ mouseX, mouseY, focusMode = 'full', spectrumMode, isCinematicMode }: MilkyWaySceneProps) {
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
        camera={{ position: [0, 15, 25], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <MilkyWay3D 
            focusMode={focusMode} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            enableCameraControl={true} 
            spectrumMode={spectrumMode}
            isCinematicMode={isCinematicMode}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
export default MilkyWayScene;

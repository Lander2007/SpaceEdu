import { useFrame, useThree } from '@react-three/fiber';

interface MouseParallaxCameraProps {
  enabled?: boolean;
  xStrength?: number;
  yStrength?: number;
}

export function MouseParallaxCamera({
  enabled = true,
  xStrength = 0.5,
  yStrength = 0.3,
}: MouseParallaxCameraProps) {
  const { camera, mouse } = useThree();

  useFrame(() => {
    if (!enabled) return;
    const targetX = mouse.x * xStrength;
    const targetY = mouse.y * yStrength;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

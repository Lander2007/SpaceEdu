interface OrbitPathProps {
  radius: number;
}

export function OrbitPath({ radius }: OrbitPathProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 8, 200]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </mesh>
  );
}

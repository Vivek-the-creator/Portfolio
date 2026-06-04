import { Line } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  radius: number;
};

export default function OrbitRing({ radius }: Props) {
  const curve = new THREE.EllipseCurve(
    0, 0,
    radius,
    radius * 0.55,   // Y axis compressed — gives tilted-plane look
    0, Math.PI * 2,
  );

  const points = curve
    .getPoints(150)
    .map((p) => new THREE.Vector3(p.x, 0, p.y));

  return (
    <Line
      points={points}
      color="#8B0000"
      transparent
      opacity={0.4}
      lineWidth={0.8}
    />
  );
}

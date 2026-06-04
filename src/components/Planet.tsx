import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

type Props = {
  icon: string;
  name: string;
  radius: number;
  speed: number;
  angle: number;
  zOffset: number; // kept in signature for compat but only used for Y layering
};

// Core sphere radius in world units — planets inside this radius get hidden
const CORE_RADIUS = 1.1;

export default function Planet({ icon, name, radius, speed, angle }: Props) {
  const group = useRef<THREE.Group>(null!);
  const [visualState, setVisualState] = useState<'front' | 'back' | 'behind'>('front');
  const tempV = useRef(new THREE.Vector3());

  useFrame(({ clock, camera, size }) => {
    const t  = clock.getElapsedTime() * speed + angle;

    // ── FIX 1: match the exact EllipseCurve used in OrbitRing ──
    // OrbitRing: EllipseCurve(0,0, radius, radius*0.55)
    //   maps p.x → world X,  p.y → world Z
    // So planet must follow: x = cos(t)*radius, z = sin(t)*radius*0.55
    // NO zOffset added to Z — that's what caused planets to wander off rings.
    const px = Math.cos(t) * radius;
    const pz = Math.sin(t) * (radius * 0.55);
    // Subtle Y bob — purely cosmetic, doesn't affect ring alignment
    const py = Math.sin(clock.getElapsedTime() * 0.8 + angle) * 0.06;

    group.current.position.set(px, py, pz);
    group.current.rotation.y += 0.003;

    // ── FIX 2: screen-space overlap detection ──
    const v = tempV.current;
    group.current.getWorldPosition(v);
    v.project(camera);

    // Project the center planet position (0, 0, -1.2)
    const centerV = new THREE.Vector3(0, 0, -1.2);
    centerV.project(camera);

    // Convert NDC (-1 to 1) to screen pixels (relative to center)
    const iconX = (v.x * size.width) / 2;
    const iconY = (v.y * size.height) / 2;
    const centerPxX = (centerV.x * size.width) / 2;
    const centerPxY = (centerV.y * size.height) / 2;

    // Calculate Euclidean distance in pixels from the projected center
    const dx = iconX - centerPxX;
    const dy = iconY - centerPxY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Set center planet radius dynamically (responsive desktop/mobile)
    const isMobile = size.width < 768;
    const centerPlanetRadius = isMobile ? 80 : 110;

    // The center planet is at Z = -1.2.
    // The icon is on the back side of the orbit relative to the center planet if pz < -1.2.
    const isBack = pz < -1.2;

    // Overlaps center
    const overlapsCenter = distance < centerPlanetRadius * 0.95;

    // Hide ONLY when BOTH are true
    const behind = isBack && overlapsCenter;

    const targetState = behind ? 'behind' : (isBack ? 'back' : 'front');

    if (targetState !== visualState) {
      setVisualState(targetState);
    }

    // Also hide the 3D sphere mesh via opacity with a smooth transition (lerp)
    const targetMeshOpacity = behind ? 0 : (isBack ? 0.75 : 1);
    const mesh = group.current.children[0] as THREE.Mesh;
    if (mesh?.material) {
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetMeshOpacity, 0.15);
    }
  });

  return (
    <group ref={group}>
      {/* Glass sphere shell */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshPhysicalMaterial
          color="#1a0000"
          roughness={0.08}
          metalness={0.15}
          transmission={0.75}
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive="#8B0000"
          emissiveIntensity={0.25}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Skill icon rendered in 3D space */}
      <Html
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: visualState === 'front' ? 6 : 2,
        }}
      >
        <div
          className={visualState}
          style={{
            width: '52px',
            height: '52px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <img
            src={icon}
            alt={name}
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'contain',
              filter: [
                'drop-shadow(0 0 4px rgba(214,40,40,0.9))',
                'drop-shadow(0 0 10px rgba(139,0,0,0.7))',
                'drop-shadow(0 0 20px rgba(139,0,0,0.4))',
              ].join(' '),
            }}
          />
          <span style={{
            fontSize: '7px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.85)',
            whiteSpace: 'nowrap',
            textShadow: '0 0 6px rgba(214,40,40,0.8)',
          }}>{name}</span>
        </div>
      </Html>
    </group>
  );
}

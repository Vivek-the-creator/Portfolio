import { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import OrbitRing from './OrbitRing';
import Planet from './Planet';
import { skills, showcaseSkills } from './SkillData';

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    // On wide viewports, use a closer base Z to make the galaxy look larger and fill the screen.
    // On narrower viewports (aspect < 1.35), dynamically scale the Z/Y out to prevent horizontal clipping.
    const baseZ = 15.5;
    const requiredZ = aspect < 1.35 ? Math.max(baseZ, 20.0 / aspect) : baseZ;
    const requiredY = (requiredZ / 15.5) * 6.9; // Maintain same tilt ratio

    camera.position.set(0, requiredY, requiredZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera]);

  return null;
}

// Orbit ring config: radius on XZ plane, Z offset for depth layering
const rings = [
  { radius: 4.2,  z: -1.5 },
  { radius: 6.0,  z: -0.5 },
  { radius: 7.8,  z:  0.5 },
  { radius: 9.6,  z:  1.5 },
];

export default function SkillGalaxy3D() {
  const [exploreMode, setExploreMode] = useState(false);

  return (
    <section
      id="skills"
      className="galaxy-section"
      data-section-theme="#2d0000"
    >
      {/* Section header — always visible */}
      <div className="galaxy-header">
        <p className="galaxy-eyebrow">Skills</p>
        <h2 className="galaxy-title">Skill Galaxy</h2>
      </div>

      <div className="galaxy-shell">

        {/* ── GALAXY CANVAS ── */}
        <AnimatePresence>
          {!exploreMode && (
            <motion.div
              key="canvas"
              className="galaxy-canvas-wrap"
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.88,
                transition: { duration: 0.55, ease: 'easeInOut' },
              }}
            >
              <Canvas
                gl={{ alpha: true }}
                camera={{ position: [0, 8, 18], fov: 45 }}
                style={{ background: 'transparent', zIndex: 1 }}
              >
                <ResponsiveCamera />
                {/* Lighting — warm red palette */}
                <ambientLight intensity={0.35} />
                <pointLight
                  position={[0, 0, 0]}
                  color="#D62828"
                  intensity={5}
                  distance={30}
                  decay={2}
                />
                <pointLight
                  position={[10, 6, 4]}
                  color="#ff4500"
                  intensity={1.5}
                  distance={30}
                  decay={2}
                />
                <directionalLight position={[5, 5, 5]} color="#fff0f0" intensity={0.6} />

                {/* ── Central Planet Assembly (pushed back to Z = -1.2) ── */}
                <group position={[0, 0, -1.2]}>
                  {/* Core sphere */}
                  <mesh>
                    <sphereGeometry args={[0.85, 64, 64]} />
                    <meshStandardMaterial
                      color="#8B0000"
                      emissive="#D62828"
                      emissiveIntensity={1.2}
                      roughness={0.1}
                      metalness={0.8}
                    />
                  </mesh>
                  {/* Core outer glow */}
                  <mesh>
                    <sphereGeometry args={[1.3, 32, 32]} />
                    <meshStandardMaterial
                      color="#D62828"
                      transparent
                      opacity={0.06}
                      side={2}
                    />
                  </mesh>

                  {/* Invisible 3D depth mask for orbit lines */}
                  <mesh>
                    <sphereGeometry args={[1.3, 64, 64]} />
                    <meshBasicMaterial colorWrite={false} depthWrite={true} />
                  </mesh>

                  {/* Explore button inside Canvas as HTML overlay */}
                  <Html center>
                    <button
                      className="explore-btn"
                      onClick={() => setExploreMode(true)}
                      aria-label="Explore Skills"
                      style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
                    >
                      <span className="explore-btn-pulse" />
                      <span className="explore-btn-label">
                        Explore<br />Skills
                      </span>
                    </button>
                  </Html>
                </group>

                {/* Orbit rings */}
                {rings.map((ring, i) => (
                  <OrbitRing key={i} radius={ring.radius} />
                ))}

                {/* Skill planets */}
                {skills.map((skill, i) => {
                  const ring = rings[skill.orbit - 1];
                  return (
                    <Planet
                      key={i}
                      icon={skill.icon}
                      name={skill.name}
                      radius={ring.radius}
                      speed={0.15}
                      angle={(skill.angle * Math.PI) / 180}
                      zOffset={ring.z}
                    />
                  );
                })}
              </Canvas>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SKILL SHOWCASE ── */}
        <AnimatePresence>
          {exploreMode && (
            <motion.div
              key="showcase"
              className="skill-showcase-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {/* Header */}
              <motion.div
                className="skill-showcase-header"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.5 } }}
              >
                <p className="skill-showcase-sub">TECHNICAL SKILLS</p>
                <h3 className="skill-showcase-title">Full Stack Arsenal</h3>
              </motion.div>

              {/* Skill cards grid */}
              <div className="skill-showcase-grid">
                {showcaseSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="skill-showcase-card"
                    initial={{ opacity: 0, y: 40, scale: 0.82 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.12 + i * 0.07,
                      duration: 0.44,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.06,
                      transition: { duration: 0.18 },
                    }}
                  >
                    <div className="skill-showcase-icon">
                      <img src={skill.img} alt={skill.name} draggable={false} />
                    </div>
                    <span className="skill-showcase-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Back button */}
              <motion.button
                className="back-galaxy-btn"
                onClick={() => setExploreMode(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.4 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                ← Back To Galaxy
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>{/* /galaxy-shell */}
    </section>
  );
}

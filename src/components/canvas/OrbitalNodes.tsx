'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitalNodesProps {
  isDark: boolean;
  impulseRef: React.MutableRefObject<number>;
  mode: 'prism' | 'lattice' | 'overdrive';
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}

const PARTICLE_COUNT = 44;

export function OrbitalNodes({ isDark, impulseRef, mode, pointerRef }: OrbitalNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.05 + (i % 5) * 0.22;
      return {
        phi,
        theta,
        radius,
        speed: 0.12 + (i % 7) * 0.03,
        scale: 0.018 + (i % 3) * 0.008,
      };
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMult = mode === 'overdrive' ? 2.2 : mode === 'lattice' ? 1.35 : 1.0;
    const boost = 1 + impulseRef.current * 2.5;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        pointerRef.current.x * 0.45,
        3.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -pointerRef.current.y * 0.35,
        3.5,
        delta
      );
      const ringScale = 1 + impulseRef.current * 0.12;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(groupRef.current.scale.x, ringScale, 6, delta)
      );
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.42 * speedMult * boost;
      ring1Ref.current.rotation.x = Math.PI * 0.32 + Math.sin(t * 0.5) * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.34 * speedMult * boost;
      ring2Ref.current.rotation.y = Math.PI * 0.28 + Math.cos(t * 0.45) * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.28 * speedMult * boost;
      ring3Ref.current.rotation.x = -Math.PI * 0.24;
      ring3Ref.current.rotation.y = -Math.PI * 0.22 + Math.sin(t * 0.35) * 0.06;
    }

    if (instancedRef.current) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const angle = p.theta + t * p.speed * speedMult;
        const r = p.radius + Math.sin(t * 1.4 + i) * 0.06 + impulseRef.current * 0.18;
        dummy.position.set(
          r * Math.sin(p.phi) * Math.cos(angle),
          r * Math.cos(p.phi) + pointerRef.current.y * 0.12,
          r * Math.sin(p.phi) * Math.sin(angle)
        );
        dummy.scale.setScalar(p.scale * (mode === 'overdrive' ? 1.35 : 1));
        dummy.updateMatrix();
        instancedRef.current.setMatrixAt(i, dummy.matrix);
      }
      instancedRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const ringOpacity = isDark ? 0.38 : 0.26;

  return (
    <group ref={groupRef}>
      {/* Ring 01: Full-Stack Web (#FF5C1A Vermilion) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.78, 0.009, 16, 128]} />
          <meshStandardMaterial
            color={isDark ? '#FF7844' : '#18181B'}
            transparent
            opacity={ringOpacity}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[1.78, 0, 0]}>
          <sphereGeometry args={[0.065, 24, 24]} />
          <meshStandardMaterial
            color="#FF5C1A"
            emissive="#FF5C1A"
            emissiveIntensity={isDark ? 1.8 : 0.85}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Ring 02: Mobile Core (#3FA98A Emerald) */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.02, 0.008, 16, 128]} />
          <meshStandardMaterial
            color={isDark ? '#3FA98A' : '#3F3F46'}
            transparent
            opacity={ringOpacity * 0.9}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-2.02, 0, 0]}>
          <sphereGeometry args={[0.058, 24, 24]} />
          <meshStandardMaterial
            color="#3FA98A"
            emissive="#3FA98A"
            emissiveIntensity={isDark ? 1.7 : 0.8}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Ring 03: Enterprise Systems (#7B6CF6 Violet) */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.24, 0.007, 16, 128]} />
          <meshStandardMaterial
            color={isDark ? '#9B8AFB' : '#52525B'}
            transparent
            opacity={ringOpacity * 0.8}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 2.24, 0]}>
          <sphereGeometry args={[0.052, 24, 24]} />
          <meshStandardMaterial
            color="#7B6CF6"
            emissive="#7B6CF6"
            emissiveIntensity={isDark ? 1.8 : 0.85}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Ambient Precision Coordinate Field */}
      <instancedMesh
        ref={instancedRef}
        args={[undefined, undefined, PARTICLE_COUNT]}
        raycast={() => null}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial
          color={isDark ? '#E4E4E7' : '#27272A'}
          transparent
          opacity={isDark ? 0.5 : 0.35}
        />
      </instancedMesh>
    </group>
  );
}

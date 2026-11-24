'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface KineticCoreProps {
  isDark: boolean;
  mode: 'prism' | 'lattice' | 'overdrive';
  impulseRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  onCoreInteract: () => void;
}

export function KineticCore({
  isDark,
  mode,
  impulseRef,
  pointerRef,
  onCoreInteract,
}: KineticCoreProps) {
  const assemblyRef = useRef<THREE.Group>(null);
  const shellGroupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const innerLatticeRef = useRef<THREE.Mesh>(null);
  const innerMatRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    impulseRef.current = THREE.MathUtils.damp(impulseRef.current, 0, 3.2, delta);
    const spinBoost = 1 + impulseRef.current * 5.5 + (mode === 'overdrive' ? 1.4 : 0);

    if (assemblyRef.current) {
      const targetRotX = -pointerRef.current.y * 0.55 + Math.sin(t * 0.6) * 0.06;
      const targetRotY = pointerRef.current.x * 0.65 + Math.cos(t * 0.5) * 0.06;

      assemblyRef.current.rotation.x = THREE.MathUtils.damp(
        assemblyRef.current.rotation.x,
        targetRotX,
        4.5,
        delta
      );
      assemblyRef.current.rotation.y = THREE.MathUtils.damp(
        assemblyRef.current.rotation.y,
        targetRotY,
        4.5,
        delta
      );

      assemblyRef.current.position.x = THREE.MathUtils.damp(
        assemblyRef.current.position.x,
        pointerRef.current.x * 0.22,
        4,
        delta
      );
      assemblyRef.current.position.y = THREE.MathUtils.damp(
        assemblyRef.current.position.y,
        pointerRef.current.y * 0.18,
        4,
        delta
      );
    }

    if (shellGroupRef.current) {
      shellGroupRef.current.rotation.y += delta * 0.24 * spinBoost;
      shellGroupRef.current.rotation.z += delta * 0.14 * spinBoost;
      const targetScale = (hovered ? 1.05 : 1.0) + impulseRef.current * 0.12;
      shellGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(shellGroupRef.current.scale.x, targetScale, 7, delta)
      );
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.48 * spinBoost;
      innerCoreRef.current.rotation.y -= delta * 0.36 * spinBoost;
      const pulse = 1 + Math.sin(t * 2.4) * 0.035 + impulseRef.current * 0.16;
      innerCoreRef.current.scale.setScalar(pulse);
    }

    if (innerLatticeRef.current) {
      innerLatticeRef.current.rotation.x += delta * 0.32 * spinBoost;
      innerLatticeRef.current.rotation.z -= delta * 0.28 * spinBoost;
    }

    if (innerMatRef.current) {
      const targetColor = new THREE.Color(
        mode === 'overdrive' || isDark ? '#FF5C1A' : '#18181B'
      );
      innerMatRef.current.color.lerp(targetColor, Math.min(1, delta * 5));
      innerMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        innerMatRef.current.emissiveIntensity,
        (isDark ? 0.6 : 0.25) + impulseRef.current * 1.4 + (mode === 'overdrive' ? 0.55 : 0),
        5,
        delta
      );
    }
  });

  const handleOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = '';
  };

  const handleDown = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    impulseRef.current = 1.0;
    onCoreInteract();
  };

  return (
    <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.35}>
      <group ref={assemblyRef}>
        <group ref={shellGroupRef}>
          {/* Mode 1 & 2: Refractive Optical Icosahedron / Anodized Lattice */}
          <mesh
            visible={mode !== 'overdrive'}
            onPointerOver={handleOver}
            onPointerOut={handleOut}
            onPointerDown={handleDown}
          >
            <icosahedronGeometry args={[1.34, 0]} />
            {mode === 'lattice' ? (
              <meshPhysicalMaterial
                color={isDark ? '#F4F4F5' : '#18181B'}
                wireframe
                metalness={0.85}
                roughness={0.14}
                emissive="#FF5C1A"
                emissiveIntensity={isDark ? 0.45 : 0.18}
              />
            ) : (
              <meshPhysicalMaterial
                color={isDark ? '#DDD6FE' : '#FFFFFF'}
                transmission={0.95}
                opacity={1}
                transparent
                roughness={isDark ? 0.1 : 0.05}
                ior={1.52}
                thickness={1.25}
                dispersion={0.55}
                iridescence={0.65}
                iridescenceIOR={1.35}
                clearcoat={1}
                clearcoatRoughness={0.06}
                attenuationColor={isDark ? '#7B6CF6' : '#FFE4D6'}
                attenuationDistance={2.2}
              />
            )}
          </mesh>

          {/* Mode 3: Kinetic Torus-Knot Refractive Sculpture */}
          <mesh
            visible={mode === 'overdrive'}
            onPointerOver={handleOver}
            onPointerOut={handleOut}
            onPointerDown={handleDown}
          >
            <torusKnotGeometry args={[0.88, 0.25, 128, 32]} />
            <meshPhysicalMaterial
              color={isDark ? '#F5F3FF' : '#FFFFFF'}
              transmission={0.94}
              opacity={1}
              transparent
              roughness={0.07}
              ior={1.55}
              thickness={1.1}
              dispersion={0.7}
              iridescence={0.85}
              clearcoat={1}
              attenuationColor="#FF5C1A"
              attenuationDistance={2.0}
            />
          </mesh>

          {/* Precision Facet Edge Highlight */}
          <mesh visible={mode !== 'overdrive'} scale={1.348} raycast={() => null}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
              color={isDark ? '#FFFFFF' : '#09090B'}
              wireframe
              transparent
              opacity={hovered ? 0.28 : isDark ? 0.15 : 0.11}
            />
          </mesh>
        </group>

        {/* Inner Anodized Logic Core */}
        <mesh ref={innerCoreRef} raycast={() => null}>
          <octahedronGeometry args={[0.58, 0]} />
          <meshPhysicalMaterial
            ref={innerMatRef}
            color={isDark ? '#FF5C1A' : '#18181B'}
            emissive="#FF5C1A"
            emissiveIntensity={0.28}
            metalness={0.78}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Inner Geodesic Sub-Lattice */}
        <mesh ref={innerLatticeRef} raycast={() => null}>
          <icosahedronGeometry args={[0.82, 1]} />
          <meshBasicMaterial
            color="#FF5C1A"
            wireframe
            transparent
            opacity={isDark ? 0.36 : 0.24}
          />
        </mesh>
      </group>
    </Float>
  );
}

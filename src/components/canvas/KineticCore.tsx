'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface KineticCoreProps {
  impulseRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  onCoreInteract: () => void;
}

const PORTRAIT_SRC = '/husni-hero-cutout.png';
// Visible frustum height at z=0 for camera z=5.0, fov=40deg: 2 * 5 * tan(20deg) = 3.6397
const BASE_Y = -1.82;
const PLANE_WIDTH = 2.84;
const PLANE_HEIGHT = 3.55; // Exact 4:5 (1200x1500) aspect ratio

export function KineticCore({
  impulseRef,
  pointerRef,
  onCoreInteract,
}: KineticCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const gl = useThree((state) => state.gl);
  const [hovered, setHovered] = useState(false);

  const portraitTexture = useTexture(PORTRAIT_SRC);

  // Anchor pivot at the bottom edge (y = 0) so the cutout rests flush on the hairline rule
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    geo.translate(0, PLANE_HEIGHT / 2, 0);
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useEffect(() => {
    portraitTexture.colorSpace = THREE.SRGBColorSpace;
    portraitTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    portraitTexture.minFilter = THREE.LinearMipmapLinearFilter;
    portraitTexture.magFilter = THREE.LinearFilter;
    portraitTexture.generateMipmaps = true;
    portraitTexture.needsUpdate = true;

    return () => {
      document.body.style.cursor = '';
    };
  }, [portraitTexture, gl]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    impulseRef.current = THREE.MathUtils.damp(impulseRef.current, 0, 4.5, delta);

    if (meshRef.current) {
      const tiltX = -pointerRef.current.y * 0.05 + Math.sin(t * 0.65) * 0.006;
      const tiltY = pointerRef.current.x * 0.11 + Math.cos(t * 0.55) * 0.008;

      meshRef.current.rotation.x = THREE.MathUtils.damp(
        meshRef.current.rotation.x,
        tiltX,
        5,
        delta
      );
      meshRef.current.rotation.y = THREE.MathUtils.damp(
        meshRef.current.rotation.y,
        tiltY,
        5,
        delta
      );

      meshRef.current.position.x = THREE.MathUtils.damp(
        meshRef.current.position.x,
        pointerRef.current.x * 0.05,
        4.5,
        delta
      );
      meshRef.current.position.y = BASE_Y;

      const targetScale = (hovered ? 1.015 : 1.0) + impulseRef.current * 0.025;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta)
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, BASE_Y, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = '';
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        impulseRef.current = 1.0;
        onCoreInteract();
      }}
    >
      <meshBasicMaterial
        map={portraitTexture}
        transparent
        alphaTest={0.01}
        toneMapped={false}
      />
    </mesh>
  );
}

useTexture.preload(PORTRAIT_SRC);

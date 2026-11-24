'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface KineticCoreProps {
  impulseRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  onCoreInteract: () => void;
}

/**
 * Generates a crisp anti-aliased 4:5 rounded-corner alpha mask (frameless, zero border).
 */
function createRoundedAlphaMask(): THREE.CanvasTexture {
  const w = 800;
  const h = 1000;
  const r = 48;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, r);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export function KineticCore({
  impulseRef,
  pointerRef,
  onCoreInteract,
}: KineticCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const gl = useThree((state) => state.gl);
  const [hovered, setHovered] = useState(false);

  const portraitTexture = useTexture('/husni-portrait-hd.jpg');

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

  const alphaMask = useMemo(() => createRoundedAlphaMask(), []);

  useEffect(() => {
    return () => {
      alphaMask.dispose();
    };
  }, [alphaMask]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    impulseRef.current = THREE.MathUtils.damp(impulseRef.current, 0, 4.5, delta);

    if (meshRef.current) {
      const tiltX = -pointerRef.current.y * 0.1 + Math.sin(t * 0.7) * 0.01;
      const tiltY = pointerRef.current.x * 0.14 + Math.cos(t * 0.6) * 0.01;

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
        pointerRef.current.x * 0.08,
        4.5,
        delta
      );
      meshRef.current.position.y = THREE.MathUtils.damp(
        meshRef.current.position.y,
        pointerRef.current.y * 0.06,
        4.5,
        delta
      );

      const targetScale = (hovered ? 1.02 : 1.0) + impulseRef.current * 0.03;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta)
      );
    }
  });

  // Exact 4:5 (0.80) aspect ratio matching 1440x1800 HD image — zero stretching
  return (
    <Float speed={1.2} rotationIntensity={0.02} floatIntensity={0.08}>
      <mesh
        ref={meshRef}
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
        <planeGeometry args={[3.28, 4.1]} />
        <meshBasicMaterial
          map={portraitTexture}
          alphaMap={alphaMask}
          transparent
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

useTexture.preload('/husni-portrait-hd.jpg');

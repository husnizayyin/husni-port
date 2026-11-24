'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export type PortraitMode = 'auto360' | 'cursor360' | 'workspace';

interface KineticCoreProps {
  isDark: boolean;
  mode: PortraitMode;
  impulseRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  onCoreInteract: () => void;
}

const VIDEO_SOURCES: Record<PortraitMode, { src: string; portrait: boolean }> = {
  auto360: {
    src: '/Man_performing_360_degree_rotation_20261008190600.mp4',
    portrait: true,
  },
  cursor360: {
    src: '/Man_performing_turntable_rotation_20261008184107.mp4',
    portrait: true,
  },
  workspace: {
    src: '/Man_working_on_laptop_20261008193108.mp4',
    portrait: false,
  },
};

export function KineticCore({
  isDark,
  mode,
  impulseRef,
  pointerRef,
  onCoreInteract,
}: KineticCoreProps) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
  const [hovered, setHovered] = useState(false);

  // Cleanly initialize & switch HTML5 video texture for Husni's 3D portrait
  useEffect(() => {
    const config = VIDEO_SOURCES[mode];
    const vid = document.createElement('video');
    vid.src = config.src;
    vid.crossOrigin = 'anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'auto';

    const tex = new THREE.VideoTexture(vid);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    if (config.portrait) {
      // Frame Husni's 720x1280 3D turntable portrait cleanly inside the 3D monolith
      tex.repeat.set(0.92, 0.84);
      tex.offset.set(0.04, 0.08);
    } else {
      // Center-crop 1280x720 workspace view nicely into the 3D card
      tex.repeat.set(0.56, 0.92);
      tex.offset.set(0.18, 0.04);
    }

    videoRef.current = vid;
    setVideoTexture(tex);

    if (mode !== 'cursor360') {
      vid.play().catch(() => {});
    } else {
      vid.play()
        .then(() => {
          vid.pause();
          vid.currentTime = 0;
        })
        .catch(() => {});
    }

    return () => {
      vid.pause();
      vid.removeAttribute('src');
      vid.load();
      tex.dispose();
      document.body.style.cursor = '';
    };
  }, [mode]);

  const rimGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.58, 3.58, 0.14)), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    impulseRef.current = THREE.MathUtils.damp(impulseRef.current, 0, 4.0, delta);

    // Interactive cursor-scrubbing when in "cursor360" mode
    const vid = videoRef.current;
    if (mode === 'cursor360' && vid && vid.readyState >= 2 && vid.duration > 0) {
      const normalized = THREE.MathUtils.clamp((pointerRef.current.x + 1) * 0.5, 0, 0.99);
      const targetTime = normalized * vid.duration;
      vid.currentTime = THREE.MathUtils.damp(vid.currentTime, targetTime, 8, delta);
    }

    if (cardGroupRef.current) {
      const tiltX = -pointerRef.current.y * 0.24 + Math.sin(t * 0.8) * 0.025;
      const tiltY =
        pointerRef.current.x * 0.34 +
        Math.cos(t * 0.65) * 0.03 +
        impulseRef.current * 0.35;

      cardGroupRef.current.rotation.x = THREE.MathUtils.damp(
        cardGroupRef.current.rotation.x,
        tiltX,
        5,
        delta
      );
      cardGroupRef.current.rotation.y = THREE.MathUtils.damp(
        cardGroupRef.current.rotation.y,
        tiltY,
        5,
        delta
      );

      cardGroupRef.current.position.x = THREE.MathUtils.damp(
        cardGroupRef.current.position.x,
        pointerRef.current.x * 0.16,
        4.5,
        delta
      );
      cardGroupRef.current.position.y = THREE.MathUtils.damp(
        cardGroupRef.current.position.y,
        pointerRef.current.y * 0.12,
        4.5,
        delta
      );

      const targetScale = (hovered ? 1.03 : 1.0) + impulseRef.current * 0.05;
      cardGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(cardGroupRef.current.scale.x, targetScale, 7, delta)
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.22}>
      <group
        ref={cardGroupRef}
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
        {/* 3D Architectural Portrait Pedestal Chassis */}
        <RoundedBox args={[2.56, 3.56, 0.14]} radius={0.14} smoothness={5}>
          <meshPhysicalMaterial
            color={isDark ? '#18181B' : '#F4F4F5'}
            metalness={isDark ? 0.65 : 0.15}
            roughness={isDark ? 0.25 : 0.35}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </RoundedBox>

        {/* Precision Accent Rim Line */}
        <lineSegments geometry={rimGeometry} raycast={() => null}>
          <lineBasicMaterial
            color={hovered ? '#FF5C1A' : isDark ? '#3F3F46' : '#D4D4D8'}
            transparent
            opacity={0.7}
          />
        </lineSegments>

        {/* Front 3D Video Portrait Surface (Husni 360° 3D Turntable) */}
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[2.38, 3.38]} />
          {videoTexture ? (
            <meshBasicMaterial map={videoTexture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#EAEAE6" />
          )}
        </mesh>

        {/* Subtle Optical Glass Sheen Layer Over Portrait */}
        <mesh position={[0, 0, 0.08]} raycast={() => null}>
          <planeGeometry args={[2.38, 3.38]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent
            opacity={0.06}
            roughness={0.05}
            metalness={0.1}
            clearcoat={1}
          />
        </mesh>

        {/* Back Plate Signature Accent */}
        <mesh position={[0, 0, -0.075]} rotation={[0, Math.PI, 0]} raycast={() => null}>
          <planeGeometry args={[2.36, 3.36]} />
          <meshStandardMaterial
            color={isDark ? '#09090B' : '#FAFAFA'}
            metalness={0.4}
            roughness={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

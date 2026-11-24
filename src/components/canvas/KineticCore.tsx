'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface KineticCoreProps {
  impulseRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  onCoreInteract: () => void;
}

/**
 * Extracts a clean, frameless, background-keyed headshot texture from the studio portrait source
 * with anti-aliased edge feathering and a smooth bust fade.
 */
function buildFramelessHeadshotCanvas(video: HTMLVideoElement): HTMLCanvasElement {
  const vw = video.videoWidth || 720;
  const vh = video.videoHeight || 1280;

  // Crop strictly to head & shoulders headshot region
  const sx = Math.round(vw * 0.14);
  const sy = Math.round(vh * 0.06);
  const sw = Math.round(vw * 0.72);
  const sh = Math.round(vh * 0.44);

  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return canvas;

  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);
  const imgData = ctx.getImageData(0, 0, sw, sh);
  const data = imgData.data;

  // Sample average studio backdrop color from top-left and top-right corners
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let samples = 0;
  for (let y = 2; y < 18; y++) {
    for (let x = 2; x < 18; x++) {
      const i1 = (y * sw + x) * 4;
      const i2 = (y * sw + (sw - 1 - x)) * 4;
      sumR += data[i1] + data[i2];
      sumG += data[i1 + 1] + data[i2 + 1];
      sumB += data[i1 + 2] + data[i2 + 2];
      samples += 2;
    }
  }
  const bgR = sumR / samples;
  const bgG = sumG / samples;
  const bgB = sumB / samples;

  const total = sw * sh;
  const bgMask = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  const isBackdropPixel = (idx: number): boolean => {
    const p = idx * 4;
    const dr = data[p] - bgR;
    const dg = data[p + 1] - bgG;
    const db = data[p + 2] - bgB;
    const dist = Math.hypot(dr, dg, db);
    const chroma = Math.max(Math.abs(dr - dg), Math.abs(dg - db), Math.abs(dr - db));
    return dist < 30 && chroma < 14;
  };

  // Seed flood-fill from top, left, and right borders
  for (let x = 0; x < sw; x++) {
    if (isBackdropPixel(x)) {
      bgMask[x] = 1;
      queue[tail++] = x;
    }
  }
  for (let y = 1; y < sh; y++) {
    const leftIdx = y * sw;
    const rightIdx = y * sw + (sw - 1);
    if (bgMask[leftIdx] === 0 && isBackdropPixel(leftIdx)) {
      bgMask[leftIdx] = 1;
      queue[tail++] = leftIdx;
    }
    if (bgMask[rightIdx] === 0 && isBackdropPixel(rightIdx)) {
      bgMask[rightIdx] = 1;
      queue[tail++] = rightIdx;
    }
  }

  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % sw;
    const cy = (curr / sw) | 0;

    if (cx > 0) {
      const n = curr - 1;
      if (bgMask[n] === 0 && isBackdropPixel(n)) {
        bgMask[n] = 1;
        queue[tail++] = n;
      }
    }
    if (cx < sw - 1) {
      const n = curr + 1;
      if (bgMask[n] === 0 && isBackdropPixel(n)) {
        bgMask[n] = 1;
        queue[tail++] = n;
      }
    }
    if (cy > 0) {
      const n = curr - sw;
      if (bgMask[n] === 0 && isBackdropPixel(n)) {
        bgMask[n] = 1;
        queue[tail++] = n;
      }
    }
    if (cy < sh - 1) {
      const n = curr + sw;
      if (bgMask[n] === 0 && isBackdropPixel(n)) {
        bgMask[n] = 1;
        queue[tail++] = n;
      }
    }
  }

  // Compute soft anti-aliased alpha at silhouette boundary + smooth bottom fade
  const alphaOut = new Float32Array(total);
  for (let i = 0; i < total; i++) {
    if (bgMask[i] === 1) {
      alphaOut[i] = 0;
    } else {
      const x = i % sw;
      const y = (i / sw) | 0;
      let nearBg = false;
      for (let dy = -2; dy <= 2 && !nearBg; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= sh) continue;
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= sw) continue;
          if (bgMask[ny * sw + nx] === 1) {
            nearBg = true;
            break;
          }
        }
      }

      let a = 1.0;
      if (nearBg) {
        const p = i * 4;
        const dr = data[p] - bgR;
        const dg = data[p + 1] - bgG;
        const db = data[p + 2] - bgB;
        const dist = Math.hypot(dr, dg, db);
        a = Math.min(1, Math.max(0, (dist - 14) / 28));
      }

      // Smooth frameless fade along bottom chest edge so there is zero hard border
      const nyNorm = y / sh;
      if (nyNorm > 0.8) {
        const t = (1.0 - nyNorm) / 0.2;
        const smooth = t * t * (3 - 2 * t);
        a *= Math.max(0, Math.min(1, smooth));
      }

      alphaOut[i] = a;
    }
  }

  // 1-pass 3x3 box feather on alpha channel for silky hairline transitions
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const idx = y * sw + x;
      let sum = 0;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= sh) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= sw) continue;
          sum += alphaOut[ny * sw + nx];
          count++;
        }
      }
      data[idx * 4 + 3] = Math.round((sum / count) * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

export function KineticCore({
  impulseRef,
  pointerRef,
  onCoreInteract,
}: KineticCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [headshotTexture, setHeadshotTexture] = useState<THREE.CanvasTexture | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let active = true;
    let createdTex: THREE.CanvasTexture | null = null;

    const vid = document.createElement('video');
    vid.src = '/Man_performing_turntable_rotation_20261008184107.mp4';
    vid.crossOrigin = 'anonymous';
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'auto';

    const tryExtract = () => {
      if (!active || createdTex) return;
      if (!vid.videoWidth || vid.readyState < 2) return;
      const canvas = buildFramelessHeadshotCanvas(vid);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      createdTex = tex;
      vid.pause();
      setHeadshotTexture(tex);
    };

    const handleLoaded = () => {
      if ('requestVideoFrameCallback' in vid) {
        (vid as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => void }).requestVideoFrameCallback(() => {
          tryExtract();
        });
      }
      vid.play()
        .then(() => {
          tryExtract();
        })
        .catch(() => {
          vid.currentTime = 0.04;
        });
    };

    vid.addEventListener('loadeddata', handleLoaded);
    vid.addEventListener('seeked', tryExtract);
    vid.load();

    return () => {
      active = false;
      vid.pause();
      vid.removeEventListener('loadeddata', handleLoaded);
      vid.removeEventListener('seeked', tryExtract);
      vid.removeAttribute('src');
      if (createdTex) createdTex.dispose();
      document.body.style.cursor = '';
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    impulseRef.current = THREE.MathUtils.damp(impulseRef.current, 0, 4.5, delta);

    if (meshRef.current) {
      const tiltX = -pointerRef.current.y * 0.14 + Math.sin(t * 0.7) * 0.015;
      const tiltY = pointerRef.current.x * 0.2 + Math.cos(t * 0.6) * 0.015;

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
        pointerRef.current.x * 0.12,
        4.5,
        delta
      );
      meshRef.current.position.y = THREE.MathUtils.damp(
        meshRef.current.position.y,
        pointerRef.current.y * 0.09,
        4.5,
        delta
      );

      const targetScale = (hovered ? 1.025 : 1.0) + impulseRef.current * 0.035;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta)
      );
    }
  });

  if (!headshotTexture) return null;

  return (
    <Float speed={1.3} rotationIntensity={0.03} floatIntensity={0.12}>
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
        <planeGeometry args={[3.45, 3.98]} />
        <meshBasicMaterial
          map={headshotTexture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

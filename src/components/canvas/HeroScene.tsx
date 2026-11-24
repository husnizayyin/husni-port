'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { KineticCore } from './KineticCore';
import { useAppSound } from '@/context/SoundProvider';

export default function HeroScene() {
  const { playSound } = useAppSound();

  const impulseRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current = { x: nx, y: ny };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] select-none">
      <Canvas
        dpr={[2, 3]}
        camera={{ position: [0, 0, 5.15], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <KineticCore
            impulseRef={impulseRef}
            pointerRef={pointerRef}
            onCoreInteract={() => playSound('pulse')}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { useTheme } from '@/context/ThemeProvider';
import { KineticCore, type PortraitMode } from './KineticCore';
import { OrbitalNodes } from './OrbitalNodes';
import { useAppSound } from '@/context/SoundProvider';
import { Rotate3d, MousePointerClick, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

const MODES: {
  id: PortraitMode;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'auto360', label: '360° Spin', Icon: Rotate3d },
  { id: 'cursor360', label: 'Interactive 3D', Icon: MousePointerClick },
  { id: 'workspace', label: 'Workspace', Icon: Laptop },
];

export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const { playSound } = useAppSound();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<PortraitMode>('auto360');

  const impulseRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current = { x: nx, y: ny };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const handleCoreInteract = () => {
    playSound('pulse');
  };

  const orbitalMode =
    mode === 'workspace' ? 'overdrive' : mode === 'cursor360' ? 'lattice' : 'prism';

  return (
    <div className="relative h-[460px] w-full select-none sm:h-[540px] lg:h-[580px]">
      {/* Soft Studio Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-10 rounded-full opacity-50 blur-3xl transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255,92,26,0.16) 0%, rgba(123,108,246,0.12) 48%, transparent 72%)'
            : 'radial-gradient(circle, rgba(255,92,26,0.10) 0%, rgba(63,169,138,0.08) 48%, transparent 72%)',
        }}
      />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 0.85 : 1.25} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={isDark ? 2.0 : 2.5}
            color="#FFFFFF"
          />
          <directionalLight
            position={[-4, -2, -3]}
            intensity={isDark ? 1.2 : 0.8}
            color="#7B6CF6"
          />

          <Environment resolution={256}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer
                intensity={isDark ? 3.0 : 4.5}
                rotation-x={Math.PI / 2}
                position={[0, 5, -6]}
                scale={[10, 10, 1]}
                color="#FFFFFF"
              />
              <Lightformer
                intensity={1.8}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={[12, 3, 1]}
                color="#FF5C1A"
              />
              <Lightformer
                intensity={1.8}
                rotation-y={-Math.PI / 2}
                position={[6, -1, 1]}
                scale={[12, 3, 1]}
                color="#3FA98A"
              />
            </group>
          </Environment>

          <KineticCore
            isDark={isDark}
            mode={mode}
            impulseRef={impulseRef}
            pointerRef={pointerRef}
            onCoreInteract={handleCoreInteract}
          />

          <OrbitalNodes
            isDark={isDark}
            impulseRef={impulseRef}
            mode={orbitalMode}
            pointerRef={pointerRef}
          />

          <ContactShadows
            position={[0, -2.35, 0]}
            opacity={isDark ? 0.5 : 0.2}
            scale={7.5}
            blur={2.4}
            far={4}
            color={isDark ? '#000000' : '#18181B'}
          />
        </Suspense>
      </Canvas>

      {/* Interactive 3D Portrait Controls */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-200/90 bg-white/90 p-1 shadow-sm backdrop-blur-md transition-colors dark:border-zinc-800 dark:bg-zinc-900/90">
        {MODES.map(({ id, label, Icon }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              type="button"
              onPointerDown={() => {
                playSound('tick');
                impulseRef.current = 0.6;
              }}
              onClick={() => setMode(id)}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                active
                  ? 'bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-zinc-950'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { useTheme } from '@/context/ThemeProvider';
import { KineticCore } from './KineticCore';
import { OrbitalNodes } from './OrbitalNodes';
import { useAppSound } from '@/context/SoundProvider';
import { Sparkles, Box, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

type CoreMode = 'prism' | 'lattice' | 'overdrive';

const MODES: { id: CoreMode; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'prism', label: 'Prism', Icon: Sparkles },
  { id: 'lattice', label: 'Lattice', Icon: Box },
  { id: 'overdrive', label: 'Kinetic', Icon: Cpu },
];

export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const { playSound } = useAppSound();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<CoreMode>('prism');
  const [pulseCount, setPulseCount] = useState(0);

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
    setPulseCount((c) => c + 1);
  };

  return (
    <div className="relative h-[430px] w-full select-none sm:h-[520px] lg:h-[600px]">
      {/* Subtle Ambient Aura Behind Sculpture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-10 rounded-full opacity-50 blur-3xl transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255,92,26,0.18) 0%, rgba(123,108,246,0.14) 45%, transparent 72%)'
            : 'radial-gradient(circle, rgba(255,92,26,0.12) 0%, rgba(63,169,138,0.09) 48%, transparent 72%)',
        }}
      />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 0.7 : 1.15} />
          <directionalLight
            position={[5, 6, 5]}
            intensity={isDark ? 2.4 : 3.0}
            color={isDark ? '#FFFFFF' : '#FFFBF7'}
          />
          <directionalLight
            position={[-5, -3, -4]}
            intensity={isDark ? 1.5 : 1.0}
            color="#7B6CF6"
          />
          <pointLight position={[2, -2, 3]} intensity={1.2} color="#FF5C1A" />

          {/* Procedural Studio HDRI Reflections (Zero External Network Requests) */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer
                intensity={isDark ? 3.5 : 5}
                rotation-x={Math.PI / 2}
                position={[0, 5, -6]}
                scale={[10, 10, 1]}
                color="#FFFFFF"
              />
              <Lightformer
                intensity={2.4}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={[12, 3, 1]}
                color="#FF5C1A"
              />
              <Lightformer
                intensity={2.2}
                rotation-y={-Math.PI / 2}
                position={[6, -1, 1]}
                scale={[12, 3, 1]}
                color="#3FA98A"
              />
              <Lightformer
                intensity={isDark ? 2.0 : 3.2}
                position={[0, -4, 4]}
                scale={[10, 4, 1]}
                color={isDark ? '#7B6CF6' : '#F4F4F5'}
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
            mode={mode}
            pointerRef={pointerRef}
          />

          <ContactShadows
            position={[0, -2.55, 0]}
            opacity={isDark ? 0.45 : 0.18}
            scale={8.5}
            blur={2.6}
            far={4}
            color={isDark ? '#000000' : '#18181B'}
          />
        </Suspense>
      </Canvas>

      {/* Interactive Stage HUD Controls */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/85 p-1 shadow-sm backdrop-blur-md transition-colors dark:border-zinc-800/90 dark:bg-zinc-900/85">
        {MODES.map(({ id, label, Icon }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              type="button"
              onPointerDown={() => {
                playSound('tick');
                impulseRef.current = 0.65;
              }}
              onClick={() => setMode(id)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-tight transition-all',
                active
                  ? 'bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{label}</span>
            </button>
          );
        })}
        <span className="hidden border-l border-zinc-200 pl-2 pr-2.5 font-mono text-[10px] text-zinc-400 sm:inline-block dark:border-zinc-800 dark:text-zinc-500">
          {pulseCount > 0 ? `RESONANCE ×${pulseCount}` : 'CLICK PRISM'}
        </span>
      </div>
    </div>
  );
}

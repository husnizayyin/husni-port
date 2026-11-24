'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';

export type SoundVariant = 'click' | 'tick' | 'light' | 'dark' | 'open' | 'pulse';

interface SoundContextValue {
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (variant?: SoundVariant) => void;
}

const SoundContext = createContext<SoundContextValue>({
  soundEnabled: true,
  toggleSound: () => {},
  playSound: () => {},
});

const STORAGE_KEY = 'husni-port-sound-enabled';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setSoundEnabled(saved === 'true');
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const [playClick] = useSound('/sounds/click-crisp.wav', {
    volume: 0.42,
    soundEnabled,
    interrupt: true,
  });

  const [playTick] = useSound('/sounds/nav-tick.wav', {
    volume: 0.34,
    soundEnabled,
    interrupt: true,
  });

  const [playLight] = useSound('/sounds/switch-light.wav', {
    volume: 0.45,
    soundEnabled,
    interrupt: true,
  });

  const [playDark] = useSound('/sounds/switch-dark.wav', {
    volume: 0.48,
    soundEnabled,
    interrupt: true,
  });

  const [playOpen] = useSound('/sounds/card-open.wav', {
    volume: 0.4,
    soundEnabled,
    interrupt: true,
  });

  const [playPulse] = useSound('/sounds/core-pulse.wav', {
    volume: 0.46,
    soundEnabled,
    interrupt: true,
  });

  const playSound = useCallback(
    (variant: SoundVariant = 'click') => {
      if (!soundEnabled) return;
      try {
        const rate = 0.97 + Math.random() * 0.06;
        switch (variant) {
          case 'click':
            playClick({ playbackRate: rate });
            break;
          case 'tick':
            playTick({ playbackRate: rate });
            break;
          case 'light':
            playLight();
            break;
          case 'dark':
            playDark();
            break;
          case 'open':
            playOpen({ playbackRate: 0.98 + Math.random() * 0.04 });
            break;
          case 'pulse':
            playPulse({ playbackRate: 0.95 + Math.random() * 0.1 });
            break;
        }
      } catch {
        // Non-blocking fail-safe
      }
    },
    [soundEnabled, playClick, playTick, playLight, playDark, playOpen, playPulse]
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // Ignore storage errors
      }
      if (next) {
        try {
          playLight({ forceSoundEnabled: true });
        } catch {
          // Ignore
        }
      }
      return next;
    });
  }, [playLight]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useAppSound() {
  return useContext(SoundContext);
}

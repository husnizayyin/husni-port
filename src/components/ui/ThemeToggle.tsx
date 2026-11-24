'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
import { useAppSound } from '@/context/SoundProvider';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { playSound } = useAppSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const handleToggle = () => {
    const nextIsDark = !isDark;
    playSound(nextIsDark ? 'dark' : 'light');
    setTheme(nextIsDark ? 'dark' : 'light');
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="relative flex h-9 w-16 items-center rounded-full border border-zinc-200 bg-zinc-100/90 p-1 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun className="ml-1.5 h-3.5 w-3.5 text-amber-500 opacity-70 dark:opacity-40" />
      <Moon className="ml-auto mr-1.5 h-3.5 w-3.5 text-indigo-400 opacity-40 dark:opacity-80" />

      {mounted && (
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 520, damping: 32 }}
          className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm dark:bg-zinc-800"
          style={{ left: isDark ? 'calc(100% - 32px)' : '4px' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <Moon className="h-3.5 w-3.5 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: 60, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -60, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.button>
  );
}

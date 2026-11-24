'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppSound, type SoundVariant } from '@/context/SoundProvider';
import { cn } from '@/lib/utils';

interface SoundButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: () => void;
  soundVariant?: SoundVariant;
  variant?: 'primary' | 'secondary' | 'ghost';
  ariaLabel?: string;
  type?: 'button' | 'submit';
}

export function SoundButton({
  children,
  className,
  href,
  target,
  rel,
  download,
  onClick,
  soundVariant = 'click',
  variant = 'primary',
  ariaLabel,
  type = 'button',
}: SoundButtonProps) {
  const { playSound } = useAppSound();

  const variantClasses = {
    primary:
      'bg-zinc-950 text-white border border-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:border-white dark:hover:bg-zinc-200',
    secondary:
      'bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800 dark:hover:border-zinc-600',
    ghost:
      'bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/70',
  }[variant];

  const sharedClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors select-none cursor-pointer',
    variantClasses,
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        aria-label={ariaLabel}
        whileHover={{ y: -1.5 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 450, damping: 26 }}
        onPointerDown={() => playSound(soundVariant)}
        onClick={() => onClick?.()}
        className={sharedClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 26 }}
      onPointerDown={() => playSound(soundVariant)}
      onClick={() => onClick?.()}
      className={sharedClasses}
    >
      {children}
    </motion.button>
  );
}

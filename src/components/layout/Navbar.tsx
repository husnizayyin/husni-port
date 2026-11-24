'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '@/data/profile';
import { useAppSound } from '@/context/SoundProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isArticlesRoute = pathname?.startsWith('/articles');

  const { soundEnabled, toggleSound, playSound } = useAppSound();
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_ITEMS.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-32% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <>
      {/* Top Scroll Velocity Hairline */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#FF5C1A] via-[#7B6CF6] to-[#3FA98A]"
      />

      <header className="fixed inset-x-0 top-4 z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5',
            scrolled
              ? 'border-zinc-200/90 bg-white/85 shadow-editorial-light backdrop-blur-xl dark:border-zinc-800/90 dark:bg-zinc-950/85 dark:shadow-editorial-dark'
              : 'border-zinc-200/60 bg-white/70 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/70'
          )}
        >
          {/* Brand Signature */}
          <Link
            href={isHome ? '#top' : '/'}
            onPointerDown={() => playSound('tick')}
            onClick={() => setActiveSection('')}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 font-display text-sm font-semibold text-white transition-transform group-hover:scale-105 dark:bg-white dark:text-zinc-950">
              HZ
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white">
                {PROFILE.shortName}
              </span>
              <span className="hidden items-center gap-1.5 text-[11px] text-zinc-500 sm:flex dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pills */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isArticlesItem = item.id === 'articles';
              const isActive = isArticlesRoute
                ? isArticlesItem
                : activeSection === item.id;
              const href = isArticlesItem
                ? '/articles'
                : isHome
                  ? `#${item.id}`
                  : `/#${item.id}`;

              return (
                <Link
                  key={item.id}
                  href={href}
                  onPointerDown={() => playSound('tick')}
                  onClick={() => {
                    if (!isArticlesItem && isHome) setActiveSection(item.id);
                  }}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'text-zinc-950 dark:text-white'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-zinc-100 dark:bg-zinc-800/90"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Audio Feedback Toggle + Theme Switch + Hire CTA */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Mute UI sounds' : 'Enable UI sounds'}
              title={soundEnabled ? 'UI Sound Effects: ON' : 'UI Sound Effects: MUTED'}
              className={cn(
                'flex h-9 items-center gap-1.5 rounded-full border px-3 font-mono text-[11px] font-medium transition-colors',
                soundEnabled
                  ? 'border-zinc-200 bg-zinc-100/90 text-zinc-900 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100'
                  : 'border-zinc-200/70 bg-transparent text-zinc-400 hover:text-zinc-700 dark:border-zinc-800/70 dark:text-zinc-500 dark:hover:text-zinc-300'
              )}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-[#FF5C1A]" />
                  <span className="hidden sm:inline">SFX</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">MUTE</span>
                </>
              )}
            </motion.button>

            <ThemeToggle />

            <Link
              href={isHome ? '#contact' : '/#contact'}
              onPointerDown={() => playSound('click')}
              className="hidden items-center gap-1 rounded-full bg-zinc-950 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800 md:inline-flex dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              aria-label="Toggle mobile menu"
              onPointerDown={() => playSound('tick')}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 lg:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-2 rounded-3xl border border-zinc-200 bg-white/95 p-4 shadow-editorial-light backdrop-blur-xl lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95 dark:shadow-editorial-dark"
            >
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const href =
                    item.id === 'articles'
                      ? '/articles'
                      : isHome
                        ? `#${item.id}`
                        : `/#${item.id}`;
                  return (
                    <Link
                      key={item.id}
                      href={href}
                      onPointerDown={() => playSound('tick')}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:text-zinc-100"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <Link
                href={isHome ? '#contact' : '/#contact'}
                onPointerDown={() => playSound('click')}
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-zinc-950 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

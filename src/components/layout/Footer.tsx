'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import {
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';
import { PROFILE } from '@/data/profile';
import { SoundButton } from '@/components/ui/SoundButton';
import { useAppSound } from '@/context/SoundProvider';
import { getJakartaTime } from '@/lib/utils';

const PLATFORM_STYLES: Record<
  (typeof PROFILE.socials)[number]['id'],
  { Icon: React.ComponentType<{ className?: string }>; hoverClass: string }
> = {
  linkedin: {
    Icon: FaLinkedinIn,
    hoverClass:
      'hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:border-[#0A66C2] dark:hover:text-[#3897F0]',
  },
  github: {
    Icon: SiGithub,
    hoverClass:
      'hover:border-zinc-900 hover:text-zinc-950 dark:hover:border-white dark:hover:text-white',
  },
  whatsapp: {
    Icon: FaWhatsapp,
    hoverClass:
      'hover:border-[#25D366] hover:text-[#16A34A] dark:hover:border-[#25D366] dark:hover:text-[#25D366]',
  },
  telegram: {
    Icon: FaTelegram,
    hoverClass:
      'hover:border-[#229ED9] hover:text-[#229ED9] dark:hover:border-[#229ED9] dark:hover:text-[#38BDF8]',
  },
  x: {
    Icon: FaXTwitter,
    hoverClass:
      'hover:border-zinc-900 hover:text-zinc-950 dark:hover:border-white dark:hover:text-white',
  },
};

export function Footer() {
  const { playSound } = useAppSound();
  const [clock, setClock] = useState<string>('--:--:--');

  useEffect(() => {
    setClock(getJakartaTime());
    const timer = window.setInterval(() => {
      setClock(getJakartaTime());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer id="contact" aria-label="Contact and Footer" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/90 bg-zinc-50/90 p-6 sm:p-10 lg:p-14 dark:border-zinc-800/90 dark:bg-zinc-900/70">
          {/* Subtle Corner Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF5C1A]/10 blur-3xl dark:bg-[#FF5C1A]/15"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Open for Remote Global Teams & Consulting</span>
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
              Ready to build your next{' '}
              <span className="text-[#FF5C1A]">web or mobile product?</span>
            </h2>

            <p className="mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
              Whether you&apos;re scaling a high-traffic Next.js platform, launching a cross-platform Flutter mobile product, or modernizing enterprise ERP workflows—let&apos;s connect.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SoundButton
                href={`mailto:${PROFILE.email}`}
                variant="primary"
                soundVariant="click"
                className="w-full sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                <span>Email Husni Directly</span>
              </SoundButton>
            </div>
          </div>

          {/* Direct Social & Messaging Platform Icons */}
          <div className="relative z-10 mt-10 flex flex-col gap-4 border-t border-zinc-200/80 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Connect via Platform
            </span>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {PROFILE.socials.map((s) => {
                const { Icon, hoverClass } = PLATFORM_STYLES[s.id];
                return (
                  <motion.a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onPointerDown={() => playSound('tick')}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white text-zinc-700 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 ${hoverClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 px-2 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center dark:text-zinc-400">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. Software Engineer — Web, Mobile & Enterprise Systems.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C1A]" />
            <span>Jakarta, Indonesia · {clock} {PROFILE.timezone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

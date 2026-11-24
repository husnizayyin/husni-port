'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { SoundButton } from '@/components/ui/SoundButton';
import { useAppSound } from '@/context/SoundProvider';
import { getJakartaTime } from '@/lib/utils';

export function Footer() {
  const { playSound } = useAppSound();
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState<string>('--:--:--');

  useEffect(() => {
    setClock(getJakartaTime());
    const timer = window.setInterval(() => {
      setClock(getJakartaTime());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <footer id="contact" aria-label="Contact and Footer" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/90 bg-zinc-50/90 p-8 sm:p-14 dark:border-zinc-800/90 dark:bg-zinc-900/70">
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
              >
                <Mail className="h-4 w-4" />
                <span>Email Husni Directly</span>
              </SoundButton>

              <SoundButton
                onClick={handleCopyEmail}
                variant="secondary"
                soundVariant="open"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Copied {PROFILE.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>{PROFILE.email}</span>
                  </>
                )}
              </SoundButton>
            </div>
          </div>

          {/* Direct Social & Messaging Channels */}
          <div className="relative z-10 mt-12 grid grid-cols-2 gap-3 border-t border-zinc-200/80 pt-8 sm:grid-cols-3 lg:grid-cols-6 dark:border-zinc-800">
            {PROFILE.socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onPointerDown={() => playSound('tick')}
                className="group rounded-2xl border border-zinc-200/80 bg-white p-3.5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 dark:text-white">
                  <span>{s.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF5C1A]" />
                </div>
                <div className="mt-1 truncate font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                  {s.handle}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 px-2 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center dark:text-zinc-400">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. Crafted with Next.js, React Three Fiber, Framer Motion & WebAudio.
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

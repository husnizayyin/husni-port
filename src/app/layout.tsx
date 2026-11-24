import type { Metadata } from 'next';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import { SoundProvider } from '@/context/SoundProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  title: 'Husni Zayyin Ansori — Senior Software Engineer & System Architect',
  description:
    'Interactive 3D portfolio of Husni Zayyin Ansori (Husni Zayn) — Software Engineer with 5+ years of remote & enterprise experience across Next.js, Flutter, React, Laravel, and PostgreSQL.',
  keywords: [
    'Husni Zayyin Ansori',
    'Husni Zayn',
    'Software Engineer Jakarta',
    'Remote Full Stack Engineer',
    'Flutter Lead Developer',
    'Next.js Architect',
  ],
  openGraph: {
    title: 'Husni Zayyin Ansori — Software Engineer & System Architect',
    description:
      '5+ years architecting high-concurrency Next.js platforms, Flutter mobile ecosystems, and enterprise ERP systems.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <body className="relative min-h-screen bg-white font-sans text-zinc-950 antialiased selection:bg-[#FF5C1A] selection:text-white dark:bg-[#09090B] dark:text-zinc-50">
        <ThemeProvider>
          <SoundProvider>
            <CustomCursor />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

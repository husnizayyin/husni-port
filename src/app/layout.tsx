import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import { SoundProvider } from '@/context/SoundProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { RouteAnalyticsTracker } from '@/components/analytics/RouteAnalyticsTracker';
import { PROFILE } from '@/data/profile';

const SITE_URL = 'https://www.husnizayn.com';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KP6MWCVL';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#09090B' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Husni Zayyin Ansori — Software Engineer | Web, Mobile & Enterprise Systems',
    template: '%s | Husni Zayyin Ansori',
  },
  description:
    'Official portfolio & engineering articles of Husni Zayyin Ansori (Husni Zayn) — Software Engineer in Jakarta with 5+ years building Next.js web platforms, Flutter mobile apps, Shopify Liquid stores, and enterprise ERP/HRIS systems.',
  keywords: [
    'Husni Zayyin Ansori',
    'Husni Zayn',
    'Husni Zayyin',
    'Software Engineer Jakarta',
    'Software Engineer Indonesia',
    'Full Stack Developer Jakarta',
    'Flutter Developer Indonesia',
    'Next.js Developer Singapore',
    'React Developer',
    'Shopify Liquid Developer',
    'Laravel Developer',
    'husnizayn',
  ],
  authors: [{ name: 'Husni Zayyin Ansori', url: SITE_URL }],
  creator: 'Husni Zayyin Ansori',
  publisher: 'Husni Zayyin Ansori',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: [
      '7WCxRQWaoo0AJFZkHLpXeXgv6sUe-IgIDU3h',
      'eTOVOz4ygN2R6mxmfWGxnUQZcXwYSZ9aeMupYFeeXxU',
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    url: SITE_URL,
    siteName: 'Husni Zayyin Ansori',
    title: 'Husni Zayyin Ansori — Software Engineer | Web, Mobile & Enterprise',
    description:
      '5+ years of software engineering experience launching 15+ production web portals, Flutter & React Native mobile apps, and automated business systems across Singapore and Indonesia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1983,
        height: 793,
        alt: 'Husni Zayyin Ansori — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@husnizayn',
    creator: '@husnizayn',
    title: 'Husni Zayyin Ansori — Software Engineer',
    description:
      'Building scalable Next.js web platforms, Flutter mobile apps, and enterprise systems across Singapore & Indonesia.',
    images: ['/og-image.jpg'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Husni Zayyin Ansori',
      alternateName: ['Husni Zayn', 'Husni Zayyin', 'husnizayn.com'],
      description:
        'Official portfolio and engineering journal of Husni Zayyin Ansori, Software Engineer based in Jakarta, Indonesia.',
      inLanguage: ['en', 'id'],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PROFILE.name,
      alternateName: ['Husni Zayn', 'Husni Zayyin', 'husnizayyin'],
      jobTitle: 'Software Engineer',
      url: SITE_URL,
      image: `${SITE_URL}/husni-portrait-hd.jpg`,
      email: `mailto:${PROFILE.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jakarta',
        addressRegion: 'DKI Jakarta',
        addressCountry: 'ID',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: PROFILE.education.university,
      },
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Flutter',
        'React Native',
        'Kotlin',
        'Laravel',
        'PostgreSQL',
        'Shopify Liquid',
        'Wix Studio Velo',
        'System Architecture',
      ],
      sameAs: [
        'https://www.linkedin.com/in/husnizayn/',
        'https://github.com/husnizayyin',
        'https://x.com/husnizayn',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`,
          }}
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-white font-sans text-zinc-950 antialiased selection:bg-[#FF5C1A] selection:text-white dark:bg-[#09090B] dark:text-zinc-50">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white dark:focus:bg-white dark:focus:text-zinc-950"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <SoundProvider>
            <RouteAnalyticsTracker />
            <CustomCursor />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

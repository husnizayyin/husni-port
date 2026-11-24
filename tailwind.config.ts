import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Schibsted Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#FF5C1A',
          soft: '#FFF0EB',
          emerald: '#3FA98A',
          violet: '#7B6CF6',
        },
      },
      boxShadow: {
        'editorial-light': '0 24px 60px -15px rgba(9, 9, 11, 0.07), 0 4px 16px -4px rgba(9, 9, 11, 0.04)',
        'editorial-dark': '0 24px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(rgba(9, 9, 11, 0.09) 1px, transparent 1px)',
        'grid-dark': 'radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;

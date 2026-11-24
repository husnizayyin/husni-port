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
        sans: ['"Schibsted Grotesk Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Schibsted Grotesk Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
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
        'editorial-light': '0 20px 50px -15px rgba(9, 9, 11, 0.07), 0 4px 14px -4px rgba(9, 9, 11, 0.04)',
        'editorial-dark': '0 24px 60px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(rgba(9, 9, 11, 0.08) 1px, transparent 1px)',
        'grid-dark': 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;

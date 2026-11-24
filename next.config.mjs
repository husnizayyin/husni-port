/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons/si',
      'react-icons/tb',
      'react-icons/fa6',
      'framer-motion',
      '@react-three/drei',
    ],
  },
};

export default nextConfig;

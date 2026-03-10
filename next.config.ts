import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack (default in Next.js 16) — empty config silences the "no turbopack
  // config" warning while webpack rules also remain available for webpack builds.
  turbopack: {
    // Prefer .web.ts(x) over .ts(x) when both exist, so Turbopack never picks
    // up .native.ts(x) variants that have no corresponding .web. file.
    resolveExtensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
  },
};

export default nextConfig;

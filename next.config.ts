import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * No special extension config needed.
   *
   * Platform split works via file naming alone:
   *   Component.tsx         → web (Next.js picks this, it's just a normal file)
   *   Component.native.tsx  → native (Expo Metro prefers .native.tsx over .tsx)
   *
   * Next.js never sees .native.tsx files — they're excluded from tsconfig too.
   * Only create a .native.tsx when the .tsx imports something that breaks on native
   * (e.g. 'react-native', window, document, navigator.geolocation).
   */
};

export default nextConfig;

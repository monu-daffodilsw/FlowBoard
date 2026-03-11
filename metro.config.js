// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Mock next/font/google for native: it uses Next.js internals unavailable in RN.
// app/layout.tsx is still bundled (Expo Router needs the fallback sibling for
// layout.native.tsx), but font calls become no-ops instead of crashing.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'next/font/google' && platform !== 'web') {
    return { type: 'sourceFile', filePath: require.resolve('./mocks/next-font-google.js') };
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Prefer .native.tsx > .tsx and .native.ts > .ts so Metro picks up
// native-split files automatically on iOS/Android builds.
const { resolver } = config;
resolver.sourceExts = [
  ...resolver.sourceExts.filter((e) => !['ts', 'tsx', 'js', 'jsx', 'mjs'].includes(e)),
  'native.ts',
  'native.tsx',
  'native.js',
  'native.jsx',
  'ts',
  'tsx',
  'js',
  'jsx',
  'mjs',
];

module.exports = withNativewind(config, { input: './global.css' });

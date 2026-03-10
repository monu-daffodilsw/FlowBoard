// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

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

module.exports = config;

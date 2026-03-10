module.exports = function (api) {
  // Only apply nativewind/babel in Metro (Expo) context, not in Next.js/Turbopack
  const isMetro = api.caller((caller) => caller?.name === 'metro');
  api.cache(false);
  return {
    presets: [
      'babel-preset-expo',
      ...(isMetro ? ['nativewind/babel'] : []),
    ],
  };
};

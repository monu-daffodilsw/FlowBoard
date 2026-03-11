// Metro mock for next/font/google on native.
// next/font/google uses Next.js internals that don't exist in React Native.
// This mock returns a no-op font factory for every named export (Space_Mono, DM_Sans, etc.)
const fontFactory = () => ({ variable: '', className: '', style: { fontFamily: '' } });
module.exports = new Proxy({}, { get: () => fontFactory });

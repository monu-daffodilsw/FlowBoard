// WEB — mock matching the React Native Platform API shape
export const Platform = {
  OS: 'web' as const,
  Version: 0,
  isPad: false,
  isTV: false,
  select: <T extends Record<string, unknown>>(spec: T & { web?: unknown; default?: unknown }): T[keyof T] => {
    return (spec.web ?? spec.default) as T[keyof T];
  },
};

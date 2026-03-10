import { useState, useCallback } from 'react';
import { Appearance } from 'react-native';
import { lsGet, lsSet, LS_KEYS } from '@/services/localStorage';

type Theme = 'dark' | 'light';

export function useTheme() {
  const stored = lsGet<Theme>(LS_KEYS.THEME);
  const systemScheme = Appearance.getColorScheme();
  const initial: Theme = stored ?? (systemScheme === 'light' ? 'light' : 'dark');

  const [theme, setTheme] = useState<Theme>(initial);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      lsSet(LS_KEYS.THEME, next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

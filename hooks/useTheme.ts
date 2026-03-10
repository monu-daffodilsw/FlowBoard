'use client';
import { useState, useEffect, useCallback } from 'react';
import { lsGet, lsSet, LS_KEYS } from '@/services/localStorage';

type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = lsGet<Theme>(LS_KEYS.THEME);
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: Theme = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      applyTheme(initial);
    }
  }, []);

  const applyTheme = (t: Theme) => {
    const html = document.documentElement;
    if (t === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      lsSet(LS_KEYS.THEME, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

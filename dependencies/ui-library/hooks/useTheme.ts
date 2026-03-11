'use client';
import { useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

export function useTheme(storageKey = 'theme') {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored);
        applyTheme(stored);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial: Theme = prefersDark ? 'dark' : 'light';
        setTheme(initial);
        applyTheme(initial);
      }
    } catch {}
  }, [storageKey]);

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
      try { localStorage.setItem(storageKey, next); } catch {}
      applyTheme(next);
      return next;
    });
  }, [storageKey]);

  return { theme, toggle };
}

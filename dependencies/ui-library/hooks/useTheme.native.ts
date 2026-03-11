import { useState, useCallback } from 'react';
import { Appearance } from 'react-native';

type Theme = 'dark' | 'light';

export function useTheme(storageKey = 'theme') {
  const getStored = (): Theme | null => {
    try {
      // On native, use a simple in-memory approach since localStorage is a web API.
      // Consumers who need persistence should pass a storageKey and wire up AsyncStorage externally.
      return null;
    } catch {
      return null;
    }
  };

  const systemScheme = Appearance.getColorScheme();
  const initial: Theme = getStored() ?? (systemScheme === 'light' ? 'light' : 'dark');

  const [theme, setTheme] = useState<Theme>(initial);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      return next;
    });
  }, []);

  return { theme, toggle };
}

import { useState, useCallback } from 'react';
import * as Clipboard from 'expo-clipboard';

/**
 * NATIVE: uses expo-clipboard
 * Install: npx expo install expo-clipboard
 */
export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      setCopied(false);
    }
  }, [timeout]);

  return { copy, copied };
}

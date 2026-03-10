'use client';
import { useState, useEffect } from 'react';

/** WEB: returns the current page URL */
export function useCurrentUrl(): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return url;
}

/**
 * WEB storage — synchronous localStorage
 * Next.js picks this file when bundling for web.
 */

export const LS_KEYS = {
  USER: 'flowboard_user',
  PROJECTS: 'flowboard_projects',
  TASKS: 'flowboard_tasks',
  NOTIFICATIONS: 'flowboard_notifications',
  THEME: 'flowboard_theme',
} as const;

export type StorageKey = typeof LS_KEYS[keyof typeof LS_KEYS];

export function storageGet<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

export function storageSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function storageRemove(key: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

export function storageClearAll(): void {
  if (typeof window === 'undefined') return;
  Object.keys(window.localStorage)
    .filter(k => k.startsWith('flowboard_'))
    .forEach(k => window.localStorage.removeItem(k));
}

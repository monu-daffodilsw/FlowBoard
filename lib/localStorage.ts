export function lsGet<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

export function lsSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode
  }
}

export function lsRemove(key: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

export function lsClearAll(): void {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(window.localStorage).filter(k => k.startsWith('flowboard_'));
  keys.forEach(k => window.localStorage.removeItem(k));
}

export const LS_KEYS = {
  USER: 'flowboard_user',
  PROJECTS: 'flowboard_projects',
  TASKS: 'flowboard_tasks',
  NOTIFICATIONS: 'flowboard_notifications',
  THEME: 'flowboard_theme',
} as const;

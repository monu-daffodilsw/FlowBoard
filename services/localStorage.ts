import { Storage } from '@ultra-ui-library';

export { Storage };

export const LS_KEYS = {
  USER: 'flowboard_user',
  PROJECTS: 'flowboard_projects',
  TASKS: 'flowboard_tasks',
  NOTIFICATIONS: 'flowboard_notifications',
  THEME: 'flowboard_theme',
} as const;

export async function lsGet<T>(key: string): Promise<T | null> {
  const item = await Storage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export async function lsSet<T>(key: string, value: T): Promise<void> {
  await Storage.setItem(key, JSON.stringify(value));
}

export async function lsRemove(key: string): Promise<void> {
  await Storage.removeItem(key);
}

export async function lsClearAll(): Promise<void> {
  const allKeys = await Storage.getAllKeys();
  const keys = allKeys.filter(k => k.startsWith('flowboard_'));
  await Storage.multiRemove(keys);
}

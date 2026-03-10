/**
 * NATIVE storage — AsyncStorage (async, persists on device)
 * Expo/Metro picks this file when bundling for iOS/Android.
 *
 * Install: npx expo install @react-native-async-storage/async-storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LS_KEYS = {
  USER: 'flowboard_user',
  PROJECTS: 'flowboard_projects',
  TASKS: 'flowboard_tasks',
  NOTIFICATIONS: 'flowboard_notifications',
  THEME: 'flowboard_theme',
} as const;

export type StorageKey = typeof LS_KEYS[keyof typeof LS_KEYS];

export async function storageGet<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

export async function storageSet<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export async function storageRemove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

export async function storageClearAll(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const flowboardKeys = keys.filter(k => k.startsWith('flowboard_'));
    await AsyncStorage.multiRemove(flowboardKeys);
  } catch {}
}

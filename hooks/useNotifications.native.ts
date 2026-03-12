import { useState, useEffect, useCallback } from 'react';
import { Notification } from '@/types';
import { lsGet, lsSet, LS_KEYS } from '@/services/localStorage';
import { generateId } from '@ui-library';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await lsGet<Notification[]>(LS_KEYS.NOTIFICATIONS) ?? [];
      setNotifications(stored);
    })();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((message: string, _fireBrowser = false) => {
    const n: Notification = {
      id: generateId(),
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => {
      const updated = [n, ...prev].slice(0, 50);
      lsSet(LS_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
    // Native push notifications would use expo-notifications — not wired up yet.
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      lsSet(LS_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, []);

  const requestPermission = useCallback(async () => {
    // expo-notifications permission request would go here
  }, []);

  return { notifications, unreadCount, addNotification, markAllRead, requestPermission };
}

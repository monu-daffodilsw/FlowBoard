'use client';
import { useState, useEffect, useCallback } from 'react';
import { Notification } from '@/types';
import { lsGet, lsSet, LS_KEYS } from '@/services/localStorage';
import { generateId } from '@ultra-ui-library';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await lsGet<Notification[]>(LS_KEYS.NOTIFICATIONS) ?? [];
      setNotifications(stored);
    })();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((message: string, fireBrowser = false) => {
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
    if (fireBrowser && typeof window !== 'undefined' && 'Notification' in window && window.Notification.permission === 'granted') {
      new window.Notification('FlowBoard', { body: message, icon: '/favicon.ico' });
    }
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      lsSet(LS_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      await window.Notification.requestPermission();
    }
  }, []);

  return { notifications, unreadCount, addNotification, markAllRead, requestPermission };
}

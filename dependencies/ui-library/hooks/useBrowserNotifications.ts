'use client';
import { useState, useEffect } from 'react';

/** WEB: wraps the browser Notification permission API */
export function useBrowserNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(window.Notification.permission);
    }
  }, []);

  const request = async () => {
    if ('Notification' in window) {
      const result = await window.Notification.requestPermission();
      setPermission(result);
    }
  };

  return { permission, request };
}

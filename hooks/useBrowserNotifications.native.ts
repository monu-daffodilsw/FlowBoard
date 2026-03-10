/** NATIVE: no browser Notification API — always returns 'denied' no-op */
export function useBrowserNotifications() {
  return {
    permission: 'denied' as const,
    request: async () => {},
  };
}

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { lsClearAll } from '@/lib/localStorage';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const { theme, toggle } = useTheme();
  const online = useOnlineStatus();
  const router = useRouter();
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>('default');
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotifPermission(window.Notification.permission);
    }
  }, []);

  const requestNotifPermission = async () => {
    if ('Notification' in window) {
      const result = await window.Notification.requestPermission();
      setNotifPermission(result);
    }
  };

  const handleClearData = () => {
    lsClearAll();
    router.push('/login');
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6" style={{ fontFamily: 'Space Mono, monospace' }}>Settings</h1>

      <div className="space-y-3 sm:space-y-4">
        {/* Theme */}
        <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white mb-0.5">Appearance</h2>
              <p className="text-xs text-white/40">Switch between dark and light mode</p>
            </div>
            <button
              onClick={toggle}
              className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-white/20'}`}
              aria-label="Toggle theme"
            >
              <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <p className="text-xs text-white/30 mt-2">{theme === 'dark' ? '🌙 Dark mode' : '☀️ Light mode'}</p>
        </div>

        {/* Notifications */}
        <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5">
          <h2 className="text-sm font-semibold text-white mb-2">Browser Notifications</h2>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs text-white/40">
              Status:{' '}
              <span className={`font-medium ${notifPermission === 'granted' ? 'text-emerald-400' : notifPermission === 'denied' ? 'text-red-400' : 'text-amber-400'}`}>
                {notifPermission}
              </span>
            </p>
            {notifPermission !== 'granted' && (
              <Button size="sm" variant="secondary" onClick={requestNotifPermission}>
                {notifPermission === 'denied' ? 'Blocked in browser' : 'Enable'}
              </Button>
            )}
            {notifPermission === 'granted' && (
              <span className="text-xs text-emerald-400">✓ Enabled</span>
            )}
          </div>
        </div>

        {/* Online status */}
        <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5">
          <h2 className="text-sm font-semibold text-white mb-2">Connection</h2>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${online ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="text-sm text-white/60">{online ? 'Online' : 'Offline — changes saved locally'}</span>
          </div>
        </div>

        {/* Danger zone */}
        <div className="p-4 sm:p-5 rounded-xl border border-red-500/20 bg-red-500/5">
          <h2 className="text-sm font-semibold text-red-400 mb-1">Danger Zone</h2>
          <p className="text-xs text-white/40 mb-4">
            Clear all FlowBoard data from localStorage. This removes all projects, tasks, and your account. This cannot be undone.
          </p>
          {!confirmClear ? (
            <Button variant="danger" size="sm" onClick={() => setConfirmClear(true)}>
              Clear All Data
            </Button>
          ) : (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <p className="text-sm text-red-300">Are you sure?</p>
              <Button variant="danger" size="sm" onClick={handleClearData}>Yes, clear everything</Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>Cancel</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useRouter } from '@/router';
import { useTheme } from '@/hooks/useTheme';
import { useOnlineStatus } from '@ui-library';
import { useBrowserNotifications } from '@ui-library';
import { lsClearAll } from '@/services/localStorage';
import { Button } from '@ui-library';
import { View } from '@ui-library';
import { Text } from '@ui-library';
import { Pressable } from '@ui-library';
import { useState } from 'react';

export default function SettingsPage() {
  const { theme, toggle } = useTheme();
  const online = useOnlineStatus();
  const router = useRouter();
  const { permission: notifPermission, request: requestNotifPermission } = useBrowserNotifications();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearData = async () => { await lsClearAll(); router.navigate('login'); };

  return (
    <View className="max-w-xl">
      <Text className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'Space Mono, monospace' }}>Settings</Text>

      <View className="gap-3">
        {/* Theme */}
        <View className="p-4 rounded-xl border border-white/10 bg-white/5">
          <View className="flex-row items-center justify-between gap-4">
            <View className="min-w-0">
              <Text className="text-sm font-semibold text-white mb-0.5">Appearance</Text>
              <Text className="text-xs text-white/40">Switch between dark and light mode</Text>
            </View>
            <Pressable
              onPress={toggle}
              className={`relative w-12 h-7 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-white/20'}`}
            >
              <View className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
            </Pressable>
          </View>
          <Text className="text-xs text-white/30 mt-2">{theme === 'dark' ? '🌙 Dark mode' : '☀️ Light mode'}</Text>
        </View>

        {/* Notifications */}
        <View className="p-4 rounded-xl border border-white/10 bg-white/5">
          <Text className="text-sm font-semibold text-white mb-2">Browser Notifications</Text>
          <View className="flex-row items-center justify-between gap-3 flex-wrap">
            <Text className="text-xs text-white/40">
              Status:{' '}
              <Text className={`font-medium ${notifPermission === 'granted' ? 'text-emerald-400' : notifPermission === 'denied' ? 'text-red-400' : 'text-amber-400'}`}>
                {notifPermission}
              </Text>
            </Text>
            {notifPermission !== 'granted' && (
              <Button size="sm" variant="secondary" onPress={requestNotifPermission}>
                {notifPermission === 'denied' ? 'Blocked in browser' : 'Enable'}
              </Button>
            )}
            {notifPermission === 'granted' && <Text className="text-xs text-emerald-400">✓ Enabled</Text>}
          </View>
        </View>

        {/* Online status */}
        <View className="p-4 rounded-xl border border-white/10 bg-white/5">
          <Text className="text-sm font-semibold text-white mb-2">Connection</Text>
          <View className="flex-row items-center gap-2">
            <View className={`w-2 h-2 rounded-full flex-shrink-0 ${online ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <Text className="text-sm text-white/60">{online ? 'Online' : 'Offline — changes saved locally'}</Text>
          </View>
        </View>

        {/* Danger zone */}
        <View className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <Text className="text-sm font-semibold text-red-400 mb-1">Danger Zone</Text>
          <Text className="text-xs text-white/40 mb-4">
            Clear all FlowBoard data from localStorage. This removes all projects, tasks, and your account. This cannot be undone.
          </Text>
          {!confirmClear ? (
            <Button variant="danger" size="sm" onPress={() => setConfirmClear(true)}>Clear All Data</Button>
          ) : (
            <View className="flex-row flex-wrap items-center gap-2">
              <Text className="text-sm text-red-300">Are you sure?</Text>
              <Button variant="danger" size="sm" onPress={handleClearData}>Yes, clear everything</Button>
              <Button variant="ghost" size="sm" onPress={() => setConfirmClear(false)}>Cancel</Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

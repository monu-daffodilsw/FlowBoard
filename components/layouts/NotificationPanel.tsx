'use client';
import { Notification } from '@/types';
import { formatDate } from '@/utils/utils';
import { Button } from '@/components/ui/Button';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { ScrollView } from '@/components/core/ScrollView';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onClose: () => void;
}

export function NotificationPanel({ notifications, onMarkAllRead, onClose }: NotificationPanelProps) {
  const recent = notifications.slice(0, 10);

  return (
    <View className="absolute right-0 top-12 w-80 bg-[#0d1526] border border-white/10 rounded-xl shadow-2xl overflow-hidden" style={{ zIndex: 50 }}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/10">
        <Text className="text-sm font-semibold text-white">Notifications</Text>
        <Button variant="ghost" size="sm" onPress={onMarkAllRead}>Mark all read</Button>
      </View>
      <ScrollView style={{ maxHeight: 320 }}>
        {recent.length === 0 ? (
          <View className="px-4 py-8 items-center">
            <Text className="text-white/30 text-sm">No notifications yet</Text>
          </View>
        ) : (
          recent.map(n => (
            <View key={n.id} className={`px-4 py-3 border-b border-white/5 ${!n.read ? 'bg-indigo-500/5' : ''}`}>
              <View className="flex-row items-start gap-2">
                {!n.read && <View className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />}
                <View className="flex-1">
                  <Text className="text-sm text-white/80">{n.message}</Text>
                  <Text className="text-xs text-white/30 mt-0.5">{formatDate(n.createdAt)}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

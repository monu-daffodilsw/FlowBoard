'use client';
import { useState } from 'react';
import { useRouter } from '@/router';
import { User, Notification } from '@/types';
import { Avatar } from '@ultra-ui-library';
import { NotificationPanel } from '@ultra-ui-library';
import { useAuth } from '@/hooks/useAuth';
import { View } from '@ultra-ui-library';
import { Text } from '@ultra-ui-library';
import { Pressable } from '@ultra-ui-library';
import { TextInput } from '@ultra-ui-library';
import { Svg } from '@ultra-ui-library';
import { Path } from '@ultra-ui-library';

interface NavbarProps {
  user: User;
  notifications: Notification[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onMenuOpen: () => void;
}

export function Navbar({ user, notifications, unreadCount, onMarkAllRead, onMenuOpen }: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => { await logout(); router.navigate('login'); };

  return (
    <View className="h-14 flex-row items-center gap-2 px-3 bg-[#080d1a] border-b border-white/5 flex-shrink-0">
      {/* Mobile hamburger */}
      <Pressable onPress={onMenuOpen} className="md:hidden w-10 h-10 items-center justify-center rounded-lg flex-shrink-0">
        <Svg size={20} fill="none" stroke="rgba(255,255,255,0.5)" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </Svg>
      </Pressable>

      {/* Mobile logo */}
      <View className="md:hidden flex-row items-center gap-2 flex-shrink-0">
        <View className="w-7 h-7 rounded-lg bg-indigo-500 items-center justify-center">
          <Svg size={16} fill="none" stroke="white" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </Svg>
        </View>
        <Text className="text-sm font-bold text-white" style={{ fontFamily: 'Space Mono, monospace' }}>FlowBoard</Text>
      </View>

      {/* Search */}
      <View className="hidden sm:flex flex-1 max-w-sm">
        <View className="relative w-full flex-row items-center">
          <View className="absolute left-3">
            <Svg size={16} fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </Svg>
          </View>
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            className="w-full pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
          />
        </View>
      </View>

      <View className="ml-auto flex-row items-center gap-1">
        {/* Notifications */}
        <View className="relative">
          <Pressable
            onPress={() => { setNotifOpen(v => !v); setMenuOpen(false); }}
            className="relative w-10 h-10 items-center justify-center rounded-lg"
          >
            <Svg size={20} fill="none" stroke="rgba(255,255,255,0.5)" viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </Svg>
            {unreadCount > 0 && (
              <View className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-500 items-center justify-center">
                <Text className="text-white text-[10px] font-bold">{unreadCount > 9 ? '9+' : unreadCount}</Text>
              </View>
            )}
          </Pressable>
          {notifOpen && (
            <NotificationPanel notifications={notifications} onMarkAllRead={() => { onMarkAllRead(); }} onClose={() => setNotifOpen(false)} />
          )}
        </View>

        {/* Avatar dropdown */}
        <View className="relative">
          <Pressable
            onPress={() => { setMenuOpen(v => !v); setNotifOpen(false); }}
            className="flex-row items-center gap-1.5 p-1.5 rounded-lg"
            style={{ minWidth: 40, minHeight: 40 }}
          >
            <Avatar name={user.name} color={user.avatarColor} size="sm" />
            <Svg size={12} fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24" className="hidden sm:block">
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </Svg>
          </Pressable>
          {menuOpen && (
            <View className="absolute right-0 top-12 w-48 bg-[#0d1526] border border-white/10 rounded-xl shadow-2xl overflow-hidden" style={{ zIndex: 50 }}>
              <View className="px-4 py-3 border-b border-white/10">
                <Text className="text-sm font-medium text-white" numberOfLines={1}>{user.name}</Text>
                <Text className="text-xs text-white/40" numberOfLines={1}>{user.email}</Text>
              </View>
              <Pressable onPress={() => { router.navigate('profile'); setMenuOpen(false); }} className="w-full px-4 py-3">
                <Text className="text-sm text-white/70">Profile</Text>
              </Pressable>
              <Pressable onPress={() => { router.navigate('settings'); setMenuOpen(false); }} className="w-full px-4 py-3">
                <Text className="text-sm text-white/70">Settings</Text>
              </Pressable>
              <View className="border-t border-white/10" />
              <Pressable onPress={handleLogout} className="w-full px-4 py-3">
                <Text className="text-sm text-red-400">Sign out</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from '@/router/hooks';
import { Link } from '@/router/Link';
import type { RouteName } from '@/router/routes';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Navbar } from '@/components/layouts/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { cn } from '@/utils/utils';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { Pressable } from '@/components/core/Pressable';
import { Svg } from '@/components/core/Svg';
import { Path } from '@/components/core/Path';
import { ActivityIndicator } from '@/components/core/ActivityIndicator';

const bottomNavItems: { route: RouteName; path: string; label: string; d: string }[] = [
  { route: 'dashboard', path: '/dashboard', label: 'Home', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { route: 'projects', path: '/projects', label: 'Projects', d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { route: 'profile', path: '/profile', label: 'Profile', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { route: 'settings', path: '/settings', label: 'Settings', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

interface AppLayoutProps { children: React.ReactNode; }

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, loading } = useAuth();
  const { notifications, unreadCount, markAllRead, requestPermission } = useNotifications();
  const router = useRouter();
  const pathname = usePathname();
  const online = useOnlineStatus();

  useEffect(() => { if (!loading && !user) router.replace('login'); }, [user, loading, router]);
  useEffect(() => { if (user) requestPermission(); }, [user, requestPermission]);
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  if (loading || !user) {
    return (
      <View className="min-h-screen items-center justify-center bg-[#0a0f1e]">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View className="flex flex-row h-[100dvh] bg-[#0a0f1e] overflow-hidden">
      {/* Desktop sidebar */}
      <View className="hidden md:flex">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(v => !v)} />
      </View>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <View className="fixed inset-0 z-40 md:hidden">
          <Pressable className="absolute inset-0 bg-black/70 backdrop-blur-sm" onPress={() => setDrawerOpen(false)} />
          <View className="absolute left-0 top-0 bottom-0 w-64 bg-[#080d1a] border-r border-white/5 z-50">
            <Sidebar collapsed={false} onToggle={() => setDrawerOpen(false)} mobileClose={() => setDrawerOpen(false)} />
          </View>
        </View>
      )}

      <View className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar
          user={user}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          onMenuOpen={() => setDrawerOpen(true)}
        />

        {!online && (
          <View className="flex-row items-center gap-2 px-4 py-2 bg-amber-500/20 border-b border-amber-500/30 flex-shrink-0">
            <Svg size={16} fill="none" stroke="#fcd34d" viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </Svg>
            <Text className="text-amber-300 text-xs">⚠️ You are offline — changes saved locally</Text>
          </View>
        )}

        <View className="flex-1 overflow-auto p-4 pb-20 md:pb-6" style={{ overflowY: 'auto' } as object}>
          {children}
        </View>

        {/* Mobile bottom navigation */}
        <View className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#080d1a] border-t border-white/10 flex-row">
          {bottomNavItems.map(item => {
            const active = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.route}
                to={item.route}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors',
                  active ? 'text-indigo-400' : 'text-white/40'
                )}
              >
                <Svg size={20} fill="none" stroke={active ? '#818cf8' : 'rgba(255,255,255,0.4)'} viewBox="0 0 24 24">
                  <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.d} />
                </Svg>
                <Text className={active ? 'text-indigo-400 text-xs' : 'text-white/40 text-xs'}>{item.label}</Text>
              </Link>
            );
          })}
        </View>
      </View>
    </View>
  );
}

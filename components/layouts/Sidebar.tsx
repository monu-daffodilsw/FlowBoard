'use client';
import { Link, usePathname, type RouteName } from '@/router';
import { cn } from '@ultra-ui-library';
import { View } from '@ultra-ui-library';
import { Text } from '@ultra-ui-library';
import { Pressable } from '@ultra-ui-library';
import { ScrollView } from '@ultra-ui-library';
import { Svg } from '@ultra-ui-library';
import { Path } from '@ultra-ui-library';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileClose?: () => void;
}

const navItems: { route: RouteName; path: string; label: string; d: string; d2?: string }[] = [
  { route: 'dashboard', path: '/dashboard', label: 'Dashboard', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { route: 'projects', path: '/projects', label: 'Projects', d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { route: 'profile', path: '/profile', label: 'Profile', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { route: 'settings', path: '/settings', label: 'Settings', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', d2: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export function Sidebar({ collapsed, onToggle, mobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <View className={cn(
      'flex flex-col h-full bg-[#080d1a] border-r border-white/5 transition-all duration-200',
      collapsed ? 'w-16' : 'w-56'
    )}>
      <View className="flex-row items-center gap-3 px-4 py-5 border-b border-white/5">
        <View className="w-8 h-8 rounded-lg bg-indigo-500 items-center justify-center flex-shrink-0">
          <Svg size={20} fill="none" stroke="white" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </Svg>
        </View>
        {!collapsed && (
          <Text className="font-bold text-white text-lg" style={{ fontFamily: 'Space Mono, monospace' }}>FlowBoard</Text>
        )}
        {mobileClose && (
          <Pressable onPress={mobileClose} className="ml-auto p-1.5 rounded-lg">
            <Svg size={20} fill="none" stroke="rgba(255,255,255,0.4)" viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </Svg>
          </Pressable>
        )}
      </View>

      <ScrollView className="flex-1 px-2 py-4 gap-1">
        {navItems.map(item => {
          const active = pathname === item.path || pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.route}
              to={item.route}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                active ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
              style={{ minHeight: 44 }}
            >
              <View className={cn('flex-shrink-0', active ? 'text-indigo-400' : '')}>
                <Svg size={20} fill="none" stroke={active ? '#818cf8' : 'rgba(255,255,255,0.5)'} viewBox="0 0 24 24">
                  <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.d} />
                  {item.d2 && <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.d2} />}
                </Svg>
              </View>
              {!collapsed && <Text className={active ? 'text-indigo-300' : 'text-white/50'}>{item.label}</Text>}
            </Link>
          );
        })}
      </ScrollView>

      {!mobileClose && (
        <View className="p-2 border-t border-white/5">
          <Pressable
            onPress={onToggle}
            className="w-full items-center justify-center p-2.5 rounded-lg"
            style={{ minHeight: 44 }}
          >
            <Svg size={20} fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24" className={cn('transition-transform duration-200', collapsed ? 'rotate-180' : '')}>
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </Svg>
          </Pressable>
        </View>
      )}
    </View>
  );
}

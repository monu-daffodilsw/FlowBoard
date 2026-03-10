'use client';
import { useState } from 'react';
import { useRouter } from '@/router';
import { User, Notification } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { NotificationPanel } from '@/components/layouts/NotificationPanel';
import { useAuth } from '@/hooks/useAuth';

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

  const handleLogout = () => {
    logout();
    router.navigate('login');
  };

  return (
    <header className="h-14 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 bg-[#080d1a] border-b border-white/5 flex-shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuOpen}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile logo */}
      <div className="md:hidden flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <span className="text-sm font-bold text-white" style={{ fontFamily: 'Space Mono, monospace' }}>FlowBoard</span>
      </div>

      {/* Search — hidden on mobile, shown on sm+ */}
      <div className="hidden sm:flex flex-1 max-w-sm">
        <div className="relative w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* Mobile search toggle */}
        <button className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(v => !v); setMenuOpen(false); }}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <NotificationPanel
              notifications={notifications}
              onMarkAllRead={() => { onMarkAllRead(); }}
              onClose={() => setNotifOpen(false)}
            />
          )}
        </div>

        {/* Avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => { setMenuOpen(v => !v); setNotifOpen(false); }}
            className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors min-w-[40px] min-h-[40px]"
          >
            <Avatar name={user.name} color={user.avatarColor} size="sm" />
            <svg className="w-3 h-3 text-white/30 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 w-48 bg-[#0d1526] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-white/40 truncate">{user.email}</p>
              </div>
              <button onClick={() => { router.navigate('profile'); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                Profile
              </button>
              <button onClick={() => { router.navigate('settings'); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                Settings
              </button>
              <div className="border-t border-white/10" />
              <button onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

'use client';
import { Notification } from '@/types';
import { formatDate } from '@/utils/utils';
import { Button } from '@/components/ui/Button';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onClose: () => void;
}

export function NotificationPanel({ notifications, onMarkAllRead, onClose }: NotificationPanelProps) {
  const recent = notifications.slice(0, 10);

  return (
    <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-[#0d1526] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={onMarkAllRead}>Mark all read</Button>
      </div>
      <div className="max-h-80 overflow-y-auto overscroll-contain">
        {recent.length === 0 ? (
          <div className="px-4 py-8 text-center text-white/30 text-sm">No notifications yet</div>
        ) : (
          recent.map(n => (
            <div key={n.id} className={`px-4 py-3 border-b border-white/5 last:border-0 ${!n.read ? 'bg-indigo-500/5' : ''}`}>
              <div className="flex items-start gap-2">
                {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80">{n.message}</p>
                  <p className="text-xs text-white/30 mt-0.5">{formatDate(n.createdAt)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { useNotifications } from '@/hooks/useNotifications';
import { StatsCard } from '@/components/cards/StatsCard';
import { ClockWidget } from '@/components/cards/ClockWidget';
import { CanvasChart } from '@/components/cards/CanvasChart';
import { GeoWidget } from '@/components/cards/GeoWidget';
import { Badge, statusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { allTasks } = useTasks();
  const { projects } = useProjects();
  const { addNotification } = useNotifications();
  const router = useRouter();

  const total = allTasks.length;
  const completed = allTasks.filter(t => t.status === 'Done').length;
  const inProgress = allTasks.filter(t => t.status === 'In Progress').length;
  const today = new Date().toISOString().split('T')[0];
  const overdue = allTasks.filter(t => t.dueDate && t.dueDate < today && t.status !== 'Done').length;

  useEffect(() => {
    const dueTodayTasks = allTasks.filter(t => t.dueDate === today && t.status !== 'Done');
    dueTodayTasks.forEach(t => {
      addNotification(`Task due today: "${t.title}"`, true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartData = [
    { label: 'Backlog', value: allTasks.filter(t => t.status === 'Backlog').length, color: '#6b7280' },
    { label: 'In Progress', value: inProgress, color: '#6366f1' },
    { label: 'In Review', value: allTasks.filter(t => t.status === 'In Review').length, color: '#f59e0b' },
    { label: 'Done', value: completed, color: '#10b981' },
  ];

  const recentActivity = [...allTasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const statusGroups: Record<string, typeof allTasks> = {
    Backlog: allTasks.filter(t => t.status === 'Backlog').slice(0, 3),
    'In Progress': allTasks.filter(t => t.status === 'In Progress').slice(0, 3),
    Done: allTasks.filter(t => t.status === 'Done').slice(0, 3),
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Space Mono, monospace' }}>
          Good {greeting}, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-white/40 text-sm mt-1">Here&apos;s what&apos;s happening across your projects</p>
      </div>

      {/* Stats grid — 2 cols on mobile, 4 on large */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard label="Total Tasks" value={total} color="indigo" icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        } />
        <StatsCard label="Completed" value={completed} color="green" icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        } />
        <StatsCard label="In Progress" value={inProgress} color="amber" icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        } />
        <StatsCard label="Overdue" value={overdue} color="red" icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        } />
      </div>

      {/* Clock + Geo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <ClockWidget />
        <GeoWidget />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <CanvasChart data={chartData} title="Tasks by Status" />

        <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Recent Activity</p>
          <div className="space-y-1">
            {recentActivity.map(task => {
              const proj = projects.find(p => p.id === task.projectId);
              return (
                <button
                  key={task.id}
                  onClick={() => router.push(`/projects/${task.projectId}/tasks/${task.id}`)}
                  className="w-full flex items-center gap-3 text-left hover:bg-white/5 rounded-lg p-2 -mx-2 transition-colors group min-h-[48px]"
                >
                  <Badge variant={statusBadge(task.status)} className="flex-shrink-0 hidden sm:inline-flex">{task.status}</Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 truncate group-hover:text-white transition-colors">{task.title}</p>
                    <p className="text-xs text-white/30">{proj?.name} · {formatDate(task.updatedAt)}</p>
                  </div>
                  <Badge variant={statusBadge(task.status)} className="flex-shrink-0 sm:hidden">{task.status}</Badge>
                </button>
              );
            })}
            {recentActivity.length === 0 && (
              <p className="text-white/30 text-sm py-4 text-center">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Mini Kanban preview */}
      <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Quick View</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(statusGroups).map(([status, tasks]) => (
            <div key={status}>
              <p className="text-xs font-medium text-white/50 mb-2">{status} ({tasks.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {tasks.map(t => (
                  <button
                    key={t.id}
                    onClick={() => router.push(`/projects/${t.projectId}/tasks/${t.id}`)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70 hover:text-white hover:border-indigo-500/40 transition-all truncate max-w-[160px] min-h-[32px]"
                  >
                    {t.title}
                  </button>
                ))}
                {tasks.length === 0 && <span className="text-xs text-white/20 italic">None</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

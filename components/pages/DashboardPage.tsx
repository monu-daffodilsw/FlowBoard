'use client';
import { useEffect } from 'react';
import { useRouter } from '@/router';
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
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { Pressable } from '@/components/core/Pressable';
import { Svg } from '@/components/core/Svg';
import { Path } from '@/components/core/Path';

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
    dueTodayTasks.forEach(t => { addNotification(`Task due today: "${t.title}"`, true); });
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
    <View className="gap-4">
      <View>
        <Text className="text-xl font-bold text-white" style={{ fontFamily: 'Space Mono, monospace' }}>
          Good {greeting}, {user?.name.split(' ')[0]}
        </Text>
        <Text className="text-white/40 text-sm mt-1">Here&apos;s what&apos;s happening across your projects</Text>
      </View>

      <View className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total Tasks" value={total} color="indigo" icon={
          <Svg size={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </Svg>
        } />
        <StatsCard label="Completed" value={completed} color="green" icon={
          <Svg size={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </Svg>
        } />
        <StatsCard label="In Progress" value={inProgress} color="amber" icon={
          <Svg size={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </Svg>
        } />
        <StatsCard label="Overdue" value={overdue} color="red" icon={
          <Svg size={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </Svg>
        } />
      </View>

      <View className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ClockWidget />
        <GeoWidget />
      </View>

      <View className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <CanvasChart data={chartData} title="Tasks by Status" />

        <View className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <Text className="text-white/40 text-xs uppercase tracking-wider mb-3">Recent Activity</Text>
          <View className="gap-1">
            {recentActivity.map(task => {
              const proj = projects.find(p => p.id === task.projectId);
              return (
                <Pressable
                  key={task.id}
                  onPress={() => router.navigate('taskDetail', { id: task.projectId, taskId: task.id })}
                  className="flex-row items-center gap-3 hover:bg-white/5 rounded-lg p-2 -mx-2 transition-colors"
                  style={{ minHeight: 48 }}
                >
                  <Badge variant={statusBadge(task.status)} className="flex-shrink-0 hidden sm:inline-flex">{task.status}</Badge>
                  <View className="flex-1 min-w-0">
                    <Text className="text-sm text-white/80" numberOfLines={1}>{task.title}</Text>
                    <Text className="text-xs text-white/30">{proj?.name} · {formatDate(task.updatedAt)}</Text>
                  </View>
                </Pressable>
              );
            })}
            {recentActivity.length === 0 && (
              <Text className="text-white/30 text-sm py-4 text-center">No recent activity</Text>
            )}
          </View>
        </View>
      </View>

      <View className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <Text className="text-white/40 text-xs uppercase tracking-wider mb-4">Quick View</Text>
        <View className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(statusGroups).map(([status, tasks]) => (
            <View key={status}>
              <Text className="text-xs font-medium text-white/50 mb-2">{status} ({tasks.length})</Text>
              <View className="flex-row flex-wrap gap-1.5">
                {tasks.map(t => (
                  <Pressable
                    key={t.id}
                    onPress={() => router.navigate('taskDetail', { id: t.projectId, taskId: t.id })}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/40 transition-all"
                    style={{ minHeight: 32, maxWidth: 160 }}
                  >
                    <Text className="text-xs text-white/70" numberOfLines={1}>{t.title}</Text>
                  </Pressable>
                ))}
                {tasks.length === 0 && <Text className="text-xs text-white/20 italic">None</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

'use client';
import { useRouter, useParams } from '@/router';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { KanbanBoard } from '@/components/cards/KanbanBoard';
import { TaskStatus } from '@/types';
import { Button } from '@ultra-ui-library';
import { View } from '@ultra-ui-library';
import { Text } from '@ultra-ui-library';
import { Pressable } from '@ultra-ui-library';

export default function ProjectBoardPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getProject } = useProjects();
  const { tasks, addTask, updateTask } = useTasks(id);
  const project = getProject(id);

  if (!project) {
    return (
      <View className="items-center justify-center h-64">
        <Text className="text-lg text-white/30 mb-4">Project not found</Text>
        <Button variant="ghost" onPress={() => router.navigate('projects')}>← Back to Projects</Button>
      </View>
    );
  }

  return (
    <View className="flex flex-col h-full gap-4 min-w-0">
      <View className="flex-row items-start justify-between gap-3 flex-wrap">
        <View className="min-w-0">
          <View className="flex-row items-center gap-2 mb-1 flex-wrap">
            <Pressable onPress={() => router.navigate('projects')}>
              <Text className="text-sm text-white/40 hover:text-white transition-colors">Projects</Text>
            </Pressable>
            <Text className="text-sm text-white/40">/</Text>
            <Text className="text-sm text-white/70" numberOfLines={1}>{project.name}</Text>
          </View>
          <Text className="text-xl font-bold text-white" numberOfLines={1} style={{ fontFamily: 'Space Mono, monospace' }}>
            {project.name}
          </Text>
          {project.description && (
            <Text className="text-white/40 text-sm mt-1" numberOfLines={2}>{project.description}</Text>
          )}
        </View>

        <View className="flex-row items-center gap-2 flex-shrink-0">
          <View className="flex-row">
            {project.members.slice(0, 4).map((m, i) => (
              <View
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#0a0f1e] bg-indigo-500 items-center justify-center"
                style={{ marginLeft: i > 0 ? -8 : 0 }}
              >
                <Text className="text-white text-xs font-bold">{m[0]?.toUpperCase()}</Text>
              </View>
            ))}
            {project.members.length > 4 && (
              <View className="w-8 h-8 rounded-full border-2 border-[#0a0f1e] bg-white/10 items-center justify-center" style={{ marginLeft: -8 }}>
                <Text className="text-white text-xs">+{project.members.length - 4}</Text>
              </View>
            )}
          </View>
          <Text className="text-xs text-white/30 hidden sm:block">{tasks.length} tasks</Text>
        </View>
      </View>

      <Text className="text-xs text-white/20 md:hidden">← Swipe to see all columns →</Text>

      <KanbanBoard
        tasks={tasks}
        projectId={id}
        onUpdateStatus={(taskId, status: TaskStatus) =>
          updateTask(taskId, { status }, `Status changed to ${status}`)
        }
        onAddTask={(title, status) => addTask(id, title, status)}
      />
    </View>
  );
}

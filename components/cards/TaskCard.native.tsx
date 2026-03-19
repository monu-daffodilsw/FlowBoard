import { useRouter } from '@/router';
import { Task } from '@/types';
import { Badge, priorityBadge } from '@/components/ui/Badge';
import { formatDate } from '@ultra-ui-library';
import { View } from '@ultra-ui-library';
import { Text } from '@ultra-ui-library';
import { Pressable } from '@ultra-ui-library';

interface TaskCardProps {
  task: Task;
  projectId: string;
  onDragStart: (taskId: string) => void; // no-op on native
}

/** NATIVE: TaskCard without HTML5 drag-and-drop */
export function TaskCard({ task, projectId }: TaskCardProps) {
  const router = useRouter();
  const doneSubs = task.subtasks.filter(s => s.done).length;
  const totalSubs = task.subtasks.length;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

  return (
    <Pressable
      onPress={() => router.navigate('taskDetail', { id: projectId, taskId: task.id })}
      className="p-3 rounded-lg bg-white/5 border border-white/10 active:bg-white/8"
    >
      <View className="flex-row items-start justify-between gap-2 mb-2">
        <Text className="text-sm text-white/90 font-medium flex-1" numberOfLines={2}>
          {task.title}
        </Text>
        <Badge variant={priorityBadge(task.priority)} className="flex-shrink-0 text-xs">
          {task.priority}
        </Badge>
      </View>
      {task.description ? (
        <Text className="text-xs text-white/40 mb-2" numberOfLines={2}>{task.description}</Text>
      ) : null}
      <View className="flex-row items-center justify-between mt-2 gap-2">
        <View className="flex-row items-center gap-2">
          {task.assignee ? (
            <View className="w-6 h-6 rounded-full items-center justify-center bg-indigo-500">
              <Text className="text-white text-xs font-bold">{task.assignee[0]}</Text>
            </View>
          ) : null}
          {totalSubs > 0 ? (
            <Text className="text-xs text-white/40">{doneSubs}/{totalSubs}</Text>
          ) : null}
        </View>
        {task.dueDate ? (
          <Text className={`text-xs ${isOverdue ? 'text-red-400' : 'text-white/40'}`}>
            {formatDate(task.dueDate)}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

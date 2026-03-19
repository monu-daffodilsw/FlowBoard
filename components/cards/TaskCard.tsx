'use client';
import { useRouter } from '@/router';
import { Task } from '@/types';
import { Badge, priorityBadge } from '@/components/ui/Badge';
import { formatDate } from '@ultra-ui-library';

interface TaskCardProps {
  task: Task;
  projectId: string;
  onDragStart: (taskId: string) => void;
}

export function TaskCard({ task, projectId, onDragStart }: TaskCardProps) {
  const router = useRouter();
  const doneSubs = task.subtasks.filter(s => s.done).length;
  const totalSubs = task.subtasks.length;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      onClick={() => router.navigate('taskDetail', { id: projectId, taskId: task.id })}
      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/8 cursor-pointer transition-all duration-200 group active:scale-[0.98] touch-manipulation"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm text-white/90 font-medium line-clamp-2 group-hover:text-white transition-colors flex-1">
          {task.title}
        </h4>
        <Badge variant={priorityBadge(task.priority)} className="flex-shrink-0 text-xs">
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="text-xs text-white/40 line-clamp-2 mb-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-2 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {task.assignee && (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: '#6366f1' }}
              title={task.assignee}
            >
              {task.assignee[0]}
            </div>
          )}
          {totalSubs > 0 && (
            <span className="text-xs text-white/40 whitespace-nowrap">{doneSubs}/{totalSubs}</span>
          )}
        </div>
        {task.dueDate && (
          <span className={`text-xs whitespace-nowrap ${isOverdue ? 'text-red-400' : 'text-white/40'}`}>
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
}

import { Task, TaskStatus } from '@/types';
import { KanbanColumn } from '@/components/lists/KanbanColumn';
import { ScrollView } from '@/components/core/ScrollView';

const STATUSES: TaskStatus[] = ['Backlog', 'In Progress', 'In Review', 'Done'];

interface KanbanBoardProps {
  tasks: Task[];
  projectId: string;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onAddTask: (title: string, status: TaskStatus) => void;
}

/** NATIVE: horizontal-scrolling Kanban without HTML5 drag-and-drop */
export function KanbanBoard({ tasks, projectId, onUpdateStatus, onAddTask }: KanbanBoardProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
      {STATUSES.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter(t => t.status === status)}
          projectId={projectId}
          onDragStart={() => {}}
          onDrop={() => {}}
          onAddTask={onAddTask}
        />
      ))}
    </ScrollView>
  );
}

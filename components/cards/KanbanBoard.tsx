'use client';
import { useRef } from 'react';
import { Task, TaskStatus } from '@/types';
import { KanbanColumn } from '@/components/lists/KanbanColumn';

const STATUSES: TaskStatus[] = ['Backlog', 'In Progress', 'In Review', 'Done'];

interface KanbanBoardProps {
  tasks: Task[];
  projectId: string;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onAddTask: (title: string, status: TaskStatus) => void;
}

export function KanbanBoard({ tasks, projectId, onUpdateStatus, onAddTask }: KanbanBoardProps) {
  const dragTaskId = useRef<string | null>(null);

  const handleDrop = (status: TaskStatus) => {
    if (dragTaskId.current) {
      onUpdateStatus(dragTaskId.current, status);
      dragTaskId.current = null;
    }
  };

  return (
    /* Horizontal scroll on mobile, grid on desktop */
    <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-4 md:overflow-x-visible md:pb-0 h-full">
      {STATUSES.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter(t => t.status === status)}
          projectId={projectId}
          onDragStart={id => { dragTaskId.current = id; }}
          onDrop={handleDrop}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
}

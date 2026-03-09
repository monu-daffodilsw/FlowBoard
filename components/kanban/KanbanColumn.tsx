'use client';
import { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  projectId: string;
  onDragStart: (taskId: string) => void;
  onDrop: (status: TaskStatus) => void;
  onAddTask: (title: string, status: TaskStatus) => void;
}

const columnColors: Record<TaskStatus, string> = {
  Backlog: 'border-white/10',
  'In Progress': 'border-indigo-500/30',
  'In Review': 'border-amber-500/30',
  Done: 'border-emerald-500/30',
};

const columnDotColors: Record<TaskStatus, string> = {
  Backlog: 'bg-white/30',
  'In Progress': 'bg-indigo-400',
  'In Review': 'bg-amber-400',
  Done: 'bg-emerald-400',
};

export function KanbanColumn({ status, tasks, projectId, onDragStart, onDrop, onAddTask }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleSubmit = () => {
    if (newTitle.trim()) {
      onAddTask(newTitle.trim(), status);
      setNewTitle('');
      setAdding(false);
    }
  };

  return (
    <div
      className={cn(
        /* Fixed width on mobile for scroll, flex-based; auto on desktop */
        'flex flex-col rounded-xl border bg-white/3 backdrop-blur-sm transition-colors duration-200',
        'w-72 flex-shrink-0 snap-start md:w-auto md:flex-shrink md:min-w-0',
        columnColors[status],
        isDragOver ? 'bg-white/8 ring-1 ring-indigo-500/50' : ''
      )}
      onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={e => { e.preventDefault(); setIsDragOver(false); onDrop(status); }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className={cn('w-2 h-2 rounded-full flex-shrink-0', columnDotColors[status])} />
          <span className="text-sm font-semibold text-white/80 truncate">{status}</span>
          <span className="text-xs text-white/30 bg-white/5 px-1.5 py-0.5 rounded">{tasks.length}</span>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center justify-center w-8 h-8 rounded text-white/30 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label={`Add task to ${status}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Tasks */}
      <div className="flex-1 p-2.5 space-y-2 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-230px)]">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} projectId={projectId} onDragStart={onDragStart} />
        ))}

        {/* Add task inline form */}
        {adding && (
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <input
              autoFocus
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSubmit();
                if (e.key === 'Escape') { setAdding(false); setNewTitle(''); }
              }}
              placeholder="Task title..."
              className="w-full bg-transparent text-sm text-white placeholder-white/30 focus:outline-none mb-2"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSubmit}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setNewTitle(''); }}>Cancel</Button>
            </div>
          </div>
        )}

        {tasks.length === 0 && !adding && (
          <div className="flex items-center justify-center h-14 text-white/20 text-xs">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

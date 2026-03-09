'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { TaskStatus } from '@/types';
import { Button } from '@/components/ui/Button';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getProject } = useProjects();
  const { tasks, addTask, updateTask } = useTasks(id);
  const project = getProject(id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/30">
        <p className="text-lg mb-4">Project not found</p>
        <Button variant="ghost" onClick={() => router.push('/projects')}>← Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4 min-w-0">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 text-sm text-white/40 flex-wrap">
            <button
              onClick={() => router.push('/projects')}
              className="hover:text-white transition-colors"
            >
              Projects
            </button>
            <span>/</span>
            <span className="text-white/70 truncate max-w-[200px] sm:max-w-none">{project.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white truncate" style={{ fontFamily: 'Space Mono, monospace' }}>
            {project.name}
          </h1>
          {project.description && (
            <p className="text-white/40 text-sm mt-1 line-clamp-2 max-w-xl">{project.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((m, i) => (
              <div
                key={i}
                title={m}
                className="w-8 h-8 rounded-full border-2 border-[#0a0f1e] bg-indigo-500 flex items-center justify-center text-white text-xs font-bold"
              >
                {m[0]?.toUpperCase()}
              </div>
            ))}
            {project.members.length > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-[#0a0f1e] bg-white/10 flex items-center justify-center text-white text-xs">
                +{project.members.length - 4}
              </div>
            )}
          </div>
          <span className="text-xs text-white/30 hidden sm:block">{tasks.length} tasks</span>
        </div>
      </div>

      {/* Hint for mobile scroll */}
      <p className="text-xs text-white/20 md:hidden">← Swipe to see all columns →</p>

      <KanbanBoard
        tasks={tasks}
        projectId={id}
        onUpdateStatus={(taskId, status: TaskStatus) =>
          updateTask(taskId, { status }, `Status changed to ${status}`)
        }
        onAddTask={(title, status) => addTask(id, title, status)}
      />
    </div>
  );
}

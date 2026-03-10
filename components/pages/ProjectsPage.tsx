'use client';
import { useState } from 'react';
import { useRouter } from '@/router';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

function ProgressRing({ value, max, size = 44 }: { value: number; max: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? value / max : 0;
  const offset = circ - pct * circ;
  return (
    <svg width={size} height={size} className="-rotate-90" style={{ minWidth: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#10b981" strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
}

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, addProject } = useProjects();
  const { allTasks } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleCreate = () => {
    if (!name.trim()) { setErrors({ name: 'Name is required' }); return; }
    addProject(name.trim(), description.trim(), members.split(',').map(m => m.trim()).filter(Boolean));
    setName(''); setDescription(''); setMembers('');
    setModalOpen(false);
    setErrors({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 sm:mb-6 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Space Mono, monospace' }}>Projects</h1>
          <p className="text-white/40 text-sm mt-0.5">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm" className="flex-shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">New Project</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {projects.map(project => {
          const projectTasks = allTasks.filter(t => t.projectId === project.id);
          const done = projectTasks.filter(t => t.status === 'Done').length;
          return (
            <button
              key={project.id}
              onClick={() => router.navigate('projectBoard', { id: project.id })}
              className="text-left p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-indigo-500/30 backdrop-blur-sm transition-all duration-200 group active:scale-[0.99] touch-manipulation"
            >
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <ProgressRing value={done} max={projectTasks.length || 1} />
              </div>

              <h2 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1 line-clamp-1">
                {project.name}
              </h2>
              <p className="text-sm text-white/40 line-clamp-2 mb-4 min-h-[2.5rem]">{project.description || 'No description'}</p>

              <div className="flex items-center justify-between gap-2">
                <div className="flex -space-x-2 flex-shrink-0">
                  {project.members.slice(0, 4).map((m, i) => (
                    <div
                      key={i}
                      title={m}
                      className="w-7 h-7 rounded-full border-2 border-[#0a0f1e] bg-indigo-500 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {m[0]?.toUpperCase()}
                    </div>
                  ))}
                  {project.members.length > 4 && (
                    <div className="w-7 h-7 rounded-full border-2 border-[#0a0f1e] bg-white/10 flex items-center justify-center text-white text-xs">
                      +{project.members.length - 4}
                    </div>
                  )}
                </div>
                <span className="text-xs text-white/30 text-right">{projectTasks.length} tasks · {done} done</span>
              </div>
            </button>
          );
        })}

        {projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/20">
            <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p className="text-sm">No projects yet</p>
            <button onClick={() => setModalOpen(true)} className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              Create your first project →
            </button>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Project">
        <div className="space-y-4">
          <Input
            label="Project Name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="My awesome project"
            error={errors.name}
          />
          <Input
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What's this project about?"
          />
          <Input
            label="Members (comma-separated)"
            value={members}
            onChange={e => setMembers(e.target.value)}
            placeholder="Alice, Bob, Carol"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

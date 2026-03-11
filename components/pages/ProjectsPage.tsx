'use client';
import { useState } from 'react';
import { useRouter } from '@/router';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@ui-library';
import { Modal } from '@ui-library';
import { Input } from '@ui-library';
import { View } from '@ui-library';
import { Text } from '@ui-library';
import { Pressable } from '@ui-library';
import { Svg } from '@ui-library';
import { Path } from '@ui-library';
import { Circle } from '@ui-library';

function ProgressRing({ value, max, size = 44 }: { value: number; max: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? value / max : 0;
  const offset = circ - pct * circ;
  return (
    <Svg width={size} height={size} className="-rotate-90" style={{ minWidth: size } as object} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5} />
      <Circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#10b981" strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' } as object}
      />
    </Svg>
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
    <View>
      <View className="flex-row items-center justify-between mb-5 gap-3">
        <View>
          <Text className="text-xl font-bold text-white" style={{ fontFamily: 'Space Mono, monospace' }}>Projects</Text>
          <Text className="text-white/40 text-sm mt-0.5">{projects.length} project{projects.length !== 1 ? 's' : ''}</Text>
        </View>
        <Button onPress={() => setModalOpen(true)} size="sm" className="flex-shrink-0">
          <Svg size={16} fill="none" stroke="white" viewBox="0 0 24 24">
            <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </Svg>
          New Project
        </Button>
      </View>

      <View className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {projects.map(project => {
          const projectTasks = allTasks.filter(t => t.projectId === project.id);
          const done = projectTasks.filter(t => t.status === 'Done').length;
          return (
            <Pressable
              key={project.id}
              onPress={() => router.navigate('projectBoard', { id: project.id })}
              className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-indigo-500/30 backdrop-blur-sm transition-all active:scale-[0.99]"
            >
              <View className="flex-row items-start justify-between mb-3 gap-3">
                <View className="w-10 h-10 rounded-xl bg-indigo-500/20 items-center justify-center flex-shrink-0">
                  <Svg size={20} fill="none" stroke="#818cf8" viewBox="0 0 24 24">
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </Svg>
                </View>
                <ProgressRing value={done} max={projectTasks.length || 1} />
              </View>

              <Text className="text-base font-semibold text-white mb-1" numberOfLines={1}>{project.name}</Text>
              <Text className="text-sm text-white/40 mb-4" numberOfLines={2} style={{ minHeight: 40 }}>{project.description || 'No description'}</Text>

              <View className="flex-row items-center justify-between gap-2">
                <View className="flex-row" style={{ marginLeft: 0 }}>
                  {project.members.slice(0, 4).map((m, i) => (
                    <View
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-[#0a0f1e] bg-indigo-500 items-center justify-center"
                      style={{ marginLeft: i > 0 ? -8 : 0 }}
                    >
                      <Text className="text-white text-xs font-bold">{m[0]?.toUpperCase()}</Text>
                    </View>
                  ))}
                  {project.members.length > 4 && (
                    <View className="w-7 h-7 rounded-full border-2 border-[#0a0f1e] bg-white/10 items-center justify-center" style={{ marginLeft: -8 }}>
                      <Text className="text-white text-xs">+{project.members.length - 4}</Text>
                    </View>
                  )}
                </View>
                <Text className="text-xs text-white/30">{projectTasks.length} tasks · {done} done</Text>
              </View>
            </Pressable>
          );
        })}

        {projects.length === 0 && (
          <View className="col-span-full items-center justify-center py-20">
            <Svg size={48} fill="none" stroke="rgba(255,255,255,0.2)" viewBox="0 0 24 24" className="mb-3 opacity-50">
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </Svg>
            <Text className="text-sm text-white/20">No projects yet</Text>
            <Pressable onPress={() => setModalOpen(true)} className="mt-2">
              <Text className="text-sm text-indigo-400">Create your first project →</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Project">
        <View className="gap-4">
          <Input label="Project Name" value={name} onChange={e => setName(e.target.value)} placeholder="My awesome project" error={errors.name} />
          <Input label="Description" value={description} onChange={e => setDescription(e.target.value)} placeholder="What's this project about?" />
          <Input label="Members (comma-separated)" value={members} onChange={e => setMembers(e.target.value)} placeholder="Alice, Bob, Carol" />
          <View className="flex-row justify-end gap-3 pt-2">
            <Button variant="ghost" onPress={() => setModalOpen(false)}>Cancel</Button>
            <Button onPress={handleCreate}>Create Project</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

const AVATAR_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { allTasks } = useTasks();
  const { projects } = useProjects();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) { setName(user.name); setBio(user.bio); }
  }, [user]);

  if (!user) return null;

  const completed = allTasks.filter(t => t.status === 'Done' && t.assignee === user.name).length;
  const inProgress = allTasks.filter(t => t.status === 'In Progress' && t.assignee === user.name).length;

  const handleSave = () => {
    updateUser({ name: name.trim() || user.name, bio });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6" style={{ fontFamily: 'Space Mono, monospace' }}>Profile</h1>

      <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mb-4">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <Avatar name={user.name} color={user.avatarColor} size="lg" />
            {editing && (
              <div className="flex gap-1.5 flex-wrap justify-center max-w-[88px]">
                {AVATAR_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateUser({ avatarColor: c })}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${user.avatarColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Set avatar color to ${c}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-3">
                <Input
                  label="Display Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                />
                <Textarea
                  label="Bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" onClick={handleSave}>Save Changes</Button>
                  <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setName(user.name); setBio(user.bio); }}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate">{user.name}</h2>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(true)} className="flex-shrink-0">Edit</Button>
                </div>
                <p className="text-sm text-white/50 mb-2 truncate">{user.email}</p>
                <p className="text-sm text-white/60 break-words">{user.bio || <span className="text-white/20 italic">No bio yet</span>}</p>
                {saved && <p className="text-xs text-emerald-400 mt-2">✓ Changes saved</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Projects', value: projects.length, color: 'text-indigo-400' },
          { label: 'Completed', value: completed, color: 'text-emerald-400' },
          { label: 'In Progress', value: inProgress, color: 'text-amber-400' },
        ].map(stat => (
          <div key={stat.label} className="p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5 text-center">
            <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-white/40 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { Avatar } from '@ui-library';
import { Button } from '@ui-library';
import { Input, Textarea } from '@ui-library';
import { View } from '@ui-library';
import { Text } from '@ui-library';
import { Pressable } from '@ui-library';

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
    <View className="max-w-2xl">
      <Text className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'Space Mono, monospace' }}>Profile</Text>

      <View className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mb-4">
        <View className="flex-row items-start gap-4">
          <View className="items-center gap-2 flex-shrink-0">
            <Avatar name={user.name} color={user.avatarColor} size="lg" />
            {editing && (
              <View className="flex-row flex-wrap justify-center gap-1.5" style={{ maxWidth: 88 }}>
                {AVATAR_COLORS.map(c => (
                  <Pressable
                    key={c}
                    onPress={() => updateUser({ avatarColor: c })}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${user.avatarColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </View>
            )}
          </View>

          <View className="flex-1 min-w-0">
            {editing ? (
              <View className="gap-3">
                <Input label="Display Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
                <Textarea label="Bio" value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself..." rows={3} />
                <View className="flex-row gap-2 flex-wrap">
                  <Button size="sm" onPress={handleSave}>Save Changes</Button>
                  <Button size="sm" variant="ghost" onPress={() => { setEditing(false); setName(user.name); setBio(user.bio); }}>Cancel</Button>
                </View>
              </View>
            ) : (
              <View>
                <View className="flex-row items-start justify-between gap-2 mb-1">
                  <Text className="text-lg font-bold text-white" numberOfLines={1}>{user.name}</Text>
                  <Button size="sm" variant="ghost" onPress={() => setEditing(true)} className="flex-shrink-0">Edit</Button>
                </View>
                <Text className="text-sm text-white/50 mb-2" numberOfLines={1}>{user.email}</Text>
                <Text className="text-sm text-white/60">{user.bio || <Text className="text-white/20 italic">No bio yet</Text>}</Text>
                {saved && <Text className="text-xs text-emerald-400 mt-2">✓ Changes saved</Text>}
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="grid grid-cols-3 gap-3">
        {[
          { label: 'Projects', value: projects.length, color: 'text-indigo-400' },
          { label: 'Completed', value: completed, color: 'text-emerald-400' },
          { label: 'In Progress', value: inProgress, color: 'text-amber-400' },
        ].map(stat => (
          <View key={stat.label} className="p-3 rounded-xl border border-white/10 bg-white/5 items-center">
            <Text className={`text-2xl font-bold ${stat.color}`}>{stat.value}</Text>
            <Text className="text-xs text-white/40 mt-1">{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

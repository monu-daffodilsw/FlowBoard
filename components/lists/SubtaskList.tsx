'use client';
import { useState } from 'react';
import { Subtask } from '@/types';
import { Button } from '@/components/ui/Button';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { Pressable } from '@/components/core/Pressable';
import { TextInput } from '@/components/core/TextInput';
import { Svg } from '@/components/core/Svg';
import { Path } from '@/components/core/Path';

interface SubtaskListProps {
  subtasks: Subtask[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubtaskList({ subtasks, onAdd, onToggle, onDelete }: SubtaskListProps) {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const done = subtasks.filter(s => s.done).length;

  return (
    <View>
      <View className="flex-row items-center gap-2 mb-3 flex-wrap">
        <Text className="text-sm font-semibold text-white/80">Subtasks</Text>
        <Text className="text-xs text-white/40">{done}/{subtasks.length}</Text>
        {subtasks.length > 0 && (
          <View className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden" style={{ minWidth: 60 }}>
            <View
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: subtasks.length ? `${(done / subtasks.length) * 100}%` : '0%' }}
            />
          </View>
        )}
        <Button size="sm" variant="ghost" onPress={() => setAdding(true)} className="ml-auto">+ Add</Button>
      </View>

      <View className="gap-1">
        {subtasks.map(s => (
          <View key={s.id} className="flex-row items-center gap-3 p-2 rounded-lg hover:bg-white/5" style={{ minHeight: 44 }}>
            <Pressable
              onPress={() => onToggle(s.id)}
              className={`w-5 h-5 rounded border flex-shrink-0 items-center justify-center ${
                s.done ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
              }`}
            >
              {s.done && (
                <Svg size={12} fill="none" stroke="white" viewBox="0 0 24 24">
                  <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </Svg>
              )}
            </Pressable>
            <Text className={`text-sm flex-1 ${s.done ? 'line-through text-white/30' : 'text-white/80'}`}>{s.title}</Text>
            <Pressable onPress={() => onDelete(s.id)} className="p-2 rounded">
              <Svg size={14} fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </Svg>
            </Pressable>
          </View>
        ))}

        {adding && (
          <View className="flex-row items-center gap-2 p-2" style={{ minHeight: 44 }}>
            <TextInput
              autoFocus
              value={newTitle}
              onChangeText={setNewTitle}
              onSubmitEditing={() => { if (newTitle.trim()) { onAdd(newTitle.trim()); setNewTitle(''); setAdding(false); } }}
              placeholder="Subtask title..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 border-b border-white/20 pb-1"
            />
            <Button size="sm" onPress={() => { if (newTitle.trim()) { onAdd(newTitle.trim()); setNewTitle(''); setAdding(false); } }}>Add</Button>
            <Button size="sm" variant="ghost" onPress={() => { setAdding(false); setNewTitle(''); }}>✕</Button>
          </View>
        )}
      </View>
    </View>
  );
}

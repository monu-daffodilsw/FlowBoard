'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { View } from '../../core/View';
import { Text } from '../../core/Text';
import { Pressable } from '../../core/Pressable';
import { TextInput } from '../../core/TextInput';
import { Svg } from '../../core/Svg';
import { Path } from '../../core/Path';

export interface ChecklistItem {
  id: string;
  title: string;
  done: boolean;
}

interface ChecklistListProps {
  items: ChecklistItem[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  label?: string;
  addPlaceholder?: string;
}

export function ChecklistList({
  items,
  onAdd,
  onToggle,
  onDelete,
  label = 'Subtasks',
  addPlaceholder = 'Item title...',
}: ChecklistListProps) {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const done = items.filter(s => s.done).length;

  return (
    <View>
      <View className="flex-row items-center gap-2 mb-3 flex-wrap">
        <Text className="text-sm font-semibold text-white/80">{label}</Text>
        <Text className="text-xs text-white/40">{done}/{items.length}</Text>
        {items.length > 0 && (
          <View className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden" style={{ minWidth: 60 }}>
            <View
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: items.length ? `${(done / items.length) * 100}%` : '0%' }}
            />
          </View>
        )}
        <Button size="sm" variant="ghost" onPress={() => setAdding(true)} className="ml-auto">+ Add</Button>
      </View>

      <View className="gap-1">
        {items.map(s => (
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
              placeholder={addPlaceholder}
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

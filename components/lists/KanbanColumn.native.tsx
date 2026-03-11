import { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import { TaskCard } from '@/components/cards/TaskCard';
import { Button } from '@ui-library';
import { View } from '@ui-library';
import { Text } from '@ui-library';
import { TextInput } from '@ui-library';
import { ScrollView } from '@ui-library';
import { cn } from '@ui-library';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  projectId: string;
  onDragStart: (taskId: string) => void; // no-op on native
  onDrop: (status: TaskStatus) => void;  // no-op on native
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

/** NATIVE: KanbanColumn without HTML5 drag-and-drop */
export function KanbanColumn({ status, tasks, projectId, onAddTask }: KanbanColumnProps) {
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
    <View className={cn('flex flex-col rounded-xl border bg-white/3 w-72 mr-3', columnColors[status])}>
      <View className="flex-row items-center justify-between px-3 py-3 border-b border-white/5">
        <View className="flex-row items-center gap-2">
          <View className={cn('w-2 h-2 rounded-full', columnDotColors[status])} />
          <Text className="text-sm font-semibold text-white/80">{status}</Text>
          <View className="bg-white/5 px-1.5 py-0.5 rounded">
            <Text className="text-xs text-white/30">{tasks.length}</Text>
          </View>
        </View>
        <Button size="sm" variant="ghost" onPress={() => setAdding(true)}>+</Button>
      </View>

      <ScrollView className="flex-1 p-2.5 gap-2" style={{ maxHeight: 400 }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} projectId={projectId} onDragStart={() => {}} />
        ))}
        {adding && (
          <View className="p-2 rounded-lg bg-white/5 border border-white/10">
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              onSubmitEditing={handleSubmit}
              placeholder="Task title..."
              autoFocus
              className="text-sm text-white placeholder-white/30 mb-2"
            />
            <View className="flex-row gap-2">
              <Button size="sm" onPress={handleSubmit}>Add</Button>
              <Button size="sm" variant="ghost" onPress={() => { setAdding(false); setNewTitle(''); }}>Cancel</Button>
            </View>
          </View>
        )}
        {tasks.length === 0 && !adding && (
          <View className="items-center justify-center h-14">
            <Text className="text-white/20 text-xs">No tasks</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

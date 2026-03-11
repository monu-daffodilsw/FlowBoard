'use client';
import { ChecklistList, ChecklistItem } from '@ui-library';
import { Subtask } from '@/types';

interface SubtaskListProps {
  subtasks: Subtask[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubtaskList({ subtasks, onAdd, onToggle, onDelete }: SubtaskListProps) {
  return (
    <ChecklistList
      items={subtasks as ChecklistItem[]}
      onAdd={onAdd}
      onToggle={onToggle}
      onDelete={onDelete}
    />
  );
}

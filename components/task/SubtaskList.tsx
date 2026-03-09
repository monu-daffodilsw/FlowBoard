'use client';
import { useState } from 'react';
import { Subtask } from '@/types';
import { Button } from '@/components/ui/Button';

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
    <div>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <h3 className="text-sm font-semibold text-white/80">Subtasks</h3>
        <span className="text-xs text-white/40">{done}/{subtasks.length}</span>
        {subtasks.length > 0 && (
          <div className="flex-1 min-w-[60px] h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: subtasks.length ? `${(done / subtasks.length) * 100}%` : '0%' }}
            />
          </div>
        )}
        <Button size="sm" variant="ghost" onClick={() => setAdding(true)} className="ml-auto">+ Add</Button>
      </div>

      <div className="space-y-1">
        {subtasks.map(s => (
          <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group min-h-[44px]">
            <button
              onClick={() => onToggle(s.id)}
              className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                s.done ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 hover:border-emerald-500/50'
              }`}
              aria-label={s.done ? 'Mark incomplete' : 'Mark complete'}
            >
              {s.done && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className={`text-sm flex-1 ${s.done ? 'line-through text-white/30' : 'text-white/80'}`}>{s.title}</span>
            <button
              onClick={() => onDelete(s.id)}
              className="opacity-0 group-hover:opacity-100 p-2 rounded text-white/30 hover:text-red-400 transition-all flex-shrink-0"
              aria-label="Delete subtask"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {adding && (
          <div className="flex items-center gap-2 p-2 min-h-[44px]">
            <input
              autoFocus
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && newTitle.trim()) { onAdd(newTitle.trim()); setNewTitle(''); setAdding(false); }
                if (e.key === 'Escape') { setAdding(false); setNewTitle(''); }
              }}
              placeholder="Subtask title..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none border-b border-white/20 pb-1 min-w-0"
            />
            <Button size="sm" onClick={() => { if (newTitle.trim()) { onAdd(newTitle.trim()); setNewTitle(''); setAdding(false); } }}>Add</Button>
            <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setNewTitle(''); }}>✕</Button>
          </div>
        )}
      </div>
    </div>
  );
}

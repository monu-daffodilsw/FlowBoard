'use client';
import { use, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { useClipboard } from '@/hooks/useClipboard';
import { TaskStatus, TaskPriority } from '@/types';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Toast, useToast } from '@/components/ui/Toast';
import { SubtaskList } from '@/components/lists/SubtaskList';
import { FileDropZone } from '@/components/forms/FileDropZone';
import { SpeechNotes } from '@/components/cards/SpeechNotes';
import { formatDate } from '@/utils/utils';
import { Badge, statusBadge, priorityBadge } from '@/components/ui/Badge';

const STATUSES: TaskStatus[] = ['Backlog', 'In Progress', 'In Review', 'Done'];
const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High', 'Critical'];

export default function TaskDetailPage({ params }: { params: Promise<{ id: string; taskId: string }> }) {
  const { id: projectId, taskId } = use(params);
  const router = useRouter();
  const { getTask, updateTask, addSubtask, toggleSubtask, deleteSubtask, addComment, addAttachment, removeAttachment } = useTasks();
  const { getProject } = useProjects();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { copy, copied } = useClipboard();
  const { visible: toastVisible, message: toastMsg, show: showToast } = useToast();

  const task = getTask(taskId);
  const project = getProject(projectId);

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [comment, setComment] = useState('');
  const [propsExpanded, setPropsExpanded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setNotes(task.notes);
    }
  }, [task?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const scheduleSave = useCallback((updates: Record<string, unknown>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateTask(taskId, updates as Parameters<typeof updateTask>[1]);
    }, 500);
  }, [taskId, updateTask]);

  const handleTitleSave = () => {
    setEditingTitle(false);
    if (title !== task?.title) {
      updateTask(taskId, { title }, `Title changed to "${title}"`);
    }
  };

  const handleStatusChange = (status: TaskStatus) => {
    updateTask(taskId, { status }, `Status changed to ${status}`);
    if (status === 'Done') addNotification(`Task "${task?.title}" marked as Done 🎉`, true);
  };

  const handlePriorityChange = (priority: TaskPriority) => {
    updateTask(taskId, { priority }, `Priority changed to ${priority}`);
  };

  const handleCopyLink = () => {
    copy(window.location.href);
    showToast('Link copied!');
  };

  const handleAddComment = () => {
    if (!comment.trim() || !user) return;
    addComment(taskId, user.name, comment.trim());
    setComment('');
  };

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/30">
        <p className="text-lg mb-4">Task not found</p>
        <Button variant="ghost" onClick={() => router.push(`/projects/${projectId}`)}>← Back to Board</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <Toast message={toastMsg} visible={toastVisible || copied} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 mb-4 text-xs sm:text-sm text-white/40 flex-wrap">
        <button onClick={() => router.push('/projects')} className="hover:text-white transition-colors">Projects</button>
        <span>/</span>
        <button onClick={() => router.push(`/projects/${projectId}`)} className="hover:text-white transition-colors truncate max-w-[100px] sm:max-w-[180px]">
          {project?.name}
        </button>
        <span>/</span>
        <span className="text-white/60 truncate max-w-[120px] sm:max-w-[240px]">{task.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          {/* Title */}
          <div>
            {editingTitle ? (
              <input
                autoFocus
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') { setTitle(task.title); setEditingTitle(false); }
                }}
                className="w-full text-xl sm:text-2xl font-bold bg-transparent text-white border-b border-indigo-500 focus:outline-none pb-1"
                style={{ fontFamily: 'Space Mono, monospace' }}
              />
            ) : (
              <div className="flex items-start gap-2 group">
                <h1
                  className="text-xl sm:text-2xl font-bold text-white cursor-text flex-1 leading-tight"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                  onClick={() => setEditingTitle(true)}
                >
                  {task.title}
                </h1>
                <button
                  onClick={() => setEditingTitle(true)}
                  className="p-2 rounded text-white/30 hover:text-white hover:bg-white/10 transition-all mt-0.5 flex-shrink-0"
                  aria-label="Edit title"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Mobile-only collapsible properties */}
          <div className="lg:hidden">
            <button
              onClick={() => setPropsExpanded(v => !v)}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white/70"
            >
              <div className="flex items-center gap-2">
                <Badge variant={statusBadge(task.status)}>{task.status}</Badge>
                <Badge variant={priorityBadge(task.priority)}>{task.priority}</Badge>
                {task.dueDate && <span className="text-white/40 text-xs">{formatDate(task.dueDate)}</span>}
              </div>
              <svg className={`w-4 h-4 transition-transform ${propsExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {propsExpanded && (
              <div className="mt-2 p-4 rounded-xl border border-white/10 bg-white/5 space-y-4">
                <PropertiesPanel
                  task={task}
                  onStatusChange={handleStatusChange}
                  onPriorityChange={handlePriorityChange}
                  onAssigneeChange={a => updateTask(taskId, { assignee: a }, `Assigned to ${a}`)}
                  onDueDateChange={d => updateTask(taskId, { dueDate: d }, `Due date set to ${d}`)}
                  onCopyLink={handleCopyLink}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <Textarea
            label="Description"
            value={description}
            onChange={e => { setDescription(e.target.value); scheduleSave({ description: e.target.value }); }}
            placeholder="Add a description..."
            rows={4}
          />

          {/* Subtasks */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <SubtaskList
              subtasks={task.subtasks}
              onAdd={t => addSubtask(taskId, t)}
              onToggle={id => toggleSubtask(taskId, id)}
              onDelete={id => deleteSubtask(taskId, id)}
            />
          </div>

          {/* File attachments */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Attachments</h3>
            <FileDropZone
              attachments={task.attachments}
              onAdd={a => addAttachment(taskId, a)}
              onRemove={id => removeAttachment(taskId, id)}
            />
          </div>

          {/* Speech notes */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <SpeechNotes
              value={notes}
              onChange={val => { setNotes(val); scheduleSave({ notes: val }); }}
            />
          </div>

          {/* Comments */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-sm font-semibold text-white/80 mb-4">
              Comments {task.comments.length > 0 && <span className="text-white/30 font-normal">({task.comments.length})</span>}
            </h3>
            <div className="space-y-3 mb-4">
              {task.comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/40 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {c.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-medium text-white/80">{c.author}</span>
                      <span className="text-xs text-white/30">{formatDate(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-white/60 break-words">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
                placeholder="Add a comment..."
                className="flex-1 min-w-0 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <Button size="sm" onClick={handleAddComment} className="flex-shrink-0">Send</Button>
            </div>
          </div>

          {/* Activity log */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Activity</h3>
            <div className="space-y-2">
              {[...task.activity].reverse().map(a => (
                <div key={a.id} className="flex items-start gap-2 text-xs">
                  <div className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                  <span className="text-white/50 flex-1">{a.message}</span>
                  <span className="text-white/25 whitespace-nowrap">{formatDate(a.createdAt)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <Button variant="secondary" size="sm" className="w-full" onClick={handleCopyLink}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Task Link
            </Button>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-4">
            <PropertiesPanel
              task={task}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              onAssigneeChange={a => updateTask(taskId, { assignee: a }, `Assigned to ${a}`)}
              onDueDateChange={d => updateTask(taskId, { dueDate: d }, `Due date set to ${d}`)}
              onCopyLink={handleCopyLink}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Extracted reusable properties panel
function PropertiesPanel({ task, onStatusChange, onPriorityChange, onAssigneeChange, onDueDateChange, onCopyLink }: {
  task: ReturnType<ReturnType<typeof useTasks>['getTask']>;
  onStatusChange: (s: TaskStatus) => void;
  onPriorityChange: (p: TaskPriority) => void;
  onAssigneeChange: (a: string) => void;
  onDueDateChange: (d: string) => void;
  onCopyLink: () => void;
}) {
  if (!task) return null;
  return (
    <>
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Status</label>
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map(s => (
            <button key={s} onClick={() => onStatusChange(s)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[32px] ${task.status === s ? 'bg-indigo-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Priority</label>
        <div className="flex flex-wrap gap-1.5">
          {PRIORITIES.map(p => (
            <button key={p} onClick={() => onPriorityChange(p)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[32px] ${task.priority === p ? 'bg-indigo-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Assignee</label>
        <input type="text" defaultValue={task.assignee}
          onBlur={e => onAssigneeChange(e.target.value)}
          placeholder="Assign to..."
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors" />
      </div>
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Due Date</label>
        <input type="date" value={task.dueDate}
          onChange={e => onDueDateChange(e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]" />
      </div>
      <div className="pt-2 border-t border-white/5 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-white/30">Created</span>
          <span className="text-white/50">{formatDate(task.createdAt)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/30">Updated</span>
          <span className="text-white/50">{formatDate(task.updatedAt)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/30">Attachments</span>
          <span className="text-white/50">{task.attachments.length}</span>
        </div>
      </div>
    </>
  );
}

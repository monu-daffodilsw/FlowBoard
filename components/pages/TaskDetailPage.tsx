'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from '@/router';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { useClipboard } from '@ui-library';
import { useCurrentUrl } from '@ui-library';
import { TaskStatus, TaskPriority } from '@/types';
import { Button } from '@ui-library';
import { Textarea } from '@ui-library';
import { Toast, useToast } from '@ui-library';
import { SubtaskList } from '@/components/lists/SubtaskList';
import { FileDropZone } from '@ui-library';
import { SpeechNotes } from '@ui-library';
import { formatDate } from '@ui-library';
import { Badge, statusBadge, priorityBadge } from '@/components/ui/Badge';
import { View } from '@ui-library';
import { Text } from '@ui-library';
import { Pressable } from '@ui-library';
import { TextInput } from '@ui-library';
import { Svg } from '@ui-library';
import { Path } from '@ui-library';

const STATUSES: TaskStatus[] = ['Backlog', 'In Progress', 'In Review', 'Done'];
const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High', 'Critical'];

export default function TaskDetailPage() {
  const { id: projectId, taskId } = useParams<{ id: string; taskId: string }>();
  const router = useRouter();
  const { getTask, updateTask, addSubtask, toggleSubtask, deleteSubtask, addComment, addAttachment, removeAttachment } = useTasks();
  const { getProject } = useProjects();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { copy, copied } = useClipboard();
  const { visible: toastVisible, message: toastMsg, show: showToast } = useToast();
  const currentUrl = useCurrentUrl();

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
    if (task) { setTitle(task.title); setDescription(task.description); setNotes(task.notes); }
  }, [task?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const scheduleSave = useCallback((updates: Record<string, unknown>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateTask(taskId, updates as Parameters<typeof updateTask>[1]);
    }, 500);
  }, [taskId, updateTask]);

  const handleTitleSave = () => {
    setEditingTitle(false);
    if (title !== task?.title) updateTask(taskId, { title }, `Title changed to "${title}"`);
  };

  const handleStatusChange = (status: TaskStatus) => {
    updateTask(taskId, { status }, `Status changed to ${status}`);
    if (status === 'Done') addNotification(`Task "${task?.title}" marked as Done 🎉`, true);
  };

  const handleCopyLink = () => {
    if (currentUrl) { copy(currentUrl); showToast('Link copied!'); }
  };

  const handleAddComment = () => {
    if (!comment.trim() || !user) return;
    addComment(taskId, user.name, comment.trim());
    setComment('');
  };

  if (!task) {
    return (
      <View className="items-center justify-center h-64">
        <Text className="text-lg text-white/30 mb-4">Task not found</Text>
        <Button variant="ghost" onPress={() => router.navigate('projectBoard', { id: projectId })}>← Back to Board</Button>
      </View>
    );
  }

  return (
    <View className="max-w-4xl">
      <Toast message={toastMsg} visible={toastVisible || copied} />

      {/* Breadcrumb */}
      <View className="flex-row items-center gap-1.5 mb-4 flex-wrap">
        <Pressable onPress={() => router.navigate('projects')}>
          <Text className="text-sm text-white/40 hover:text-white transition-colors">Projects</Text>
        </Pressable>
        <Text className="text-sm text-white/40">/</Text>
        <Pressable onPress={() => router.navigate('projectBoard', { id: projectId })}>
          <Text className="text-sm text-white/40 hover:text-white transition-colors" numberOfLines={1}>{project?.name}</Text>
        </Pressable>
        <Text className="text-sm text-white/40">/</Text>
        <Text className="text-sm text-white/60" numberOfLines={1}>{task.title}</Text>
      </View>

      <View className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content */}
        <View className="lg:col-span-2 gap-4">
          {/* Title */}
          <View>
            {editingTitle ? (
              <TextInput
                autoFocus
                value={title}
                onChangeText={setTitle}
                onBlur={handleTitleSave}
                onSubmitEditing={handleTitleSave}
                className="w-full text-xl font-bold bg-transparent text-white border-b border-indigo-500 pb-1"
                style={{ fontFamily: 'Space Mono, monospace' } as object}
              />
            ) : (
              <View className="flex-row items-start gap-2">
                <Pressable onPress={() => setEditingTitle(true)} className="flex-1">
                  <Text className="text-xl font-bold text-white leading-tight" style={{ fontFamily: 'Space Mono, monospace' } as object}>
                    {task.title}
                  </Text>
                </Pressable>
                <Pressable onPress={() => setEditingTitle(true)} className="p-2 rounded mt-0.5 flex-shrink-0">
                  <Svg size={16} fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24">
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </Svg>
                </Pressable>
              </View>
            )}
          </View>

          {/* Mobile collapsible properties */}
          <View className="lg:hidden">
            <Pressable
              onPress={() => setPropsExpanded(v => !v)}
              className="w-full flex-row items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5"
            >
              <View className="flex-row items-center gap-2">
                <Badge variant={statusBadge(task.status)}>{task.status}</Badge>
                <Badge variant={priorityBadge(task.priority)}>{task.priority}</Badge>
                {task.dueDate && <Text className="text-white/40 text-xs">{formatDate(task.dueDate)}</Text>}
              </View>
              <Svg size={16} fill="none" stroke="rgba(255,255,255,0.5)" viewBox="0 0 24 24" className={propsExpanded ? 'rotate-180' : ''}>
                <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </Svg>
            </Pressable>
            {propsExpanded && (
              <View className="mt-2 p-4 rounded-xl border border-white/10 bg-white/5 gap-4">
                <PropertiesPanel task={task} onStatusChange={handleStatusChange} onPriorityChange={p => updateTask(taskId, { priority: p }, `Priority changed to ${p}`)} onAssigneeChange={a => updateTask(taskId, { assignee: a }, `Assigned to ${a}`)} onDueDateChange={d => updateTask(taskId, { dueDate: d }, `Due date set to ${d}`)} onCopyLink={handleCopyLink} />
              </View>
            )}
          </View>

          <Textarea label="Description" value={description} onChange={e => { setDescription(e.target.value); scheduleSave({ description: e.target.value }); }} placeholder="Add a description..." rows={4} />

          <View className="p-4 rounded-xl border border-white/10 bg-white/5">
            <SubtaskList subtasks={task.subtasks} onAdd={t => addSubtask(taskId, t)} onToggle={id => toggleSubtask(taskId, id)} onDelete={id => deleteSubtask(taskId, id)} />
          </View>

          <View className="p-4 rounded-xl border border-white/10 bg-white/5">
            <Text className="text-sm font-semibold text-white/80 mb-3">Attachments</Text>
            <FileDropZone attachments={task.attachments} onAdd={a => addAttachment(taskId, a)} onRemove={id => removeAttachment(taskId, id)} />
          </View>

          <View className="p-4 rounded-xl border border-white/10 bg-white/5">
            <SpeechNotes value={notes} onChange={val => { setNotes(val); scheduleSave({ notes: val }); }} />
          </View>

          {/* Comments */}
          <View className="p-4 rounded-xl border border-white/10 bg-white/5">
            <Text className="text-sm font-semibold text-white/80 mb-4">
              Comments {task.comments.length > 0 && <Text className="text-white/30 font-normal">({task.comments.length})</Text>}
            </Text>
            <View className="gap-3 mb-4">
              {task.comments.map(c => (
                <View key={c.id} className="flex-row gap-3">
                  <View className="w-7 h-7 rounded-full bg-indigo-500/40 items-center justify-center flex-shrink-0">
                    <Text className="text-white text-xs font-bold">{c.author[0]}</Text>
                  </View>
                  <View className="flex-1 min-w-0">
                    <View className="flex-row items-center gap-2 mb-1 flex-wrap">
                      <Text className="text-sm font-medium text-white/80">{c.author}</Text>
                      <Text className="text-xs text-white/30">{formatDate(c.createdAt)}</Text>
                    </View>
                    <Text className="text-sm text-white/60">{c.text}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View className="flex-row gap-2">
              <TextInput
                value={comment}
                onChangeText={setComment}
                onSubmitEditing={handleAddComment}
                placeholder="Add a comment..."
                className="flex-1 min-w-0 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
              />
              <Button size="sm" onPress={handleAddComment} className="flex-shrink-0">Send</Button>
            </View>
          </View>

          {/* Activity log */}
          <View className="p-4 rounded-xl border border-white/10 bg-white/5">
            <Text className="text-sm font-semibold text-white/80 mb-3">Activity</Text>
            <View className="gap-2">
              {[...task.activity].reverse().map(a => (
                <View key={a.id} className="flex-row items-start gap-2">
                  <View className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                  <Text className="text-white/50 flex-1 text-xs">{a.message}</Text>
                  <Text className="text-white/25 text-xs">{formatDate(a.createdAt)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Desktop sidebar */}
        <View className="hidden lg:flex flex-col gap-4">
          <View className="p-4 rounded-xl border border-white/10 bg-white/5">
            <Button variant="secondary" size="sm" className="w-full" onPress={handleCopyLink}>
              <Svg size={16} fill="none" stroke="white" viewBox="0 0 24 24">
                <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </Svg>
              Copy Task Link
            </Button>
          </View>

          <View className="p-4 rounded-xl border border-white/10 bg-white/5 gap-4">
            <PropertiesPanel task={task} onStatusChange={handleStatusChange} onPriorityChange={p => updateTask(taskId, { priority: p as TaskPriority }, `Priority changed to ${p}`)} onAssigneeChange={a => updateTask(taskId, { assignee: a }, `Assigned to ${a}`)} onDueDateChange={d => updateTask(taskId, { dueDate: d }, `Due date set to ${d}`)} onCopyLink={handleCopyLink} />
          </View>
        </View>
      </View>
    </View>
  );
}

function PropertiesPanel({ task, onStatusChange, onPriorityChange, onAssigneeChange, onDueDateChange }: {
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
      <View>
        <Text className="text-xs text-white/40 uppercase tracking-wider mb-2">Status</Text>
        <View className="flex-row flex-wrap gap-1.5">
          {STATUSES.map(s => (
            <Pressable key={s} onPress={() => onStatusChange(s)}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${task.status === s ? 'bg-indigo-500' : 'bg-white/5'}`}
              style={{ minHeight: 32 }}>
              <Text className={`text-xs font-medium ${task.status === s ? 'text-white' : 'text-white/50'}`}>{s}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View>
        <Text className="text-xs text-white/40 uppercase tracking-wider mb-2">Priority</Text>
        <View className="flex-row flex-wrap gap-1.5">
          {PRIORITIES.map(p => (
            <Pressable key={p} onPress={() => onPriorityChange(p)}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${task.priority === p ? 'bg-indigo-500' : 'bg-white/5'}`}
              style={{ minHeight: 32 }}>
              <Text className={`text-xs font-medium ${task.priority === p ? 'text-white' : 'text-white/50'}`}>{p}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View>
        <Text className="text-xs text-white/40 uppercase tracking-wider mb-2">Assignee</Text>
        <TextInput
          defaultValue={task.assignee}
          onBlur={e => onAssigneeChange((e as any).target?.value ?? task.assignee)}
          onSubmitEditing={() => {}}
          placeholder="Assign to..."
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
        />
      </View>
      <View>
        <Text className="text-xs text-white/40 uppercase tracking-wider mb-2">Due Date</Text>
        <TextInput
          value={task.dueDate}
          onChangeText={onDueDateChange}
          placeholder="YYYY-MM-DD"
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
        />
      </View>
      <View className="pt-2 border-t border-white/5 gap-1.5">
        {[
          { label: 'Created', value: formatDate(task.createdAt) },
          { label: 'Updated', value: formatDate(task.updatedAt) },
          { label: 'Attachments', value: String(task.attachments.length) },
        ].map(row => (
          <View key={row.label} className="flex-row justify-between">
            <Text className="text-xs text-white/30">{row.label}</Text>
            <Text className="text-xs text-white/50">{row.value}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
